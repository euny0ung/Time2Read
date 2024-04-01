/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import ClueContentButton from '@components/commons/buttons/ClueContentButton';
import EntireContentButton from '@components/commons/buttons/EntireContentButton';
import AnagramQuiz from '@components/quizTypes/AnagramQuiz.jsx';
import ChoiceQuiz from '@components/quizTypes/ChoiceQuiz.jsx';
import OxQuiz from '@components/quizTypes/OxQuiz.jsx';
import ShortAnswerQuiz from '@components/quizTypes/ShortAnswerQuiz.jsx';
import { useGameItemStore } from '@stores/game/gameStore';
import { useQuizStore } from '@stores/game/quizStore';

import WhiteContainer from '../commons/containers/WhiteContainer.jsx';

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
    const quiz = quizzes.filter((_, index) => index === quizIndex);

    console.log('퀴즈퀴즈', quiz);
    return (
      <div className="w-[85%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 p-6 bg-white bg-opacity-50 border-2 border-white shadow-xl rounded-2xl flex flex-col items-start justify-center">
        {quiz.map((it) => {
          let questionText = '';
          let questionHeight = 60;
          let answerHeight = 30;
          let hintOneHeight = 100;
          let hintTwoHeight = 0;

          if (it.quiz.quizType === 'KEYWORD') {
            questionText = ' 빈칸에 들어갈 단어는 무엇일까?';
            questionHeight = 60;
            answerHeight = 30;
            hintOneHeight = 85;
            hintTwoHeight = 13;
          } else if (it.quiz.quizType === 'MULTIPLE_CHOICE') {
            questionText = ' 빈칸에 들어갈 알맞은 단어를 선택해봐!';
            questionHeight = 50;
            answerHeight = 40;
            hintOneHeight = 100;
            hintTwoHeight = 0;
          } else if (it.quiz.quizType === 'OX') {
            questionText = ' O일까? X일까?';
            questionHeight = 25;
            answerHeight = 65;
            hintOneHeight = 100;
            hintTwoHeight = 0;
          } else {
            questionText = ' 빈칸에 들어갈 단어의 순서를 선택해봐!';
            questionHeight = 70;
            answerHeight = 20;
            hintOneHeight = 100;
            hintTwoHeight = 0;
          }

          const renderQuiz = (type, additionalProps = {}) => (
            <div className="w-[100%] h-[100%] flex items-center justify-center">
              <div className="w-[65%] h-[100%] m-2 flex">
                <WhiteContainer>
                  <div className="w-[100%] h-[10%] flex items-center justify-center">
                    <p className="text-2xl text-black">
                      Q{quizIndex + 1}){questionText}
                    </p>
                  </div>
                  {/* 질문 생성 */}
                  <div className="m-3" style={{ width: '100%', height: `${questionHeight}%`, overflowY: 'scroll' }}>
                    <p className="none-scroll-bar text-xl text-black">{it.quiz.questionSummary}</p>
                  </div>

                  {/* 정답 입력 생성 */}
                  <div
                    className="flex justify-center items-center"
                    style={{ width: '100%', height: `${answerHeight}%` }}
                  >
                    {additionalProps && React.createElement(additionalProps.component, additionalProps.componentProps)}
                  </div>
                </WhiteContainer>
              </div>

              {/* 힌트 생성 */}
              <div className="w-[35%] h-[100%] m-2 flex flex-col items-end justify-between">
                <div
                  className="flex items-center justify-center overflow-y-scroll"
                  style={{ width: '100%', height: `${hintOneHeight}%` }}
                >
                  <WhiteContainer>
                    <div className="w-full h-full">
                      <EntireContentButton
                        title={it.title}
                        clues={it.quiz.clues[0]}
                        quizIndex={quizIndex}
                        clueIndex={0}
                      />
                    </div>
                  </WhiteContainer>
                </div>

                {hintTwoHeight !== 0 && (
                  <div
                    className="flex items-center justify-center"
                    style={{ width: '100%', height: `${hintTwoHeight}%` }}
                  >
                    <WhiteContainer>
                      <div>
                        {it.quiz.clues[1] && (
                          <ClueContentButton clues={it.quiz.clues[1]} quizIndex={quizIndex} clueIndex={1} />
                        )}
                      </div>
                    </WhiteContainer>
                  </div>
                )}
              </div>
            </div>
          );

          // O, X
          if (it.quiz.quizType === 'OX') {
            return renderQuiz('OX퀴즈', {
              component: OxQuiz,
              componentProps: { answer: it.quiz.answer, mainCategory: it.mainCategory, id: it.id },
            });
          }
          // 객관식
          if (it.quiz.quizType === 'MULTIPLE_CHOICE') {
            return renderQuiz('객관식', {
              component: ChoiceQuiz,
              componentProps: {
                answer: it.quiz.answer,
                choices: it.quiz.additionalInfo.choices,
                mainCategory: it.mainCategory,
                id: it.id,
              },
            });
          }

          // 랜덤 함수 돌리기 (0,1)
          const randNum = Math.floor(Math.random() * 2);

          // 0이면 애너그램
          if (randNum === 0 && it.quiz.answer.length > 1) {
            const anagram = FisherYatesShuffle(it.quiz.answer);
            return renderQuiz('애너그램', {
              component: AnagramQuiz,
              componentProps: { answer: it.quiz.answer, anagram, mainCategory: it.mainCategory, id: it.id },
            });
          }
          // 1이면 단답식

          return renderQuiz('단답식', {
            component: ShortAnswerQuiz,
            componentProps: { answer: it.quiz.answer, mainCategory: it.mainCategory, id: it.id },
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
