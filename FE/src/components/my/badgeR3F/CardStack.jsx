// CardStack.js
import { Canvas } from '@react-three/fiber';
import Card from './Card.jsx';

const cardData = [
  {
    name: 'Don Joel111',
    position: 'Web Developer',
    email: 'donjoel@example.com',
    phone: '216-362-0665',
    address: '2699 Glenwood Avenue',
    city: 'Brook Park, OH 44142',
  },
  {
    name: '혜진',
    position: 'Web Developer',
    email: 'donjoel@example.com',
    phone: '216-362-0665',
    address: '2699 Glenwood Avenue',
    city: 'Brook Park, OH 44142',
  },
  {
    name: '사람',
    position: 'Web Developer',
    email: 'donjoel@example.com',
    phone: '216-362-0665',
    address: '2699 Glenwood Avenue',
    city: 'Brook Park, OH 44142',
  },
  // 추가 데이터...
];

const CardStack = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {cardData.map((card, i) => (
        <Card
          key={i}
          position={[i * 2, 0, 0]} // 예제 위치, 실제로는 다양한 위치에 배치해야 합니다.
          color={card.color} // 카드 색상
          onClick={() => console.log(`Card ${i} clicked`)} // 카드 클릭 이벤트
        />
      ))}
    </Canvas>
  );
};

export default CardStack;
