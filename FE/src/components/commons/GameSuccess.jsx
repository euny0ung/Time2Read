import Lottie from 'lottie-react';
import Firework from '../../assets/lottie/fireworks.json';

const GameSuccess = () => {
  return (
    <div className="w-full h-full mb-[3rem] flex justify-center">
      <Lottie animationData={Firework} style={{ width: '400px', height: '500px' }}>
        <div className="flex justify-center items-center z-10 text-3xl md:text-2xl lg:text-3xl mt-[2rem]">
          탈출 성공!
        </div>
      </Lottie>
    </div>
  );
};

export default GameSuccess;
