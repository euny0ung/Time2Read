import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const BaseModal = ({ children, onClose, animationFrom }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 모달 컨테이너에 대한 애니메이션 설정
    gsap.from(containerRef.current, {
      ...animationFrom, // 외부에서 전달받은 애니메이션 설정을 적용
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [animationFrom]);

  // 모달 컨테이너 클릭 시 이벤트 전파 막기
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <button
      className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div ref={containerRef} className="flex items-center justify-center w-full h-full" onClick={handleContentClick}>
        <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-lg shadow-gray-300 min-w-[250px] cursor-default">
          {children}
        </div>
      </div>
    </button>
  );
};

export default BaseModal;
