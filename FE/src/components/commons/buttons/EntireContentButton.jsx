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
    <div className="w-full h-full">
      {/* 단서 개수가 0인데 클릭하지 않은 경우 - 버튼 비활성화, 상태변경X */}
      <button
        className="inline-flex text-primary-red-3"
        onClick={handleClick}
        disabled={clueCount === 0 && !cluesClicked[`${quizIndex}-${clueIndex}`]}
      >
        <span>{isEntireContent ? '본문 힌트 닫기' : '본문 힌트 보기'}</span>
        {/* 화살표 */}
        <svg
          className={`w-5 h-5 ml-1 transform transition-transform duration-300 ${isEntireContent ? 'rotate-180' : 'rotate-0'}`}
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
      {isEntireContent && (
        <div className="h-full pb-4">
          <div className="h-full overflow-y-auto">
            <p className="p-3 m-1 text-xl font-bold rounded-lg bg-rose-100">{title}</p>
            <p className="p-3 m-1 text-lg rounded-lg bg-rose-50" style={{ lineHeight: '1.7' }}>
              {clues.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

EntireContentButton.displayName = 'EntireContentButton';

export default EntireContentButton;
