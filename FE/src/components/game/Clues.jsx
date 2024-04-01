import { useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Clues = () => {
  console.log('Clues 컴포넌트 입장');
  const [clueList, setClueList] = useState([]);
  const loader = new GLTFLoader();
  const cluePositions = [
    [-9.3, 0.5, -7.5],
    [4.2, 0.5, -7.5],
    [1, 0.5, -1],
    [6.2, 0.5, -3],
    [-2.7, 0.5, 2],
    [-4.6, 0.5, 1],
    [-7.5, 0.5, 2.6],
    [-9, 0.5, 9],
    [9.3, 0.5, 9.3],
    [6, 0.5, 7.8],
  ];
  const [randomCluePositions, setRandomCluePositions] = useState([]);

  useEffect(() => {
    const shuffledCluePositions = [...cluePositions].sort(() => Math.random() - 0.5);
    const selectedCluePositions = shuffledCluePositions.slice(0, 5);
    setRandomCluePositions(selectedCluePositions);
  }, []);

  useEffect(() => {
    loader.load('clue/scene.gltf', (gltf) => {
      const newClueList = randomCluePositions.map((position, index) => {
        const clueInstance = gltf.scene.clone();
        return <Clue instance={clueInstance} position={position} key={index} />;
      });
      setClueList(newClueList);
    });
  }, [randomCluePositions]);

  return <>{clueList}</>;
};

const Clue = ({ instance, position }) => {
  return (
    <RigidBody name="clue">
      <primitive object={instance} scale={0.01} position={position} />
    </RigidBody>
  );
};

export default Clues;
