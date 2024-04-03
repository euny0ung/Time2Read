import os
import shutil

# 작업할 폴더 경로
folder_path = ("C:/Users/SSAFY/Downloads/14000-15000")

# 폴더 내의 모든 파일 가져오기
files = os.listdir(folder_path)

cnt = 0

# 파일을 10개씩 묶어서 처리
for i in range(0, len(files), 10):

    # 현재 묶음의 인덱스를 폴더 이름으로 사용
    folder_name = f"{i // 10}"
    output_folder = os.path.join(folder_path, folder_name)
    os.makedirs(output_folder, exist_ok=True)  # 새로운 폴더 생성

    # 현재 묶음의 파일을 새로운 폴더로 이동
    for file_name in files[i:i + 10]:
        source_file = os.path.join(folder_path, file_name)
        destination_file = os.path.join(output_folder, file_name)
        shutil.move(source_file, destination_file)

print("파일을 폴더로 묶는 작업이 완료되었습니다.")