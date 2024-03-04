# TIL
## 24.02.27
### 한 일
- 아이디어 선정 회의
- 아이디어 구체화
- 컨설턴트님과 코치님과의 컨설팅
- Hadoop Partitioner & Inverted Index 이론 학습과 실습 연습
- 뉴스 데이터를 분석 처리 할 수 있는 방법 모색
     

### 배운 것 
- [Hadoop]
  - Partitioner : Map 함수의 출력인 (key, value)쌍이 Key에 대한 해시 값에 따라 어느 Reducer(머신)으로 보내질 것인지 결정을 정의하는 class이다.
    - 리듀스를 여러개 사용하여 분산 처리하는 만큼 어떤 데이터를 어디로 보낼지 통일 시키여야 하는데 그 정의를 Partitioner를 상속받아 오버라이딩 할 수 있다.
  - Inverted Index : 각 단어가 어느 문서에서 어떤 위치에 나오는지를 리스트로 출력받을 수 있다. 
- [뉴스 데이터를 사용한 분석 처리 방법과 예시]
    - 텍스트 분석 : 기사 텍스트를 분석해 기사 내 감정을 분석하여 긍정적, 부정적, 중립적을 판단할 수 있다. 
        - 텍스트 전처리 : python의 Natural Language Toolkit(NLTK), spaCy, KoNLPy 라이브러리 사용
        - 텍스트 분석 : TF-IDF, Word2Vec, Doc2Vec 등의 알고리즘을 사용하여 텍스트를 벡터로 변환하고, 클러스터링이나 감성 분석
    - 토픽 모델링, 토픽에 따른 분류 처리 : LDA(Latent Dirichlet Allocation), NMF(Non-negative Matrix Factorization)라는 토픽 모델링 알고리즘이 있다.
    - 연관 분석 : 뉴스 기간 간 연관성을 찾을 수 있다. -> 유사한 주제를 다루는 뉴스 기사를 클러스터링 
        - Apriori, FP-Growth 이라는 연관 규칙 학습 알고리즘 있어 연관 규칙을 찾을 수 있다.
        - 분산 처리 시스템인 Apache Spark를 사용해 대용량 데이터에 대한 연관 분석을 수행할 수 있다.
    - 데이터 시각화 : word cloud, heatmap을 사용해 사용자에게 데이터 패턴이나 트렌드를 시각화하여 제공할 수 있다.
        - Matplotlib, Seaborn, Plotly라는 그래프 같이 시각적 정보를 제공해주는 라이브러리가 존재한다.
    - 실시간 분석 : 실시간으로 뉴스 데이터를 분석하여 트랜드를 파악하거나 중요 사건을 탐지 할 수 있다.
        - Apache Kafka로 실시간 데이터를 수집하고 처리할 수 있다.
        - 실시간 처리 프레임워크로 Apache Flink, Apache Storm가 있다.
    - 정보 검색과 추천 : 사용자에게 뉴스를 추천하거나 주제에 대한 정보를 검색할 수 있다.
        - Elasticsearch, Apache Solr와 같은 검색 엔진이 존재한다.
        - 추천 알고리즘을 직접 구현하는 것도 방법이다.

### 아직 잘 모르는 것
- 뉴스 데이터를 사용한 분석 처리 방법과 예시에서 사용되는 기술에 대해 정확한 정의와 기술에 대해 명확한 지식이 필요하다.