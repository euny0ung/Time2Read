/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import ClueContentButton from '@components/commons/buttons/ClueContentButton';
import EntireContentButton from '@components/commons/buttons/EntireContentButton';
import AnagramQuiz from '@components/quizTypes/AnagramQuiz.jsx';
import OxQuiz from '@components/quizTypes/OxQuiz.jsx';
import ShortAnswerQuiz from '@components/quizTypes/ShortAnswerQuiz.jsx';
import { useGameItemStore } from '@stores/game/gameStore';
import { useQuizStore, useClueStateStore } from '@stores/game/quizStore';

// 정답을 체크하고 맞으면 정답 결과 개수를 하나 더 해주고 퀴즈 모달창이 닫힘

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

const QuizModal = React.memo(
  ({ quizIndex }) => {
    if (quizIndex > 10) return null;

    const { quizzes } = useQuizStore();
    const { clueCount, decreaseClueCount } = useGameItemStore();
    const [clueUsed, setClueUsed] = useState(false);
    const quiz = quizzes.filter((_, index) => index === quizIndex);

    const handleClueClick = useCallback(() => {
      // 단서 개수가 남아있고 아직 안쓴 버튼이면 감소, 힌트 변경처리
      // 단서 개수가 없으면 clueUsed가 계속 false인 상태임
      if (clueCount !== 0 && !clueUsed) {
        decreaseClueCount();
        setClueUsed(true);
      }
    }, [clueUsed, decreaseClueCount, setClueUsed]);

    useEffect(() => {
      console.log(quizIndex);
      setClueUsed(false);
    }, [quizIndex]);

    console.log('퀴즈퀴즈', quiz);
    return (
      <div
        className="h-screen w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
        style={{ width: '1480px', height: '824px', overflowY: 'auto' }}
      >
        {/* <button onClick={closeModal}>닫기</button> */}
        {quiz.map((it) => {
          const renderQuiz = (type, additionalProps = {}) => (
            <div key={it.id} className="w-1/2 h-1/3 border-2 border-black-500">
              {type}
              <div>{it.title}</div>
              <div>{it.quiz.questionSummary}</div>
              {additionalProps && React.createElement(additionalProps.component, additionalProps.componentProps)}
              <div>
                <EntireContentButton
                  onClueClick={() => handleClueClick()}
                  clues={it.quiz.clues[0]}
                  clueUsed={clueUsed}
                />
                <ClueContentButton onClueClick={() => handleClueClick()} clues={it.quiz.clues[1]} clueUsed={clueUsed} />
              </div>
            </div>
          );

          // O, X
          // if (it.quiz.quizType === 'OX_QUIZ') {
          //   return renderQuiz('OX퀴즈', {
          //     component: OxQuiz,
          //     componentProps: { answer: it.quiz.answer },
          //   });
          // }

          // 랜덤 함수 돌리기 (0,1)
          const randNum = Math.floor(Math.random() * 2);

          // 0이면 애너그램
          if (randNum === 0 && it.quiz.answer.length > 1) {
            const anagram = FisherYatesShuffle(it.quiz.answer);
            return renderQuiz('애너그램', {
              component: AnagramQuiz,
              componentProps: { answer: it.quiz.answer, anagram },
            });
          }
          // 1이면 단답식

          return renderQuiz('단답식', {
            component: ShortAnswerQuiz,
            componentProps: { answer: it.quiz.answer },
          });
        })}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.quizIndex === nextProps.quizIndex;
  },
);

QuizModal.displayName = 'QuizModal';

export default QuizModal;
