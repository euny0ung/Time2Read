FROM docker.io/bitnami/spark:3.4

# requirements.txt 파일 복사 및 패키지 설치
COPY requirements.txt /tmp/spark-master/requirements.txt
RUN pip install --no-cache-dir -r /tmp/spark-master/requirements.txt