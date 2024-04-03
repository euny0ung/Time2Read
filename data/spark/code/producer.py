# pip install confluent-kafka
import time
from confluent_kafka import Producer


def delivery_report(err, msg):
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    # else:
    #     print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

producer = Producer({'bootstrap.servers': '52.78.30.106:9092'})

def delivery_msg(topic, article_json):
    producer.poll(0)
    producer.produce(topic, article_json, callback=delivery_report)
    producer.flush()
    # time.sleep(1)
