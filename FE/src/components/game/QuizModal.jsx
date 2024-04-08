import React from 'react';
import ClueContentButton from '@components/commons/buttons/ClueContentButton';
import EntireContentButton from '@components/commons/buttons/EntireContentButton';
import AnagramQuiz from '@components/quizTypes/AnagramQuiz.jsx';
import ChoiceQuiz from '@components/quizTypes/ChoiceQuiz.jsx';
import OxQuiz from '@components/quizTypes/OxQuiz.jsx';
import ShortAnswerQuiz from '@components/quizTypes/ShortAnswerQuiz.jsx';
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

const QuizHeader = ({ quizIndex, questionText }) => (
  <div className="w-[100%] h-[10%] flex items-center justify-center">
    <p className="text-2xl font-bold text-black">
      Q{quizIndex + 1}) {questionText}
    </p>
  </div>
);

const QuizQuestion = ({ questionSummary }) => (
  <div className="w-full py-4 overflow-y-auto text-lg h-2/3" style={{ lineHeight: '1.8' }}>
    {questionSummary}
  </div>
);

const QuizAnswerInput = ({ Component, ...props }) => (
  <div className="flex justify-center">
    <Component {...props} />
  </div>
);

const QuizHint = ({ children }) => <div className="flex items-center justify-center w-full h-full">{children}</div>;

const OXHint = ({ title, clueDescription }) => (
  <div className="h-full overflow-y-auto red-scrollbar">
    <p className="p-3 m-1 text-xl font-bold rounded-lg bg-rose-100">{title}</p>
    <p className="p-3 m-1 text-lg rounded-lg bg-rose-50" style={{ lineHeight: '1.7' }}>
      {clueDescription}
    </p>
  </div>
);

const QuizModal = React.memo(
  ({ quizIndex }) => {
    if (quizIndex > 10) return null;

    const { quizzes } = useQuizStore();

    const quiz = quizzes.filter((_, index) => index === quizIndex);

    return (
      <div className="w-[75%] h-[75%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white bg-opacity-50 border-2 border-white shadow-xl rounded-2xl flex flex-col items-start justify-center backdrop-blur-sm">
        {quiz.map((it) => {
          const quizObj = it.quiz;
          let { quizType } = quizObj;

          if (quizType === 'KEYWORD') {
            const randNum = Math.floor(Math.random() * 2);
            quizType = randNum === 0 && quizObj.answer.length > 1 ? 'ANAGRAM' : 'SHORT_ANSWER';
          }

          const quizTypeConfig = quizTypeConfigs[quizType];

          const renderQuiz = (type, additionalProps = {}) => (
            <div className="flex items-center justify-center w-full h-full gap-4">
              {/* 문제 */}
              <WhiteContainer>
                <QuizHeader quizIndex={quizIndex} questionText={quizTypeConfig.questionText} />
                <QuizQuestion questionSummary={quizObj.questionSummary} />
                <QuizAnswerInput Component={additionalProps.component} {...additionalProps.componentProps} />
              </WhiteContainer>
              {/* 힌트 */}
              <div className="flex flex-col w-3/5 h-full gap-4 overflow-y-auto">
                <div className="h-full">
                  <WhiteContainer>
                    <QuizHint>
                      {type === 'OX' ? (
                        <OXHint title={it.title} clueDescription={quizObj.clues[0].description} />
                      ) : (
                        <EntireContentButton
                          title={it.title}
                          clues={quizObj.clues[0]}
                          quizIndex={quizIndex}
                          clueIndex={0}
                        />
                      )}
                    </QuizHint>
                  </WhiteContainer>
                </div>
                {quizTypeConfig.hintTwoHeight !== 0 && (
                  <div className="h-full">
                    <WhiteContainer>
                      <QuizHint height={quizTypeConfig.hintTwoHeight}>
                        {quizObj.clues[1] && (
                          <ClueContentButton clues={quizObj.clues[1]} quizIndex={quizIndex} clueIndex={1} />
                        )}
                      </QuizHint>
                    </WhiteContainer>
                  </div>
                )}
              </div>
            </div>
          );

          if (quizType === 'OX') {
            return renderQuiz('OX', {
              component: OxQuiz,
              componentProps: { answer: quizObj.answer, mainCategory: it.mainCategory, id: it.id },
            });
          }
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
          if (quizType === 'ANAGRAM') {
            const anagram = shuffleUntilDifferent(quizObj.answer);
            return renderQuiz('애너그램', {
              component: AnagramQuiz,
              componentProps: { answer: quizObj.answer, anagram, mainCategory: it.mainCategory, id: it.id },
            });
          }
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
