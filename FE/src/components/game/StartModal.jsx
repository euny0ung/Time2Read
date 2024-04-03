import { useState } from 'react';
import A from '../../../public/images/A.png';
import D from '../../../public/images/D.png';
import ESC from '../../../public/images/ESC.png';
import LifeIcon from '../../../public/images/life.webp';
import ClueIcon from '../../../public/images/news.webp';
import Pointer from '../../../public/images/pointer.gif';
import S from '../../../public/images/S.png';
import W from '../../../public/images/W.png';
import BaseModal from '../commons/modals/BaseModal.jsx';

const StartModal = ({ onClose }) => {
  const [isNext, setIsNext] = useState(false);

  const handleToNext = () => {
    setIsNext(true);
  };

  const renderShowModal = () => {
    if (isNext) {
      // 2번째화면
      return (
        <BaseModal onClose={onClose} animationType="scale">
          <div className="p-8 w-[37%] h-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-border flex flex-col items-center justify-center gap-4 p-6 bg-white bg-opacity-100 border-2 border-white shadow-xl rounded-2xl">
            <div className="w-full h-full mb-[3%] flex items-center flex-col">
              <div className="flex justify-center items-center text-3xl md:text-2xl lg:text-3xl mt-[2%] font-bold">
                이동
              </div>
              <div className="flex justify-center items-center text-2xl md:text-1.5xl lg:text-2xl mt-[1%]">
                <img src={W} alt="W Icon" className="w-12 h-12" />
                <div> &emsp;: &emsp;앞&emsp;&emsp;&emsp;</div>
                <img src={S} alt="S Icon" className="w-12 h-12" />
                <div> &emsp;: &emsp;뒤</div>
              </div>
              <div className="flex justify-center items-center text-2xl md:text-1.5xl lg:text-2xl">
                <img src={A} alt="A Icon" className="w-12 h-12" />
                <div> &emsp;: &emsp;좌&emsp;&emsp;&emsp;</div>
                <img src={D} alt="D Icon" className="w-12 h-12" />
                <div> &emsp;: &emsp;우</div>
              </div>
              <div className="flex justify-center items-center text-3xl md:text-2xl lg:text-3xl mt-[2%] font-bold">
                화면 전환
              </div>
              <div className="flex justify-center items-center text-2xl md:text-base lg:text-2xl mt-[1%]">
                <img src={Pointer} alt="Pointer Icon" className="w-12 h-12" />
                <div> &emsp;: &emsp;화면을 마우스로 클릭</div>
              </div>
              <div className="flex justify-center items-center text-3xl md:text-2xl lg:text-3xl mt-[2%] font-bold">
                화면 해제
              </div>
              <div className="flex justify-center items-center text-2xl md:text-base lg:text-2xl mt-[1%]">
                <img src={ESC} alt="ESC Icon" className="w-16 h-16" />
              </div>
              <button
                onClick={onClose}
                className="px-10 text-2xl py-2 mb-6 shadow font-semibold text-white rounded-full bg-primary-teal hover:bg-primary-teal-3 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2 transition-transform duration-200 ease-in-out mt-[12%]"
              >
                시계토끼 쫓아가기
              </button>
            </div>
          </div>
        </BaseModal>
      );
    }
    return (
      // 1번째 화면
      <BaseModal onClose={onClose} animationType="scale">
        <div className="p-6 w-[37%]  h-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-border flex flex-col items-center justify-center gap-4 p-6 bg-white bg-opacity-100 border-2 border-white shadow-xl rounded-2xl">
          <div className="w-full h-full mb-[3%] flex items-center flex-col">
            <div className="p-6 flex justify-center items-center text-3xl">제한 시간 10분 안에 미로를 탈출하세요!</div>
            <div className="p-2 flex justify-center items-center text-2xl">
              미로를 탈출하기 위해서는 퀴즈를 맞혀야 합니다
            </div>
            <div className="p-2 flex justify-center items-center text-2xl mb-[1%]">
              미로 안의 아이템들을 이용해보세요
            </div>
            <div className="p-4 flex justify-center items-center text-2xl">
              <img src={ClueIcon} alt="Clue Icon" className="w-16 h-16" />
              <div> &emsp;X &emsp;5개</div>
            </div>
            <div className="p-4 flex justify-center items-center text-2xl">
              <img src={LifeIcon} alt="Clue Icon" className="w-16 h-16" />
              <div> &emsp;X &emsp;3개</div>
            </div>
            <div className="p-2 flex justify-center items-center text-2xl mt-[1.5%]">
              미로를 탐험하며 단서를 추가로 획득할 수 있습니다!
            </div>
            <div className="p-2 flex justify-center items-center text-2xl">쿠키를 먹으면 라이프 충전이 가능합니다!</div>
            <button
              onClick={handleToNext}
              className="px-10 text-2xl py-2 mb-6 shadow font-semibold text-white rounded-full bg-primary-teal hover:bg-primary-teal-3 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2 transition-transform duration-200 ease-in-out mt-[7%]"
            >
              게임 플레이 방법 보기
            </button>
          </div>
        </div>
      </BaseModal>
    );
  };

  return <>{renderShowModal()}</>;
};

export default StartModal;
