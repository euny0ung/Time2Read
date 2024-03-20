import { useState, useEffect } from 'react';
import { fetchYearSummary } from '../apis/resultApi.jsx';
import ResultButton from '../components/commons/buttons/ResultButton.jsx';
import TranslucentContainer from '../components/commons/containers/TranslucentContainer.jsx';
import WhiteContainer from '../components/commons/containers/WhiteContainer.jsx';
import ResultContent from '../components/commons/ResultContent.jsx';
import ResultTitle from '../components/commons/ResultTitle.jsx';
import Keyword from '../components/result/Keyword.jsx';
import RelatedArticleList from '../components/result/RelatedArticleList.jsx';
import useGameResultStore from '../stores/game/gameStore.jsx';

const ResultPage = () => {
  const { gameResult } = useGameResultStore();
  const [keywordData, setKeywordData] = useState([]);

  const news = {
    id: '',
    copyRight: '',
    mainCategory: '',
    subCategory: '',
    time: '',
    title: '',
    image: '',
    imageCaption: '',
    content: '',
    summary: '',
    url: '',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = 2014; // 예시 연도
        const data = await fetchYearSummary(year);
        setKeywordData(data.keywords);
        console.log(keywordData);
      } catch (error) {
        console.error('Error fetching keyword data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-purple-200 to-blue-200">
        <div className="w-full max-w-[60%] mx-auto ">
          <h1>결과페이지</h1>
          <div className="relative flex flex-col items-center w-full gap-4 border-4 border-red-500 ">
            {/* topbox */}
            <TranslucentContainer>
              <div className="flex flex-row items-center w-full gap-6 border-4 border-blue-500">
                {/* leftbox */}
                <div className="flex flex-col justify-center w-2/6 gap-6 ">
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
                <div className="w-4/6 h-full">
                  <WhiteContainer>
                    <ResultTitle title={'키워드'} />
                    <Keyword data={keywordData} width={300} height={200} />
                  </WhiteContainer>
                </div>
              </div>
            </TranslucentContainer>
            {/* buttonbox */}
            <div className="flex items-center w-full justify-evenly">
              <ResultButton>
                <ResultTitle title={'다시 시계토끼 쫓아가기'} />
              </ResultButton>
              <ResultButton>
                <ResultTitle title={'내 정보 더 자세하게 보기'} />
              </ResultButton>
            </div>
            {/* relatednewsbox */}
            <TranslucentContainer>
              <ResultTitle title={'과거와 연결된 기사'} />
              <RelatedArticleList />
            </TranslucentContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
