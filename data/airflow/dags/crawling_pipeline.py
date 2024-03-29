import os
import pendulum
from airflow.operators.python import PythonOperator
from airflow import DAG
from datetime import datetime, timedelta
from bs4 import BeautifulSoup as bs
from io import StringIO
import pandas as pd
import requests
import json
import boto3
flag = 1
# s3 설정 셋팅
def s3_config():
    aws_access_key_id = os.environ.get('ACCESS_KEY_ID')
    aws_secret_access_key = os.environ.get('SECRET_KEY_ID')
    return aws_access_key_id, aws_secret_access_key
# s3 업로드
def upload_csv_to_s3(upload_date, file_name, df_item):
    access_key, secret_key = s3_config()
    s3 = boto3.client(
        's3',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name='ap-northeast-2'
    )

    folder_key = f"{upload_date.year}-{upload_date.month:02d}-{upload_date.day:02d}/"
    csv_buffer = StringIO()
    df_item.to_csv(csv_buffer)
    s3.put_object(Body=csv_buffer.getvalue(),
                  Bucket='hani-news',
                  Key=folder_key + file_name
    )

# 1 카테고리별 url 만들기
def make_hani_url(news_category, page):
    default_url = 'https://www.hani.co.kr/arti/'
    query_string = '?page='
    default_url += news_category
    return default_url + query_string + str(page)


# 2 카테고리 페이지 접근 후 링크 뽑아오기
def extract_hani_article_link1(url):
    header = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'}
    response = requests.get(url, headers=header)
    html = response.text
    soup = bs(html, 'html.parser')
    a_elements = soup.select('li.ArticleList_item__jPMVW > article > a')
    links = []
    for element in a_elements:
        link = "https://www.hani.co.kr" + element.get('href')
        links.append(link)
    return links


# 2 카테고리 페이지 접근 후 링크 뽑아오기 : 문화, 스포츠
def extract_hani_article_link2(url):
    header = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'}
    response = requests.get(url, headers=header)
    html = response.text
    soup = bs(html, 'html.parser')
    a_elements = soup.select('li.ArticleGalleryList_item___oJGP > article > a')
    links = []
    for element in a_elements:
        link = "https://www.hani.co.kr" + element.get('href')
        links.append(link)
    return links


# 3. 해당 기사 링크 접속 후 아티클 정보 불러오기
def get_article(url):
    header = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'}
    response = requests.get(url, headers=header)
    html = response.text
    soup = bs(html, 'html.parser')
    json_contents = soup.select('script#__NEXT_DATA__')  # 아티클 Json에 해당하는 부분 가져오기
    json_content = json.loads(json_contents[0].get_text(strip=True))  # Json 형식으로 변경
    article = json_content.get('props', {}).get('pageProps', {}).get('article', {})
    return article


# 4. 불러온 기사 정보에서 필요한 정보를 뽑아 news_data 배열에 저장
# flag = 0 -> 페이지 넘김, 1 -> 오늘날짜에 해당, 2-> 이제 그만
def extract_article_info(url, year, month, day):
    global flag
    article = get_article(url)
    date_format = "%Y-%m-%d %H:%M"
    # 작성일자
    createDate = article.get('createDate', {})
    parsed_date = datetime.strptime(createDate, date_format)

    if datetime(parsed_date.year, parsed_date.month, parsed_date.day) > datetime(year, month, day):
        flag = 0
        return
    elif datetime(parsed_date.year, parsed_date.month, parsed_date.day) == datetime(year, month, day):
        flag = 1
    else:
        flag = 2
        return

    # 제목
    title = article.get('title', {})
    # 카테고리 대분류
    section = article.get('section', {}).get('label', {})
    # 카테고리 중분류
    subSection = article.get('subSection', {}).get('label', {})
    # 본문
    content = article.get('content', {})
    # 사진
    imageList = article.get('imageList', {})
    # 첫번째 사진 url
    mainImgUrl = imageList[0].get('url') if imageList else None
    # 첫번째 사진 캡션
    mainImgCaption = imageList[0].get('caption') if imageList else None
    # 관련 기사 리스트
    relatedArticleList = article.get('relatedArticleList', {})

    news_info = {
        '대분류': section,
        '중분류': subSection,
        '제목': title,
        '작성시간': createDate,
        '썸네일 이미지': mainImgUrl,
        '썸네일 캡션': mainImgCaption,
        '본문': content,
        '기사주소': url
    }
    for i, relatedArticle in enumerate(relatedArticleList):
        relatedArticleTitle = '관련기사 제목' + str(i + 1)
        relatedArticleUrl = '관련기사 주소' + str(i + 1)
        relatedArticleImgUrl = '관련기사 이미지' + str(i + 1)
        news_info[relatedArticleTitle] = relatedArticle.get('title')
        news_info[relatedArticleUrl] = 'https://www.hani.co.kr' + relatedArticle.get('url')
        news_info[relatedArticleImgUrl] = relatedArticle.get('image', {}).get('url')

    return news_info

def run():
    access_key, secret_key = s3_config()
    date = datetime.now() - timedelta(days=1)
    # 전역변수 선언
    article_data = []
    global flag  # flag = 0 -> 페이지 넘김, 1 -> 오늘날짜에 해당, 2-> 이제 그만
    # 뉴스 카테고리
    news_categories = ['politics', 'society', 'economy', 'international', 'culture', 'sports']  # 정치, 사회, 전국, 경제, 국제, 문화, 스포츠
    for news_category in news_categories:
        page = 1  # 시작페이지
        flag = 1
        article_data = []
        while flag !=2 :
            links = []
            url = make_hani_url(news_category, page)  # 경제 카테고리의 1페이지
            if news_category == 'sports' or news_category == 'culture':
                links = extract_hani_article_link2(url)
            else:
                links = extract_hani_article_link1(url)
            for link in links:
                news_info = extract_article_info(link, date.year, date.month, date.day)
                if flag == 0:
                    continue
                elif flag == 2:
                    break
                else:
                    article_data.append(news_info)
            page += 1
        if not article_data: continue
        df = pd.DataFrame(article_data)
        # print(df)
        current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        file_name = f'article_{current_time}.csv'
        upload_csv_to_s3(datetime.now(), file_name, df)

local_tz = pendulum.timezone("Asia/Seoul")
default_args={
    'owner':'lmw',
    'depends_on_past':False,
    'start_date': datetime(2024, 3, 28, tzinfo=local_tz), #DAG 시작날짜
    'retries': 0, # 작업 실패시 재시도 횟수
    'retry_delay': timedelta(minutes=5), #재시도 사이 대기 시간
}
with DAG(
    'hani_to_s3',  # dag 이름
    default_args=default_args,
    schedule_interval='0 1 * * *',  # 매일 새벽 한시
    catchup=True
) as dag:
    task_crawling = PythonOperator(
        task_id='run',
        python_callable=run
    )

    task_crawling