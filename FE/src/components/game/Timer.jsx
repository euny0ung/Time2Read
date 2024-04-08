import { useEffect } from 'react';
import { useGameResultStore, useGameModalStore } from '@/stores/game/gameStore.jsx';

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
      <div className="absolute top-[1rem] left-[1rem] bg-black text-white text-xl font-bold bg-opacity-75 py-3 px-5 rounded-xl focus:outline-none focus:shadow-outline">
        남은 시간 : {formatTime(gameResult.timeAttackTime)}
      </div>
    </>
  );
};

export default Timer;
