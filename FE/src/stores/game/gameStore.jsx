import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

// 유저가 게임에서 도전한(정답,오답 모두 포함한) 퀴즈의 기사 아이디들 (퀴즈 푼 순서대로 배열에 저장)
export const useChallengedArticleStore = create(
  devtools(
    persist(
      (set) => ({
        challengeArticlesIdList: [],
        setChallengeArticlesIdList: (newId) =>
          set((state) => ({ challengeArticlesIdList: [...state.challengeArticlesIdList, newId] })),
        reset: () => set({ challengeArticlesIdList: [] }),
      }),
      { name: 'useChallengedArticleStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);

// 게임 결과 : 정답 수, 오답 수, 타임 어택 시간
export const useGameResultStore = create(
  devtools(
    persist(
      (set) => ({
        gameResult: {
          correct: 0,
          incorrect: 0,
          timeAttackTime: 600,
        },
        setGameResult: (gameResult) => set({ gameResult }),
        reset: () => set({ gameResult: { correct: 0, incorrect: 0, timeAttackTime: 600 } }),
      }),
      { name: 'useGameResultStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);

export const useGameModalStore = create(
  devtools(
    // persist(
    (set) => ({
      isBumped: false, // 객체와 충돌여부를 확인하는 변수
      openQuizModal: false, // 퀴즈 모달이 열리는지 확인하는 변수
      openGameOverModal: false, // 게임 종료 모달이 열리는지 확인하는 변수
      isOver: false, // 게임 종료 여부를 확인하는 변수
      setBumped: (value) => set({ isBumped: value }),
      setOpenQuizModal: (value) => set({ openQuizModal: value }),
      setOpenGameOverModal: (value) => set({ openGameOverModal: value }),
      setGameOver: (value) => set({ isOver: value }),
      reset: () => set({ isBumped: false, openQuizModal: false, openGameOverModal: false, isOver: false }),
    }),
    //   { name: 'useGameModalStore', storage: createJSONStorage(() => sessionStorage) },
    // ),
  ),
);

export const useGameItemStore = create(
  devtools(
    // persist(
    (set) => ({
      clueCount: 5,
      lifeCount: 3,
      decreaseLifeCount: () => set((state) => ({ lifeCount: Math.max(0, state.lifeCount - 1) })), // 생명 개수 감소
      increaseLifeCount: () => set((state) => ({ lifeCount: Math.min(3, state.lifeCount + 1) })), // 생명 개수 증가
      decreaseClueCount: () => set((state) => ({ clueCount: Math.max(0, state.clueCount - 1) })), // 단서 개수 감소
      increaseClueCount: () => set((state) => ({ clueCount: Math.min(10, state.clueCount + 1) })), // 단서 개수 증가
      reset: () => set({ clueCount: 5, lifeCount: 3 }),
    }),
    //   { name: 'useGameItemStore', storage: createJSONStorage(() => sessionStorage) },
    // ),
  ),
);

export const useVisibilityStore = create(
  devtools(
    // persist(
    (set) => ({
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
    }),
    //   { name: 'useVisibilityStore', storage: createJSONStorage(() => sessionStorage) },
    // ),
  ),
);

export const checkCollidedStore = create(
  devtools(
    // persist(
    (set) => ({
      collidedItem: [],
      setCollidedItem: (value) => set({ collidedItem: value }),
      reset: () => set({ collidedItem: [] }),
    }),
    // { name: 'checkCollidedStore', storage: createJSONStorage(() => sessionStorage) },
    // ),
  ),
);

export const checkGameSuccessStore = create(
  devtools(
    // persist(
    (set) => ({
      // isSucceed가 true면 탈출 성공, false면 탈출 실패
      isSucceed: false,
      setIsSucceed: (value) => set({ isSucceed: value }),
      reset: () => set({ isSucceed: false }),
    }),
    //   { name: 'checkGameSuccessStore', storage: createJSONStorage(() => sessionStorage) },
    // ),
  ),
);

export const checkGameYearStore = create(
  devtools(
    persist(
      (set) => ({
        gameYear: 2024,
        setGameYear: (value) => set({ gameYear: value }),
        reset: () => set({ gameYear: 2024 }),
      }),
      { name: 'checkGameYearStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);

export const useResultDataStore = create(
  devtools(
    persist(
      (set) => ({
        resultData: {},
        setResultData: (data) => set({ resultData: data }),
        reset: () => set({ resultData: {} }),
      }),
      { name: 'useResultDataStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);
