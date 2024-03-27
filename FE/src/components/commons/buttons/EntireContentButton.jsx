import React, { useState } from 'react';
import { useGameItemStore } from '@stores/game/gameStore';
import { useClueStateStore } from '@stores/game/quizStore';

const EntireContentButton = React.memo(({ onClueClick, clues, hintUsed }) => {
  const [isEntireContent, setIsEntireContent] = useState(false);
  const { clueCount } = useGameItemStore();
  const { setShowClueState } = useClueStateStore();

  const handleClick = () => {
    onClueClick();

    // 단서가 0개일 때 이미 사용된 단서이면 볼 수 있고, 그렇지 않으면 볼 수 없음
    if (clueCount === 0) {
      if (hintUsed) {
        setIsEntireContent(!isEntireContent);
      } else {
        setShowClueState();
      }
    }
    // 단서가 0개가 아닐 때는 무조건 단서를 볼 수 있음
    else {
      setIsEntireContent(!isEntireContent);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{isEntireContent ? '첫번째 힌트 닫기' : '첫번째 힌트 보기'}</button>
      {isEntireContent && <div>{clues.description}</div>}
    </div>
  );
});

EntireContentButton.displayName = 'EntireContentButton';

export default EntireContentButton;
