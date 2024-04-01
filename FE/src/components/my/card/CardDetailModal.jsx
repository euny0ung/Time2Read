import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ArticleDetail from '../../result/article/ArticleDetail.jsx';

const CardDetailModal = ({ article, onClose }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 모달 컨테이너에 대한 애니메이션 설정
    gsap.from(containerRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 20,
      ease: 'power3.out',
    });
  }, []);

  // 모달 컨테이너 클릭 시 이벤트 전파 막기
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* 모달 오버레이 */}
      <button className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75" onClick={onClose}>
        {/* 모달 컨테이너 */}
        <div ref={containerRef} className="flex items-center justify-center w-full h-full">
          <button
            className="flex items-center justify-center p-8 bg-white rounded-lg shadow-lg shadow-gray-300 min-w-[250px] cursor-default"
            onClick={handleContentClick}
          >
            {/* 모달 컨텐츠 */}
            <ArticleDetail article={article} />
          </button>
        </div>
      </button>
    </>
  );
};

export default CardDetailModal;
