const ResultButton = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-center px-4 py-2 bg-white shadow-xl rounded-xl hover:bg-opacity-80 focus:bg-opacity-80">
        <div>{children}</div>
      </div>
    </>
  );
};

export default ResultButton;
