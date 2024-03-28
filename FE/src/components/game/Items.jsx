import ClueIcon from '../../../public/images/clueIcon.png';
import LifeIcon from '../../../public/images/cookieIcon.jpg';
import { useGameItemStore } from '../../stores/game/gameStore.jsx';

export const ClueView = (clueCount) => {
  return (
    <>
      <div className="absolute top-[1rem] left-[11rem] w-[10rem] p-0 bg-black bg-opacity-50 text-white z-[1000]">
        <span>
          <img src={ClueIcon} alt="Clue Icon" className="w-12 h-12" /> X {clueCount.clueCount}
        </span>
      </div>
    </>
  );
};

export const LifeView = (lifeCount) => {
  return (
    <>
      <div className="absolute top-[1rem] left-[22rem] w-[10rem] p-0 bg-black bg-opacity-50 text-white z-[1000]">
        <span>
          <img src={LifeIcon} alt="Clue Icon" className="w-12 h-12" />
        </span>
        <span> X {lifeCount.lifeCount}</span>
      </div>
    </>
  );
};

const Items = () => {
  const { clueCount, lifeCount } = useGameItemStore();
  return (
    <>
      <ClueView clueCount={clueCount} />
      <LifeView lifeCount={lifeCount} />
    </>
  );
};

export default Items;
