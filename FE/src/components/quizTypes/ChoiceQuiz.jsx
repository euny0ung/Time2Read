import { handleAnswerCheck } from '@stores/game/quizStore';

const ChoiceQuiz = ({ answer, choices, mainCategory }) => {
  return (
    <div>
      {choices.map((choice, index) => (
        <div key={index}>
          <button
            type="button"
            onClick={(event) => handleAnswerCheck(event.target.value, answer, mainCategory)}
            value={index}
          >
            {index + 1}&ensp;
            {choice}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChoiceQuiz;
