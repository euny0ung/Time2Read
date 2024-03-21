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

export const useGameModalStore = create((set) => ({
  isBumped: false, // 객체와 충돌여부를 확인하는 변수
  openQuizModal: false, // 퀴즈 모달이 열리는지 확인하는 변수
  openGameOverModal: false, // 게임 종료 모달이 열리는지 확인하는 변수
  setBumped: (value) => set({ isBumped: value }),
  setOpenQuizModal: (value) => set({ openQuizModal: value }),
  setOpenGameOverModal: (value) => set({ openGameOverModal: value }),
}));

export default useGameResultStore;
