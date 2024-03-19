import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { RepeatWrapping, TextureLoader, SRGBColorSpace } from 'three';

// const Model = ({ url, position, rotation, scale }) => {
//   const { scene } = useGLTF(url, true);
//   return <primitive object={scene} position={position} rotation={rotation} scale={scale} />;
// };

const MazeModel = () => {
  const { scene } = useGLTF('maze/scene.gltf');
  const textureLoader = new TextureLoader();
  const textures = textureLoader.load('maze/textures/grass-seamless-texture-tileable.jpg');
  textures.colorSpace = SRGBColorSpace;

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

  return (
    <>
      <RigidBody colliders="trimesh">
        <primitive object={scene} />
      </RigidBody>
      <Cat />
      <DoorKnob />
      <DoDoBird />
      <Caterpillar />
      <CheshireCat />
      <Rose />
      <Flamingo />
      <CardSoldier />
      <HeartQueen />
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
  // console.log(cat);
  return (
    <RigidBody>
      <primitive object={cat.scene} scale={0.001} position={[-1, 0, -10]} />
    </RigidBody>
  );
};

export const DoorKnob = () => {
  const doorKnob = useGLTF('doorknob/scene.gltf');
  return (
    <RigidBody>
      <primitive object={doorKnob.scene} scale={0.1} position={[-2.5, 3, -4.2]} />
    </RigidBody>
  );
};

export const DoDoBird = () => {
  const dodoBird = useGLTF('dodobird/scene.gltf');
  return (
    <RigidBody>
      <primitive object={dodoBird.scene} scale={0.12} position={[-9, 1.01, -5]} />
      {/* <axesHelper scale={10} /> */}
    </RigidBody>
  );
};

export const Caterpillar = () => {
  const caterpillar = useGLTF('caterpillar/scene.gltf');
  return (
    <RigidBody>
      <primitive object={caterpillar.scene} scale={20} position={[-7.5, 1, -2.5]} />
      {/* <axesHelper scale={10} /> */}
    </RigidBody>
  );
};

export const CheshireCat = () => {
  const cheshireCat = useGLTF('cheshirecat/scene.gltf');
  return (
    <RigidBody>
      <primitive object={cheshireCat.scene} scale={0.01} position={[-4.5, 0, 4]} />
      {/* <axesHelper scale={10} /> */}
    </RigidBody>
  );
};

export const Rose = () => {
  const rose = useGLTF('rose/scene.gltf');
  return (
    <RigidBody>
      <primitive object={rose.scene} scale={0.03} position={[4.5, 0, 0.7]} />
      {/* <axesHelper scale={10} /> */}
    </RigidBody>
  );
};

export const Flamingo = () => {
  const flamingo = useGLTF('flamingo/scene.gltf');
  return (
    <RigidBody>
      <primitive object={flamingo.scene} scale={0.05} position={[7.8, 1, 9.5]} />
      {/* <axesHelper scale={10} /> */}
    </RigidBody>
  );
};

export const CardSoldier = () => {
  const cardsoldier = useGLTF('cardsoldier/cardsoldier.gltf');
  return (
    <RigidBody>
      <primitive object={cardsoldier.scene} scale={0.2} position={[7.5, 2, -6]} />
    </RigidBody>
  );
};

export const HeartQueen = () => {
  const heartQueen = useGLTF('heartqueen/hartqueen.gltf');
  return (
    <RigidBody>
      <primitive object={heartQueen.scene} scale={0.2} position={[0.8, 1.03, 10]} />
    </RigidBody>
  );
};

export default MazeModel;
