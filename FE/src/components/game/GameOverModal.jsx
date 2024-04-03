import { useNavigate } from 'react-router-dom';
import { checkGameSuccessStore } from '../../stores/game/gameStore.jsx';
import GameFail from '../commons/GameFail.jsx';
import GameSuccess from '../commons/GameSuccess.jsx';

const GameOverModal = () => {
  const { isSucceed } = checkGameSuccessStore();
  const navigate = useNavigate();

  const moveToResult = () => {
    navigate('/result');
  };

  console.log('isSucceed : ', isSucceed);

  const showSuccessOrFail = () => {
    if (isSucceed) {
      return <GameSuccess />;
    }
    return <GameFail />;
  };

  return (
    <>
      <div className="w-[36rem] h-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-border flex flex-col items-center justify-center gap-4 p-6 bg-white bg-opacity-50 border-2 border-white shadow-xl rounded-2xl">
        {showSuccessOrFail()}
        {/* <GameSuccess /> */}
        <button
          onClick={moveToResult}
          className="absolute top-3/4 px-10 text-2xl py-2 mb-6 shadow font-semibold text-white rounded-full bg-primary-teal hover:bg-primary-teal-3 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2 transition-transform duration-200 ease-in-out"
        >
          결과 페이지로 이동하기
        </button>
      </div>
    </>
  );
};

export default GameOverModal;
