import { useEffect, useState, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { RepeatWrapping, TextureLoader, SRGBColorSpace } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useVisibilityStore } from '../../stores/game/gameStore.jsx';

const MazeModel = () => {
  const { scene } = useGLTF('maze/scene.gltf');
  const textureLoader = new TextureLoader();
  const textures = textureLoader.load('maze/textures/grass-seamless-texture-tileable.jpg');
  textures.colorSpace = SRGBColorSpace;
  const {
    catVisible,
    doorKnobVisible,
    dodoBirdVisible,
    caterpillarVisible,
    cheshireCatVisible,
    roseVisible,
    flamingoVisible,
    cardSoldierVisible,
    heartQueenVisible,
    rabbitVisible,
  } = useVisibilityStore();
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
      {catVisible && <Cat />}
      {doorKnobVisible && <DoorKnob />}
      {dodoBirdVisible && <DodoBird />}
      {caterpillarVisible && <Caterpillar />}
      {cheshireCatVisible && <CheshireCat />}
      {roseVisible && <Rose />}
      {flamingoVisible && <Flamingo />}
      {cardSoldierVisible && <CardSoldier />}
      {heartQueenVisible && <HeartQueen />}
      {rabbitVisible && <Rabbit />}
      <Finish />
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
  const rotateCat = () => {
    if (cat.scene) {
      cat.scene.rotation.y = Math.PI; // y축을 기준으로 180도 회전
    }
  };
  useEffect(() => {
    rotateCat(); // 컴포넌트가 렌더링된 후에 실행되도록 함
  }, []); // 한 번만 실행
  return (
    <>
      <RigidBody name="cat">
        <primitive object={cat.scene} scale={0.003} position={[-0.8, 0.2, -10]} />
      </RigidBody>
    </>
  );
};

export const DoorKnob = () => {
  const doorKnob = useGLTF('doorknob/scene.gltf');
  const rotatedoorKnob = () => {
    if (doorKnob.scene) {
      doorKnob.scene.rotation.x = Math.PI / 2; // y축을 기준으로 180도 회전
      doorKnob.scene.rotation.y = Math.PI;
    }
  };
  useEffect(() => {
    rotatedoorKnob(); // 컴포넌트가 렌더링된 후에 실행되도록 함
  }, []); // 한 번만 실행
  return (
    <RigidBody name="doorKnob" allowSleep={false}>
      <primitive object={doorKnob.scene} scale={0.3} position={[-2.5, 4, -4.2]} />
    </RigidBody>
  );
};

export const DodoBird = () => {
  const dodoBird = useGLTF('dodobird/scene.gltf');
  const rotateDodoBird = () => {
    if (dodoBird.scene) {
      dodoBird.scene.rotation.y = Math.PI / 2;
    }
  };
  useEffect(() => {
    rotateDodoBird(); // 컴포넌트가 렌더링된 후에 실행되도록 함
  }, []); // 한 번만 실행
  return (
    <RigidBody name="dodoBird">
      <primitive object={dodoBird.scene} scale={0.12} position={[-8.9, 1, -6]} />
    </RigidBody>
  );
};

export const Caterpillar = () => {
  const caterpillar = useGLTF('caterpillar/scene.gltf');
  return (
    <RigidBody name="caterpillar">
      <primitive object={caterpillar.scene} scale={25} position={[-7.5, 1, -2.1]} />
    </RigidBody>
  );
};

export const CheshireCat = () => {
  const cheshireCat = useGLTF('cheshirecat/scene.gltf');
  const rotateCheshireCat = () => {
    if (cheshireCat.scene) {
      cheshireCat.scene.rotation.y = Math.PI;
    }
  };
  useEffect(() => {
    rotateCheshireCat();
  }, []);
  return (
    <RigidBody name="cheshireCat">
      <primitive object={cheshireCat.scene} scale={0.016} position={[-4, 0.4, 2.8]} />
      {/* <axesHelper scale={10} /> */}
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
  const rotateFlamingo = () => {
    if (flamingo.scene) {
      flamingo.scene.rotation.y = Math.PI;
    }
  };
  useEffect(() => {
    rotateFlamingo();
  }, []);
  return (
    <RigidBody name="flamingo">
      <primitive object={flamingo.scene} scale={0.05} position={[7.3, 1, 9]} />
    </RigidBody>
  );
};

export const CardSoldier = () => {
  const cardsoldier = useGLTF('cardsoldier/cardsoldier.gltf');
  const rotateCardSoldier = () => {
    if (cardsoldier.scene) {
      cardsoldier.scene.rotation.y = (Math.PI / 2) * -1;
    }
  };
  useEffect(() => {
    rotateCardSoldier(); // 컴포넌트가 렌더링된 후에 실행되도록 함
  }, []); // 한 번만 실행
  return (
    <RigidBody name="cardSoldier">
      <primitive object={cardsoldier.scene} scale={0.2} position={[7.5, 2, -5.6]} />
    </RigidBody>
  );
};

export const HeartQueen = () => {
  const heartQueen = useGLTF('heartqueen/hartqueen.gltf');
  const rotateHeartQueen = () => {
    if (heartQueen.scene) {
      heartQueen.scene.rotation.y = Math.PI / 2;
    }
  };
  useEffect(() => {
    rotateHeartQueen();
  }, []);
  return (
    <RigidBody name="heartQueen">
      <primitive object={heartQueen.scene} scale={0.2} position={[3, 1.03, 6]} />
    </RigidBody>
  );
};

export const Rabbit = () => {
  const rabbit = useGLTF('rabbit/rabbit.gltf');
  const rotateRabbit = () => {
    if (rabbit.scene) {
      rabbit.scene.rotation.y = Math.PI;
    }
  };
  useEffect(() => {
    rotateRabbit(); // 컴포넌트가 렌더링된 후에 실행되도록 함
  }, []); // 한 번만 실행
  return (
    <RigidBody name="rabbit">
      <primitive object={rabbit.scene} scale={0.3} position={[0.8, 1, 9.5]} />
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

export const Finish = () => {
  return (
    <>
      <RigidBody name="endPoint" mass={1000000}>
        <mesh position={[0.85, 1.51, 11]}>
          <boxGeometry args={[1.3, 3, 0.2]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0.5} />
        </mesh>
      </RigidBody>
      <RigidBody name="endPoint" mass={1000000}>
        <mesh position={[1.6, 1.51, 10.6]}>
          <boxGeometry args={[0.1, 3, 1]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0.5} />
        </mesh>
      </RigidBody>
      <RigidBody name="endPoint" mass={1000000}>
        <mesh position={[0.1, 1.51, 10.6]}>
          <boxGeometry args={[0.1, 3, 1]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0.5} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default MazeModel;
