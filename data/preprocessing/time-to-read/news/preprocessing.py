import re

# HTML 태그 지우기
def delete_html_tag(context):
    processed_context = []
    for text in context:
        text = re.sub(r'<[%>]+Ws+(?=<)|<[^>]+>', '', text).strip()
        if text:
            processed_context.append(text)
    return processed_context