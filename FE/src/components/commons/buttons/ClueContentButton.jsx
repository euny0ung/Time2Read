import React, { useState } from 'react';
import { useGameItemStore } from '@stores/game/gameStore';
import { useClueStateStore } from '@stores/game/quizStore';

const ClueContent = React.memo(({ clues }) => {
  const [isFirstLetter, setisFirstLetter] = useState(false);
  const { setShowClueState } = useClueStateStore();
  const { clueCount } = useGameItemStore();

  const handleClick = () => {
    // onClueClick();
    // 단서가 0개일 때 이미 사용된 단서이면 볼 수 있고, 그렇지 않으면 볼 수 없음
    // if (clueCount === 0) {
    //   if (clueUsed) {
    //     setisFirstLetter(!isFirstLetter);
    //   } else {
    //     setShowClueState();
    //   }
    // }
    // 단서가 0개가 아닐 때는 무조건 단서를 볼 수 있음

    setisFirstLetter(!isFirstLetter);
  };

  return (
    <div>
      <button onClick={handleClick}>{isFirstLetter ? '두번째 힌트 닫기' : '두번째 힌트 보기'}</button>
      {isFirstLetter && <div>{clues.description}</div>}
    </div>
  );
});

ClueContent.displayName = 'ClueContentButton';

export default ClueContent;
