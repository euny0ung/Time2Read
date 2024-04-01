import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ArticleDetail from '../../result/article/ArticleDetail.jsx';

const CardDetail = ({ article, onClose }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !contentRef.current) return;

    // 내용 요소에 대한 애니메이션 설정
    gsap.from(contentRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 20,
      ease: 'power3.out',
    });
  }, []);

  // 내용 요소 클릭 시 이벤트 전파 막기
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* 모달 오버레이 */}
      <button className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75" onClick={onClose}>
        {/* 내용 요소 */}
        <div ref={contentRef} className="flex items-center justify-center w-full h-full rounded-lg">
          <button
            ref={cardRef}
            className="flex justify-center p-8 mx-auto bg-white rounded-lg shadow-lg w-[60vw] max-h-[80vh] overflow-y-auto scrollbar"
            onClick={handleContentClick}
          >
            <ArticleDetail article={article} />
          </button>
        </div>
      </button>
    </>
  );
};

export default CardDetail;
