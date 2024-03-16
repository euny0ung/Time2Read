import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

// const Model = ({ url, position, rotation, scale }) => {
//   const { scene } = useGLTF(url, true);
//   return <primitive object={scene} position={position} rotation={rotation} scale={scale} />;
// };

const MazeModel = () => {
  const { scene } = useGLTF("/maze/scene.gltf");

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
          <meshStandardMaterial color={"lightgray"} />
        </mesh>
      </CuboidCollider>
    </RigidBody>
  );
};

export default MazeModel;
