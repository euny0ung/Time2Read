import { useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Lifes = (lifePositions) => {
  const [lifeList, setLifeList] = useState([]);
  const loader = new GLTFLoader();

  useEffect(() => {
    loader.load('cookie/scene.gltf', (gltf) => {
      const newLifeList = lifePositions.lifePositions.map((position, index) => {
        const lifeInstance = gltf.scene.clone();
        return <Life instance={lifeInstance} position={position} key={index} />;
      });
      setLifeList(newLifeList);
    });
  }, [lifePositions]);

  return <>{lifeList}</>;
};

const Life = ({ instance, position }) => {
  return (
    <RigidBody name="life">
      <primitive object={instance} scale={3} position={position} />
    </RigidBody>
  );
};

export default Lifes;
