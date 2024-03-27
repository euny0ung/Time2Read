import { useState, useMemo, useRef, useEffect } from 'react';
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
const cardSize = { width: 6, height: 8, depth: 0.1 };
const gap = 0.5; // 카드 사이의 간격

// 기사 스택 및 그리드 전환을 처리하는 컴포넌트
const ArticleStack = ({ onHoverChange }) => {
  const canvasRef = useRef(); // 캔버스 요소 참조
  const [hoverState, setHoverState] = useState(false); // 호버 상태 관리를 위한 상태
  const articlesData = generateArticles(9); // 10개의 테스트용 기사 데이터 생성

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 }); // 캔버스의 초기 크기

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
  }, [articlesData, canvasSize]);

  // 캔버스 크기 업데이트를 위한 useEffect
  useEffect(() => {
    function updateCanvasSize() {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setCanvasSize({ width, height });
      }
    }

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  return (
    <>
      <div ref={canvasRef} style={{ height: '60vh', width: '30vw', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={5} />
          <pointLight position={[10, 10, 10]} />
          {/* // 호버 이벤트 핸들러 */}
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
            {/* // 기사 그리드 렌더링 */}
            {articlesData.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                hoverState={hoverState}
                gridPosition={gridPositions[index]}
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
