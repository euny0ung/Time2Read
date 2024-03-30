const Tooltip = ({ children, text, image }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-20 flex-col items-center hidden w-48 p-4 mb-2 text-sm text-teal-900 bg-white rounded shadow-lg bottom-full group-hover:flex">
        {/* 텍스트 내용 표시 */}
        {text && <div className="mb-2">{text}</div>}
        {/* 이미지 컴포넌트 표시 */}
        {image}
      </div>
    </div>
  );
};

export default Tooltip;
