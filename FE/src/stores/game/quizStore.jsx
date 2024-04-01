import { create } from 'zustand';
import {
  useGameModalStore,
  useGameItemStore,
  useGameResultStore,
  useChallengedArticleStore,
  checkGameSuccessStore,
} from './gameStore.jsx';

export const useQuizStore = create((set) => ({
  quizzes: [],
  setQuiz: (quizObject) => set({ quizzes: quizObject }),
}));

// 맞은 카테고리 개수
export const useHitsCategoryStore = create((set) => ({
  hitsCategory: { POLITICS: 0, SOCIETY: 0, ECONOMY: 0, INTERNATIONAL: 0, CULTURE: 0, SPORTS: 0 },
  setHitsCategory: (category) =>
    set((state) => ({ hitsCategory: { ...state.hitsCategory, [category]: state.hitsCategory[category] + 1 } })),
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

// 퀴즈의 힌트 클릭여부 관리
export const useClueIndexStore = create((set) => ({
  cluesClicked: {},
  toggleClueClick: (quizIndex, hintIndex) =>
    set((state) => {
      const key = `${quizIndex}-${hintIndex}`;
      const updatedcluesClicked = { ...state.cluesClicked, [key]: !state.cluesClicked[key] };
      return { cluesClicked: updatedcluesClicked };
    }),
}));

export const useClueStateStore = create((set) => ({
  showClueState: false,
  setShowClueState: () => set((state) => ({ showClueState: !state.showClueState })),
}));

export const handleAnswerCheck = (inputValue, answer, mainCategory, dispatch, id) => {
  const { gameResult, setGameResult } = useGameResultStore.getState();
  const answerCheckStore = useAnswerCheckStore.getState();
  const gameModalStore = useGameModalStore.getState();
  const gameItemStore = useGameItemStore.getState();
  const hitsCategoryStore = useHitsCategoryStore.getState();
  const { setChallengeArticlesIdList } = useChallengedArticleStore.getState();
  const { setIsSucceed } = checkGameSuccessStore.getState();

  setChallengeArticlesIdList(id);

  console.log(inputValue, answer);

  if (inputValue === answer) {
    const prevResult = { ...gameResult };
    prevResult.correct += 1;
    prevResult.incorrect = 10 - prevResult.correct;
    setGameResult(prevResult);
    if (prevResult.correct === 10) {
      setIsSucceed(true);
    }
    hitsCategoryStore.setHitsCategory(mainCategory);
    gameModalStore.setBumped(false);
    gameModalStore.setOpenQuizModal(false);
    answerCheckStore.actions.setResultState('정답입니다');
    answerCheckStore.actions.setQuizIndex();
  } else {
    dispatch({ type: 'RESET_INPUT' });
    gameModalStore.setBumped(false);
    answerCheckStore.actions.setResultState('오답입니다');
    gameItemStore.decreaseLifeCount();
  }
  answerCheckStore.actions.setOpenAnswerResult();
};
