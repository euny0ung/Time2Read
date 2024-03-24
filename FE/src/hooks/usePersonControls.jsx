import { useEffect, useState } from 'react';

// player를 WADS키와 spacebar로 제어하기 위한 커스텀 훅
const usePersonControls = () => {
  const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
  };

  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  const setMovementStaus = (code, status) => {
    setMovement((m) => ({ ...m, [code]: status }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setMovementStaus(moveFieldByKey(e.code), true);
    };

    const handleKeyUp = (e) => {
      setMovementStaus(moveFieldByKey(e.code), false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};

export default usePersonControls;
