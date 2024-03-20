import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useGameResultStore = create(
  devtools((set) => ({
    gameResult: {
      correct: 0, // 맞은 개수
      incorrect: 0, // 틀린 개수
      timeAttackTime: '', // 타임 어택 시간
    },
    setGameResult: (gameResult) => set({ gameResult }),
  })),
);

export default useGameResultStore;
