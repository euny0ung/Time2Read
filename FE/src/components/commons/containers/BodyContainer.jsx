const BodyContainer = ({ children }) => {
  return (
    <>
      <div className="h-full min-h-screen w-full max-w-[90%] lg:max-w-[60%] md:max-w-[75%] mx-auto my-[5vh] overflow-auto">
        {children}
      </div>
    </>
  );
};

export default BodyContainer;
