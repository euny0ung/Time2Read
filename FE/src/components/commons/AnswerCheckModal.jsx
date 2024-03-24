import { useEffect, useState } from 'react';
import { useAnswerCheckStore } from '@stores/game/quizStore';

const AnswerCheckModal = () => {
  const [opacity, setOpacity] = useState(1); // 시작 시 완전 불투명
  const answerCheckStore = useAnswerCheckStore();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (opacity > 0) {
      const timeout = setTimeout(
        () => {
          setOpacity((prevOpacity) => {
            // opacity 감소 로직
            const nextOpacity = prevOpacity > 0.95 ? prevOpacity - 0.01 : prevOpacity - 0.04;

            // opacity가 0 이하로 내려갈 경우 0으로 설정하고, 모달 상태를 false로 설정
            if (nextOpacity <= 0) {
              answerCheckStore.actions.setOpenAnswerResult(); // 여기서 모달을 닫기
              return 0; // opacity를 0으로 설정
            }

            return nextOpacity; // 계산된 다음 opacity 값을 반환
          });
        },
        opacity > 0.95 ? 100 : 50,
      );

      return () => clearTimeout(timeout);
    }
  }, [opacity]); // 의존성 배열에 setOpenAnswerResult 추가

  return (
    <>
      <div className="fixed inset-0  bg-opacity-50 flex justify-center content-start p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-32" style={{ opacity }}>
          {answerCheckStore.resultState}
        </div>
      </div>
    </>
  );
};

export default AnswerCheckModal;
