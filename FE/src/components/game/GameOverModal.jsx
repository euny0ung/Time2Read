import { useNavigate } from 'react-router-dom';
import GameFail from '@/components/commons/modals/GameFail.jsx';
import GameSuccess from '@/components/commons/modals/GameSuccess.jsx';
import { checkGameSuccessStore } from '@/stores/game/gameStore.jsx';

const GameOverModal = () => {
  const { isSucceed } = checkGameSuccessStore();
  const navigate = useNavigate();

  const moveToResult = () => {
    navigate('/result');
  };

  const showSuccessOrFail = () => {
    if (isSucceed) {
      return <GameSuccess />;
    }
    return <GameFail />;
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-gray-600 bg-opacity-20 backdrop-blur-sm">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-[60vw] h-[80vh] p-8 bg-white rounded-lg shadow-lg shadow-gray-300 min-w-[250px] cursor-default">
            {showSuccessOrFail()}
            <button
              onClick={moveToResult}
              className="z-50 px-10 py-2 mb-6 text-2xl font-semibold text-white transition-transform duration-200 ease-in-out rounded-full shadow bg-primary-teal hover:bg-primary-teal-3 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2"
            >
              결과 페이지로 이동하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOverModal;
