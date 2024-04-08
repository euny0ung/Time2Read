import Folder from '@/assets/password.png';
import BaseModal from '@/components/commons/modals/BaseModal.jsx';
import KakaoLogin from '@/components/kakao/KakaoLogin.jsx';

const InducementModal = ({ onClose }) => {
  return (
    <>
      <BaseModal onClose={onClose} animationType="scale">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full p-2 font-bold bg-gray-100 rounded-lg">로그인이 필요합니다.</div>
          <img className="w-[300px] py-8" src={Folder} alt="폴더와 문서 이미지" />
          <div className="pt-4">
            <KakaoLogin />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default InducementModal;
