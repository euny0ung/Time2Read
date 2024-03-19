import Keyword from '../components/result/Keyword.jsx';
import useGameResultStore from '../stores/game/gameStore.jsx';

const data = [
  { text: 'Hey', value: 100 },
  { text: 'lol', value: 100 },
  { text: 'first impression', value: 100 },
  { text: 'very cool', value: 200 },
  { text: 'duck', value: 100 },
  { text: 'lemon', value: 3000 },
  { text: 'choco', value: 1000 },
  { text: 'lime', value: 700 },
  { text: 'apple', value: 300 },
  { text: 'orange', value: 100 },
];

const ResultPage = () => {
  const { gameResult } = useGameResultStore();

  return (
    <>
      <div className="w-full max-w-[80%] mx-auto">
        <h1>결과페이지</h1>
        <div className="flex flex-col items-center w-full border-4 border-red-500 ">
          {/* topbox */}
          <div className="flex flex-row items-center w-full border-4 border-blue-500">
            {/* leftbox */}
            <div className="flex flex-col justify-center w-full ">
              {/* 맞은 개수 통계 */}
              <div className="border-4 border-violet-500">
                맞은 개수 통계
                <div>총 문제 수 {gameResult.correct + gameResult.incorrect} 개</div>
                <div>맞은 개수 {gameResult.correct} 개</div>
                <div>틀린 개수 {gameResult.incorrect} 개</div>
              </div>
              {/* 타임 어택 시간 */}
              <div className="border-4 border-pink-500">
                타임 어택 시간
                <div>{gameResult.timeAttackTime}</div>
              </div>
            </div>
            {/* rightbox */}
            <div className="flex flex-col items-center w-full h-full border-4 border-green-500">
              <div>키워드</div>
              <Keyword data={data} height={280} />
            </div>
          </div>
          {/* buttonbox */}
          <div className="flex flex-row items-center w-full">
            <div className="border-4 border-blue-500">다시 시계토끼 쫓아가기</div>
            <div className="border-4 border-yellow-500">내 정보 더 자세하게 보기</div>
          </div>
          {/* relatednewsbox */}
          <div className="w-full border-4 border-blue-500 h-[500px]">과거와 연결된 기사</div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
