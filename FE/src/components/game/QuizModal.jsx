/* eslint-disable indent */
import { useState, useEffect, useReducer } from 'react';
import { useQuizStore, useHitsCountStore } from '@stores/store';

// 정답을 체크하고 맞으면 정답 결과 개수를 하나 더 해줌
const handleAnswerCheck = (inputValue, answer) => {
  const { setHitsCount } = useHitsCountStore.getState();

  if (inputValue === answer) {
    setHitsCount();
  } else {
    console.log('틀렸습니다');
  }
};

// 객관식 문제에서 엔터 누를 시 정답 체크
const handleEnter = (e, answer) => {
  if (e.key === 'Enter') {
    handleAnswerCheck(e.target.value, answer);
  }
};

// 퀴즈 유형이 객관식인 경우, 랜덤 숫자를 생성하여 애너그램과 객관식으로 나눔. 편향 때문에 random 함수 대신 피셔-예이츠 셔플 알고리즘 사용
const FisherYatesShuffle = (answer) => {
  const array = answer.split('');
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomNum = Math.floor(Math.random() * (index + 1));
    const tempNum = array[index];
    array[index] = array[randomNum];
    array[randomNum] = tempNum;
  }

  return array;
};

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
    default:
      return state;
  }
};

// 애너그램 컴포넌트
const AnagramQuiz = ({ answer, anagram }) => {
  const anagramButtonState = anagram.map(() => false);

  const [anagramColor, setAnagramColor] = useState(anagramButtonState);
  const [state, dispatch] = useReducer(reducer, inputInitialState);

  // 입력값에 변화가 생길 때마다 버튼 색 변경
  useEffect(() => {
    const updatedColor = anagram.map((_, index) => state.inputAnswer.some((input) => input.index === index));
    setAnagramColor(updatedColor);

    if (state.inputAnswer.length === answer.length) {
      const result = state.inputAnswer.map((input) => input.clickValue).join('');

      handleAnswerCheck(result, answer);
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
    <div>
      <div>
        {anagram.map((char, index) => (
          <button
            key={index}
            onClick={(event) => handleAnagramAnswer(event, char, index)}
            className={anagramColor[index] ? 'bg-yellow-300' : 'bg-inherit'}
          >
            {char}
          </button>
        ))}
      </div>
      <div>
        {state.inputAnswer.map((input) => (
          <span key={input.index}>{input.clickValue}</span>
        ))}
      </div>
    </div>
  );
};

const QuizModal = () => {
  const { quizzes } = useQuizStore();

  // title, content, id, image, imageCaption, quiz[answer, question, type]
  return (
    <div className="h-screen w-screen">
      {quizzes.map((it) => {
        // O, X
        if (it.quiz.type === 'OX_QUIZ') {
          return (
            <div key={it.id} className="w-1/2 h-1/3 border-2 border-black-500">
              OX 퀴즈
              <div>{it.title}</div>
              <div>{it.content}</div>
              <div>{it.quiz.question}</div>
              <div>
                <button
                  type="button"
                  className="border-2 border-indigo-500/50"
                  onClick={(event) => handleAnswerCheck(event.target.value, it.quiz.answer)}
                  value="O"
                >
                  O
                </button>
                <button
                  type="button"
                  className="border-2 border-indigo-500/50"
                  onClick={(event) => handleAnswerCheck(event, it.quiz.answer)}
                  value="X"
                >
                  X
                </button>
              </div>
            </div>
          );
        }

        // 랜덤 함수 돌리기 (0,1)
        const randNum = Math.floor(Math.random() * 2);

        // 0이면 애너그램
        if (randNum === 0) {
          const anagram = FisherYatesShuffle(it.quiz.answer);

          return (
            <div key={it.id} className="w-1/2 h-1/3 border-2 border-black-500">
              애너그램
              <div>{it.title}</div>
              <div>{it.content}</div>
              <div>{it.quiz.question}</div>
              <AnagramQuiz answer={it.quiz.answer} anagram={anagram} />
            </div>
          );
        }
        // 1이면 객관식
        return (
          <div key={it.id} className="w-1/2 h-1/3 border-2 border-black-500">
            객관식
            <div>{it.title}</div>
            <div>{it.content}</div>
            <div>{it.quiz.question}</div>
            <div>
              <input
                placeholder="정답을 입력하세요"
                className="border-2 border-black-500"
                onKeyDown={(e) => handleEnter(e, it.quiz.answer)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizModal;
