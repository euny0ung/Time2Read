const BadgeComponent = ({ year, successCount }) => {
  // const medalBorderColors = {
  //   gold: 'border-yellow-500',
  //   silver: 'border-gray-300',
  //   bronze: 'border-orange-500',
  // };

  const medalHologramGradients = {
    gold: 'linear-gradient(45deg, #ffd700, #c65102, #FFA500, #c65102, #ffd700)',
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

  // const borderClass = medalBorderColors[medalColorKey] || 'border-gray-400';
  const hologramGradient = medalHologramGradients[medalColorKey] || 'linear-gradient(45deg, #9e9e9e, #606060, #9e9e9e)';

  const hologramStyle = {
    // backgroundImage: 'linear-gradient(45deg, #ff4e50, #12c2e9, #ff49db, #FFA07A, #FFEF96)',
    // backgroundImage: 'linear-gradient(45deg, #ffd700, #ff8c00, #ffd700)',
    backgroundImage: hologramGradient,
    backgroundSize: '300% 300%',
    animation: 'hologram 3s infinite linear',
  };

  return (
    <div className="inline-block w-auto h-auto transition-transform duration-700 ease-in-out transform rounded-lg shadow-xl hover:animate-spin360">
      <div
        className="flex flex-col items-center justify-center h-full p-2 text-center rounded-lg"
        style={hologramStyle}
      >
        {/* 내부 프레임 */}
        <div className="flex flex-col items-center justify-center w-full h-full p-1 bg-white rounded ">
          {/* 뱃지 컨텐츠 */}
          <div className="text-center">
            <div className="text-sm font-bold text-black text-shadow">{year}</div>
            <div className="text-xs text-black text-shadow">{`${successCount}회 성공`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeComponent;
