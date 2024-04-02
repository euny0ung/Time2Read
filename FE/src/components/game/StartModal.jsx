const StartModal = ({ openModal, setOpenModal }) => {
  const closeStartModal = () => {
    console.log('미로 탈출하기 버튼 눌림');
    console.log('openModal in StartModal : ', openModal);
    setOpenModal(false);
  };

  return (
    <>
      <div className="w-[36rem] h-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-border flex flex-col items-center justify-center gap-4 p-6 bg-white bg-opacity-50 border-2 border-white shadow-xl rounded-2xl">
        <div className="w-full h-full mb-[3rem] flex justify-center">
          키보드 W A S D를 이용하여 움직일 수 있습니다.
          <br />
          화면 한 번 클릭 시 마우스로 방향 전환 가능합니다.
          <br />
          Esc 누르면 해제
        </div>
        <button
          onClick={closeStartModal}
          className="absolute top-3/4 left-1/2 mt-[4rem] bg-white hover:bg-gray-700 text-gray-700 font-bold py-3 px-7 rounded focus:outline-none focus:shadow-outline transform -translate-x-1/2 -translate-y-1/2 mb-5rem"
        >
          미로 탈출하기
        </button>
      </div>
    </>
  );
};

export default StartModal;
