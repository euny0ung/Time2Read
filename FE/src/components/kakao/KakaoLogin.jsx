import { useNavigate } from 'react-router-dom';

const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

const onKakaoLogin = () => {
  window.location.href = kakaoLoginLink;
};

const KakaoLogin = () => {
  const name = sessionStorage.getItem('name');
  const navigate = useNavigate();

  const onMyPage = () => {
    navigate('/user');
  };

  return (
    <div>
      {name ? <button onClick={onMyPage}>마이페이지</button> : <button onClick={onKakaoLogin}>카카오 로그인</button>}
    </div>
  );
};

export default KakaoLogin;
