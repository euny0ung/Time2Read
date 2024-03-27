import { useState, useEffect } from 'react';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15); // 스크롤 속도를 조절합니다.
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  useEffect(() => {
    const handleScrollToPage = (event) => {
      if (event.target.tagName === 'HTML') {
        const moveto = '#top'; // 원하는 위치의 ID를 여기에 넣으세요
        const PageLocation = document.querySelector(moveto).offsetTop;
        document.body.scrollTo({ top: PageLocation, behavior: 'smooth' });
      }
    };

    document.addEventListener('wheel', handleScrollToPage, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleScrollToPage);
    };
  }, []);

  return (
    showButton && (
      <div className="fixed z-10 right-5 bottom-5">
        <button
          id="top"
          className="px-10 text-sm font-bold text-white bg-black border border-gray-300 rounded-full outline-none cursor-pointer py-15 hover:text-red-600"
          onClick={scrollToTop}
          type="button"
        >
          Top
        </button>
      </div>
    )
  );
};

export default TopButton;
