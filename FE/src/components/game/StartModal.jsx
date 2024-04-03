import BaseModal from '../commons/modals/BaseModal.jsx';

const StartModal = ({ onClose }) => {
  return (
    <>
      <BaseModal onClose={onClose} animationType="scale">
        <div className="w-[36rem] h-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-border flex flex-col items-center justify-center gap-4 p-6 bg-white bg-opacity-100 border-2 border-white shadow-xl rounded-2xl">
          <div className="w-full h-full mb-[3rem] flex items-center flex-col">
            <div className="flex justify-center items-center text-3xl md:text-2xl lg:text-3xl mt-[2rem]">
              제한 시간 10분 안에 미로를 탈출하세요!
            </div>
            <div className="flex justify-center items-center text-2xl md:text-xl lg:text-2xl mt-[2rem]">
              미로를 탈출하기 위해서는 퀴즈를 맞혀야 합니다
            </div>
            <div className="flex justify-center items-center text-2xl md:text-xl lg:text-2xl">
              미로 안의 아이템들을 이용하여 도움을 얻을 수 있습니다
            </div>
            <div className="flex justify-center items-center text-3xl md:text-2xl lg:text-3xl mt-[2rem]">이동</div>
            <div className="flex justify-center items-center text-2xl md:text-1.5xl lg:text-2xl mt-[0.7rem]">
              앞 : W, 뒤 : S, 좌 : A, 우 : D
            </div>
            <div className="flex justify-center items-center text-3xl md:text-2xl lg:text-3xl mt-[2rem]">화면 전환</div>
            <div className="flex justify-center items-center text-2xl md:text-base lg:text-2xl mt-[0.7rem]">
              화면을 마우스로 클릭
            </div>
            <div className="flex justify-center items-center text-3xl md:text-2xl lg:text-3xl mt-[2rem]">화면 해제</div>
            <div className="flex justify-center items-center text-2xl md:text-base lg:text-2xl mt-[0.7rem]">ESC</div>
          </div>
          <button
            onClick={onClose}
            // className="absolute top-3/4 left-1/2 mt-[5.5rem] bg-white hover:bg-gray-700 hover:text-white text-gray-700 font-bold py-3 px-7 rounded focus:outline-none focus:shadow-outline transform -translate-x-1/2 -translate-y-1/2 "
            className="px-10 text-2xl py-2 mb-6 shadow font-semibold text-white rounded-full bg-primary-teal hover:bg-primary-teal-3 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2 transition-transform duration-200 ease-in-out"
          >
            시계토끼 쫓아가기
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default StartModal;
