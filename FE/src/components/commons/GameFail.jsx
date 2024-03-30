import Lottie from 'lottie-react';
import Rabbit from '../../assets/lottie/rabbit.json';

const GameFail = () => {
  return (
    <div className="w-11/12 h-5/6 mb-[3rem]">
      <Lottie animationData={Rabbit}>
        <div className="flex justify-center items-center z-10">탈출 실패 ㅠㅠ</div>
      </Lottie>
    </div>
  );
};

export default GameFail;
