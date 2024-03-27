import { useRef } from 'react';
import { useSpring, a } from '@react-spring/three';
import { Text } from '@react-three/drei';

// 개별 기사 카드 컴포넌트
const ArticleCard = ({ article, hoverState, gridPosition, cardSize }) => {
  const mesh = useRef();

  // hoverState에 따라 카드의 위치를 애니메이션
  const { position } = useSpring({
    position: hoverState ? gridPosition : [0, 0, 0], // 호버 상태일 때 gridPosition으로, 아니면 원점으로 이동
    config: { mass: 10, tension: 400, friction: 40 }, // 애니메이션 물리 특성 설정
  });

  return (
    <a.mesh position={position} ref={mesh}>
      {/* // 박스 형태의 기하학적 모양 정의 */}
      <boxGeometry args={[cardSize.width, cardSize.height, cardSize.depth]} />
      {/* // 메쉬의 재질 및 색상 설정 */}
      <meshStandardMaterial color="lightblue" />
      <Text
        position={[0, 0, cardSize.depth / 2 + 0.1]} // 박스의 앞면에 텍스트를 표시
        color="black" // 텍스트 색상
        anchorX="center" // 텍스트를 가로 방향으로 중앙 정렬
        anchorY="middle" // 텍스트를 세로 방향으로 중앙 정렬
        fontSize={0.5} // 폰트 크기
      >
        {article.title}
      </Text>
    </a.mesh>
  );
};

export default ArticleCard;
