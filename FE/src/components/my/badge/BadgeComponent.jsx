const BadgeComponent = ({ year, successCount }) => {
  const medalHologramGradients = {
    gold: 'linear-gradient(45deg, #ffd700, #c65102, #fefd48, #c65102, #ffd700)',
    silver: 'linear-gradient(45deg, #c0c0c0, #595959,#e0e0e0, #595959, #c0c0c0)',
    bronze: 'linear-gradient(45deg, #cd7f32, #993300,#FFA500,#993300, #cd7f32)',
  };

  let medalColorKey = 'default';
  if (successCount >= 3) {
    medalColorKey = 'gold';
  } else if (successCount === 2) {
    medalColorKey = 'silver';
  } else if (successCount === 1) {
    medalColorKey = 'bronze';
  }

  const hologramGradient = medalHologramGradients[medalColorKey] || 'linear-gradient(45deg, #9e9e9e, #606060, #9e9e9e)';

  const hologramStyle = {
    backgroundImage: hologramGradient,
    backgroundSize: '300% 300%',
    animation: 'hologram 3s infinite linear',
  };

  const hologramBackgroundStyle = {
    backgroundImage: `${hologramGradient}, linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))`, // 투명도 추가
    backgroundSize: '300% 300%',
    animation: 'hologram 3s infinite linear',
  };

  return (
    <div className="inline-block w-auto h-auto transition-transform duration-700 ease-in-out transform rounded-full shadow-xl hover:animate-spin360">
      <div
        className="flex flex-col items-center justify-center h-full p-4 text-center rounded-full"
        style={hologramStyle}
      >
        {/* 내부 프레임 */}
        <div
          className="flex flex-col items-center justify-center w-full h-full p-3 bg-white rounded-full"
          style={hologramBackgroundStyle}
        >
          {/* 뱃지 컨텐츠 */}
          <div className="text-center">
            <div className="font-bold text-black text-shadow">{year}</div>
            <div className="text-sm text-black text-shadow">{`${successCount}회 성공`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeComponent;
