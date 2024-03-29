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
    <div>
      <input
        placeholder="정답을 입력하세요"
        className="border-2 border-black-500 text-stone-950"
        value={state.selected}
        onChange={handleChange}
        onKeyDown={(e) => handleEnter(e, answer, mainCategory, dispatch, id)}
      />
    </div>
  );
};

export default ShortAnswerQuiz;
