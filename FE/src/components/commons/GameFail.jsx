import Lottie from 'lottie-react';
import Rabbit from '../../assets/lottie/rabbit.json';

const GameFail = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <Lottie animationData={Rabbit} style={{ width: '400px', height: '500px' }}>
        <div className="flex justify-center items-center z-10">탈출 실패 ㅠㅠ</div>
      </Lottie>
    </div>
  );
};

export default GameFail;
