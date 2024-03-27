import { useState } from 'react';
import { useGameItemStore } from '@stores/game/gameStore';
import { useClueStateStore } from '@stores/game/quizStore';

const ClueContent = ({ onClueClick, clues }) => {
  const [isFirstLetter, setisFirstLetter] = useState(false);
  const { clueCount } = useGameItemStore();

  const handleClick = () => {
    onClueClick();
    if (clueCount === 0) return;
    setisFirstLetter(!isFirstLetter);
  };

  return (
    <div>
      <button onClick={handleClick}>{isFirstLetter ? '두번째 힌트 닫기' : '두번째 힌트 보기'}</button>
      {isFirstLetter && <div>{clues.description}</div>}
    </div>
  );
};

export default ClueContent;
