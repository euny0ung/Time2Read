import { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import ArticleCard from './ArticleCard.jsx';

// 테스트용 기사 데이터 생성 함수
const generateArticles = (num) => {
  return Array.from({ length: num }, (_, i) => ({
    id: i, // 각 기사의 고유 ID
    title: `Article ${i + 1}`, // 기사 제목
  }));
};

// 네모(카드)의 크기와 간격을 정의
const cardSize = { width: 4, height: 5, depth: 0.7 };
const gap = 0.3; // 카드 사이의 간격

// 기사 스택 및 그리드 전환을 처리하는 컴포넌트
const ArticleStack = ({ onHoverChange }) => {
  const [hoverState, setHoverState] = useState(false); // 호버 상태 관리를 위한 상태
  const articlesData = generateArticles(9); // 9개의 테스트용 기사 데이터 생성

  // 캔버스 크기에 따른 그리드 포지션 계산
  const gridPositions = useMemo(() => {
    const numCols = Math.ceil(Math.sqrt(articlesData.length));
    const numRows = Math.ceil(articlesData.length / numCols);
    const totalWidth = cardSize.width + gap;
    const totalHeight = cardSize.height + gap;

    // 중앙 카드를 기준으로 한 오프셋 계산
    const offsetX = (-(numCols - 1) / 2) * totalWidth;
    const offsetY = ((numRows - 1) / 2) * totalHeight;

    return articlesData.map((_, i) => {
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const x = offsetX + col * totalWidth;
      const y = offsetY - row * totalHeight;
      return [x, y, 0];
    });
  }, [articlesData]); // canvasSize 제거

  return (
    <>
      <div style={{ height: '60vh', width: '30vw' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={1} />
          <pointLight position={[0, 0, 8]} intensity={300} />
          {/* 호버 이벤트 핸들러 */}
          <group
            onPointerOver={() => {
              setHoverState(true);
              onHoverChange(true);
            }}
            onPointerOut={() => {
              setHoverState(false);
              onHoverChange(false);
            }}
          >
            {/* 기사 그리드 렌더링 */}
            {articlesData.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                hoverState={hoverState}
                gridPosition={gridPositions[i]}
                cardSize={cardSize}
              />
            ))}
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default ArticleStack;
