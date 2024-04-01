import { useRef, useEffect } from 'react';
import gsap from 'gsap';

// 애니메이션 효과를 미리 정의
const animations = {
  // 뿅하고 나오는 효과
  scale: {
    scale: 0,
    ease: 'back.out(1.7)',
  },
  // 아래에서 위로 올라오는 효과
  slide: {
    y: 20,
    ease: 'power3.out',
  },
};

const BaseModal = ({ children, onClose, animationType = 'scale' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 모달 컨테이너에 대한 애니메이션 설정
    const animationSettings = animations[animationType] || animations.scale;
    gsap.from(containerRef.current, {
      duration: 0.5,
      opacity: 0,
      ...animationSettings,
    });
  }, [animationType]);

  // 모달 컨테이너 클릭 시 이벤트 전파 막기
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* 모달 오버레이 */}
      <button
        className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* 모달 컨테이너 */}
        <div ref={containerRef} className="flex items-center justify-center w-full h-full">
          <button
            className="flex items-center justify-center p-8 bg-white rounded-lg shadow-lg shadow-gray-300 min-w-[250px] cursor-default"
            onClick={handleContentClick}
          >
            {children}
          </button>
        </div>
      </button>
    </>
  );
};

export default BaseModal;
