import { useEffect, useState, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Clues = (cluePositions) => {
  const [clueList, setClueList] = useState([]);
  const gltfRef = useRef(null);
  const loader = new GLTFLoader();

  useEffect(() => {
    loader.load('clue/scene.gltf', (gltf) => {
      gltfRef.current = gltf;
      const newClueList = cluePositions.cluePositions.map((position, index) => {
        const instance = gltf.scene.clone();
        return <Clue instance={instance} position={position} key={index} />;
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
