import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

// 스크랩 상태를 관리하는 스토어
const useScrapStore = create(
  devtools(
    persist(
      (set) => ({
        // 기사의 ID를 키로 하고, 스크랩 여부를 값으로 가지는 객체
        scrapStatus: {},

        // 스크랩 상태 토글 함수
        toggleScrap: (articleId) =>
          set((state) => ({
            scrapStatus: {
              ...state.scrapStatus,
              [articleId]: !state.scrapStatus[articleId],
            },
          })),
        resetScrapStatus: () => set({ scrapStatus: {} }),
        initializeScrapStatus: (articleIds) =>
          set({
            scrapStatus: articleIds.reduce(
              (acc, id) => ({
                ...acc,
                [id]: true, // 모든 ID에 대해 true로 초기화
              }),
              {},
            ),
          }),
      }),
      { name: 'useScrapStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);

export default useScrapStore;
