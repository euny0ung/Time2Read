import { Routes, Route } from 'react-router-dom';

import KakaoRedirect from '@/components/kakao/KakaoRedirect.jsx';
import GamePage from '@/pages/GamePage.jsx';
import LandingPage from '@/pages/LandingPage.jsx';
import MyPage from '@/pages/MyPage.jsx';
import ResultPage from '@/pages/ResultPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/kakao" element={<KakaoRedirect />} />
    </Routes>
  );
};

export default App;
