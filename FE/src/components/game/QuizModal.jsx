import { useQuizStore } from '@stores/store';

const handleAnswerCheck = (e, answer) => {
  console.log(e.target.value);
  console.log(answer);
  if (e.target.value === answer) {
    console.log('맞았습니다');
  } else {
    console.log('틀렸습니다');
  }
};

const handleAnagramAnswer = (clickValue) => {
  console.log(ref.current);
  // [] 클릭한 순서대로 화면에 답이 표시됨
  // [] 한번 더 누르면 답 삭제
};

const handleEnter = (e, answer) => {
  if (e.key === 'Enter') {
    handleAnswerCheck(e, answer);
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
                  onClick={(event) => handleAnswerCheck(event, it.quiz.answer)}
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
              {anagram.map((str) => (
                <button
                  key={str.index}
                  onClick={(event) => handleAnagramAnswer(event, str)}
                  className="border-2 border-black-500"
                >
                  {str}
                </button>
              ))}
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
                onKeyDown={() => handleEnter(it.quiz.answer)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizModal;
