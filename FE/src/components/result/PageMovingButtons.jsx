import ResultButton from '../commons/buttons/ResultButton.jsx';

const PageMovingButton = ({ navigateToLandingPage, navigateToMyPage }) => {
  return (
    <>
      <div className="fixed z-10 flex flex-col gap-6 right-5 top-5">
        <button onClick={navigateToLandingPage}>
          <ResultButton>
            <div className="text-lg text-center">다시 시계토끼 쫓아가기</div>
          </ResultButton>
        </button>
        <button onClick={navigateToMyPage}>
          <ResultButton>
            <div className="text-lg text-center">내 정보 더 자세하게 보기</div>
          </ResultButton>
        </button>
      </div>
    </>
  );
};

export default PageMovingButton;
