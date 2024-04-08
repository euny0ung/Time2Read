import React, { Suspense, useState, useRef, useEffect } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

import Temp from '@/assets/music/GamePageMusic.mp3';
import AnswerCheckModal from '@/components/commons/modals/AnswerCheckModal.jsx';
import GameOverModal from '@/components/game/GameOverModal.jsx';
import ItemsOverlay from '@/components/game/ItemsOverlay.jsx';
import Maze, { Floor } from '@/components/game/Maze.jsx';
import MusicPlay from '@/components/game/MusicPlay.jsx';
import Player from '@/components/game/Player.jsx';
import QuizModal from '@/components/game/QuizModal.jsx';
import StartModal from '@/components/game/StartModal.jsx';
import Timer from '@/components/game/Timer.jsx';
import { useGameModalStore } from '@/stores/game/gameStore.jsx';
import { useAnswerCheckStore } from '@/stores/game/quizStore.jsx';

const GamePage = () => {
  const [isPlayerMode, setIsPlayerMode] = useState(true); // 테스트용 1인칭, 3인칭 모드 전환
  const openQuizModal = useGameModalStore((state) => state.openQuizModal);
  const openAnswerResult = useAnswerCheckStore((state) => state.openAnswerResult);
  const resultState = useAnswerCheckStore((state) => state.resultState);
  const quizIndex = useAnswerCheckStore((state) => state.quizIndex);
  const openGameOverModal = useGameModalStore((state) => state.openGameOverModal);
  const [isPointerLockEnabled, setIsPointerLockEnabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPointerLockEnabled(!openQuizModal);
  }, [openQuizModal]);

  useEffect(() => {
    setIsPointerLockEnabled(!openGameOverModal);
  }, [openGameOverModal]);

  // 들어오자마자 openModal을 true로 하여 StartModal을 활성화
  useEffect(() => {
    setOpenModal(true);
    audioRef.current.play();
  }, []);

  const handlePlayMusic = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <audio ref={audioRef} src={Temp} loop />
        <MusicPlay handlePlayMusic={handlePlayMusic} isPlaying={isPlaying} />
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
        <Timer openModal={openModal} />
        {openModal && <StartModal onClose={() => setOpenModal(false)} />}
        {openQuizModal && <QuizModal quizIndex={quizIndex} />}
        {openGameOverModal && <GameOverModal />}
        {resultState !== '' && openAnswerResult && <AnswerCheckModal />}
      </div>
    </>
  );
};

export default GamePage;
