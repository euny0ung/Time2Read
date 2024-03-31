const WhiteContainer = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-6 bg-white shadow-xl rounded-xl transition-transform duration-300 ease-in-out hover:scale-[102%]">
        <div className="w-full h-full">{children}</div>
      </div>
    </>
  );
};

export default WhiteContainer;
