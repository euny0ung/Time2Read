// import BadgeFrame from '../components/my/BadgeFrame.jsx';
import YearBadge from '../components/my/YearBadge.jsx';

const UserPage = () => {
  return (
    <>
      <div />
      <div className="space-x-4">
        <YearBadge year={2021} successCount={3} /> {/* 금메달 뱃지 */}
        <YearBadge year={2022} successCount={2} /> {/* 은메달 뱃지 */}
        <YearBadge year={2023} successCount={1} /> {/* 동메달 뱃지 */}
      </div>
      {/* <BadgeFrame /> */}
    </>
  );
};

export default UserPage;
