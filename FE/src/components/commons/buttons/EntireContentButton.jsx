import { useState } from 'react';

const EntireContentButton = ({ onClueClick, clues }) => {
  const [isEntireContent, setIsEntireContent] = useState(false);

  const handleClick = () => {
    onClueClick();
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
