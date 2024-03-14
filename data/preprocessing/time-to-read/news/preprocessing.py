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
