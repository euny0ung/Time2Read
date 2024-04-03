import { useReducer } from 'react';
import { handleAnswerCheck } from '@stores/game/quizStore';

const initialInputState = {
  selected: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_INPUT':
      return { ...initialInputState };
    case 'UPDATE_INPUT':
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

// 객관식 문제에서 엔터 누를 시 정답 체크
const handleEnter = (e, answer, mainCategory, dispatch, id) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleAnswerCheck(e.target.value, answer, mainCategory, () => dispatch({ type: 'RESET_INPUT' }), id);
  }
};

// 단답식 컴포넌트
const ShortAnswerQuiz = ({ answer, mainCategory, id }) => {
  const [state, dispatch] = useReducer(reducer, initialInputState);

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_INPUT', payload: e.target.value });
  };

  return (
    <div className="w-[100%] h-[100%] m-8 flex justify-center items-center">
      <input
        placeholder="정답 입력 후 엔터를 눌러주세요."
        className="w-full h-10 px-4 py-2 border rounded-md border-primary-red focus:outline-none focus:border-red-500"
        value={state.selected}
        onChange={handleChange}
        onKeyDown={(e) => handleEnter(e, answer, mainCategory, dispatch, id)}
      />
    </div>
  );
};

export default ShortAnswerQuiz;
