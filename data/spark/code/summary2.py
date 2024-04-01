from konlpy.tag import Komoran
from sklearn.preprocessing import normalize

import re
import math
import numpy as np
import pandas as pd

def pagerank(x, df=0.85, max_iter=30):
    assert 0 < df < 1

    # initialize
    A = normalize(x, axis=0, norm='l1')
    R = np.ones(A.shape[0]).reshape(-1,1)
    bias = (1 - df) * np.ones(A.shape[0]).reshape(-1,1)
    # iteration
    for _ in range(max_iter):
        R = df * (A * R) + bias

    return R

def split_content(content):
    sentences = re.split(r'(?<=[.!?])\s+', content)
    return sentences

def get_df(content):
    data = []
    for sentence in split_content(content):
        if (sentence == "" or len(sentence) == 0):
            continue
        temp_dict = dict()
        temp_dict['sentence'] = sentence
        temp_dict['token_list'] = sentence.split()  # 가장 기초적인 띄어쓰기 단위로 나누자!

        data.append(temp_dict)

    df = pd.DataFrame(data)  # DataFrame에 넣어 깔끔하게 보기
    return df

def get_weightedGraph(df):
    komoran = Komoran()
    df['token_list'] = df['sentence'].apply(lambda x: komoran.nouns(x))

    similarity_matrix = []
    for i, row_i in df.iterrows():
        i_row_vec = []

        if(len(row_i['token_list']) == 0):
            continue

        for j, row_j in df.iterrows():
            if i == j:
                i_row_vec.append(0.0)
            else:
                if (len(row_j['token_list']) == 0):
                    i_row_vec.append(0.0)
                    continue

                intersection = len(set(row_i['token_list']) & set(row_j['token_list']))

                log_i = math.log(len(set(row_i['token_list'])))
                log_j = math.log(len(set(row_j['token_list'])))

                if log_i+log_j == 0:
                    i_row_vec.append(0.0)
                    continue

                similarity = intersection / (log_i + log_j)
                i_row_vec.append(similarity)
        similarity_matrix.append(i_row_vec)

    weightedGraph = np.array(similarity_matrix)
    return weightedGraph

def get_summary(content):
    result = ''

    df = get_df(content)
    weightedGraph = get_weightedGraph(df)

    # kolnpy 사용했을 경우
    R = pagerank(weightedGraph) # pagerank를 돌려서 rank matrix 반환
    R = R.sum(axis=1) # 반환된 matrix를 row 별로 sum
    indexs = R.argsort()[-3:] # 해당 rank 값을 sort, 값이 높은 3개의 문장 index를 반환

    # rank값이 높은 문장을 프린트
    for index in sorted(indexs): # sorted 하는 이유는 원래 문장 순서에 맞춰 보여주기 위함
        result += (df['sentence'][index] + "\n")

    return result