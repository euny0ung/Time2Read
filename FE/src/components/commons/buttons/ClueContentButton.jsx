import React, { useState } from 'react';
import { useGameItemStore } from '@stores/game/gameStore';
import { useClueIndexStore } from '@stores/game/quizStore';

const ClueContent = React.memo(({ clues, quizIndex, clueIndex }) => {
  const [isFirstLetter, setisFirstLetter] = useState(false);
  const { clueCount, decreaseClueCount } = useGameItemStore();
  const { cluesClicked, toggleClueClick } = useClueIndexStore();

  const handleClick = () => {
    // 단서 개수에 상관없이 이미 클릭한 경우 - 토글 가능, 상태변경X
    if (cluesClicked[`${quizIndex}-${clueIndex}`]) setisFirstLetter(!isFirstLetter);
    // 단서 개수가 0개가 아닌 경우 - 토글, 상태변경, 단서 감소
    else if (clueCount !== 0) {
      setisFirstLetter(!isFirstLetter);
      toggleClueClick(quizIndex, clueIndex);
      decreaseClueCount();
    }
  };

  return (
    <div className='w-full h-full'>
      <button onClick={handleClick} disabled={clueCount === 0 && !cluesClicked[`${quizIndex}-${clueIndex}`]}>
        {isFirstLetter ? '초성 힌트 닫기' : '초성 힌트 보기'}
      </button>
      {isFirstLetter && <div>{clues.description}</div>}
    </div>
  );
});

ClueContent.displayName = 'ClueContentButton';

export default ClueContent;
