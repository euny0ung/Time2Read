import { useState } from 'react';
import ArticleStack from '../components/my/card/ArticleStack.jsx';

// ScrapPage 컴포넌트
const ScrapPage = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleHoverChange = (hover, index) => {
    setHoverIndex(hover ? index : null);
  };

  // 상대적 위치에 따라 스타일 결정
  const getStyle = (index) => {
    if (index === hoverIndex) {
      return { zIndex: 2, transform: 'scale(1.1)', transition: 'all 0.3s ease' }; // 활성화된 스택 확대
    }
    if (hoverIndex !== null) {
      let direction = 'translateX(20%)'; // 기본 오른쪽으로 밀기
      if (Math.floor(index / 3) === Math.floor(hoverIndex / 3)) {
        // 같은 행에 있으면
        direction = index < hoverIndex ? 'translateX(-20%)' : 'translateX(20%)'; // 위치에 따라 좌우로 밀기
      } else if (index % 3 === hoverIndex % 3) {
        // 같은 열에 있으면
        direction = index < hoverIndex ? 'translateY(-20%)' : 'translateY(20%)'; // 위치에 따라 상하로 밀기
      }
      return { transform: direction, transition: 'transform 0.3s ease' };
    }
    return { transition: 'transform 0.3s ease' }; // 호버 아닌 경우 원상태로
  };

  return (
    <>
      <div className="flex items-center justify-center" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={getStyle(i)}
            className="flex items-center justify-center border-4 border-emerald-300"
            onMouseEnter={() => handleHoverChange(true, i)}
            onMouseLeave={() => handleHoverChange(false)}
          >
            <ArticleStack />
          </div>
        ))}
      </div>
    </>
  );
};

export default ScrapPage;
