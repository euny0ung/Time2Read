import { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const Clues = () => {
  const cluePositions = [
    [-9.3, 0.3, -7.5],
    [4.2, 0.3, -7.5],
    [1, 0.3, -1],
    [6.2, 0.3, -3],
    [-2.7, 0.3, 2],
    [-4.6, 0.3, 1],
    [-7.5, 0.3, 2.6],
    [-9, 0.3, 9],
    [9.3, 0.3, 9.3],
    [6, 0.3, 7.8],
  ];
  const [randomCluePositions, setRandomCluePositions] = useState([]);
  const clue = useGLTF('clue/scene.gltf');
  useEffect(() => {
    // 배열을 복제하여 무작위로 섞음
    const shuffledCluePositions = [...cluePositions].sort(() => Math.random() - 0.5);
    // console.log('shuffledCluePositions : ', shuffledCluePositions);
    // 첫 번째부터 다섯 번째까지의 위치를 선택
    const selectedCluePositions = shuffledCluePositions.slice(0, 5);
    // console.log('selectedCluePositions : ', selectedCluePositions);
    setRandomCluePositions(selectedCluePositions);
  }, []);

  console.log(randomCluePositions);

  return (
    // <RigidBody name="clue" position={position}>
    //   <primitive object={clue.scene} scale={0.01} />
    // </RigidBody>
    randomCluePositions.map((position, index) => {
      console.log('position : ', position);
      return (
        <RigidBody key={index} position={position}>
          <primitive object={clue.scene} scale={0.01} />
        </RigidBody>
      );
    })
  );
};

export default Clues;
