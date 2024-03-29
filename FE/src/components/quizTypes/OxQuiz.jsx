import { useReducer } from 'react';
import { handleAnswerCheck } from '@stores/game/quizStore';

const oxButtons = ['O', 'X'];

const initialState = {
  selected: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_INPUT':
      return { ...initialState };
    default:
      return state;
  }
};

// OX 컴포넌트
const OxQuiz = ({ answer, mainCategory }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOxSelect = (oxValue) => {
    handleAnswerCheck(oxValue, answer, mainCategory, () => dispatch({ type: 'RESET_INPUT' }));
  };

  return (
    <div>
      {oxButtons.map((oxButton, index) => (
        <button
          key={index}
          type="button"
          className="border-2 border-indigo-500/50"
          onClick={(event) => handleOxSelect(event.target.value)}
          value={oxButton}
        >
          {oxButton}
        </button>
      ))}
    </div>
  );
};

export default OxQuiz;
