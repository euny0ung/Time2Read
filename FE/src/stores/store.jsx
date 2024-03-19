import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  quizzes: [],
  setQuiz: (quizObject) => set({ quizzes: quizObject }),
}));

export const useBooleanStore = create((set) => ({
  booleanState: false,
  setBooleanState: () => set((state) => ({ booleanState: !state.booleanState })),
}));
