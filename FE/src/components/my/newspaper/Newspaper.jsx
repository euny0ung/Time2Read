const Newspaper = ({ showTitle }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-2 bg-gray-200">
        {showTitle && <div className="w-full p-4 font-bold text-center bg-white text-7xl">MY NEWS</div>}
        <div className="flex flex-col w-full gap-6 p-4 bg-gray-300">
          <div className="text-center bg-white ">제목</div>
          <div className="flex justify-between">
            <div className="w-full p-4 bg-white">이미지</div>
            <div className="w-full p-4 bg-white">글</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-6 p-4 bg-gray-300">
          <div className="text-center bg-white">제목</div>
          <div className="flex justify-between">
            <div className="w-full p-4 bg-white">글</div>
            <div className="w-full p-4 bg-white">이미지</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newspaper;
