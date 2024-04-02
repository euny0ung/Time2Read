import { useEffect, useState, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Lifes = (lifePositions) => {
  const [lifeList, setLifeList] = useState([]);
  const gltfRef = useRef(null);
  const loader = new GLTFLoader();
  // C:\Users\SSAFY\Desktop\React\S10P22B307\FE\node_modules\three\examples\jsm\libs\draco\gltf
  const dracoLoader = new DRACOLoader(); // DRACOLoader 인스턴스 생성
  dracoLoader.setDecoderPath('/draco/gltf/'); // DRACO 디코더 파일들의 경로를 설정
  loader.setDRACOLoader(dracoLoader); // GLTFLoader에 DRACOLoader 설정

  useEffect(() => {
    loader.load('life/scene.gltf', (gltf) => {
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
