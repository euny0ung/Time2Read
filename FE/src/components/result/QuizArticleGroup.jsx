import { useState, useRef, useEffect } from 'react';

import AfterScrap from '../../assets/scrap/afterScrap.png';
import BeforeScrap from '../../assets/scrap/beforeScap.png';
import CloseToggle from '../../assets/toggle/closeToggle.png';
import OpenToggle from '../../assets/toggle/openToggle.png';

import ImageComponent from '../commons/ImageComponent.jsx';
import Tooltip from '../commons/Tooltip.jsx';

// 특정 문제에 대한 관련 기사 그룹을 렌더링
const QuizArticleGroup = ({ relatedArticles, num }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const [titleMaxWidth, setTitleMaxWidth] = useState('0px'); // 각 타이틀의 maxWidth를 위한 상태

  const containerRef = useRef(null); // QuizArticleGroup Container의 ref

  const relatedArticle = relatedArticles[currentStep];
  const [firstArticle] = relatedArticles; // 가장 초기의 기사
  const mostRecentArticle = relatedArticles[relatedArticles.length - 1]; // 가장 최근의 기사

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const hadleToggle = () => {
    setIsToggleOn((prevState) => !prevState);
  };

  const handleScrap = () => {
    setIsScraped((prevState) => !prevState);
  };

  const handleResize = () => {
    if (containerRef.current) {
      const progressBarWidth = containerRef.current.offsetWidth * 0.6; // 프로그레스바 너비 = 컨테이너의 60%
      setTitleMaxWidth(`${progressBarWidth / relatedArticles.length}px`); // 프로그레스바 너비를 relatedArticles.length로 나누어 각 기사 타이틀의 maxWidth를 계산
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 등록

    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [relatedArticles.length]);

  return (
    <>
      <div className="flex flex-col items-start w-full" ref={containerRef}>
        {/* RelatedArticles Container */}
        <div className="flex flex-col items-start w-full gap-2 p-5 text-white rounded-t-lg bg-gradient-to-br from-purple-400 to-indigo-500 ">
          {/* 문제번호 */}
          <div className="text-lg">#{num}</div>
          {/* 가장 초기의 기사 + 프로그래스바 + 가장 최근의 기사 */}
          <div className="flex flex-row items-center justify-between w-full">
            {/* 가장 초기의 기사 */}
            <div className="flex justify-center" style={{ maxWidth: '20%' }}>
              <ImageComponent src={firstArticle.image} alt={firstArticle.imageCaption} width={150} />
            </div>
            {/* 프로그래스바 전체 컨테이너 */}
            <div className="relative" style={{ maxWidth: '60%' }}>
              {/* 프로그래스바 원 위에 설명 - 연도 */}
              <div className="flex justify-between w-full ">
                {relatedArticles.map((article, i) => {
                  return (
                    <Tooltip
                      key={article.id}
                      text={article.title}
                      image={<ImageComponent src={article.image} alt={article.imageCaption} />}
                    >
                      <div
                        key={article.id}
                        className={`truncate cursor-pointer ${i === currentStep ? 'text-indigo-700' : 'text-white'}`}
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
                        {article.time.substring(0, 4)}
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
              {/* 프로그래스바 선 및 원 */}
              <div className="relative flex justify-between h-1 m-4 bg-gray-200">
                {/* 프로그래스바 채워진 선 - tailwind는 동적 조절이 힘들어서 인라인 스타일에서 width 속성 설정함 */}
                <div
                  className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out bg-indigo-700"
                  style={{ width: `calc(${(currentStep / (relatedArticles.length - 1)) * 100}%)` }}
                />
                {/* 프로그래스바 원들 */}
                {relatedArticles.map((article, i) => (
                  <Tooltip
                    key={article.id}
                    text={article.title}
                    image={<ImageComponent src={article.image} alt={article.imageCaption} />}
                  >
                    <div
                      key={article.id}
                      className={`absolute top-0.5 z-10 flex items-center justify-center w-4 h-4 transform -translate-y-1/2 rounded-full ${i <= currentStep ? 'bg-indigo-700' : 'bg-indigo-200'}`}
                      style={{
                        left: `calc(${(i / (relatedArticles.length - 1)) * 100}% - 0.5rem)`,
                      }}
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
                    />
                  </Tooltip>
                ))}
              </div>
              {/* 프로그래스바 원 아래 설명 - 타이틀 */}
              <div className="flex justify-between w-full">
                {relatedArticles.map((article, i) => {
                  return (
                    <Tooltip
                      key={article.id}
                      text={article.title}
                      image={<ImageComponent src={article.image} alt={article.imageCaption} />}
                    >
                      <div
                        key={article.id}
                        className={`truncate cursor-pointer flex-grow flex-shrink ${i === currentStep ? 'text-indigo-700' : 'text-white'}`}
                        style={{ maxWidth: titleMaxWidth }}
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
                        {article.title}
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
            {/* 가장 최근의 기사 */}
            <div className="flex justify-center" style={{ maxWidth: '20%' }}>
              <ImageComponent src={mostRecentArticle.image} alt={mostRecentArticle.imageCaption} width={150} />
            </div>
          </div>
        </div>
        {/* ArticleDetail Container */}
        <div className="flex flex-col items-center w-full rounded-b-lg bg-gradient-to-bl from-indigo-300 to-purple-300 ">
          <div
            className={`w-full bg-white rounded-b-lg transition-opacity transition-height duration-700 overflow-hidden ${
              isToggleOn ? 'opacity-100 h-auto' : 'opacity-0 h-0'
            }`}
          >
            <div className="p-5">
              <div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-xl font-bold">{relatedArticle.title}</div>
                  <button
                    onClick={handleScrap}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleScrap();
                      }
                    }}
                    className="focus:outline-none"
                  >
                    <img className="h-8" src={isScraped ? AfterScrap : BeforeScrap} alt="Scrap Button" />
                  </button>
                </div>
                <div>대분류 : {relatedArticle.mainCategory}</div>
                <div>중분류 : {relatedArticle.subCategory}</div>
                <div>작성일 : {relatedArticle.time}</div>
                <ImageComponent src={relatedArticle.image} alt={relatedArticle.imageCaption} width={400} />
                <div>내용 : {relatedArticle.content}</div>
                <div>요약 : {relatedArticle.summary}</div>
                <div>
                  출처 : {relatedArticle.copyRight}, {relatedArticle.url}
                </div>
              </div>

              {/* 이전/다음 버튼 */}
              <div className="flex justify-between mt-3">
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
          </div>
          {/* 토글 버튼 */}
          <button className="flex flex-col items-center w-full py-3 rounded-b-lg cursor-pointer" onClick={hadleToggle}>
            <img className="h-4" src={isToggleOn ? CloseToggle : OpenToggle} alt="Toggle Icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizArticleGroup;
