import { useState } from 'react';
import { useSecondQuizApi } from '@apis/quizApi';
import { checkGameYearStore } from '@stores/game/gameStore.jsx';
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
    const { gameYear } = checkGameYearStore.getState();
    const handleSecondQuizApi = useSecondQuizApi(gameYear);
    handleSecondQuizApi();
    setIsNext(true);
  };

  const renderShowModal = () => {
    if (isNext) {
      // 2번째화면
      return (
        <BaseModal onClose={onClose} animationType="scale">
          <div className="flex flex-col items-center w-[468px] gap-8 h-[500px]">
            <div className="flex flex-col items-center w-full h-full gap-4">
              <div className="flex items-center justify-center text-3xl font-bold md:text-2xl lg:text-3xl">이동</div>
              <div className="flex flex-col w-full gap-2 py-2 bg-gray-200 rounded-lg">
                <div className="flex justify-center items-center text-2xl pt-1 md:text-1.5xl lg:text-2xl space-x-2">
                  <div>앞 : </div>
                  <img src={W} alt="W Icon" className="w-12 h-12" />
                  <span>뒤 : </span>
                  <img src={D} alt="D Icon" className="w-12 h-12" />
                  <span>좌 : </span>
                  <img src={S} alt="S Icon" className="w-12 h-12" />
                  <span>우 : </span>
                  <img src={A} alt="A Icon" className="w-12 h-12" />
                </div>
                <div className="flex justify-center items-center text-2xl md:text-1.5xl lg:text-2xl space-x-2" />
              </div>
              <div className="flex items-center justify-center text-3xl font-bold md:text-2xl lg:text-3xl">
                화면 전환
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-2 py-4 text-2xl bg-gray-200 rounded-lg md:text-base lg:text-2xl">
                화면 클릭 후 마우스 움직임으로 컨트롤
              </div>
              <div className="flex items-center justify-center text-3xl font-bold md:text-2xl lg:text-3xl">
                화면 해제
              </div>
              <div className="flex flex-col w-full gap-2 py-2 bg-gray-200 rounded-lg">
                <div className="flex items-center justify-center text-2xl md:text-base lg:text-2xl">
                  <img src={ESC} alt="ESC Icon" className="w-16 h-16" />
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-10 py-2 mb-6 text-2xl font-semibold text-white transition-transform duration-200 ease-in-out rounded-full shadow bg-primary-teal hover:bg-primary-teal-3 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2"
            >
              시계토끼 쫓아가기
            </button>
          </div>
        </BaseModal>
      );
    }
    return (
      // 1번째 화면
      <BaseModal onClose={onClose} animationType="scale">
        <div className="flex flex-col items-center gap-8 w-[468px] h-[500px]">
          {/* 중심 내용 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center space-x-2 text-3xl md:text-2xl lg:text-3xl">
              <span>제한 시간</span>
              <span className="font-bold text-primary-teal">10분</span>
              <span>안에</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-3xl md:text-2xl lg:text-3xl">
              토끼를 잡고 미로를 탈출하세요!
            </div>
          </div>
          {/* 세부 내용 */}
          <div className="flex flex-col w-full gap-2 px-4 py-4 bg-gray-200 rounded-lg">
            <div className="flex items-center justify-center text-xl md:text-lg lg:text-xl">
              <span>시계토끼가</span>
              <span className="ml-2 font-bold text-primary-teal">미로의 끝</span>
              <span>으로 사라졌습니다.</span>
            </div>
            <div className="flex items-center justify-center text-xl md:text-lg lg:text-xl">
              <span>설상 가상으로 이 미로는</span>
              <span className="ml-2 font-bold text-primary-teal">과거의 미로</span>
              <span>입니다.</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xl md:text-lg lg:text-xl">
              <span className="font-bold text-primary-teal">10분</span>
              <span>안에 탈출하지 못하면 영영 갇히게 됩니다.</span>
            </div>
          </div>
          {/* 게임 아이템 설명 */}
          <div className="flex gap-6">
            <div className="flex items-center justify-center text-2xl">
              <img src={ClueIcon} alt="Clue Icon" className="w-16 h-16" />
              <div> &emsp;X &emsp;5개</div>
            </div>
            <div className="flex items-center justify-center text-2xl">
              <img src={LifeIcon} alt="Clue Icon" className="w-16 h-16" />
              <div> &emsp;X &emsp;3개</div>
            </div>
          </div>
          <div className="flex items-center justify-center p-2 text-xl">미로 안의 아이템들을 이용해 탈출해 보세요.</div>
          <button
            onClick={handleToNext}
            className="px-10 py-2 text-2xl font-semibold text-white transition-transform duration-200 ease-in-out rounded-full shadow bg-primary-teal hover:bg-primary-teal-3 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2"
          >
            탈출을 위한 <span className="font-bold text-primary-teal-1">플레이 방법</span> 보기
          </button>
        </div>
      </BaseModal>
    );
  };

  return <>{renderShowModal()}</>;
};

export default StartModal;
