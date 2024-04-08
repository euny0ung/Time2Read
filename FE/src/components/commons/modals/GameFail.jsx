import Lottie from 'lottie-react';
import Rabbit from '@/assets/lottie/rabbit.json';

const GameFail = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <Lottie animationData={Rabbit} style={{ width: '400px', height: '400px' }}>
        <div className="flex flex-col justify-center items-center z-10 text-3xl md:text-2xl lg:text-3xl mt-[2rem]">
          탈출에 실패했습니다.
          <div className="mt-2 text-base text-gray-500">그래도 어떤 기사가 나왔는지 한번 알아볼까요?</div>
        </div>
      </Lottie>
    </div>
  );
};

export default GameFail;
