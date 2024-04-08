import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

// 로그인 전 페이지 경로 저장
export const usePreLoginPathStore = create(
  devtools(
    persist(
      (set) => ({
        preLoginPath: '/',
        setPreLoginPath: (path) => set({ preLoginPath: path }),
        resetPreLoginPath: () => set({ preLoginPath: '/' }),
      }),
      { name: 'usePreLoginPathStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);

// 로그인 전 상태 저장 (스크롤 위치, 문제 번호, 기사 인덱스)
export const usePreLoginStateStore = create(
  devtools(
    persist(
      (set) => ({
        scrollPosition: 0, // 기존 스크롤 위치 상태
        openedQuiz: null, // { quizNumber: 0, articleId: 0 } // 기존에 보고 있던 문제 번호와 기사 인덱스
        setScrollPosition: (position) => set({ scrollPosition: position }),
        setOpenedQuiz: (quiz) => set({ openedQuiz: quiz }),
        reset: () => set({ scrollPosition: 0, openedQuiz: null }),
      }),
      { name: 'usePreLoginStateStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);
