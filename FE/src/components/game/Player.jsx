import { useRef, useState, useEffect } from 'react';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { Vector3 } from 'three';
import usePersonControls from '../../hooks/usePersonControls.jsx';
import {
  useGameModalStore,
  useGameItemStore,
  useVisibilityStore,
  checkCollidedStore,
} from '../../stores/game/gameStore.jsx';

const MOVE_SPEED = 3;
const JUMP_FORCE = 10;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

/// //////////////
// 나중에 hooks 파일로 옮길 것. player를 WADS키와 spacebar로 제어하는 함수
// 현재 right가 안되는 현상 발견
// 혜진이 누나 오면 질문 (현재 플레이어가 움직이는건 빨간 상자가 움직이는건지 아니면 카메라가 움직이는건지)

// 미로 벽 막혔는지 테스트할 용도로 만들어놓은 빨간 큐브. 방향키로 움직일 수 있음
const Player = () => {
  const playerRef = useRef(null);
  const [initialCameraPositionSet, setInitialCameraPositionSet] = useState(false);
  const { collidedItem, setCollidedItem } = checkCollidedStore();
  const {
    isBumped,
    openQuizModal,
    openGameOverModal,
    isOver,
    setBumped,
    setOpenQuizModal,
    setOpenGameOverModal,
    setGameOver,
  } = useGameModalStore();
  const { lifeCount, increaseLifeCount, increaseClueCount } = useGameItemStore();
  const { forward, backward, left, right, jump } = usePersonControls();
  const {
    setCatVisible,
    setDoorKnobVisible,
    setDodoBirdVisible,
    setCaterpillarVisible,
    setCheshireCatVisible,
    setRoseVisible,
    setFlamingoVisible,
    setCardSoldierVisible,
    setHeartQueenVisible,
    setRabbitVisible,
  } = useVisibilityStore();
  const rapier = useRapier();
  const assetArray = [
    'cat',
    'doorKnob',
    'dodoBird',
    'caterpillar',
    'cheshireCat',
    'rose',
    'flamingo',
    'cardSoldier',
    'heartQueen',
    'rabbit',
  ];

  const showModal = () => {
    if (isBumped && !openQuizModal) {
      document.exitPointerLock();
      setOpenQuizModal(true);
    }
  };

  const showAsset = (name) => {
    if (name === 'cat') setCatVisible(false);
    if (name === 'doorKnob') setDoorKnobVisible(false);
    if (name === 'dodoBird') setDodoBirdVisible(false);
    if (name === 'caterpillar') setCaterpillarVisible(false);
    if (name === 'cheshireCat') setCheshireCatVisible(false);
    if (name === 'rose') setRoseVisible(false);
    if (name === 'flamingo') setFlamingoVisible(false);
    if (name === 'cardSoldier') setCardSoldierVisible(false);
    if (name === 'heartQueen') setHeartQueenVisible(false);
    if (name === 'rabbit') setRabbitVisible(false);
  };

  useEffect(() => {
    showModal();
  }, [isBumped]);

  // lifeCount의 변화를 추적하면서 life가 0이 되면 게임종료 모달이 나오도록 한다.
  const showGameOverModal = () => {
    if (isOver && !openGameOverModal) {
      setOpenGameOverModal(true);
    }
  };

  useEffect(() => {
    showGameOverModal();
  }, [isOver]);

  useEffect(() => {
    if (lifeCount === 0) {
      setOpenQuizModal(false);
      setGameOver(true);
    }
  }, [lifeCount]);

  useFrame((state) => {
    if (!playerRef.current) return;
    if (openQuizModal) return;

    // 상하좌우
    const velocity = playerRef.current.linvel();

    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyEuler(state.camera.rotation);

    playerRef.current.wakeUp();
    playerRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    // 점프(플레이어의 위치에서 아래로 향하는 광선을 발사하여 그라운드 체크-> 광선이 지면과 충돌한다면? 플레이어는 점프를 할 수 있는 상태)
    const { world } = rapier;
    const ray = world.castRay(new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 }));
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1;

    const doJump = () => {
      playerRef.current.setLinvel({ x: 0, y: JUMP_FORCE, z: 0 });
    };

    if (jump && grounded) doJump();

    // 카메라 위치 조정
    const { x, y, z } = playerRef.current.translation();
    state.camera.position.set(x - 1, y + 1, z - 13);

    if (!initialCameraPositionSet) {
      state.camera.lookAt(-0.8, 0.2, -10);
      setInitialCameraPositionSet(true);
    }
  });

  return (
    <>
      <RigidBody
        ref={playerRef}
        type="dynamic"
        mass={0}
        lockRotations
        name="player"
        onCollisionEnter={({ other }) => {
          const target = other.rigidBodyObject;
          if (!collidedItem.includes(target.uuid)) {
            const updateCollision = [...collidedItem, target.uuid];
            setCollidedItem(updateCollision);
            if (assetArray.includes(target.name)) {
              setBumped(true);
              showAsset(target.name);
            } else if (target.name === 'endPoint') {
              setGameOver(true);
            } else if (target.name === 'clue') {
              console.log('clue와 충돌');
              increaseClueCount();
              if (target.parent) {
                target.parent.remove(target);
              }
              target.remove();
            } else if (target.name === 'life') {
              console.log('cookie와 충돌');
              increaseLifeCount();
              if (target.parent) {
                target.parent.remove(target);
              }
              target.remove();
            }
          }
        }}
        onCollisionExit={({ other }) => {
          const target = other.rigidBodyObject;
          if (assetArray.includes(target.name)) {
            setBumped(false);
          }
        }}
      >
        <mesh position={[-1, 0, -13]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
