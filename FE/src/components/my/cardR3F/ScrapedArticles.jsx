import { useState } from 'react';
import ArticleStack from '@/components/my/card/ArticleStack.jsx';

const ScrapedArticles = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleHoverChange = (hover, i) => {
    setHoverIndex(hover ? i : null);
  };

  // 상대적 위치에 따라 스타일 결정
  const getStyle = (i) => {
    if (i === hoverIndex) {
      return { zIndex: 2, transform: 'scale(1)', transition: 'all 0.3s ease' }; // 활성화된 스택 확대
    }
    if (hoverIndex !== null) {
      // 행과 열의 차이를 계산하여 방향 결정
      const rowDiff = Math.floor(i / 3) - Math.floor(hoverIndex / 3);
      const colDiff = (i % 3) - (hoverIndex % 3);
      let transformValue = '';

      if (rowDiff < 0) transformValue += 'translateY(-20%) ';
      else if (rowDiff > 0) transformValue += 'translateY(20%) ';

      if (colDiff < 0) transformValue += 'translateX(-20%)';
      else if (colDiff > 0) transformValue += 'translateX(20%)';

      return { transform: transformValue.trim(), transition: 'transform 0.3s ease' };
    }
    return { transition: 'transform 0.3s ease' }; // 호버 아닌 경우 원상태로
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              ...getStyle(i),
              padding: 0, // 여백을 줄입니다.
              margin: 0, // 외부 여백을 줄일 수 있습니다.
            }}
            className="flex items-center justify-center border-4 border-emerald-300"
            onMouseEnter={() => handleHoverChange(true, i)}
            onMouseLeave={() => handleHoverChange(false)}
          >
            <ArticleStack />
          </div>
        ))}
      </div>

      {/* <CombinedComponent /> */}
    </>
  );
};

export default ScrapedArticles;
