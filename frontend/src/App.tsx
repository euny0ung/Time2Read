import { Canvas } from '@react-three/fiber';

const App = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} wireframe />
      </mesh>
    </Canvas>
  );
};

export default App;
