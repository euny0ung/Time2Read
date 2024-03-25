const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

const onKakaoLogin = () => {
  window.location.href = kakaoLoginLink;
};

const KakaoLogin = () => {
  return (
    <div>
      <button onClick={onKakaoLogin}>카카오 로그인</button>
    </div>
  );
};

export default KakaoLogin;
