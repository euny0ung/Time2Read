import { useState } from 'react';

const ClueContent = ({ onClueClick, clues }) => {
  const [isFirstLetter, setisFirstLetter] = useState(false);

  const handleClick = () => {
    onClueClick();
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
