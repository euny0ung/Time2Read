import { useNavigate } from 'react-router-dom';
import { checkGameSuccessStore } from '../../stores/game/gameStore.jsx';
import GameFail from '../commons/GameFail.jsx';
import GameSuccess from '../commons/GameSuccess.jsx';

const GameOverModal = () => {
  const isSucceed = checkGameSuccessStore((state) => state.isSucceed);
  const navigate = useNavigate();

  const moveToResult = () => {
    navigate('/result');
  };

  const showSuccessOrFail = () => {
    if (isSucceed === true) {
      return <GameSuccess />;
    }
    return <GameFail />;
  };

  return (
    <>
      <div className="w-[36rem] h-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-border flex flex-col items-start justify-center w-full h-auto gap-4 p-6 bg-white bg-opacity-50 border-2 border-white shadow-xl rounded-2xl">
        {showSuccessOrFail()}
        {/* <GameSuccess /> */}
        <button
          onClick={moveToResult}
          className="absolute top-3/4 left-1/2 mt-[4rem] bg-white hover:bg-gray-700 text-gray-700 font-bold py-3 px-7 rounded focus:outline-none focus:shadow-outline transform -translate-x-1/2 -translate-y-1/2 mb-5rem"
        >
          결과 페이지로 이동하기
        </button>
      </div>
    </>
  );
};

export default GameOverModal;
