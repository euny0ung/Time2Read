import Lottie from 'lottie-react';
import Firework from '../../assets/lottie/fireworks.json';

const GameSuccess = () => {
  return (
    <div className="w-full h-full mb-[3rem] flex justify-center">
      <Lottie animationData={Firework} style={{ width: '600px', height: '380px' }}>
        <div className="flex  flex-col justify-center items-center z-10 text-3xl md:text-2xl lg:text-3xl mt-[2rem]">
          탈출에 성공했습니다!
          <div className="mt-2 text-base text-gray-500">과거의 기사가 현재와 어떻게 연결되어 있는지 알아볼까요?</div>
        </div>
      </Lottie>
    </div>
  );
};

export default GameSuccess;
