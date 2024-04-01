import { useNavigate } from 'react-router-dom';
import { postGameResult } from '../../apis/resultApi.jsx';
import kakaoLoginButton from '../../assets/kakao/complete/kakao_login_medium_narrow.png';
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
      {name ? (
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
