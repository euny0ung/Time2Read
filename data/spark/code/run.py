import json
import os
import shutil

from pyspark.sql import SparkSession

import loadcsv
import producer
import redis_connector
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

def df_to_json(article_df):
    # article_df = article_df[1].dropna() # 결측치 제거
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


if __name__ == '__main__':
    directory_path = '/opt/bitnami/spark/work/code/resources/news_sample'
    topic = 'hani-news'

    directory_items = [item for item in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, item))]
    print(directory_items)

    for directory_item in directory_items:
        date_folder_path = os.path.join(directory_path, directory_item)

        date_folder_items = [item for item in os.listdir(date_folder_path) if
                             os.path.isdir(os.path.join(date_folder_path, item))]
        for date_folder_item in date_folder_items:
            item = os.path.join(date_folder_path, date_folder_item)
            print("전처리 할 폴더 : " + item)

            pandas_df = loadcsv.load_csv(item)

            try:
                df = spark.createDataFrame(pandas_df)

                # 병렬 처리
                json_messages = df.rdd.map(df_to_json).filter(lambda x: x is not None).collect()

                print("카프카로 메시지 전송 시작")
                # 전처리된 요청 카프카로 전송
                for message in json_messages:
                    producer.delivery_msg(topic, message)
                print("카프카로 메시지 전송 완료")

                # 전처리 완료 후 삭제
                shutil.rmtree(item)
            except Exception as e:
                print("[CODE ERROR]" + item + " 처리에 문제가 발생했습니다.")

spark.stop()
