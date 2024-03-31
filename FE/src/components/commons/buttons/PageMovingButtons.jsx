const PageMovingButton = ({ onClick, buttonText, buttonColor }) => {
  const buttonStyle = {
    backgroundColor: buttonColor,
  };

  return (
    <button
      className="flex items-center justify-center px-6 py-3 text-gray-900 rounded-full shadow-xl hover:bg-opacity-80 hover:text-gray-600 focus:bg-opacity-80 transition-transform duration-300 ease-in-out hover:scale-[102%]"
      onClick={onClick}
      style={buttonStyle}
    >
      <div className="text-lg text-center">{buttonText}</div>
    </button>
  );
};

export default PageMovingButton;
