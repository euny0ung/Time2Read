const BadgeFrame = () => {
  return (
    <>
      {/* 외부 프레임 */}
      <div className="w-32 h-40 max-w-sm p-4 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-hologram">
        {/* 내부 프레임 */}
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded ">
          {/* 뱃지 컨텐츠 */}
          <div className="text-center">
            <h2 className="text-lg font-bold">2024</h2>
            <p>n회 성공</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgeFrame;
