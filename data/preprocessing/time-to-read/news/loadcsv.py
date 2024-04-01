import os
import pandas as pd
import glob
# os.chdir(r'C:\Users\SSAFY\Desktop\crawling\hani\sample')

def load_csv(directory_path):
    """
    지정된 디렉토리에서 CSV 파일을 불러와 DataFrame으로 결합하는 함수

    Parameters:
    directory_path (str): CSV 파일이 있는 디렉토리의 경로

    Returns:
    pandas.DataFrame: CSV 파일을 결합한 DataFrame
    """
    try:
        # 지정된 디렉토리로 이동
        os.chdir(directory_path)

        # CSV 파일 불러오기
        file_pattern = 'article_*.csv'
        file_list = glob.glob(file_pattern)

        # 불러온 csv 파일 합치기
        dfs = [pd.read_csv(file, encoding='utf-8', header=0) for file in file_list]
        result_df = pd.concat(dfs, ignore_index=False)
        #print(result_df)
        return result_df
    except FileNotFoundError:
        print("Error: 지정된 디렉토리를 찾을 수 없습니다.")
        return None
    except Exception as e:
        print("Error:", e)
        return None

if __name__ == "__main__":
    directory_path = r'C:\Users\SSAFY\Desktop\crawling\hani\sample'
    dataframe = load_csv(directory_path)
    if dataframe is not None:
        print("CSV 파일이 성공적으로 불러와졌습니다.")
        print(dataframe.head())
    else:
        print("CSV 파일을 불러오는 중 오류가 발생했습니다.")