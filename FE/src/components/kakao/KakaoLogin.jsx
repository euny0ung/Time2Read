import { useNavigate } from 'react-router-dom';
import kakaoLoginButton from '../../assets/kakao/simple/kakao_login_medium.png';
import myPageIcon from '../../assets/myPageIcon.png';

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
          className="px-2 py-2 text-primary-red-3 font-bold bg-primary-red-0 rounded transition-transform duration-200 ease-in-out shadow cursor-pointer hover:opacity-70 hover:scale-[102%]"
          onClick={onMyPage}
        >
          <div className="flex flex-row">
            <img className="w-[15px] mx-1 object-contain" src={myPageIcon} alt="마이페이지" />
            <span>마이페이지</span>
          </div>
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
