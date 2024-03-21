import { create } from 'zustand';

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
  actions: {
    setOpenAnswerResult: () => set((state) => ({ openAnswerResult: !state.openAnswerResult })),
    // setResultState: () => set((result) => ({ resultState: result })), 이렇게 하면 안됨. 객체를 받음
    setResultState: (newResult) => set({ resultState: newResult }),
  },
}));
