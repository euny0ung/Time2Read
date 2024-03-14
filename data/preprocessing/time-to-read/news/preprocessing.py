import re
import kss

stopwords_path = '../resources/korean_stopwords.txt'

# 기사 본문 전처리
def preprocess_content(content):
    sentences = split_content(content)  # 한문장씩으로 자르기
    sentences = delete_html_tag(sentences)  # HTML 태그 자르기
    sentences = delete_email(sentences)  # 이메일 지우기
    sentences = delete_imgtag(sentences)  # 이미지 태그 지우기
    sentences = delete_special_symbol(sentences)  # 특수문자 지우기
    sentences = delete_start_with_special_symbols(sentences)  # 특수문자로 시작하는 문장 지우기
    sentences = delete_url(sentences)  # url 지우기
    sentences = sentence_seperator(sentences)  # 확실하게 자르기
    sentences = delete_stopwords(sentences, stopwords)  # 불용어 지우기
    delete_reporter(sentences) # 마지막 ~기자 지우기
    return sentences

def load_stopwords(stopwords_file_path):
    """
    불용어(stop words) 파일을 불러오는 함수

    Parameters:
    stopwords_file_path (str): 불용어(stop words) 파일의 경로

    Returns:
    list: 불용어(stop words) 리스트
    """
    with open(stopwords_file_path, 'r', encoding='utf-8') as file:
        stopwords = file.readlines()
    stopwords = [stopword.strip() for stopword in stopwords]
    return stopwords

stopwords = load_stopwords(stopwords_path)

# HTML 태그 지우기
def delete_html_tag(context):
    processed_context = []
    for text in context:
        text = re.sub(r'<[%>]+Ws+(?=<)|<[^>]+>', '', text).strip()
        if text:
            processed_context.append(text)
    return processed_context

# email 지우기
def delete_email(context):
    preprocessed_text = []
    for text in context:
        text = re.sub(r'[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', '', text).strip()
        if text:
            preprocessed_text.append(text)
    return preprocessed_text

# 해시태그 지우기
def delete_hashtag(context):
    preprocessed_text = []
    for text in context:
        text = re.sub(r'#\S+', '', text).strip()
        if text:
            preprocessed_text.append(text)

# 저작권 관련 텍스트 지우기
def delete_copyright(context):
    re_patterns = [
        r'\<저작권자(\(c\)|©|(C)|(\(C\))).+?\>',
        r'(Copyrights)|(\(c\))|(\(C\))|©|(C)|'
    ]
    preprocessed_text = []
    for text in context:
        for re_pattern in re_patterns:
            text = re.sub(re_pattern, '', text).strip()
        if text:
            preprocessed_text.append(text)
    return preprocessed_text

# 특수문자 지우기
def delete_special_symbol(context):
    preprocessed_text = []
    for text in context:
        text = re.sub(r'□|■|▲|&[a-zA-Z]+;', '', text)
        if text:
            preprocessed_text.append(text)
    return preprocessed_text

# [%%IMAGE%%] 지우기
def delete_imgtag(context):
    preprocessed_text = []
    for text in context:
        text = re.sub(r'\[%%.*?%%\]', '', text).strip()
        if text:
            preprocessed_text.append(text)
    return preprocessed_text

# 특수문자로 시작하는 불필요한 문장 지우기
def delete_start_with_special_symbols(context):
    preprocessed_text = []
    for text  in context:
        text = re.sub(r'(▶|☞)[^\n]*\n?', '', text).strip()
        if text:
            preprocessed_text.append(text)
    return preprocessed_text

# url 지우기
def delete_url(context):
    preprocessed_text = []
    for text  in context:
        text = re.sub(r'\(?(http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+)\)?', '', text).strip()
        if text:
            preprocessed_text.append(text)
    return preprocessed_text

# 문장 분리하기
def split_content(content):
    sentences = re.split(r'(?<=[.!?])\s+', content)
    return sentences

# 문장 분리하기(kss)
def sentence_seperator(processed_context):
    splited_context = []
    for text in processed_context:
        text = text.strip()
        if text:
            splited_text = kss.split_sentences(text)
            splited_context.extend(splited_text)
    return splited_context

# 불용어 제거하기
def delete_stopwords(context, stopwords):
    preprocessed_text = []
    for text in context:
        text = [w for w in text.split(' ') if len(w) > 1 and w not in stopwords] # text를 띄어쓰기로 구분하고 불용어 사전에 없는 데이터만 리스트에 추가
        preprocessed_text.append(' '.join(text))
    return preprocessed_text

#본문 마지막 기자 문장 제거하기
def delete_reporter(content):
    if(content and content[-1].endswith("기자")):
        content = content.pop(-1)
        return content

# url 주소에서 한겨레 ID 추출하기
def extract_hani_id(url):
    match = re.search(r'/(\d+)\.html', url)
    if match:
        article_id = match.group(1)
    else:
        article_id = None
    return article_id
