import { useState, useEffect } from 'react';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15); // 스크롤 속도 조절
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
        const moveto = '#top';
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
          className="flex items-center justify-center w-16 h-16 text-sm font-bold text-black bg-white border rounded-full shadow-2xl outline-none cursor-pointer border-primary-teal-2 hover:text-primary-teal-3"
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
