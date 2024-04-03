import os
from datetime import datetime
from io import StringIO

import boto3
import pandas as pd
from dotenv import load_dotenv


def get_s3_client():
    load_dotenv()
    access_key_id = os.environ.get("access_key_id")
    secret_key_id = os.environ.get("secret_key_id")
    return boto3.client('s3', aws_access_key_id=access_key_id, aws_secret_access_key=secret_key_id)

def read_to_s3():
    bucket = "hani-news"
    s3_client = get_s3_client()
    folder_prefix = datetime.now().strftime("%Y-%m-%d")
    response = s3_client.list_objects_v2(Bucket=bucket, Prefix=folder_prefix)
    files = [content['Key'] for content in response.get('Contents', []) if content['Key'].endswith(".csv")]

    datas = []
    for file in files:
        response = s3_client.get_object(Bucket=bucket, Key=file)
        csv_content = response['Body'].read().decode('UTF-8')
        df = pd.read_csv(StringIO(csv_content))
        datas.append(df)

    result_df = pd.concat(datas, ignore_index=False)
    result_df = result_df.dropna(axis=1)
    return result_df
