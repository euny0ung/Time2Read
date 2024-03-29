import { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);

  // 토글
  const toggleDropdown = () => setIsOpen(!isOpen);

  // 옵션 선택
  const handleSelectOption = (option) => {
    setSelected(option); // 선택한 옵션을 상위 컴포넌트로 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 애니메이션 효과를 위한 max-height 설정
  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left w-[30vw]" ref={dropdownRef}>
      {/* 선택한 옵션 */}
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-lg font-medium text-gray-700 bg-white border border-gray-300 shadow-sm bg-opacity-70 rounded-3xl hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-teal"
      >
        <span>{selected}</span>
        {/* 화살표 */}
        <svg
          className={`w-5 h-5 ml-2 -mr-1 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          viewBox="0 0 20 20"
          fill="#2BBAB4"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* 선택할 수 있는 옵션들 */}
      <div
        className={`absolute right-0 z-10 w-full mt-2 origin-top-right transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-60' : 'max-h-0'}`}
        ref={contentRef}
      >
        <div className="py-1 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg max-h-[15rem] overflow-y-auto dropdown-scrollbar">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full px-4 py-2 text-lg text-gray-700 transition-colors duration-200 hover:bg-primary-teal-1"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
