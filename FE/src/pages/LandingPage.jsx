import { useEffect, useState } from 'react';
import { useQuizApiHandler, useTestQuizApiHandler } from '@apis/quizApi';
import KakaoLogin from '@components/kakao/KakaoLogin';
import { useQuizStore } from '@stores/game/quizStore.jsx';
import BodyContainer from '../components/commons/containers/BodyContainer.jsx';
import Dropdown from '../components/commons/Dropdown.jsx';
import { checkGameYearStore } from '../stores/game/gameStore.jsx';

const OPTIONS = Array.from({ length: 2024 - 2005 + 1 }, (v, k) => `${2024 - k}`);

const LandingPage = () => {
  const [selected, setSelected] = useState('2024');
  const setGameYear = checkGameYearStore((state) => state.setGameYear);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    setGameYear(selectedOption);
  };

  const handleQuizApi = useQuizApiHandler(selected);
  // const handleTestQuizApi = () => {
  //   useTestQuizApiHandler(selected);
  // };

  // 텍스트를 분리하여 각 글자에 <span> 태그 적용
  const title = 'Time 2 Read';
  const animatedTitle = title.split('').map((char, index) => (
    <span key={index} className="letter" style={{ animationDelay: `${0.1 * index}s` }}>
      {char}
    </span>
  ));

  return (
    <>
      <div className="max-h-[100vh] overflow-hidden">
        <BodyContainer>
          <div className="flex flex-col items-center justify-start mt-[20vh] h-[90vh]">
            <KakaoLogin />
            <button onClick={handleQuizApi} className="mt-2 main">
              <div>{animatedTitle}</div>
            </button>
            <button
              onClick={handleQuizApi}
              className="enter px-8 text-2xl py-2 mb-6 w-[30vw] shadow font-semibold text-white rounded-full bg-primary-teal hover:opacity-70 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-3 focus:ring-offset-2 transition-transform duration-200 ease-in-out hover:scale-[102%]"
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
              style={{ position: 'relative', letterSpacing: '0.06em' }}
            >
              {selected}년으로 시계토끼 쫓아가기
            </button>
            <div
              className="transition-opacity duration-300 transform -translate-y-2 opacity-0"
              style={{
                opacity: isDropdownVisible ? 0 : 1, // isDropdownVisible가 true이면 투명도를 1로 설정하여 나타나게 함
                pointerEvents: isDropdownVisible ? 'none' : 'auto', // isDropdownVisible가 true이면 pointer 이벤트를 활성화하여 사용자 입력을 받도록 함
              }}
            >
              <Dropdown options={OPTIONS} selected={selected} handleSelect={handleSelect} />
            </div>
            {/* <button onClick={handleTestQuizApi}>입장하기 테스트</button> */}
          </div>
        </BodyContainer>
      </div>
    </>
  );
};

export default LandingPage;
