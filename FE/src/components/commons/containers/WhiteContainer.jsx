const WhiteContainer = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-6 bg-white shadow-xl rounded-xl">
        <div className="w-full h-full">{children}</div>
      </div>
    </>
  );
};

export default WhiteContainer;
