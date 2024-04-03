import { useState, useEffect } from 'react';
import BadgeComponent from './BadgeComponent.jsx';
import { getBadge } from '../../../apis/myApi.jsx';

// 유저가 가지고 있는 뱃지 불러와서 보여줄 거임
// 여기서 api 호출할지 마이페이지에서 호출할지 아직 못 정함
const Badges = () => {
  const [badges, setbadges] = useState([]);

  useEffect(() => {
    getBadge()
      .then((data) => {
        setbadges(data);
        console.log('Badge Data:', data);
      })
      .catch((error) => {
        console.error('Error requesting badge:', error);
      });
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-2">
          {badges &&
            badges.map((badge) => <BadgeComponent key={badge.year} year={badge.year} successCount={badge.count} />)}
        </div>
      </div>
    </>
  );
};

export default Badges;
