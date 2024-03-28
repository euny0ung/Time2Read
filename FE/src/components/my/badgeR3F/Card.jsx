// Card.js
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Card = ({ position, color, onClick }) => {
  // 이 Ref를 사용하여 메쉬에 접근할 수 있습니다.
  const mesh = useRef();

  // useFrame을 사용하여 애니메이션을 추가할 수 있습니다.
  // eslint-disable-next-line no-return-assign, no-multi-assign
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01)); // 대각회전
  // eslint-disable-next-line no-return-assign
  useFrame(() => (mesh.current.rotation.y += 0.01)); // y방향회전

  return (
    <mesh ref={mesh} position={position} onClick={onClick} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1.5, 0.05]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Card;
