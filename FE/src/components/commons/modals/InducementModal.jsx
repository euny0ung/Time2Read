// - [ ]  로그인하지 않은 상태에서 스크랩 버튼 눌렀을 때
// - [ ]  로그인하지 않은 상태에서 마이페이지 버튼 눌렀을 때
// - [ ]  이번 판 데이터가 있음 → 현재 페이지의 url 기억해두고 조건에 따라 navigate 바꿔주기
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Folder from '../../../assets/password.png';
import KakaoLogin from '../../kakao/KakaoLogin.jsx';

const InducementModal = ({ onClose }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 모달 컨테이너에 대한 애니메이션 설정
    gsap.from(containerRef.current, {
      duration: 0.5,
      opacity: 0,
      scale: 0, // 시작 시 스케일을 0으로 설정
      ease: 'back.out(1.7)', // 뒤로 조금 빠지며 나오는 효과
    });
  }, []);

  // 모달 컨테이너 클릭 시 이벤트 전파 막기
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* 모달 오버레이 */}
      <button
        className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-20 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* 모달 컨테이너 */}
        <div ref={containerRef} className="flex items-center justify-center w-full h-full">
          <button
            className="flex items-center justify-center p-8 bg-white rounded-lg shadow-lg shadow-gray-300 min-w-[250px] cursor-default"
            onClick={handleContentClick}
          >
            {/* 모달 컨텐츠 */}
            <div className="flex flex-col items-center justify-center ">
              <div className="w-full p-2 font-bold bg-gray-100 rounded-lg">로그인이 필요합니다.</div>
              {/* 이미지 */}
              <img className="w-[300px] py-8" src={Folder} alt="폴더와 문서 이미지" />
              <div className="pt-4">
                <KakaoLogin />
              </div>
              {/* <button onClick={onClose}>닫기</button> */}
            </div>
          </button>
        </div>
      </button>
    </>
  );
};

export default InducementModal;
