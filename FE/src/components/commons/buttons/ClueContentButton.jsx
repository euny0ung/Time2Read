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
    <div className="w-full h-full">
      <button
        className="inline-flex text-primary-red-3"
        onClick={handleClick}
        disabled={clueCount === 0 && !cluesClicked[`${quizIndex}-${clueIndex}`]}
      >
        <span>{isFirstLetter ? '초성 힌트 닫기' : '초성 힌트 보기'}</span>
        {/* 화살표 */}
        <svg
          className={`w-5 h-5 ml-1 transform transition-transform duration-100 ${isFirstLetter ? 'rotate-180' : 'rotate-0'}`}
          viewBox="0 0 20 20"
          fill="#FF7465"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isFirstLetter && <div>{clues.description}</div>}
    </div>
  );
});

ClueContent.displayName = 'ClueContentButton';

export default ClueContent;
