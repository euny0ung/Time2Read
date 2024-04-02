import { useEffect, useState, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Lifes = (lifePositions) => {
  const [lifeList, setLifeList] = useState([]);
  const gltfRef = useRef(null);
  const loader = new GLTFLoader();

  useEffect(() => {
    loader.load('life/scene.glb', (gltf) => {
      gltfRef.current = gltf;
      const newLifeList = lifePositions.lifePositions.map((position, index) => {
        const instance = gltf.scene.clone();
        return <Life instance={instance} position={position} key={index} />;
      });
      setLifeList(newLifeList);
    });
  }, [lifePositions]);

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
