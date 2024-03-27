import React, { Suspense, useState } from 'react';
import AnswerCheckModal from '@components/commons/AnswerCheckModal';
import ClueCountStateModal from '@components/commons/ClueCountStateModal';
import Maze, { Floor } from '@components/game/Maze';
import Overlay from '@components/game/Overlay';
import Player from '@components/game/Player';
import QuizModal from '@components/game/QuizModal.jsx';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useAnswerCheckStore, useClueStateStore } from '@stores/game/quizStore';
import GameOverModal from '../components/game/GameOverModal.jsx';
import Items from '../components/game/Items.jsx';
import Timer from '../components/game/Timer.jsx';
import { useGameModalStore } from '../stores/game/gameStore.jsx';

const GamePage = () => {
  const [isPlayerMode, setIsPlayerMode] = useState(true); // 1인칭, 3인칭 모드 전환. 테스트할 때 편하라고 만듦
  const openQuizModal = useGameModalStore((state) => state.openQuizModal);
  const openAnswerResult = useAnswerCheckStore((state) => state.openAnswerResult);
  const resultState = useAnswerCheckStore((state) => state.resultState);
  const quizIndex = useAnswerCheckStore((state) => state.quizIndex);
  const openGameOverModal = useGameModalStore((state) => state.openGameOverModal);
  const showClueState = useClueStateStore((state) => state.showClueState);

  console.log('openGameOverModal : ', openGameOverModal);
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Canvas camera={{ position: [0, 10, 0] }}>
          {/* 환경 설정 */}
          {isPlayerMode ? <PointerLockControls enabled={!openQuizModal} /> : <OrbitControls />}
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

        <Items />
        <Timer />
        {openQuizModal && <QuizModal quizIndex={quizIndex} />}
        {openGameOverModal && <GameOverModal />}

        {/* 버튼 클릭으로 컨트롤 모드 전환 */}
        {/* <button
          className="absolute top-2.5 left-2.5 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          onClick={() => setIsPlayerMode(!isPlayerMode)}
        >
          {isPlayerMode ? '3인칭 모드로 전환' : '1인칭 모드로 전환'}
<<<<<<< 73d660482b5da379064e19d91bb1d341d8c75ce9
        </button>
        {showClueState && <ClueCountStateModal />}
=======
        </button> */}

>>>>>>> 4a3d477e4e2f8b3030555a497425d8d70c88e864
        {resultState !== '' && openAnswerResult && <AnswerCheckModal />}
      </div>
    </>
  );
};

export default GamePage;
