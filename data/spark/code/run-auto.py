import json
import time

import schedule
from pyspark.sql import SparkSession

import producer
import redis_connector
import s3
import summary2
from extract_morpheme import *
from preprocessing import *

spark = SparkSession.builder.appName("preprocessing").getOrCreate()

sc = spark.sparkContext
sc.addPyFile("preprocessing.py")
sc.addPyFile("extract_morpheme.py")
sc.addPyFile("producer.py")
sc.addPyFile("rank.py")
sc.addPyFile("sentence.py")
sc.addPyFile("summarizer.py")
sc.addPyFile("utils.py")
sc.addPyFile("word.py")
sc.addPyFile("redis_connector.py")
sc.addPyFile("summary2.py")
sc.addPyFile("loadcsv.py")
sc.addPyFile("s3.py")


def df_to_json(article_df):
    article_dict = article_df.asDict()

    han_id = extract_hani_id(article_dict.get('기사주소'))
    if han_id is None:
        print("[DATA ERROR] han_id 추출 불가 : " + article_dict.get('제목') + "\n")
        print(article_df)
        return None

    # 이전에 전처리 되어서 저장되어 있다면 pass
    rd = redis_connector.get_redis()
    if (redis_connector.is_contain_key(rd, han_id)):
        return None
    redis_connector.set_key(rd, han_id)

    print("아직 redis에 키가 등록되지 않은 기사")

    summarize = None

    try:
        sentences = preprocess_content(article_dict.get('본문'))
        # 핵심 키워드 추출
        keywords = extract_noun_keywords_by_hannanum(keyword_extractor.summarize(get_hannanum_pos(sentences), topk=30))
        # 문장 요약
        summarize = summarize_sentences(sentences)
        if summarize is None:
            summarize = summary2.get_summary(" ".join(sentences))

        if len(keywords) == 0:
            return None

        article_dict['한겨레ID'] = han_id
        article_dict['본문'] = " ".join(sentences)
        article_dict['키워드'] = keywords
        article_dict['요약'] = summarize
        article_dict['작성시간'] = str(article_dict['작성시간'])
        return json.dumps(article_dict)

    except Exception as e:
        if summarize is None:
            print(f"[DATA ERROR] {han_id}는 요약문을 추출할 수 없습니다.")
        else:
            redis_connector.delete_key(rd, han_id)

    return None


def job():
    print("전처리 시작")
    topic = 'hani-news-test'
    pandas_df = s3.read_to_s3()
    try:
        df = spark.createDataFrame(pandas_df)

        df.show()

        # 병렬 처리
        json_messages = df.rdd.map(df_to_json).filter(lambda x: x is not None).collect()

        print(json_messages)

        print("카프카로 메시지 전송 시작")
        for message in json_messages:
            producer.delivery_msg(topic, message)
        print("카프카로 메시지 전송 완료")
    except Exception as e:
        print("[CODE ERROR] 전처리에 문제가 발생했습니다.")
        print(e)


# 스케줄링
schedule.every().day.at("15:08", "Asia/Seoul").do(job)
while True:
   schedule.run_pending()
   time.sleep(1)

