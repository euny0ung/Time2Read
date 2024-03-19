import { useState, useEffect } from 'react';
import { useQuizStore } from '@stores/store';

const handleAnswerCheck = (inputValue, answer) => {
  if (inputValue === answer) {
    console.log('맞았습니다');
  } else {
    console.log('틀렸습니다');
  }
};

const handleEnter = (e, answer) => {
  if (e.key === 'Enter') {
    handleAnswerCheck(e.target.value, answer);
  }
};

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

const AnagramQuiz = ({ answer, anagram }) => {
  const anagramButtonState = anagram.map(() => false);

  const [anagramColor, setAnagramColor] = useState(anagramButtonState);
  const [inputAnswer, setInputAnswer] = useState([]);

  useEffect(() => {
    if (answer.length === inputAnswer.length) {
      handleAnswerCheck(inputAnswer.join(''), answer);
    }
  }, [inputAnswer]);

  const handleAnagramAnswer = (e, clickValue, index) => {
    let state = true;

    // setAnagramColor 순서때문에 삭제 로직이 제대로 동작하지 않음
    if (anagramColor[index]) {
      state = false;
      const removeInputAnswer = inputAnswer.filter((it) => it.id !== index);
      setInputAnswer(removeInputAnswer);
    }
    // 클릭되지 않은 상태
    else {
      setInputAnswer((prev) => [...prev, clickValue]);
    }
    setAnagramColor((prev) => prev.map((prevItem, colorStateIndex) => (colorStateIndex === index ? state : prevItem)));

    // [V] 클릭한 순서대로 화면에 답이 표시됨
    // [] 한번 더 누르면 답 삭제
    // [V] 해당 버튼 색 변경
    // [V] 한번 더 누르면 원래 색으로 변경
    // [V]입력한 글자수==정답 글자수일 때 정답 체크
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
      <div>{inputAnswer}</div>
    </div>
  );
};

const QuizModal = () => {
  const { quizzes } = useQuizStore();

  console.log(quizzes);

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
