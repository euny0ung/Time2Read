import { useNavigate } from 'react-router-dom';
import { useGameModalStore } from '../../stores/game/gameStore.jsx';

const GameOverModal = () => {
  const { isOver, openGameOverModal, setOpenGameOverModal, setGameOver } = useGameModalStore();
  const navigate = useNavigate();

  const closeModal = () => {
    setOpenGameOverModal(false);
  };

  const moveToResult = () => {
    navigate('/result');
  };

  return (
    <>
      <div
        className="h-screen w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
        style={{ width: '1480px', height: '824px', overflowY: 'auto' }}
      >
        <button onClick={moveToResult}>결과 페이지로 이동하기</button>
      </div>
    </>
  );
};

export default GameOverModal;
