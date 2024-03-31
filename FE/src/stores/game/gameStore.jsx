import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 유저가 게임에서 도전한(정답,오답 모두 포함한) 퀴즈의 기사 아이디들 (퀴즈 푼 순서대로 배열에 저장)
export const useChallengedArticleStore = create(
  devtools((set) => ({
    challengeArticlesIdList: [],
    setChallengeArticlesIdList: (newId) =>
      set((state) => ({ challengeArticlesIdList: [...state.challengeArticlesIdList, newId] })),
  })),
);

// 게임 결과 : 정답 수, 오답 수, 타임 어택 시간
export const useGameResultStore = create(
  devtools((set) => ({
    gameResult: {
      correct: 0, // 정답 수
      incorrect: 0, // 오답 수
      timeAttackTime: 600, // 타임 어택 시간 초 단위 저장
    },
    setGameResult: (gameResult) => set({ gameResult }),
    reset: () => set({ gameResult: { correct: 0, incorrect: 0, timeAttackTime: 600 } }),
  })),
);

export const useGameModalStore = create((set) => ({
  isBumped: false, // 객체와 충돌여부를 확인하는 변수
  openQuizModal: false, // 퀴즈 모달이 열리는지 확인하는 변수
  openGameOverModal: false, // 게임 종료 모달이 열리는지 확인하는 변수
  isOver: false, // 게임 종료 여부를 확인하는 변수
  setBumped: (value) => set({ isBumped: value }),
  setOpenQuizModal: (value) => set({ openQuizModal: value }),
  setOpenGameOverModal: (value) => set({ openGameOverModal: value }),
  setGameOver: (value) => set({ isOver: value }),
  reset: () => set({ isBumped: false, openQuizModal: false, openGameOverModal: false, isOver: false }),
}));

export const useGameItemStore = create((set) => ({
  clueCount: 5,
  lifeCount: 3,
  decreaseLifeCount: () => set((state) => ({ lifeCount: Math.max(0, state.lifeCount - 1) })), // 생명 개수 감소
  increaseLifeCount: () => set((state) => ({ lifeCount: Math.min(3, state.lifeCount + 1) })), // 생명 개수 증가
  decreaseClueCount: () => set((state) => ({ clueCount: Math.max(0, state.clueCount - 1) })), // 단서 개수 감소
  increaseClueCount: () => set((state) => ({ clueCount: Math.min(10, state.clueCount + 1) })), // 단서 개수 증가
  reset: () => set({ clueCount: 5, lifeCount: 3 }),
}));

export const useVisibilityStore = create((set) => ({
  catVisible: true,
  doorKnobVisible: true,
  dodoBirdVisible: true,
  caterpillarVisible: true,
  cheshireCatVisible: true,
  roseVisible: true,
  flamingoVisible: true,
  cardSoldierVisible: true,
  heartQueenVisible: true,
  rabbitVisible: true,
  setCatVisible: (visible) => set({ catVisible: visible }),
  setDoorKnobVisible: (visible) => set({ doorKnobVisible: visible }),
  setDodoBirdVisible: (visible) => set({ dodoBirdVisible: visible }),
  setCaterpillarVisible: (visible) => set({ caterpillarVisible: visible }),
  setCheshireCatVisible: (visible) => set({ cheshireCatVisible: visible }),
  setRoseVisible: (visible) => set({ roseVisible: visible }),
  setFlamingoVisible: (visible) => set({ flamingoVisible: visible }),
  setCardSoldierVisible: (visible) => set({ cardSoldierVisible: visible }),
  setHeartQueenVisible: (visible) => set({ heartQueenVisible: visible }),
  setRabbitVisible: (visible) => set({ rabbitVisible: visible }),
  reset: () =>
    set({
      catVisible: true,
      doorKnobVisible: true,
      dodoBirdVisible: true,
      caterpillarVisible: true,
      cheshireCatVisible: true,
      roseVisible: true,
      flamingoVisible: true,
      cardSoldierVisible: true,
      heartQueenVisible: true,
      rabbitVisible: true,
    }),
}));

export const checkCollidedStore = create((set) => ({
  collidedItem: [],
  setCollidedItem: (value) => set({ collidedItem: value }),
  reset: () => set({ collidedItem: [] }),
}));

export const checkGameSuccessStore = create((set) => ({
  isSucceed: false,
  setIsSucceed: (value) => set({ isSuccess: value }),
  reset: () => set({ isSuccess: false }),
}));

export const checkGameYearStore = create((set) => ({
  gameYear: 2024,
  setGameYear: (value) => set({ gameYear: value }),
  reset: () => set({ gameYear: 2024 }),
}));

export const useResultDataStore = create((set) => ({
  resultData: {},
  setResultData: (data) => set({ resultData: data }),
  reset: () => set({ resultData: {} }),
}));
