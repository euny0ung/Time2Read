import { useState } from 'react';
import { useGameItemStore } from '@stores/game/gameStore';
import { useClueStateStore } from '@stores/game/quizStore';

const EntireContentButton = ({ onClueClick, clues }) => {
  const [isEntireContent, setIsEntireContent] = useState(false);
  const { clueCount } = useGameItemStore();

  const handleClick = () => {
    onClueClick();
    if (clueCount === 0) {
      return;
    }
    setIsEntireContent(!isEntireContent);
  };

  return (
    <div>
      <button onClick={handleClick}>{isEntireContent ? '첫번째 힌트 닫기' : '첫번째 힌트 보기'}</button>
      {isEntireContent && <div>{clues.description}</div>}
    </div>
  );
};

export default EntireContentButton;
