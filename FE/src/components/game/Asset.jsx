import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { SRGBColorSpace, TextureLoader, RepeatWrapping } from 'three';

export const Cat = () => {
  const cat = useGLTF('cat/scene.glb');
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
  const doorKnob = useGLTF('doorknob/scene.glb');
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
  const dodoBird = useGLTF('dodobird/scene.glb');
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
      <primitive object={dodoBird.scene} scale={0.15} position={[-8.9, 0.8, -6]} />
    </RigidBody>
  );
};

export const Caterpillar = () => {
  const caterpillar = useGLTF('caterpillar/scene.glb');
  return (
    <RigidBody name="caterpillar">
      <primitive object={caterpillar.scene} scale={25} position={[-7.5, 1, -2.1]} />
    </RigidBody>
  );
};

export const CheshireCat = () => {
  const cheshireCat = useGLTF('cheshirecat/scene.glb');
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
    </RigidBody>
  );
};

export const Rose = () => {
  const rose = useGLTF('rose/scene.glb');
  return (
    <RigidBody name="rose">
      <primitive object={rose.scene} scale={0.03} position={[4.5, 0.5, 0.7]} />
    </RigidBody>
  );
};

export const Flamingo = () => {
  const flamingo = useGLTF('flamingo/scene.glb');
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
  const cardsoldier = useGLTF('cardsoldier/cardsoldier.glb');
  const rotateCardSoldier = () => {
    if (cardsoldier.scene) {
      cardsoldier.scene.rotation.y = (Math.PI / 2) * -1;
    }
  };
  useEffect(() => {
    rotateCardSoldier();
  }, []);
  return (
    <RigidBody name="cardSoldier">
      <primitive object={cardsoldier.scene} scale={0.2} position={[7.5, 2, -5.6]} />
    </RigidBody>
  );
};

export const HeartQueen = () => {
  const heartQueen = useGLTF('heartqueen/heartqueen.glb');
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
      <primitive object={heartQueen.scene} scale={0.2} position={[3, 1.02, 6]} />
    </RigidBody>
  );
};

export const Rabbit = () => {
  const rabbit = useGLTF('rabbit/rabbit.glb');
  const rotateRabbit = () => {
    if (rabbit.scene) {
      rabbit.scene.rotation.y = Math.PI;
    }
  };
  useEffect(() => {
    rotateRabbit();
  }, []);
  return (
    <RigidBody name="rabbit">
      <primitive object={rabbit.scene} scale={0.3} position={[0.8, 1, 9.5]} />
    </RigidBody>
  );
};

export const Finish = () => {
  return (
    <>
      <RigidBody name="endPoint" type="fixed">
        <mesh position={[0.85, 1.51, 11]}>
          <boxGeometry args={[1.3, 3, 0.2]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody name="endPoint" type="fixed">
        <mesh position={[1.6, 1.51, 10.6]}>
          <boxGeometry args={[0.1, 3, 1]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody name="endPoint" type="fixed">
        <mesh position={[0.1, 1.51, 10.6]}>
          <boxGeometry args={[0.1, 3, 1]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0} />
        </mesh>
      </RigidBody>
    </>
  );
};

export const Start = () => {
  const textures = useLoader(TextureLoader, 'maze/textures/grass-seamless-texture-tileable.webp');

  useEffect(() => {
    textures.repeat.set(1, 1);
    textures.wrapS = RepeatWrapping; // 텍스처가 가로 방향으로 반복
    textures.wrapT = RepeatWrapping; // 텍스처가 세로 방향으로 반복
  }, [textures]);

  textures.colorSpace = SRGBColorSpace;
  return (
    <>
      <RigidBody type="fixed">
        <mesh position={[-0.85, 1.51, -15]}>
          <boxGeometry args={[2, 3, 0.2]} />
          <meshBasicMaterial map={textures} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[-1.6, 1.51, -12.6]}>
          <boxGeometry args={[0.1, 3, 5]} />
          <meshBasicMaterial map={textures} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[0.11, 1.51, -12.6]}>
          <boxGeometry args={[0.1, 3, 5]} />
          <meshBasicMaterial map={textures} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[-0.85, 9.51, -15]}>
          <boxGeometry args={[2, 13, 0.2]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[-1.6, 9.51, -12.6]}>
          <boxGeometry args={[0.1, 13, 5]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[0.11, 9.51, -12.6]}>
          <boxGeometry args={[0.1, 13, 5]} />
          <meshStandardMaterial color={0xff0000} transparent opacity={0} />
        </mesh>
      </RigidBody>
    </>
  );
};
