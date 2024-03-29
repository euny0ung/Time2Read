const TranslucentContainer = ({ children }) => {
  return (
    <>
      <div className="box-border flex flex-col items-start justify-center w-full h-auto gap-4 p-6 bg-white bg-opacity-50 border-2 border-white shadow-xl rounded-2xl">
        {children}
      </div>
    </>
  );
};

export default TranslucentContainer;
