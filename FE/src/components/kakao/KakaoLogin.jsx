import { useNavigate } from 'react-router-dom';
import { postGameResult } from '../../apis/resultApi.jsx';
import { useResultDataStore } from '../../stores/game/gameStore.jsx';

const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

const onKakaoLogin = () => {
  window.location.href = kakaoLoginLink;
};

const KakaoLogin = () => {
  const name = sessionStorage.getItem('name');
  const navigate = useNavigate();
  const resultData = useResultDataStore((state) => state.resultData);

  const onMyPage = () => {
    // 음 지금 여기서 로그인하고 바로 resultData를 post하게 되면
    // 빈 resultData를 post하는 경우도 발생 가능
    // postGameResult(resultData);
    navigate('/mypage');
  };

  return (
    <div>
      {name ? <button onClick={onMyPage}>마이페이지</button> : <button onClick={onKakaoLogin}>카카오 로그인</button>}
    </div>
  );
};

export default KakaoLogin;
