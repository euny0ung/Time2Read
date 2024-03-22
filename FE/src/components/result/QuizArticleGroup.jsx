import React, { useState } from 'react';

const TITLE_LENGTH_LIMIT = 8; // 기사 제목울 특정길이만큼 나타내기

// 특정 문제에 대한 관련 기사 그룹을 렌더링
const QuizArticleGroup = ({ relatedArticles, num }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isToggleOn, setIsToggleOn] = useState(false);

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const toggleHandler = () => {
    setIsToggleOn((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-col items-start w-full">
        {/* RelatedArticles Container */}
        <div className="flex flex-col items-start w-full gap-2 p-5 text-white rounded-t-lg bg-gradient-to-br from-purple-400 to-indigo-500">
          <div className="text-lg">#{num}</div>
          <div className="w-full border-4 border-gray-500 ">
            <div>
              {/* 프로그래스바 전체 컨테이너 */}
              <div className="relative w-full">
                {/* 프로그래스바 원 위에 설명 - 연도 */}
                <div className="flex justify-between w-full mt-2 ">
                  {relatedArticles.map((article, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => {
                          goToStep(i);
                          setIsToggleOn(true);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            goToStep(i);
                            setIsToggleOn(true);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className={`mt-2  ${i === currentStep ? 'text-indigo-700' : 'text-white'}`}>
                          {article.time.substring(0, 4)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* 프로그래스바 선 및 원 */}
                <div className="relative flex justify-between h-1 mx-1 bg-gray-200">
                  {/* 프로그래스바 채워진 선 - tailwind는 동적 조절이 힘들어서 인라인 스타일에서 width 속성 설정함 */}
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out bg-indigo-700"
                    style={{ width: `calc(${(currentStep / (relatedArticles.length - 1)) * 100}%)` }}
                  />
                  {/* 프로그래스바 원들 */}
                  {relatedArticles.map((_, i) => (
                    <div
                      key={i}
                      className={`absolute top-0.5 z-10 flex items-center justify-center w-4 h-4 transform -translate-y-1/2 bg-white rounded-full ${i <= currentStep ? 'bg-blue-700' : 'bg-indigo-200'}`}
                      style={{
                        left: `calc(${(i / (relatedArticles.length - 1)) * 100}% - 0.5rem)`,
                      }}
                      onClick={() => {
                        goToStep(i);
                        setIsToggleOn(true);
                        console.log('i', i, ' currentStep', currentStep);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          goToStep(i);
                          setIsToggleOn(true);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    />
                  ))}
                </div>
                {/* 프로그래스바 원 아래 설명 - 타이틀 */}
                <div className="flex justify-between w-full mt-2">
                  {relatedArticles.map((article, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => {
                          goToStep(i);
                          setIsToggleOn(true);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            goToStep(i);
                            setIsToggleOn(true); // 프로그래스 바 원 엔터 키 입력 시 토글 열림
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className={`mt-2  ${i === currentStep ? 'text-indigo-700' : 'text-white'}`}>
                          {article.title.length > TITLE_LENGTH_LIMIT
                            ? `${article.title.substring(0, TITLE_LENGTH_LIMIT)}...`
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
        {/* RelatedArticleDetail Container */}
        <div className="flex flex-col items-center w-full rounded-b-lg bg-gradient-to-br from-purple-200 to-indigo-300 bg-opacity-50/50">
          <div
            className={`w-full bg-white rounded-b-lg transition-opacity transition-height duration-700 overflow-hidden ${
              isToggleOn ? 'opacity-100 h-auto' : 'opacity-0 h-0'
            }`}
          >
            <div className="flex flex-row items-center justify-between w-full gap-3 p-2 border-4 border-orange-500">
              <div>
                <div>{relatedArticles[currentStep].title}</div>
                <div>대분류 : {relatedArticles[currentStep].mainCategory}</div>
                <div>중분류 : {relatedArticles[currentStep].subCategory}</div>
                <div>작성일 : {relatedArticles[currentStep].time}</div>
                <img src={relatedArticles[currentStep].image} alt={relatedArticles[currentStep].imageCaption} />
                <div>내용 : {relatedArticles[currentStep].content}</div>
                <div>요약 : {relatedArticles[currentStep].summary}</div>
                <div>
                  출처 : {relatedArticles[currentStep].copyRight}, {relatedArticles[currentStep].url}
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
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, relatedArticles.length - 1))}
                disabled={currentStep === relatedArticles.length - 1}
              >
                {currentStep === relatedArticles.length - 1 ? '마지막 기사' : '다음 기사'}
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

export default QuizArticleGroup;
