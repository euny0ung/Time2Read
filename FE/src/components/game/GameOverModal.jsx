import { useNavigate } from 'react-router-dom';

const GameOverModal = () => {
  const navigate = useNavigate();

  const moveToResult = () => {
    navigate('/result');
  };

  return (
    <>
      <div
        className="h-screen w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
        style={{ width: '80rem', height: '45rem', overflowY: 'auto' }}
      >
        <button
          onClick={moveToResult}
          className="absolute bg-white hover:bg-gray-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          결과 페이지로 이동하기
        </button>
      </div>
    </>
  );
};

export default GameOverModal;
