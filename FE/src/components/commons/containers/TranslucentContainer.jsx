const TranslucentContainer = ({ children }) => {
  return (
    <>
      <div className="box-border flex flex-col items-start justify-center w-full h-auto gap-8 p-6 bg-white bg-opacity-50 border-4 border-white rounded-3xl">
        {children}
      </div>
    </>
  );
};

export default TranslucentContainer;
