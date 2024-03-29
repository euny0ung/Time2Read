// [V] 시작버튼 클릭시 해당 연도 퀴즈 API 호출
//     [V] 넘어오는 퀴즈 데이터 유형은 두가지 (O/X, 단어 뚫기)
//     [V] 클라이언트쪽에서는 퀴즈 유형이 ‘단어 뚫기’인 경우 랜덤으로 애너그램, 단어 뚫기 중 선택
// [] 위에서 아래로 떨어지는 효과 구현
// [V] 소셜 로그인
//     [V] 카카오 로그인 버튼
//     [V] 로그인시 로그인 버튼이 ‘마이 페이지’ 버튼으로 변경됨

import { useEffect, useState } from 'react';
import KakaoLogin from '@components/kakao/KakaoLogin';
import { useQuizStore } from '@stores/game/quizStore.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/commons/Dropdown.jsx';

const OPTIONS = Array.from({ length: 2024 - 2005 + 1 }, (v, k) => `${2024 - k}`);

const useQuizApiHandler = (selected) => {
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

const LandingPage = () => {
  const [selected, setSelected] = useState('2024');
  const quizzes = useQuizStore((state) => state.quizzes);

  const handleQuizApi = useQuizApiHandler(selected);

  // test
  useEffect(() => {
    console.log(quizzes);
  }, [quizzes]);

  // 텍스트를 분리하여 각 글자에 <span> 태그 적용
  const title = 'Time 2 Read';
  const animatedTitle = title.split('').map((char, index) => (
    <span key={index} className="letter" style={{ animationDelay: `${0.1 * index}s` }}>
      {char}
    </span>
  ));

  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary-red-1 to-primary-teal-1"
        id="top"
      >
        <div className="px-4 py-2 text-blue-700 bg-blue-100 rounded">
          <KakaoLogin />
        </div>
        <button onClick={handleQuizApi} className="main">
          <div>{animatedTitle}</div>
        </button>
        <Dropdown options={OPTIONS} selected={selected} setSelected={setSelected} />
        <br />
        <button
          onClick={handleQuizApi}
          className="px-4 py-2 mt-4 font-semibold text-white rounded bg-primary-teal hover:bg-primary-teal-3 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2"
        >
          입장하기
        </button>
      </div>
    </>
  );
};

export default LandingPage;
