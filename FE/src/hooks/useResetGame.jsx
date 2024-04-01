import {
  useGameResultStore,
  useGameModalStore,
  useGameItemStore,
  useVisibilityStore,
  checkCollidedStore,
  checkGameSuccessStore,
  checkGameYearStore,
  useResultDataStore,
  useChallengedArticleStore,
} from '../stores/game/gameStore.jsx';
import {
  useQuizStore,
  useHitsCategoryStore,
  useAnswerCheckStore,
  useClueIndexStore,
  useClueStateStore,
} from '../stores/game/quizStore.jsx';

const useResetGame = () => {
  const resetGame = () => {
    useGameModalStore.getState().reset();
    useGameResultStore.getState().reset();
    useGameItemStore.getState().reset();
    useVisibilityStore.getState().reset();
    checkCollidedStore.getState().reset();
    checkGameSuccessStore.getState().reset();
    checkGameYearStore.getState().reset();
    useResultDataStore.getState().reset();
    useQuizStore.getState().reset();
    useHitsCategoryStore.getState().reset();
    useAnswerCheckStore.getState().reset();
    useClueIndexStore.getState().reset();
    useClueStateStore.getState().reset();
    useChallengedArticleStore.getState().reset();
  };

  return resetGame;
};

export default useResetGame;
