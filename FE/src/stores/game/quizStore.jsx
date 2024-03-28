import { create } from 'zustand';
import { useGameModalStore, useGameItemStore, useGameResultStore } from './gameStore.jsx';

export const useQuizStore = create((set) => ({
  quizzes: [],
  setQuiz: (quizObject) => set({ quizzes: quizObject }),
}));

// 맞은 카테고리 개수
export const useHitsCategoryStore = create((set) => ({
  hitsCategory: { POLITICS: 0, SOCIETY: 0, ECONOMY: 0, INTERNATIONAL: 0, CULTURE: 0, SPORTS: 0 },
  setHitsCategory: (category) =>
    set((state) => ({ hitsCategory: { ...state.hitsCategory, [category]: state.hitsCategory[category] + 1 } })),
}));

export const useAnswerCheckStore = create((set) => ({
  openAnswerResult: false,
  resultState: '',
  quizIndex: 0,
  actions: {
    setOpenAnswerResult: () => set((state) => ({ openAnswerResult: !state.openAnswerResult })),
    // setResultState: () => set((result) => ({ resultState: result })), 이렇게 하면 안됨. 객체를 받음
    setResultState: (newResult) => set({ resultState: newResult }),
    setQuizIndex: () => set((state) => ({ quizIndex: state.quizIndex + 1 })),
  },
}));

// 퀴즈의 힌트 클릭여부 관리
export const useClueIndexStore = create((set) => ({
  cluesClicked: Array(10).fill(false),
  toggleClueClick: (index) =>
    set((state) => {
      const updatedcluesClicked = [...state.cluesClicked];
      updatedcluesClicked[index] = !updatedcluesClicked[index];
      return { cluesClicked: updatedcluesClicked };
    }),
}));

export const useClueStateStore = create((set) => ({
  showClueState: false,
  setShowClueState: () => set((state) => ({ showClueState: !state.showClueState })),
}));

export const handleAnswerCheck = (inputValue, answer, mainCategory) => {
  const { gameResult, setGameResult } = useGameResultStore.getState();
  const answerCheckStore = useAnswerCheckStore.getState();
  const gameModalStore = useGameModalStore.getState();
  const gameItemStore = useGameItemStore.getState();
  const hitsCategoryStore = useHitsCategoryStore.getState();

  if (inputValue === answer) {
    const prevResult = { ...gameResult };
    prevResult.correct += 1;
    prevResult.incorrect = 10 - prevResult.correct;
    setGameResult(prevResult);
    hitsCategoryStore.setHitsCategory(mainCategory);
    gameModalStore.setBumped(false);
    gameModalStore.setOpenQuizModal(false);
    answerCheckStore.actions.setResultState('정답입니다');
    answerCheckStore.actions.setQuizIndex();
  } else {
    gameModalStore.setBumped(false);
    answerCheckStore.actions.setResultState('오답입니다');
    gameItemStore.decreaseLifeCount();
  }
  answerCheckStore.actions.setOpenAnswerResult();
};
