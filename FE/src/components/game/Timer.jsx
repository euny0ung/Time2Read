import { useEffect } from 'react';
import { useGameResultStore, useGameModalStore } from '../../stores/game/gameStore.jsx';

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainSec = seconds % 60;
  return `${minutes}:${remainSec < 10 ? '0' : ''}${remainSec}`;
};

const Timer = ({ openModal }) => {
  const { gameResult, setGameResult } = useGameResultStore();
  const { isOver, setGameOver } = useGameModalStore();

  let timer;

  useEffect(() => {
    if (isOver) {
      clearInterval(timer);
      return;
    }

    if (!openModal) {
      timer = setInterval(() => {
        const prevGameResult = { ...gameResult };

        prevGameResult.timeAttackTime -= 1;

        setGameResult(prevGameResult);
        if (prevGameResult.timeAttackTime === 0) {
          setGameOver(true);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameResult, setGameResult, isOver, openModal]);

  return (
    <>
      <div className="absolute top-[3%] left-[2%] bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline">
        남은 시간 : {formatTime(gameResult.timeAttackTime)}
      </div>
    </>
  );
};

export default Timer;
