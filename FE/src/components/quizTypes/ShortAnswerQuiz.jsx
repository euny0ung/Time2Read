import { handleAnswerCheck } from '@stores/game/quizStore';

// 객관식 문제에서 엔터 누를 시 정답 체크
const handleEnter = (e, answer) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleAnswerCheck(e.target.value, answer);
  }
};

// 단답식 컴포넌트
const ShortAnswerQuiz = ({ answer }) => {
  return (
    <div>
      <input
        placeholder="정답을 입력하세요"
        className="border-2 border-black-500 text-stone-950"
        onKeyDown={(e) => handleEnter(e, answer)}
      />
    </div>
  );
};

export default ShortAnswerQuiz;
