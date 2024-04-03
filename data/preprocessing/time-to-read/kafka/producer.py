# pip install confluent-kafka
from confluent_kafka import Producer
from dotenv import load_dotenv
import time
import os


def delivery_report(err, msg):
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))


load_dotenv()
producer = Producer({'bootstrap.servers': os.environ.get('EC2_PUBLIC_IP')})
def delivery_msg(article_json):
    producer.poll(0)
    producer.produce('news-topic', article_json, callback=delivery_report)
    producer.flush()
    time.sleep(1)
