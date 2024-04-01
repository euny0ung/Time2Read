import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { RepeatWrapping, TextureLoader, SRGBColorSpace } from 'three';
import {
  Cat,
  DoorKnob,
  DodoBird,
  Caterpillar,
  CheshireCat,
  Rose,
  Flamingo,
  CardSoldier,
  HeartQueen,
  Rabbit,
  Finish,
  Start,
} from './Asset.jsx';
import Clues from './Clues.jsx';
import Lifes from './Lifes.jsx';
import { useVisibilityStore } from '../../stores/game/gameStore.jsx';

const MazeModel = () => {
  const { scene } = useGLTF('maze/scene.gltf');
  const textureLoader = new TextureLoader();
  const textures = textureLoader.load('maze/textures/grass-seamless-texture-tileable.jpg');
  const wallsBaseColor = textureLoader.load('maze/textures/ground/Stylized_Stone_Floor_005_basecolor.jpg');
  // const wallsHeightColor = textureLoader.load('maze/texture/ground/Stylized_Stone_Floor_005_height.png');
  // const wallsNormalColor = textureLoader.load('maze/texture/ground/Stylized_Stone_Floor_005_normal.jpg');
  // const wallsRoughColor = textureLoader.load('maze/textures/ground/Stylized_Stone_Floor_005_roughness.jpg');
  const wallsAmbientColor = textureLoader.load('maze/textures/ground/Stylized_Stone_Floor_005_ambientOcclusion.jpg');
  textures.colorSpace = SRGBColorSpace;
  wallsAmbientColor.colorSpace = SRGBColorSpace;
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

  useEffect(() => {
    textures.repeat.set(8, 8);
    textures.wrapS = RepeatWrapping; // 텍스처가 가로 방향으로 반복되도록 설정합니다.
    textures.wrapT = RepeatWrapping; // 텍스처가 세로 방향으로 반복되도록 설정합니다.

    wallsBaseColor.repeat.set(8, 8);
    wallsBaseColor.wrapS = RepeatWrapping;
    wallsBaseColor.wrapT = RepeatWrapping;

    wallsAmbientColor.repeat.set(8, 8);
    wallsAmbientColor.wrapS = RepeatWrapping;
    wallsAmbientColor.wrapT = RepeatWrapping;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.name === 'walls') {
          const { material } = child;
          material.map = textures;
          material.needsUpdate = true;
        } else if (child.material.name === 'ground') {
          const { material } = child;
          material.map = wallsBaseColor;

          // material.normalMap = wallsNormalColor;
          // material.displaceMap = wallsHeightColor;
          // material.specularMap = wallsRoughColor;
          material.aoMap = wallsAmbientColor;

          material.needsUpdate = true;
        }
      }
    });
  }, [scene, textures, wallsBaseColor]);

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
      <Clues />
      <Lifes />
      <Finish />
      <Start />
    </>
  );
};

export const Floor = () => {
  return (
    // <RigidBody type="static">
    <RigidBody type="fixed">
      <CuboidCollider args={[100, 0, 100]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[100, 0, 100]} />
          <meshStandardMaterial color={'lightgray'} />
        </mesh>
      </CuboidCollider>
    </RigidBody>
  );
};

export default MazeModel;
