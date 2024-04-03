import LifeIcon from '../../../public/images/life.webp';
import ClueIcon from '../../../public/images/news.webp';
import { useGameItemStore } from '../../stores/game/gameStore.jsx';

export const ClueView = (clueCount) => {
  return (
    <>
      <div className="absolute flex bottom-[1rem] left-[1rem] w-[10rem] p-0 bg-black bg-opacity-50 text-white z-10 justify-center items-center rounded-xl">
        <div>
          <img src={ClueIcon} alt="Clue Icon" className="w-16 h-16" />
        </div>
        <div className="font-bold"> &emsp;X &emsp;{clueCount.clueCount}</div>
      </div>
    </>
  );
};

export const LifeView = (lifeCount) => {
  return (
    <>
      <div className="absolute flex bottom-[1rem] left-[12.5rem] w-[10rem] pr-3 bg-black bg-opacity-50 text-white z-10 justify-center items-center rounded-xl">
        <div>
          <img src={LifeIcon} alt="Clue Icon" className="w-16 h-16" />
        </div>
        <div className="font-bold">&emsp;X &emsp;{lifeCount.lifeCount}</div>
      </div>
    </>
  );
};

const ItemsOverlay = () => {
  const { clueCount, lifeCount } = useGameItemStore();
  return (
    <>
      <ClueView clueCount={clueCount} />
      <LifeView lifeCount={lifeCount} />
    </>
  );
};

export default ItemsOverlay;
