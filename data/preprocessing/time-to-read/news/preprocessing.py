import re
import kss

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
