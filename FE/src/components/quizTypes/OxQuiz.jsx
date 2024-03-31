import { useReducer } from 'react';
import { handleAnswerCheck } from '@stores/game/quizStore';

const oxButtons = [
  { label: 'O', value: 'true' },
  { label: 'X', value: 'false' },
];

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
const OxQuiz = ({ answer, mainCategory, id }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOxSelect = (clickValue) => {
    handleAnswerCheck(clickValue, answer, mainCategory, () => dispatch({ type: 'RESET_INPUT' }), id);
  };

  return (
    <div>
      {oxButtons.map((oxButton, index) => (
        <button
          key={index}
          type="button"
          className="border-2 border-indigo-500/50"
          onClick={() => handleOxSelect(oxButton.value)}
        >
          {oxButton.label}
        </button>
      ))}
    </div>
  );
};

export default OxQuiz;
