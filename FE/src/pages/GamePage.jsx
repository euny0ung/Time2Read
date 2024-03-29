import React, { Suspense, useState, useRef, useEffect } from 'react';
import AnswerCheckModal from '@components/commons/AnswerCheckModal';
import Maze, { Floor } from '@components/game/Maze';
import Overlay from '@components/game/Overlay';
import Player from '@components/game/Player';
import QuizModal from '@components/game/QuizModal.jsx';
import { PointerLockControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useAnswerCheckStore } from '@stores/game/quizStore';
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
  const [isPointerLockEnabled, setIsPointerLockEnabled] = useState(true);

  useEffect(() => {
    setIsPointerLockEnabled(!openQuizModal);
  }, [openQuizModal]);

  // useEffect(() => {
  //   const handlePointerLockChange = () => {
  //     setIsPointerLockEnabled(document.pointerLockElement !== null);
  //   };

  //   document.addEventListener('pointerlockchange', handlePointerLockChange);

  //   return () => {
  //     document.removeEventListener('pointerlockchange', handlePointerLockChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   // 상태 변경 여부 확인
  //   if (document.pointerLockElement !== null && !openQuizModal) {
  //     setIsPointerLockEnabled(true);
  //   } else if (document.pointerLockElement === null && openQuizModal) {
  //     setIsPointerLockEnabled(false);
  //   }
  // }, [openQuizModal]);

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Canvas camera={{ position: [0, 10, 0] }}>
          {/* 환경 설정 */}
          <PointerLockControls pointerSpeed={0.2} enabled={isPointerLockEnabled} />
          <ambientLight intensity={0.5} />
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
        <Overlay />
        <Items />
        <Timer />
        {openQuizModal && <QuizModal quizIndex={quizIndex} />}
        {openGameOverModal && <GameOverModal />}
        {resultState !== '' && openAnswerResult && <AnswerCheckModal />}
      </div>
    </>
  );
};

export default GamePage;
