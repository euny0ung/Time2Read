import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  quiz: '',
  setQuiz: (quizObject) => set({ quiz: quizObject }),
}));

export const useBooleanStore = create((set) => ({
  booleanState: false,
  setBooleanState: () => set((state) => ({ booleanState: !state.booleanState })),
}));
