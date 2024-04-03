import os
import shutil

# 주어진 폴더 경로
folder_path = "C:/Users/SSAFY/Downloads/after7500/after7500"

# 폴더 내의 파일 목록을 가져옴
files = os.listdir(folder_path)

for file_name in files:
    if file_name.endswith(".csv"):  # 파일이 CSV 파일인 경우에만 처리
        # 파일 이름에서 날짜 부분 추출
        date = file_name.split("_")[1]

        # 날짜를 연-월-일 형식으로 변경
        year, month, day = date.split("-")
        date_formatted = f"{year}-{month}-{day}"

        # 연-월-일 별 폴더 경로 생성
        destination_folder = os.path.join(folder_path, date_formatted)

        # 폴더가 없으면 생성
        os.makedirs(destination_folder, exist_ok=True)

        # 파일을 이동
        source_file = os.path.join(folder_path, file_name)
        destination_file = os.path.join(destination_folder, file_name)
        shutil.move(source_file, destination_file)

print("CSV 파일 분류가 완료되었습니다.")