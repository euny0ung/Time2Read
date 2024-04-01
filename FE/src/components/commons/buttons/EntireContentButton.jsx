import React, { useState } from 'react';
import { useGameItemStore } from '@stores/game/gameStore';
import { useClueIndexStore } from '@stores/game/quizStore';

const EntireContentButton = React.memo(({ title, clues, quizIndex, clueIndex }) => {
  const [isEntireContent, setIsEntireContent] = useState(false);
  const { clueCount, decreaseClueCount } = useGameItemStore();
  const { cluesClicked, toggleClueClick } = useClueIndexStore();

  const handleClick = () => {
    // 단서 개수에 상관없이 이미 클릭한 경우 - 토글 가능, 상태변경X
    if (cluesClicked[`${quizIndex}-${clueIndex}`]) setIsEntireContent(!isEntireContent);
    // 단서 개수가 0개가 아닌 경우 - 토글, 상태변경, 단서 감소
    else if (clueCount !== 0) {
      setIsEntireContent(!isEntireContent);
      toggleClueClick(quizIndex, clueIndex);
      decreaseClueCount();
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      {/* 단서 개수가 0인데 클릭하지 않은 경우 - 버튼 비활성화, 상태변경X */}
      <button onClick={handleClick} disabled={clueCount === 0 && !cluesClicked[`${quizIndex}-${clueIndex}`]}>
        {isEntireContent ? '본문 힌트 닫기' : '본문 힌트 보기'}
      </button>
      {isEntireContent && (
        <div>
          <p className="text-xl m-1">{title}</p>
          <p className="text-lg m-1">{clues.description}</p>
        </div>
      )}
    </div>
  );
});

EntireContentButton.displayName = 'EntireContentButton';

export default EntireContentButton;
