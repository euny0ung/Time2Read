import Lottie from 'lottie-react';
import Firework from '../../assets/lottie/fireworks.json';

const GameSuccess = () => {
  return (
    // <div className="flex justify-center items-center">
    <Lottie animationData={Firework}>
      <div className="flex justify-center items-center z-10">탈출 성공!</div>
    </Lottie>
    // </div>
  );
};

export default GameSuccess;
