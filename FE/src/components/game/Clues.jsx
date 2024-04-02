import { useEffect, useState, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Clues = (cluePositions) => {
  const [clueList, setClueList] = useState([]);
  const gltfRef = useRef(null);
  const loader = new GLTFLoader();

  const dracoLoader = new DRACOLoader(); // DRACOLoader 인스턴스 생성
  dracoLoader.setDecoderPath('/draco/gltf/'); // DRACO 디코더 파일들의 경로를 설정
  loader.setDRACOLoader(dracoLoader); // GLTFLoader에 DRACOLoader 설정

  useEffect(() => {
    loader.load('clue/scene.glb', (gltf) => {
      gltfRef.current = gltf;
      const newClueList = cluePositions.cluePositions.map((position, index) => {
        const instance = gltf.scene.clone();
        return <Clue instance={instance} position={position} key={index} />;
      });
      console.log('newClueList: ', newClueList);
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
