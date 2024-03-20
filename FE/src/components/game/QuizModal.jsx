import { Html } from '@react-three/drei';

const QuizModal = ({ setOpenModal, openModal }) => {
  const closeModal = () => {
    setOpenModal(false);
    console.log(openModal);
  };
  return (
    <>
      <Html>
        <div className="modal-container" style={{ width: '1280px', height: '768px', backgroundColor: 'white' }}>
          <button onClick={closeModal}>모달 닫기(임시용)</button>
          <p>모달창입니다. 이곳에는 퀴즈가 들어갈 예정입니다.</p>
        </div>
      </Html>
    </>
  );
};

export default QuizModal;
