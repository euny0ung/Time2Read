import json

from kafka.producer import delivery_msg
from news.loadcsv import load_csv
from preprocessing import *
from news.extract_morpheme import *

directory_path = '../resources/news_sample'
stopwords_path = '../resources/korean_stopwords.txt'

# load_csv 함수 호출하여 DataFrame 불러오기
result_df = load_csv(directory_path)

# 데이터프레임을 -> Json 형식으로 변경
# 대분류,중분류,제목,작성시간,썸네일 이미지,썸네일 캡션,본문,기사주소
def df_to_json(article_df):
    article_df = article_df[1].dropna() # 결측치 제거
    article_dict = article_df.to_dict()
    sentences = preprocess_content(article_dict.get('본문'))
    # 핵심 키워드 추출
    keywords = extract_noun_keywords_by_hannanum(keyword_extractor.summarize(get_hannanum_pos(sentences), topk=30))
    # 문장 요약
    summarize = summarize_sentences(sentences)
    article_dict['본문'] = " ".join(sentences)
    article_dict['한겨레ID'] = extract_hani_id(article_dict.get('기사주소'))
    article_dict['키워드'] = keywords
    article_dict['요약'] = summarize
    return json.dumps(article_dict)

for row in result_df.iterrows():
    delivery_msg(df_to_json(row))




