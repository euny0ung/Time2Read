const WhiteContainer = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-start w-full h-full gap-4 p-6 bg-white min-w-60 rounded-2xl">
        <div className="w-full h-full border-4 border-violet-500">{children}</div>
      </div>
    </>
  );
};

export default WhiteContainer;
