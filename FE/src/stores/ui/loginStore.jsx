import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

// 로그인 관련 상태 관리 스토어
const usePreLoginPathStore = create(
  devtools(
    persist(
      (set) => ({
        // 로그인 전 페이지 경로 저장
        preLoginPath: '/',
        setPreLoginPath: (path) => set({ preLoginPath: path }),
        resetPreLoginPath: () => set({ preLoginPath: '/' }),
      }),
      { name: 'pre-login-path', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);

export default usePreLoginPathStore;
