import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  quizzes: [],
  setQuiz: (quizObject) => set({ quizzes: quizObject }),
}));

export const useHitsCountStore = create((set) => ({
  hitsCount: 0,
  setHitsCount: () => set((state) => ({ hitsCount: state.hitsCount + 1 })),
}));
