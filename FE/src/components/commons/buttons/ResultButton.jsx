const ResultButton = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-center p-6 bg-white shadow-xl rounded-xl gap-7 w-96 min-w-60 hover:bg-opacity-80 focus:bg-opacity-80">
        <div>{children}</div>
      </div>
    </>
  );
};

export default ResultButton;
