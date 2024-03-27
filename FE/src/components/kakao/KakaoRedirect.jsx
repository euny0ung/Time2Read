import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');

  const getKakaoToken = async () => {
    // 인증 코드 요청
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API}/oauth/kakao/login?code=${code}`);
      const accessToken = response.data.result.access_token;

      // reponse 응답 status보고 사용자 토큰 요청
      if (response.status === 200) {
        const res = await axios.post(`${import.meta.env.VITE_BASE_API}/oauth/kakao/account`, {
          token: accessToken,
        });
        console.log('응답응답', res);
        sessionStorage.setItem('name', res.data.result.name);
      }

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken(code);
  }, []);
};

export default KakaoRedirect;
