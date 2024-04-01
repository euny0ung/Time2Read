import { useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Lifes = () => {
  const [lifeList, setLifeList] = useState([]);
  const loader = new GLTFLoader();
  const lifePositions = [
    [-6.5, 0.3, -9],
    [-6, 0.3, 3],
    [-4, 0.3, 6],
    [-1.3, 0.3, 1],
    [9, 0.3, 2.8],
    [3, 0.3, 8],
  ];
  const [randomLifePositions, setRandomLifePositions] = useState([]);

  useEffect(() => {
    const shuffledLifePositions = [...lifePositions].sort(() => Math.random() - 0.5);
    const selectedLifePositions = shuffledLifePositions.slice(0, 3);
    setRandomLifePositions(selectedLifePositions);
  }, []);

  useEffect(() => {
    loader.load('life/scene.gltf', (gltf) => {
      const newLifeList = randomLifePositions.map((position, index) => {
        const lifeInstance = gltf.scene.clone();
        return <Life instance={lifeInstance} position={position} key={index} />;
      });
      setLifeList(newLifeList);
    });
  }, [randomLifePositions]);

  return <>{lifeList}</>;
};

const Life = ({ instance, position }) => {
  return (
    <RigidBody name="life">
      <primitive object={instance} scale={0.004} position={position} />
    </RigidBody>
  );
};

export default Lifes;
