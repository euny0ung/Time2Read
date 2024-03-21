import { useEffect, useState, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { RepeatWrapping, TextureLoader, SRGBColorSpace } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MazeModel = () => {
  const { scene } = useGLTF('maze/scene.gltf');
  const textureLoader = new TextureLoader();
  const textures = textureLoader.load('maze/textures/grass-seamless-texture-tileable.jpg');
  textures.colorSpace = SRGBColorSpace;
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
  const lifePositions = [
    [-6.5, 0.2, -9],
    [-6, 0.2, 3],
    [-4, 0.2, 6],
    [-1.3, 0.2, 1],
    [9, 0.2, 2.8],
    [3, 0.2, 8],
  ];
  const loader = new GLTFLoader();
  const [randomCluePositions, setRandomCluePositions] = useState([]);
  const [randomLifePositions, setrandomLifePositions] = useState([]);
  // cluePosition에 10가지 좌표를 넣어놓고 랜덤을 돌려서 5개를 뽑은 다음에 해당 5개를 map을 이용해서 rendering하는 것

  // 처음 한번만 실행
  useEffect(() => {
    // 배열을 복제하여 무작위로 섞음
    const shuffledCluePositions = [...cluePositions].sort(() => Math.random() - 0.5);
    const shuffledLifePositions = [...lifePositions].sort(() => Math.random() - 0.5);
    // console.log('shuffledCluePositions : ', shuffledCluePositions);
    // 첫 번째부터 다섯 번째까지의 위치를 선택
    const selectedCluePositions = shuffledCluePositions.slice(0, 5);
    const selectedLifePositions = shuffledLifePositions.slice(0, 3);
    // console.log('selectedCluePositions : ', selectedCluePositions);
    setRandomCluePositions(selectedCluePositions);
    setrandomLifePositions(selectedLifePositions);
  }, []);

  useEffect(() => {
    textures.repeat.set(8, 8);
    textures.wrapS = RepeatWrapping; // 텍스처가 가로 방향으로 반복되도록 설정합니다.
    textures.wrapT = RepeatWrapping; // 텍스처가 세로 방향으로 반복되도록 설정합니다.

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.name === 'walls' || child.material.name === 'ground') {
          const { material } = child;
          material.map = textures;
          material.needsUpdate = true;
        }
      }
    });
  }, [scene, textures]);

  const ClueLoader = () => {
    const [clueList, setClueList] = useState([]);
    const gltfRef = useRef(null);

    useEffect(() => {
      loader.load('clue/scene.gltf', (gltf) => {
        gltfRef.current = gltf;
        const newClueList = randomCluePositions.map((position, index) => {
          const instance = gltf.scene.clone();
          return <Clue instance={instance} position={position} key={index} />;
        });
        setClueList(newClueList);
      });
    }, [randomCluePositions]);

    return <>{clueList}</>;
  };

  const LifeLoader = () => {
    const [lifeList, setLifeList] = useState([]);
    const gltfRef = useRef(null);

    useEffect(() => {
      loader.load('cookie/scene.gltf', (gltf) => {
        gltfRef.current = gltf;
        const newLifeList = randomLifePositions.map((position, index) => {
          return <Life instance={gltf.scene.clone()} position={position} key={index} />;
        });
        setLifeList(newLifeList);
      });
    }, [randomLifePositions]);

    return <>{lifeList}</>;
  };

  return (
    <>
      <RigidBody colliders="trimesh">
        <primitive object={scene} />
      </RigidBody>
      <Cat />
      <DoorKnob />
      <DodoBird />
      <Caterpillar />
      <CheshireCat />
      <Rose />
      <Flamingo />
      <CardSoldier />
      <HeartQueen />
      <Rabbit />
      <ClueLoader />
      <LifeLoader />
    </>
  );
};

export const Floor = () => {
  return (
    <RigidBody type="static">
      <CuboidCollider args={[100, 0, 100]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[100, 0, 100]} />
          <meshStandardMaterial color={'lightgray'} />
        </mesh>
      </CuboidCollider>
    </RigidBody>
  );
};

export const Cat = () => {
  const cat = useGLTF('cat/scene.gltf');

  return (
    <>
      <RigidBody name="cat">
        <primitive object={cat.scene} scale={0.002} position={[-1, 0, -10]} />
      </RigidBody>
    </>
  );
};

export const DoorKnob = () => {
  const doorKnob = useGLTF('doorknob/scene.gltf');
  return (
    <RigidBody name="doorKnob">
      <primitive object={doorKnob.scene} scale={0.1} position={[-2.5, 3, -4.2]} />
    </RigidBody>
  );
};

export const DodoBird = () => {
  const dodoBird = useGLTF('dodobird/scene.gltf');
  return (
    <RigidBody name="dodoBird">
      <primitive object={dodoBird.scene} scale={0.12} position={[-9.3, 1, -6]} />
    </RigidBody>
  );
};

export const Caterpillar = () => {
  const caterpillar = useGLTF('caterpillar/scene.gltf');
  return (
    <RigidBody name="caterpillar">
      <primitive object={caterpillar.scene} scale={20} position={[-7.5, 1, -2.5]} />
    </RigidBody>
  );
};

export const CheshireCat = () => {
  const cheshireCat = useGLTF('cheshirecat/scene.gltf');
  return (
    <RigidBody name="chesireCat">
      <primitive object={cheshireCat.scene} scale={0.01} position={[-4.5, 0, 4]} />
    </RigidBody>
  );
};

export const Rose = () => {
  const rose = useGLTF('rose/scene.gltf');
  return (
    <RigidBody name="rose">
      <primitive object={rose.scene} scale={0.03} position={[4.5, 0, 0.7]} />
    </RigidBody>
  );
};

export const Flamingo = () => {
  const flamingo = useGLTF('flamingo/scene.gltf');
  return (
    <RigidBody name="flamingo">
      <primitive object={flamingo.scene} scale={0.05} position={[7.8, 1, 9.5]} />
    </RigidBody>
  );
};

export const CardSoldier = () => {
  const cardsoldier = useGLTF('cardsoldier/cardsoldier.gltf');
  return (
    <RigidBody name="cardSoldier">
      <primitive object={cardsoldier.scene} scale={0.2} position={[7.5, 2, -6]} />
    </RigidBody>
  );
};

export const HeartQueen = () => {
  const heartQueen = useGLTF('heartqueen/hartqueen.gltf');
  return (
    <RigidBody name="heartQueen">
      <primitive object={heartQueen.scene} scale={0.2} position={[3, 1.03, 6]} />
    </RigidBody>
  );
};

export const Rabbit = () => {
  const rabbit = useGLTF('rabbit/rabbit.gltf');
  return (
    <RigidBody name="rabbit">
      <primitive object={rabbit.scene} scale={0.2} position={[0.8, 0.5, 10]} />
    </RigidBody>
  );
};

export const Clue = ({ instance, position }) => {
  return (
    <RigidBody name="clue">
      <primitive object={instance} scale={0.01} position={position} />
    </RigidBody>
  );
};

export const Life = ({ instance, position }) => {
  return (
    <RigidBody name="life">
      <primitive object={instance} scale={4} position={position} />
    </RigidBody>
  );
};

export default MazeModel;
