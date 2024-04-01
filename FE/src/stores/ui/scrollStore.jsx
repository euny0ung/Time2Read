import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

// 유저의 스크롤 위치를 저장하고 복원
export const useScrollPositionStore = create(
  devtools(
    persist(
      (set) => ({
        scrollPosition: 0,
        setScrollPosition: (position) => set({ scrollPosition: position }),
        reset: () => set({ scrollPosition: 0 }),
      }),
      { name: 'scroll-position', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);

// 스크롤 위치 저장
export const handleSaveScrollPosition = () => {
  const position = window.scrollY;
  useScrollPositionStore.setState({ scrollPosition: position });
};

// 스크롤 위치 복원
export const handleRestoreScrollPosition = () => {
  const position = useScrollPositionStore.getState().scrollPosition;
  window.scrollTo(0, position);
};
