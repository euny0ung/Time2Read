import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import ArticleDetail from '../../result/ArticleDetail.jsx';

const CardDetail = ({ article, setActiveIndex }) => {
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
    <div
      className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75"
      onClick={() => setActiveIndex(null)}
    >
      {/* 내용 요소 */}
      <div ref={contentRef} className="flex items-center justify-center w-full h-full rounded-lg">
        <div
          ref={cardRef}
          className="flex justify-center p-8 mx-auto bg-white rounded-lg shadow-lg max-w-[80vw] max-h-[90vh] overflow-y-auto"
          onClick={handleContentClick}
        >
          <div className="">
            <ArticleDetail article={article} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
