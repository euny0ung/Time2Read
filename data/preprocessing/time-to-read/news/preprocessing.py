import re

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