import { create } from 'zustand';
import { useGameModalStore, useGameItemStore } from './gameStore.jsx';

export const useQuizStore = create((set) => ({
  quizzes: [],
  setQuiz: (quizObject) => set({ quizzes: quizObject }),
}));

export const useHitsCountStore = create((set) => ({
  hitsCount: 0,
  setHitsCount: () => set((state) => ({ hitsCount: state.hitsCount + 1 })),
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

export const useClueStateStore = create((set) => ({
  showClueState: false,
  setShowClueState: () => set((state) => ({ showClueState: !state.showClueState })),
}));

export const handleAnswerCheck = (inputValue, answer) => {
  const hitsCountStore = useHitsCountStore.getState();
  const answerCheckStore = useAnswerCheckStore.getState();
  const gameModalStore = useGameModalStore.getState();
  const gameItemStore = useGameItemStore.getState();

  if (inputValue === answer) {
    hitsCountStore.setHitsCount();
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
