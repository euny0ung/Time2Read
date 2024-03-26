import { useState, useEffect } from 'react';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    console.log(window.scrollY);
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className="fixed z-10 right-5 bottom-5">
        <button
          id="top"
          className="px-10 text-sm font-bold text-white bg-black border border-gray-300 rounded-full outline-none cursor-pointer py-15 hover:text-red-600"
          onClick={scrollToTop}
        >
          Top
        </button>
      </div>
    )
  );
};

export default TopButton;
