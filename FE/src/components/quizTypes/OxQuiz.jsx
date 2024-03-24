import { handleAnswerCheck } from '@stores/game/quizStore';

// OX 컴포넌트
const OxQuiz = ({ answer }) => {
  return (
    <div>
      <button
        type="button"
        className="border-2 border-indigo-500/50"
        onClick={(event) => handleAnswerCheck(event.target.value, answer)}
        value="O"
      >
        O
      </button>
      <button
        type="button"
        className="border-2 border-indigo-500/50"
        onClick={(event) => handleAnswerCheck(event.target.value, answer)}
        value="X"
      >
        X
      </button>
    </div>
  );
};

export default OxQuiz;
