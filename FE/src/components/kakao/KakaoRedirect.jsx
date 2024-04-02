import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePreLoginPathStore } from '../../stores/ui/preLoginStore.jsx';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');

  const preLoginPath = usePreLoginPathStore((state) => state.preLoginPath);
  const resetPreLoginPath = usePreLoginPathStore((state) => state.resetPreLoginPath);

  const getKakaoToken = async () => {
    // 인증 코드 요청
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API}/oauth/kakao/login?code=${code}`);

      // reponse 응답 status보고 사용자 토큰 요청
      if (response.status === 200) {
        const accessToken = response.data.result.access_token;
        const res = await axios.post(`${import.meta.env.VITE_BASE_API}/oauth/kakao/account`, {
          token: accessToken,
        });
        sessionStorage.setItem('email', res.data.result.email);
      }

      // 로그인 성공 후 저장된 이전 페이지로 이동
      navigate(preLoginPath || '/');
      resetPreLoginPath(); // 저장된 경로 초기화
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.search) {
      getKakaoToken(code);
    }
  }, [location.search, code]);
};

export default KakaoRedirect;
