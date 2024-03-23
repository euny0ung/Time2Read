import ResultButton from '../components/commons/buttons/ResultButton.jsx';
import TranslucentContainer from '../components/commons/containers/TranslucentContainer.jsx';
import WhiteContainer from '../components/commons/containers/WhiteContainer.jsx';
import ResultContent from '../components/commons/ResultContent.jsx';
import ResultTitle from '../components/commons/ResultTitle.jsx';
import Badges from '../components/my/Badges.jsx';

const UserPage = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-purple-200 to-blue-200">
        <div className="w-full max-w-[60%] mx-auto ">
          <h1>결과페이지</h1>
          <div className="relative flex flex-col items-center w-full gap-4 border-4 border-red-500 ">
            {/* 나의 기록 */}
            <TranslucentContainer>
              <ResultTitle title={'나의 기록'} />
              <div className="flex flex-row items-center w-full gap-6 border-4 border-blue-500">
                <WhiteContainer>
                  <ResultTitle title={'타임어택 기록'} />
                </WhiteContainer>
                <WhiteContainer>
                  <ResultTitle title={'카테고리별 기록'} />
                </WhiteContainer>
                <WhiteContainer>
                  <ResultTitle title={'획득한 뱃지'} />
                  <div className="overflow-y-auto h-[200px]">
                    <Badges />
                  </div>
                </WhiteContainer>
              </div>
            </TranslucentContainer>
            {/* 스크랩한 기사 */}
            <TranslucentContainer>
              <ResultTitle title={'스크랩한 기사'} />
              <WhiteContainer>
                <div className="h-40">스크랩한 기사 컴포넌트 만들어서 여기 넣으면 됨</div>
              </WhiteContainer>
            </TranslucentContainer>
            {/* 다시 시계토끼 쫓아가기 */}
            <div className="flex justify-end w-full">
              <ResultButton>
                <ResultTitle title={'다시 시계토끼 쫓아가기'} />
              </ResultButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
