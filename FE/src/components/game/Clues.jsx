import { useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Clues = (cluePositions) => {
  const [clueList, setClueList] = useState([]);
  const loader = new GLTFLoader();

  useEffect(() => {
    loader.load('clue/scene.gltf', (gltf) => {
      const newClueList = cluePositions.cluePositions.map((position, index) => {
        const clueInstance = gltf.scene.clone();
        return <Clue instance={clueInstance} position={position} key={index} />;
      });
      setClueList(newClueList);
    });
  }, [cluePositions]);

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
