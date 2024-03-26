import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYearSummary } from '../apis/resultApi.jsx';
import ResultButton from '../components/commons/buttons/ResultButton.jsx';
import TranslucentContainer from '../components/commons/containers/TranslucentContainer.jsx';
import WhiteContainer from '../components/commons/containers/WhiteContainer.jsx';
import ResultContent from '../components/commons/ResultContent.jsx';
import ResultTitle from '../components/commons/ResultTitle.jsx';
import Articles from '../components/result/Articles.jsx';
import Keyword from '../components/result/Keyword.jsx';
import { useGameResultStore, useGameModalStore } from '../stores/game/gameStore.jsx';

const ResultPage = () => {
  const navigate = useNavigate();

  console.log('resultPAge 입장');

  const { gameResult } = useGameResultStore(); // 게임 결과 : 정답 수, 오답 수, 타임 어택 시간
  const [keywordData, setKeywordData] = useState([]);
  const topboxRef = useRef(null); // topbox의 ref
  const leftboxRef = useRef(null);
  const rightboxRef = useRef(null);
  const [rightboxWidth, setRightboxWidth] = useState('0px');
  const [rightboxHeight, setRightboxHeight] = useState('0px');
  const [keywordWidth, setKeywordWidth] = useState(0);
  const [keywordHeight, setKeywordHeight] = useState(0);
  const { setOpenGameOverModal, setGameOver } = useGameModalStore();

  useEffect(() => {
    getYearSummary(2023)
      .then((data) => {
        setKeywordData(data.result);
        console.log('Year Summary Data:', data.result);
      })
      .catch((error) => {
        console.error('Error requesting year summary:', error);
      });
  }, []);

  const navigateToLandingPage = () => {
    setGameOver(false);
    setOpenGameOverModal(false);
    navigate('/');
  };

  const navigateToMyPage = () => {
    navigate('/user');
  };

  // 너비 및 높이 동적 조절
  const handleResize = () => {
    requestAnimationFrame(() => {
      if (topboxRef.current && leftboxRef.current && rightboxRef.current) {
        const newWidth = topboxRef.current.offsetWidth / 2; // topbox 너비에 따라 leftbox와 rightbox 너비 조절
        // let maxHeight = 0;
        // if (leftboxRef.current.offsetHeight < rightboxRef.current.offsetHeight) {
        let maxHeight = Math.max(leftboxRef.current.offsetHeight, rightboxRef.current.offsetHeight); // leftbox와 rightbox 높이 비교 후 더 큰 값으로 설정
        // }

        if (newWidth !== rightboxWidth) {
          setRightboxWidth(`${newWidth}px`);
          setKeywordWidth(newWidth);
        }

        // 창 너비에 따른 높이 조절 로직. 768px 이하일 때 (tailwind에서 md 기준이 768px임) maxHeight가 작아지도록
        if (window.innerWidth < 768) {
          maxHeight /= 2;
        }

        if (maxHeight !== rightboxHeight) {
          setRightboxHeight(`${maxHeight}px`); // 더 큰 높이로 rightboxHeight 업데이트
          setKeywordHeight(maxHeight * 0.7); // Keyword 컴포넌트의 높이도 maxHeight로 설정
        }
      }
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 등록

    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-purple-200 to-blue-200">
        <div className="w-full max-w-[90%] lg:max-w-[60%] md:max-w-[75%] mx-auto ">
          <h1>결과페이지</h1>
          <div className="relative flex flex-col items-center w-full gap-4 border-4 border-red-500 ">
            {/* topbox */}
            <TranslucentContainer>
              <div
                className="flex flex-col items-center w-full gap-6 border-4 border-blue-500 md:flex-row"
                ref={topboxRef}
              >
                {/* leftbox */}
                <div
                  className="flex flex-col items-center justify-center w-full gap-6 md:w-2/6"
                  style={{ rightboxWidth }}
                  ref={leftboxRef}
                >
                  {/* 맞은 개수 통계 */}
                  <WhiteContainer>
                    <ResultTitle title={'맞은 개수 통계'} />
                    <ResultContent>
                      <div className="flex items-center w-full justify-evenly">
                        총 문제 수 {gameResult.correct + gameResult.incorrect} 개
                      </div>
                      <div>맞은 개수 {gameResult.correct} 개</div>
                      <div>틀린 개수 {gameResult.incorrect} 개</div>
                    </ResultContent>
                  </WhiteContainer>
                  {/* 타임 어택 시간 */}
                  <WhiteContainer>
                    <ResultTitle title={'타임 어택 시간'} />
                    <ResultContent>
                      {gameResult.timeAttackTime ? <div>{gameResult.timeAttackTime}</div> : <div> 00:00:00 </div>}
                    </ResultContent>
                  </WhiteContainer>
                </div>
                {/* rightbox */}
                <div
                  className="flex justify-center w-full h-full md:w-4/6"
                  style={{ rightboxWidth, rightboxHeight }}
                  ref={rightboxRef}
                >
                  <WhiteContainer>
                    <ResultTitle title={'키워드'} />
                    <Keyword data={keywordData} width={keywordWidth} height={keywordHeight} />
                  </WhiteContainer>
                </div>
              </div>
            </TranslucentContainer>
            {/* buttonbox */}
            <div className="flex flex-col items-center w-full gap-6 justify-evenly md:flex-row">
              <button onClick={navigateToLandingPage}>
                <ResultButton>
                  <ResultTitle title={'다시 시계토끼 쫓아가기'} />
                </ResultButton>
              </button>
              <button onClick={navigateToMyPage}>
                <ResultButton>
                  <ResultTitle title={'내 정보 더 자세하게 보기'} />
                </ResultButton>
              </button>
            </div>
            {/* relatednewsbox */}
            <TranslucentContainer>
              <ResultTitle title={'과거와 연결된 기사'} />
              <Articles />
            </TranslucentContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
