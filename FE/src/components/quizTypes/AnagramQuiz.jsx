import { useState, useEffect, useReducer } from 'react';
import { handleAnswerCheck } from '@stores/game/quizStore';

/* eslint-disable indent */
const inputInitialState = {
  inputAnswer: [],
};

// 애너그램 클릭 상태 변경을 해주는 reducer
const reducer = (state, action) => {
  let updatedInput;

  switch (action.type) {
    case 'ADD_OR_REMOVE_INPUT': {
      const { index, clickValue } = action.payload;

      const isExist = state.inputAnswer.findIndex((answer) => answer.index === index);
      // 이미 존재하는 경우 삭제
      if (isExist >= 0) {
        updatedInput = state.inputAnswer.filter((answer) => answer.index !== index);
      }
      // 존재하지 않는 경우 추가
      else {
        updatedInput = [...state.inputAnswer, { index, clickValue }];
      }

      return { ...state, inputAnswer: updatedInput };
    }
    case 'RESET_INPUT':
      return inputInitialState;
    default:
      return state;
  }
};

// 애너그램 컴포넌트
const AnagramQuiz = ({ answer, anagram, mainCategory, id }) => {
  const anagramButtonState = anagram.map(() => false);

  const [anagramColor, setAnagramColor] = useState(anagramButtonState);
  const [state, dispatch] = useReducer(reducer, inputInitialState);

  // 입력값에 변화가 생길 때마다 버튼 색 변경
  useEffect(() => {
    const updatedColor = anagram.map((_, index) => state.inputAnswer.some((input) => input.index === index));
    setAnagramColor(updatedColor);

    if (state.inputAnswer.length === answer.length) {
      const result = state.inputAnswer.map((input) => input.clickValue).join('');

      handleAnswerCheck(result, answer, mainCategory, () => dispatch({ type: 'RESET_INPUT' }), id);
    }
  }, [state.inputAnswer]);

  const handleAnagramAnswer = (e, clickValue, index) => {
    dispatch({
      type: 'ADD_OR_REMOVE_INPUT',
      payload: {
        index,
        clickValue,
      },
    });
  };

  return (
    <div className="content-between">
      <div>
        {anagram.map((char, index) => (
          <button
            key={index}
            onClick={(event) => handleAnagramAnswer(event, char, index)}
            className={`${anagramColor[index] ? 'bg-gray-300' : 'bg-ox'} p-3 m-2 shadow-xl hover:scale-110 transition-transform ease-in-out duration-200 rounded`}
          >
            <p className="text-2xl">{char}</p>
          </button>
        ))}
      </div>
      <div className="border-2 border-gray-300 h-10 px-4 py-2 rounded-md content-center">
        {state.inputAnswer.map((input) => (
          <span key={input.index} className="text-2xl p-3">
            {input.clickValue}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnagramQuiz;
