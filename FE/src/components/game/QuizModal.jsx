/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import { useSecondQuizApi } from '@apis/quizApi';
import ClueContentButton from '@components/commons/buttons/ClueContentButton';
import EntireContentButton from '@components/commons/buttons/EntireContentButton';
import AnagramQuiz from '@components/quizTypes/AnagramQuiz.jsx';
import ChoiceQuiz from '@components/quizTypes/ChoiceQuiz.jsx';
import OxQuiz from '@components/quizTypes/OxQuiz.jsx';
import ShortAnswerQuiz from '@components/quizTypes/ShortAnswerQuiz.jsx';
import { checkGameYearStore } from '@stores/game/gameStore.jsx';
import { useQuizStore } from '@stores/game/quizStore';
import WhiteContainer from '../commons/containers/WhiteContainer.jsx';

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

// 기존 배열과 다를 때까지 랜덤 돌림
const shuffleUntilDifferent = (original) => {
  let shuffled;
  do {
    shuffled = FisherYatesShuffle(original);
  } while (shuffled.join('') === original);

  return shuffled;
};

const quizTypeConfigs = {
  SHORT_ANSWER: {
    questionText: '빈칸에 들어갈 단어는 무엇일까?',
    questionHeight: 60,
    answerHeight: 30,
    hintOneHeight: 85,
    hintTwoHeight: 13,
  },
  MULTIPLE_CHOICE: {
    questionText: ' 빈칸에 들어갈 알맞은 단어를 선택해봐!',
    questionHeight: 50,
    answerHeight: 40,
    hintOneHeight: 100,
    hintTwoHeight: 0,
  },
  OX: {
    questionText: ' O일까? X일까?',
    questionHeight: 25,
    answerHeight: 65,
    hintOneHeight: 100,
    hintTwoHeight: 0,
  },
  ANAGRAM: {
    questionText: ' 빈칸에 들어갈 단어의 순서를 선택해봐!',
    questionHeight: 70,
    answerHeight: 20,
    hintOneHeight: 80,
    hintTwoHeight: 18,
  },
};

const QuizModal = React.memo(
  ({ quizIndex }) => {
    if (quizIndex > 10) return null;
    if (quizIndex === 0) {
      const { gameYear } = checkGameYearStore();
      const handleSecondQuizApi = useSecondQuizApi(gameYear);
      handleSecondQuizApi();
    }

    const { quizzes } = useQuizStore();

    const quiz = quizzes.filter((_, index) => index === quizIndex);

    console.log('퀴즈퀴즈', quiz);

    return (
      <div className="w-[85%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 p-6 bg-white bg-opacity-50 border-2 border-white shadow-xl rounded-2xl flex flex-col items-start justify-center">
        {quiz.map((it) => {
          const quizObj = it.quiz;
          let { quizType } = quizObj;

          //  퀴즈 타입이 KEYWORD인 경우 애너그램과 단답형으로 나누기
          if (quizType === 'KEYWORD') {
            const randNum = Math.floor(Math.random() * 2);
            quizType = randNum === 0 && quizObj.answer.length > 1 ? 'ANAGRAM' : 'SHORT_ANSWER';
          }

          const quizTypeConfig = quizTypeConfigs[quizType];

          const renderQuiz = (type, additionalProps = {}) => (
            <div className="w-[100%] h-[100%] flex items-center justify-center">
              <div className="w-[65%] h-[100%] m-2 flex">
                <WhiteContainer>
                  <div className="w-[100%] h-[10%] flex items-center justify-center">
                    <p className="text-2xl text-black">
                      Q{quizIndex + 1}){quizTypeConfig.questionText}
                    </p>
                  </div>
                  {/* 질문 생성 */}
                  <div
                    className="m-3"
                    style={{
                      width: '100%',
                      height: `${quizTypeConfig.questionHeight}%`,
                      overflowY: 'scroll',
                      maxHeight: '60%',
                    }}
                  >
                    <p className="none-scroll-bar text-xl text-black">{quizObj.questionSummary}</p>
                  </div>

                  {/* 정답 입력 생성 */}
                  <div
                    className="flex justify-center "
                    style={{ width: '100%', height: `${quizTypeConfig.answerHeight}%` }}
                  >
                    {additionalProps && React.createElement(additionalProps.component, additionalProps.componentProps)}
                  </div>
                </WhiteContainer>
              </div>

              {/* 힌트 생성 */}
              <div className="w-[35%] h-[100%] m-2 flex flex-col items-end justify-between">
                <div
                  className="flex items-center justify-center"
                  style={{ width: '100%', height: `${quizTypeConfig.hintOneHeight}%` }}
                >
                  <WhiteContainer>
                    <div className="w-full h-full">
                      {type === 'OX' ? (
                        <div className=" w-full h-full overflow-y-scroll">
                          <p className="text-xl m-1">{it.title}</p>
                          <p className="text-lg m-1">{quizObj.clues[0].description}</p>
                        </div>
                      ) : (
                        <EntireContentButton
                          title={it.title}
                          clues={quizObj.clues[0]}
                          quizIndex={quizIndex}
                          clueIndex={0}
                        />
                      )}
                    </div>
                  </WhiteContainer>
                </div>

                {quizTypeConfig.hintTwoHeight !== 0 && (
                  <div
                    className="flex items-center justify-center"
                    style={{ width: '100%', height: `${quizTypeConfig.hintTwoHeight}%` }}
                  >
                    <WhiteContainer>
                      <div>
                        {quizObj.clues[1] && (
                          <ClueContentButton clues={quizObj.clues[1]} quizIndex={quizIndex} clueIndex={1} />
                        )}
                      </div>
                    </WhiteContainer>
                  </div>
                )}
              </div>
            </div>
          );

          // O, X
          if (quizType === 'OX') {
            return renderQuiz('OX', {
              component: OxQuiz,
              componentProps: { answer: quizObj.answer, mainCategory: it.mainCategory, id: it.id },
            });
          }
          // 객관식
          if (quizType === 'MULTIPLE_CHOICE') {
            return renderQuiz('객관식', {
              component: ChoiceQuiz,
              componentProps: {
                answer: quizObj.answer,
                choices: quizObj.additionalInfo.choices,
                mainCategory: it.mainCategory,
                id: it.id,
              },
            });
          }

          // 애너그램
          if (quizType === 'ANAGRAM') {
            const anagram = shuffleUntilDifferent(quizObj.answer);

            return renderQuiz('애너그램', {
              component: AnagramQuiz,
              componentProps: { answer: quizObj.answer, anagram, mainCategory: it.mainCategory, id: it.id },
            });
          }

          // 단답식
          return renderQuiz('단답식', {
            component: ShortAnswerQuiz,
            componentProps: { answer: quizObj.answer, mainCategory: it.mainCategory, id: it.id },
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
