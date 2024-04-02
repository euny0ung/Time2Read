import { useEffect } from 'react';
import { useQuizStore } from '@stores/game/quizStore.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useQuizApiHandler = (selected) => {
  const navigate = useNavigate();
  const { setQuiz } = useQuizStore.getState();

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
        if (error.response.status === 500) handleQuizApi();
      });
  };

  return handleQuizApi;
};

// 첫번째 문제 모달창이 뜨면 두번째 API 렌더링
export const useSecondQuizApi = (selected) => {
  const { quizzes, setQuiz } = useQuizStore.getState();

  const handleSecondQuizApi = () => {
    useEffect(() => {
      if (quizzes.length < 9) {
        console.log('두번째 API 호출..');
        axios
          .get(`${import.meta.env.VITE_BASE_API}/game/${selected}/second`)
          .then((response) => {
            const updatedQuizzes = [...quizzes, ...response.data.result];
            setQuiz(updatedQuizzes);
          })
          .catch((error) => {
            if (error.response.status === 500) handleSecondQuizApi();
          });
      }
    }, [quizzes, setQuiz]);
  };

  return handleSecondQuizApi;
};

export const useTestQuizApiHandler = (selected) => {
  const navigate = useNavigate();
  const { setQuiz } = useQuizStore.getState();

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
        if (error.response.status === 500) handleTestQuizApi();
      });
  };

  return handleTestQuizApi;
};
