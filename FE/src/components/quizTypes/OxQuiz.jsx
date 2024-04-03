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
    <div className="flex items-center justify-center w-full h-full">
      {oxButtons.map((oxButton, index) => (
        <button
          key={index}
          type="button"
          className={`w-[150px] h-[80px] mr-5 ${index === 0 ? 'bg-primary-red-3 hover:bg-primary-red-4 hover:scale-105' : 'bg-primary-indigo hover:bg-indigo-800 hover:scale-105'} hover:${index === 0 ? 'bg-ox-1' : 'bg-ox-3'} flex justify-center items-center rounded-2xl`}
          onClick={() => handleOxSelect(oxButton.value)}
        >
          <p className="text-4xl text-white">{oxButton.label}</p>
        </button>
      ))}
    </div>
  );
};

export default OxQuiz;
