import { useEffect } from 'react';
import { checkGameYearStore } from '@stores/game/gameStore';
import { useQuizStore } from '@stores/game/quizStore.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useQuizApiHandler = (selected) => {
  const navigate = useNavigate();
  const { setQuiz } = useQuizStore();

  // API 호출, 페이지 이동, 퀴즈 데이터 저장
  const handleQuizApi = () => {
    console.log('API 호출..');
    axios
      .get(`${import.meta.env.VITE_BASE_API}/game/${selected}/first`)
      .then((response) => {
        setQuiz(response.data.result);
        console.log(response);
        navigate('/game');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return handleQuizApi;
};

// 첫번째 문제 모달창이 뜨면 두번째 API 렌더링
export const useSecondQuizApi = () => {
  const { quizzes, setQuiz } = useQuizStore();
  const gameYear = checkGameYearStore((state) => state.gameYear);

  useEffect(() => {
    if (quizzes.length < 9) {
      console.log('두번째 API 호출..');
      axios
        .get(`${import.meta.env.VITE_BASE_API}/game/${gameYear}/second`)
        .then((response) => {
          const updatedQuizzes = [...quizzes, ...response.data.result];
          setQuiz(updatedQuizzes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [quizzes, setQuiz]);
};

export const useTestQuizApiHandler = (selected) => {
  const navigate = useNavigate();
  const { setQuiz } = useQuizStore();

  const handleTestQuizApi = () => {
    console.log('API 호출..');
    axios
      // .get(`${import.meta.env.VITE_BASE_API}/game/${selected}/first`)
      .get(`${import.meta.env.VITE_BASE_API}/game/${selected}`)
      .then((response) => {
        setQuiz(response.data.result);
        console.log(response);
        navigate('/game');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return handleTestQuizApi;
};
