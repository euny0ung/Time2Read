import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { Vector3 } from 'three';
import usePersonControls from '../../hooks/usePersonControls.jsx';

const MOVE_SPEED = 5;
const JUMP_FORCE = 10;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

// 빨간 큐브. 방향키로 움직일 수 있음
const Player = () => {
  const playerRef = useRef(null);
  const { forward, backward, left, right } = usePersonControls();

  useFrame((state) => {
    if (!playerRef.current) return;

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

    // 카메라 위치 조정
    const { x, y, z } = playerRef.current.translation();
    state.camera.position.set(x + 0.1, y + 11, z + 0.1);
  });

  return (
    <>
      <RigidBody ref={playerRef} type="dynamic" mass={1} lockRotations>
        <mesh position={[0, 10, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
