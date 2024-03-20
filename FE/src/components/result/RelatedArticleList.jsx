import React, { useState } from 'react';

const TITLE_LENGTH_LIMIT = 10; // 기사 제목울 특정길이만큼 나타내기

const RelatedArticleList = () => {
  const articleList = [
    {
      id: '1',
      copyRight: '한겨레',
      mainCategory: '경제',
      subCategory: '금융·증권',
      time: '2024-01-08 05:00',
      title: '은행 의결권 다 합쳐도 33%…태영 채권단의 표심은 어디로',
      image: 'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/original/2024/0107/20240107502017.jpg',
      imageCaption: '7일 서울 영등포구 태영건설 본사. 연합뉴스',
      content: '내용1',
      summary: '요약 내용1',
      url: 'https://www.hani.co.kr/arti/economy/finance/1123350.html',
    },
    {
      id: '2',
      copyRight: '한겨레',
      mainCategory: '사회',
      subCategory: '사회일반',
      time: '2024-03-15 09:30',
      title: '한겨레 뉴스 기사 제목',
      image: 'https://example.com/image2.jpg',
      imageCaption: '이미지 캡션2',
      content: '내용2',
      summary: '요약 내용2',
      url: 'https://www.hani.co.kr/arti/society/general/123456.html',
    },
    {
      id: '3',
      copyRight: '한겨레',
      mainCategory: '정치',
      subCategory: '국회·정당',
      time: '2024-03-20 14:20',
      title: '국회에서 토론이 벌어졌습니다.',
      image: 'https://example.com/image3.jpg',
      imageCaption: '이미지 캡션3',
      content: '내용3',
      summary: '요약 내용3',
      url: 'https://www.hani.co.kr/arti/politics/assembly/789012.html',
    },
    {
      id: '4',
      copyRight: '한겨레',
      mainCategory: '국제',
      subCategory: '미국',
      time: '2024-03-20 16:40',
      title: '미국의 새로운 경제 정책 발표',
      image: 'https://example.com/image4.jpg',
      imageCaption: '이미지 캡션4',
      content: '내용4',
      summary: '요약 내용4',
      url: 'https://www.hani.co.kr/arti/international/usa/567890.html',
    },
    {
      id: '5',
      copyRight: '한겨레',
      mainCategory: '문화',
      subCategory: '영화',
      time: '2024-03-20 18:00',
      title: '올해의 인기 영화 상 수상작 발표',
      image: 'https://example.com/image5.jpg',
      imageCaption: '이미지 캡션5',
      content: '내용5',
      summary: '요약 내용5',
      url: 'https://www.hani.co.kr/arti/culture/movie/234567.html',
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isToggleOn, setIsToggleOn] = useState(false);

  // 스텝과 스텝 사이의 프로그래스 바 선의 너비를 계산에서 너비만큼씩 채워지게 할 것임
  const filledLineWidth = `${(currentStep / (articleList.length - 1)) * 100}%`;

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const toggleHandler = () => {
    setIsToggleOn((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-col items-start w-full">
        {/* articleListContainer */}
        <div className="flex flex-col items-start w-full gap-2 p-5 text-white rounded-t-lg bg-gradient-to-br from-purple-400 to-indigo-500">
          <div className="text-lg">#1</div>
          <div className="relative flex items-center justify-center w-full py-4 border-4 border-gray-500">
            <div>
              {/* 프로그래스바 전체 컨테이너 */}
              <div className="relative w-full px-5">
                <div className="relative w-full h-1 bg-gray-200">
                  {/* 프로그래스바 채워진 선 */}
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out bg-indigo-700"
                    style={{ width: filledLineWidth }}
                  />
                  {/* 프로그래스바 원들 */}
                  {articleList.map((_, i) => (
                    <div
                      key={i}
                      className={`absolute top-0.5 z-10 flex items-center justify-center w-4 h-4 transform -translate-y-1/2 bg-white  rounded-full ${i <= currentStep ? 'bg-indigo-700' : 'bg-indigo-200'}`}
                      style={{ left: `calc(${(100 / (articleList.length - 1)) * i}%)` }}
                      onClick={() => goToStep(i)}
                      onKeyPress={(e) => e.key === 'Enter' && goToStep(i)}
                      role="button"
                      tabIndex={0}
                    />
                  ))}
                </div>
                {/* 프로그래스바 원 아래 설명 */}
                <div className="flex justify-between w-full mt-2">
                  {articleList.map((article, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => goToStep(i)}
                        onKeyPress={(e) => e.key === 'Enter' && goToStep(i)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className={`mt-2  ${i === currentStep ? 'text-indigo-700' : 'text-white'}`}>
                          {article.title.length > TITLE_LENGTH_LIMIT
                            ? `${article.title.substring(0, 10)}...`
                            : article.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* articleDetailContainer */}
        <div className="flex flex-col items-center w-full rounded-b-lg bg-gradient-to-br from-purple-200 to-indigo-300 bg-opacity-50/50">
          <div
            className={`w-full bg-white rounded-b-lg transition-opacity transition-height duration-700 overflow-hidden ${
              isToggleOn ? 'opacity-100 h-auto' : 'opacity-0 h-0'
            }`}
          >
            <div className="flex flex-row items-center justify-between w-full gap-3 p-2 border-4 border-orange-500">
              <div>
                <div>{articleList[currentStep].title}</div>
                <div>대분류 : {articleList[currentStep].mainCategory}</div>
                <div>중분류 : {articleList[currentStep].subCategory}</div>
                <div>작성일 : {articleList[currentStep].time}</div>
                <img src={articleList[currentStep].image} alt={articleList[currentStep].imageCaption} />
                <div>내용 : {articleList[currentStep].content}</div>
                <div>요약 : {articleList[currentStep].summary}</div>
                <div>
                  출처 : {articleList[currentStep].copyRight}, {articleList[currentStep].url}
                </div>
                {/* 여기에 북마크 여부도 넣어야 함 */}
              </div>
            </div>
            {/* 이전/다음 버튼 */}
            <div className="flex justify-between border-4 border-blue-900">
              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
              >
                {currentStep === 0 ? '첫 기사' : '이전 기사'}
              </button>
              <button
                className="px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, articleList.length - 1))}
                disabled={currentStep === articleList.length - 1}
              >
                {currentStep === articleList.length - 1 ? '마지막 기사' : '다음 기사'}
              </button>
            </div>
          </div>

          <button
            className="flex flex-col items-center w-full py-3 text-white rounded-b-lg cursor-pointer"
            onClick={toggleHandler}
          >
            {isToggleOn ? '^' : 'v'} {/* 토글 아이콘 표시 */}
          </button>
        </div>
      </div>
    </>
  );
};

export default RelatedArticleList;
