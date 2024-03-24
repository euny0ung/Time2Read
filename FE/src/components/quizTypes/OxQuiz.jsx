import { handleAnswerCheck } from '@stores/game/quizStore';

const oxButtons = ['O', 'X'];

// OX 컴포넌트
const OxQuiz = ({ answer }) => {
  return (
    <div>
      {oxButtons.map((oxButton, index) => (
        <button
          key={index}
          type="button"
          className="border-2 border-indigo-500/50"
          onClick={(event) => handleAnswerCheck(event.target.value, answer)}
          value={oxButton}
        >
          {oxButton}
        </button>
      ))}
    </div>
  );
};

export default OxQuiz;
