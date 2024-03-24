import { useState } from 'react';

const EntireContentButton = ({ content }) => {
  const [isEntireContent, setIsEntireContent] = useState(false);

  return (
    <div>
      <button onClick={() => setIsEntireContent(!isEntireContent)}>
        {isEntireContent ? '기사 전문 닫기' : '기사 전문 보기'}
      </button>
      {isEntireContent && <div>{content}</div>}
    </div>
  );
};

export default EntireContentButton;
