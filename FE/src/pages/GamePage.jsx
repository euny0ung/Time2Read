import React, { Suspense, useState } from 'react';
import Maze, { Floor } from '@components/game/Maze';
import Overlay from '@components/game/Overlay';
import Player from '@components/game/Player';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const [isPlayerMode, setIsPlayerMode] = useState(true); // 1인칭, 3인칭 모드 전환. 테스트할 때 편하라고 만듦
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Canvas camera={{ position: [0, 10, 0] }}>
          {/* 환경 설정 */}
          {isPlayerMode ? <PointerLockControls /> : <OrbitControls />}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <axesHelper scale={10} />
          <gridHelper args={[50, 100]} />
          {/* 물리 엔진 적용 */}
          <Physics>
            <Suspense fallback={null}>
              <Floor />
              <Maze />
              {isPlayerMode && <Player />}
            </Suspense>
          </Physics>
        </Canvas>
        {/* 정보 표시 */}
        <Overlay />
        {/* 버튼 클릭으로 컨트롤 모드 전환 */}
        <button
          className="absolute top-2.5 left-2.5 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          onClick={() => setIsPlayerMode(!isPlayerMode)}
        >
          {isPlayerMode ? '3인칭 모드로 전환' : '1인칭 모드로 전환'}
        </button>
        <button
          className="absolute top-2.5 left-2.5 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          onClick={() => navigate('/scraps')}
        />
      </div>
    </>
  );
};

export default GamePage;
