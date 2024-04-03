import React, { Suspense, useState, useRef, useEffect } from 'react';
import AnswerCheckModal from '@components/commons/AnswerCheckModal';
import Maze, { Floor } from '@components/game/Maze';
import Overlay from '@components/game/Overlay';
import Player from '@components/game/Player';
import QuizModal from '@components/game/QuizModal.jsx';
import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useGameModalStore } from '@stores/game/gameStore.jsx';
import { useAnswerCheckStore } from '@stores/game/quizStore';
import GameOverModal from '../components/game/GameOverModal.jsx';
import ItemsOverlay from '../components/game/ItemsOverlay.jsx';
import StartModal from '../components/game/StartModal.jsx';
import Timer from '../components/game/Timer.jsx';

const GamePage = () => {
  const [isPlayerMode, setIsPlayerMode] = useState(true); // 1인칭, 3인칭 모드 전환. 테스트할 때 편하라고 만듦
  const openQuizModal = useGameModalStore((state) => state.openQuizModal);
  const openAnswerResult = useAnswerCheckStore((state) => state.openAnswerResult);
  const resultState = useAnswerCheckStore((state) => state.resultState);
  const quizIndex = useAnswerCheckStore((state) => state.quizIndex);
  const openGameOverModal = useGameModalStore((state) => state.openGameOverModal);
  const [isPointerLockEnabled, setIsPointerLockEnabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setIsPointerLockEnabled(!openQuizModal);
  }, [openQuizModal]);

  useEffect(() => {
    setIsPointerLockEnabled(!openGameOverModal);
  }, [openGameOverModal]);

  // 들어오자마자 openModal을 true로 하여 StartModal을 활성화시킨다.
  useEffect(() => {
    setOpenModal(true);
  }, []);

  console.log('openModal : ', openModal);

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Canvas camera={{ position: [0, 10, 0] }}>
          {/* 환경 설정 */}
          {isPointerLockEnabled && <PointerLockControls pointerSpeed={0.3} enabled={!openQuizModal} />}
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
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
        {/* <Overlay /> */}
        <ItemsOverlay />
        <Timer />
        {openModal && <StartModal onClose={() => setOpenModal(false)} />}
        {openQuizModal && <QuizModal quizIndex={quizIndex} />}
        {openGameOverModal && <GameOverModal />}

        {resultState !== '' && openAnswerResult && <AnswerCheckModal />}
      </div>
    </>
  );
};

export default GamePage;
