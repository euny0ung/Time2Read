const PageMovingButton = ({ navigateToLandingPage, navigateToMyPage }) => {
  return (
    <>
      <div className="fixed z-10 flex flex-col gap-6 right-5 top-5">
        <button onClick={navigateToLandingPage}>
          <div className="flex items-center justify-center px-6 py-3 text-gray-900 rounded-full shadow-xl bg-primary-yellow-0 hover:bg-opacity-80 hover:text-gray-600 focus:bg-opacity-80">
            <div className="text-lg text-center">다시 시계토끼 쫓아가기</div>
          </div>
        </button>
        <button onClick={navigateToMyPage}>
          <div className="flex items-center justify-center px-6 py-3 text-gray-900 rounded-full shadow-xl bg-primary-yellow hover:bg-opacity-80 hover:text-gray-600 focus:bg-opacity-80">
            <div className="text-lg text-center">내 정보 더 자세하게 보기</div>
          </div>
        </button>
      </div>
    </>
  );
};

export default PageMovingButton;
