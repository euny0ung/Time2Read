import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// -------------- 객체 템플릿 --------------
// 유저가 게임을 시작할 때 받는 기사 템플릿 객체
const challengeArticleTemplate = {
  id: '',
  title: '',
  content: '',
  image: '',
  imageCaption: '',
  quiz: {
    type: '',
    blurContent: '',
    blurSummary: '',
    answer: '',
    clue: {
      word: '',
      description: '',
    },
  },
};

// 기사 템플릿 객체
const articleTemplate = {
  id: '',
  copyRight: '',
  mainCategory: '',
  subCategory: '',
  time: '',
  title: '',
  image: '',
  imageCaption: '',
  content: '',
  summary: '',
  url: '',
};

// -------------- 상태 관리 --------------

// 유저가 게임에서 도전한(정답,오답 모두 포함한) 문제의 기사 아이디들
export const useChallengedArticleStore = create(
  devtools((set) => ({
    challengeArticlesIdList: [challengeArticleTemplate.id],
    setChallengeArticlesIdList: (challengeArticlesIdList) => set({ challengeArticlesIdList }),
  })),
);

// 게임 결과 : 정답 수, 오답 수, 타임 어택 시간
export const useGameResultStore = create(
  devtools((set) => ({
    gameResult: {
      correct: 0, // 정답 수
      incorrect: 0, // 오답 수
      timeAttackTime: '', // 타임 어택 시간
    },
    setGameResult: (gameResult) => set({ gameResult }),
  })),
);
