// [] 시작버튼 클릭시 해당 연도 퀴즈 API 호출
//     [] 넘어오는 퀴즈 데이터 유형은 두가지 (O/X, 단어 뚫기)
//     [] 클라이언트쪽에서는 퀴즈 유형이 ‘단어 뚫기’인 경우 랜덤으로 애너그램, 단어 뚫기 중 선택
// [] 위에서 아래로 떨어지는 효과 구현
// [] 소셜 로그인
//     [] 카카오 로그인 버튼
//     [] 로그인시 로그인 버튼이 ‘마이 페이지’ 버튼으로 변경됨

import { useNavigate } from 'react-router-dom';

const OPTIONS = Array.from({ length: 2024 - 2005 + 1 }, (v, k) => `${2024 - k}`);

const SelectBox = (props) => {
  return (
    <select>
      {props.options.map((option) => (
        <option key={option} value={option} defaultValue={props.defaultValue === option.defaultValue}>
          {option}
        </option>
      ))}
    </select>
  );
};

const useQuizApiHandler = () => {
  const navigate = useNavigate();

  // API 호출, 페이지 이동, 데이터 가공
  const handleQuizApi = () => {
    navigate('/game');
  };

  return handleQuizApi;
};

const LandingPage = () => {
  const handleQuizApi = useQuizApiHandler();

  return (
    <>
      <div>
        <button>카카오 로그인</button>
      </div>
      <div>
        <SelectBox options={OPTIONS} defaultValue="2024" />
      </div>
      <div>
        <button onClick={handleQuizApi}>입장하기</button>
      </div>
    </>
  );
};

export default LandingPage;
