import ResultButton from '../commons/buttons/ResultButton.jsx';
import ResultTitle from '../commons/ResultTitle.jsx';

const PageMovingButton = ({ navigateToLandingPage, navigateToMyPage }) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 flex flex-col w-full gap-6 justify-evenly">
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
    </>
  );
};

export default PageMovingButton;
