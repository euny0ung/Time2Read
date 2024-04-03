import Lottie from 'lottie-react';
import Rabbit from '../../assets/lottie/rabbit.json';

const GameFail = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <Lottie animationData={Rabbit} style={{ width: '400px', height: '500px' }}>
        <div className="flex justify-center items-center z-10 text-3xl md:text-2xl lg:text-3xl mt-[2rem]">
          탈출 실패{' '}
        </div>
      </Lottie>
    </div>
  );
};

export default GameFail;
