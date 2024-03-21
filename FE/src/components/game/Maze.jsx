import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { RepeatWrapping, TextureLoader, SRGBColorSpace } from 'three';

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
    </>
  );
};

export const Floor = () => {
  return (
    <RigidBody type="static">
      <CuboidCollider args={[10, 0, 10]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[10, 0, 10]} />
          <meshStandardMaterial color={'lightgray'} />
        </mesh>
      </CuboidCollider>
    </RigidBody>
  );
};

export default MazeModel;
