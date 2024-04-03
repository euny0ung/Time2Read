import { useState, useRef, useEffect } from 'react';

import ArticleDetail from './ArticleDetail.jsx';
import ProgressBar from './ProgressBar.jsx';

import CloseToggle from '../../../assets/toggle/closeToggle.png';
import OpenToggle from '../../../assets/toggle/openToggle.png';

import { usePreLoginStateStore } from '../../../stores/ui/preLoginStore.jsx';

// 특정 문제에 대한 관련 기사 그룹을 렌더링
const QuizArticleGroup = ({ quizNumber, relatedArticles }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isToggleOn, setIsToggleOn] = useState(false);

  const [titleMaxWidth, setTitleMaxWidth] = useState('0px'); // 각 타이틀의 maxWidth를 위한 상태
  const containerRef = useRef(null); // QuizArticleGroup Container의 ref

  const { setScrollPosition, setOpenedQuiz } = usePreLoginStateStore();

  const relatedArticle = relatedArticles[currentStep];

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  // 퀴즈 토글 상태를 변경하는 함수
  const handleQuizToggle = () => {
    setIsToggleOn(!isToggleOn);

    // 토글이 열릴 때 로그인 전 상태 저장
    if (!isToggleOn) {
      setScrollPosition(window.scrollY);
      setOpenedQuiz({ quizNumber, articleIndex: currentStep });
    }
  };

  const handleResize = () => {
    if (containerRef.current) {
      const progressBarWidth = containerRef.current.offsetWidth * 0.6; // 프로그레스바 너비 = 컨테이너의 60%
      setTitleMaxWidth(`${progressBarWidth / relatedArticles.length}px`); // 프로그레스바 너비를 relatedArticles.length로 나누어 각 기사 타이틀의 maxWidth를 계산
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [relatedArticles.length]);

  return (
    <>
      <div
        className={`flex flex-col w-full transition-transform duration-500 ease-in-out QuizArticleGroup ${isToggleOn ? '' : 'hover:scale-[101%]'}`}
        ref={containerRef}
      >
        {/* RelatedArticles Container */}
        <button className="flex flex-col items-center w-full gap-2 p-5 text-white rounded-t-lg bg-gradient-to-r from-primary-red to-primary-teal ">
          {/* 문제번호 */}
          <div className="w-full text-2xl font-bold text-left"># {quizNumber}</div>
          {/* 프로그래스바 전체 컨테이너 */}
          <div className="w-[80%]">
            <ProgressBar
              relatedArticles={relatedArticles}
              currentStep={currentStep}
              goToStep={goToStep}
              setIsToggleOn={setIsToggleOn}
              titleMaxWidth={titleMaxWidth}
            />
          </div>
        </button>
        {/* ArticleDetail Container */}
        <div className="flex flex-col items-center w-full rounded-b-lg bg-gradient-to-r from-primary-red-1 to-primary-teal-2">
          <div
            className={`w-full bg-white rounded-b-lg transition-opacity transition-height duration-700 overflow-hidden ${
              isToggleOn ? 'opacity-100 h-auto' : 'opacity-0 h-0'
            }`}
          >
            <div className="p-5">
              <ArticleDetail
                key={relatedArticle.id}
                quizNumber={quizNumber}
                currentStep={currentStep}
                article={relatedArticle}
              />

              {/* 이전/다음 버튼 */}
              <div className="flex justify-between mt-3">
                <button
                  className="px-4 py-1 text-white rounded bg-primary-red hover:bg-primary-red-3 disabled:opacity-50"
                  onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                  disabled={currentStep === 0}
                >
                  {currentStep === 0 ? '첫 기사' : '이전 기사'}
                </button>
                <button
                  className="px-4 py-1 text-white rounded bg-primary-teal hover:bg-primary-teal-3 disabled:opacity-50"
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, relatedArticles.length - 1))}
                  disabled={currentStep === relatedArticles.length - 1}
                >
                  {currentStep === relatedArticles.length - 1 ? '마지막 기사' : '다음 기사'}
                </button>
              </div>
            </div>
          </div>
          {/* 토글 버튼 */}
          <button
            className="flex flex-col items-center w-full py-3 rounded-b-lg cursor-pointer"
            onClick={handleQuizToggle}
          >
            <img className="h-4" src={isToggleOn ? CloseToggle : OpenToggle} alt="Toggle Icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizArticleGroup;
