import React from 'react';

const Overlay = () => {
  return (
    <div className="absolute top-0 right-0 w-[500px] p-5 bg-black bg-opacity-50 text-white z-[1000]">
      W A S D to move.
      <br />
      Space to jump. - 구현중
      <br />
      화면 한 번 클릭 시 마우스로 방향 전환 가능. Esc 누르면 해제
    </div>
  );
};

export default Overlay;
