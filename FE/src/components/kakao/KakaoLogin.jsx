import { useNavigate } from 'react-router-dom';
import kakaoLoginButton from '../../assets/kakao/complete/kakao_login_medium_narrow.png';

const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

const KakaoLogin = () => {
  const email = sessionStorage.getItem('email');
  const navigate = useNavigate();

  // 마이페이지로 리디렉션
  const onMyPage = () => {
    navigate('/mypage');
  };

  // 카카오 로그인 페이지로 이동
  const onKakaoLogin = () => {
    window.location.href = kakaoLoginLink;
  };

  return (
    <div>
      {email ? (
        <button
          className="px-4 py-2 text-primary-red font-bold bg-primary-red-0 rounded transition-transform duration-200 ease-in-out shadow cursor-pointer hover:opacity-70 hover:scale-[102%]"
          onClick={onMyPage}
        >
          마이페이지
        </button>
      ) : (
        <button onClick={onKakaoLogin}>
          <img
            className="transition-transform duration-200 ease-in-out rounded-md shadow cursor-pointer hover:opacity-70 hover:scale-[102%]"
            src={kakaoLoginButton}
            alt="카카오 간편 로그인"
          />
        </button>
      )}
    </div>
  );
};

export default KakaoLogin;
