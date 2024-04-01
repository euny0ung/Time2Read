// - [ ]  로그인하지 않은 상태에서 스크랩 버튼 눌렀을 때
// - [ ]  로그인하지 않은 상태에서 마이페이지 버튼 눌렀을 때
// - [ ]  이번 판 데이터가 있음 → 현재 페이지의 경로를 location.state에 저장해두고 조건에 따라 navigate 바꿔주기
import BaseModal from './BaseModal.jsx';
import Folder from '../../../assets/password.png';
import KakaoLogin from '../../kakao/KakaoLogin.jsx';

const InducementModal = ({ onClose }) => {
  return (
    <>
      <BaseModal onClose={onClose} animationType="scale">
        <div className="flex flex-col items-center justify-center ">
          <div className="w-full p-2 font-bold bg-gray-100 rounded-lg">로그인이 필요합니다.</div>
          <img className="w-[300px] py-8" src={Folder} alt="폴더와 문서 이미지" />
          <div className="pt-4">
            <KakaoLogin />
          </div>
          {/* <button onClick={onClose}>닫기</button> */}
        </div>
      </BaseModal>
    </>
  );
};

export default InducementModal;
