import KakaoRedirect from '@components/kakao/KakaoRedirect';
import GamePage from '@pages/GamePage';
import LandingPage from '@pages/LandingPage';
import MyPage from '@pages/MyPage';
import ResultPage from '@pages/ResultPage';
import ScrapPage from '@pages/ScrapPage';

import OxPage from '@pages/OxPage';
import KeywordPage from '@pages/KeywordPage';
import MultiChoice from '@pages/MultiChoicePage';
import Anagram from '@pages/AnagramPage';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/scraps" element={<ScrapPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/kakao" element={<KakaoRedirect />} />

      <Route path="/ox" element={<OxPage />} />
      <Route path="/keyword" element={<KeywordPage />} />
      <Route path="/multi-choice" element={<MultiChoice />} />
      <Route path="/anagram" element={<Anagram />} />
    </Routes>
  );
};

export default App;
