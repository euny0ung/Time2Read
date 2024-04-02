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
  const textures = textureLoader.load('maze/textures/grass-seamless-texture-tileable.webp');
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
  const [randomCluePositions, setRandomCluePositions] = useState([]);
  const [randomLifePositions, setRandomLifePositions] = useState([]);
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

  useEffect(() => {
    const shuffledCluePositions = [...cluePositions].sort(() => Math.random() - 0.5);
    const shuffledLifePositions = [...lifePositions].sort(() => Math.random() - 0.5);
    const selectedCluePositions = shuffledCluePositions.slice(0, 5);
    const selectedLifePositions = shuffledLifePositions.slice(0, 3);
    setRandomCluePositions(selectedCluePositions);
    setRandomLifePositions(selectedLifePositions);
  }, []);

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
      <Finish />
      <Clues cluePositions={randomCluePositions} />
      <Lifes lifePositions={randomLifePositions} />
      <Start textures={textures} />
    </>
  );
};

export const Floor = () => {
  return (
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
