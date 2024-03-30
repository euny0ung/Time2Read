/* 용례
  <PageMovingButton
  onClick={navigateToLandingPage}
  buttonText="다시 시계토끼 쫓아가기"
  buttonColor="primary-red"
/> 
*/

const PageMovingButton = ({ onClick, buttonText, buttonColor }) => {
  const buttonClassName = `flex items-center justify-center px-6 py-3 text-gray-900 rounded-full shadow-xl bg-${buttonColor} hover:bg-opacity-80 hover:text-gray-600 focus:bg-opacity-80`;

  return (
    <button onClick={onClick}>
      <div className={buttonClassName}>
        <div className="text-lg text-center">{buttonText}</div>
      </div>
    </button>
  );
};

export default PageMovingButton;
