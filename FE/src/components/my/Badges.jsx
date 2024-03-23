import BadgeComponent from './BadgeComponent.jsx';

const Badges = () => {
  return (
    <>
      <div />
      <div className="space-x-4">
        <BadgeComponent year={2021} successCount={3} /> {/* 금메달 뱃지 */}
        <BadgeComponent year={2022} successCount={2} /> {/* 은메달 뱃지 */}
        <BadgeComponent year={2023} successCount={1} /> {/* 동메달 뱃지 */}
      </div>
    </>
  );
};

export default Badges;
