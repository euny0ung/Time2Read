import { useState, useEffect } from 'react';
import { useClueStateStore } from '@stores/game/quizStore';

const ClueCountStateModal = () => {
  const [opacity, setOpacity] = useState(1);
  const { setShowClueState } = useClueStateStore();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (opacity > 0) {
      const timeout = setTimeout(
        () => {
          setOpacity((prevOpacity) => {
            const nextOpacity = prevOpacity > 0.95 ? prevOpacity - 0.01 : prevOpacity - 0.04;

            if (nextOpacity <= 0) {
              // 모달 닫기
              setShowClueState();
              return 0;
            }
            return nextOpacity;
          });
        },
        opacity > 0.95 ? 100 : 50,
      );

      return () => clearTimeout(timeout);
    }
  }, [opacity]);

  return (
    <>
      <div className="fixed inset-0  bg-opacity-50 flex justify-center content-start p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-32" style={{ opacity }}>
          {'사용할 수 있는 단서가 없어요'}
        </div>
      </div>
    </>
  );
};

export default ClueCountStateModal;
