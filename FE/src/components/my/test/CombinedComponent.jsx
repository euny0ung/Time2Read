import React, { useState, useMemo } from 'react';
import { useSpring, a } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';

// 기사 데이터 생성 함수
const generateArticles = (num) => {
  return Array.from({ length: num }, (_, i) => ({
    id: i,
    title: `Article ${i + 1}`,
    category: 'Category',
    description: 'Description for article.',
    imageUrl: `https://via.placeholder.com/150?text=Article${i + 1}`,
  }));
};

const CombinedCard = ({ data, isHovered, gridPosition }) => {
  const mesh = useRef();
  const { position } = useSpring({
    position: isHovered ? gridPosition : [0, 0, 0],
    config: { mass: 10, tension: 400, friction: 40 },
  });

  return (
    <a.mesh position={position} ref={mesh}>
      {data.imageUrl ? (
        <div
          className={`w-full h-full border-4 overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          <img
            src={data.imageUrl}
            alt={data.title}
            className={`w-full h-full object-cover transition-transform duration-300 ease-in-out transform ${
              isHovered ? 'scale-110' : ''
            }`}
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full bg-gray-900 text-white text-center transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-50' : ''
          }`}
        >
          <h2 className="text-xl font-bold md:text-2xl">{data.title}</h2>
        </div>
      )}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center ${
          isHovered ? 'bg-gray-800 bg-opacity-80' : 'bg-gray-900 bg-opacity-70'
        } transition-opacity duration-300 ease-in-out opacity-0`}
      >
        <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">{data.title}</h2>
        <div className="inline-block px-3 py-1 mb-4 text-sm text-white rounded-lg bg-cadetblue">{data.category}</div>
        <p className="px-4 text-sm text-center text-gray-300 md:text-base">{data.description}</p>
      </div>
      {data.title && (
        <Text position={[0, 0, 0.35]} color="black" anchorX="center" anchorY="middle" fontSize={0.5}>
          {data.title}
        </Text>
      )}
    </a.mesh>
  );
};

const ArticleStack = () => {
  const [hoverState, setHoverState] = useState(false);
  const articlesData = useMemo(() => generateArticles(9), []);

  const gridPositions = useMemo(() => {
    const cardWidth = 4; // 기사 카드의 폭
    const cardHeight = 5; // 기사 카드의 높이
    const numCols = Math.ceil(Math.sqrt(articlesData.length));
    const numRows = Math.ceil(articlesData.length / numCols);
    const gap = 1; // 카드 간격
    const totalWidth = cardWidth + gap;
    const totalHeight = cardHeight + gap;
    const offsetX = (-(numCols - 1) / 2) * totalWidth;
    const offsetY = ((numRows - 1) / 2) * totalHeight;
    return articlesData.map((_, i) => {
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const x = offsetX + col * totalWidth;
      const y = offsetY - row * totalHeight;
      return [x, y, 0];
    });
  }, [articlesData]);

  const toggleHover = (isHovering) => {
    setHoverState(isHovering);
  };

  return (
    <>
      <div style={{ height: '60vh', width: '30vw' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={1} />
          <pointLight position={[0, 0, 8]} intensity={300} />
          <group onPointerOver={() => toggleHover(true)} onPointerOut={() => toggleHover(false)}>
            {articlesData.map((article, index) => (
              <CombinedCard
                key={article.id}
                data={article}
                isHovered={hoverState}
                gridPosition={gridPositions[index]}
              />
            ))}
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default ArticleStack;
