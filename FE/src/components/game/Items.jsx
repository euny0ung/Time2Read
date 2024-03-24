import { useGameItemStore } from '../../stores/game/gameStore.jsx';

const Items = () => {
  const { clueCount, lifeCount } = useGameItemStore();
  return (
    <div className="absolute top-[100px] right-0 w-[500px] p-5 bg-black bg-opacity-50 text-white z-[1000]">
      <div>
        Clue의 개수 : <span>{clueCount}</span>
      </div>
      <div>
        Life의 개수 : <span>{lifeCount}</span>
      </div>
    </div>
  );
};

export default Items;
