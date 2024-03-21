const ResultButton = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-center p-6 bg-white rounded-lg gap-7 w-96 min-w-60">
        <div>{children}</div>
      </div>
    </>
  );
};

export default ResultButton;
