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
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/oauth/kakao/account`, {
        access_token: code,
      });

      console.log('카카오 로그인 응답', response);

      // reponse 응답 status보고 사용자 토큰 요청
      if (response.status === 200) {
        const token = await axios.get(`${import.meta.env.VITE_BASE_URL}/oauth/kakao/login?code=${code}`);
        sessionStorage.setItem('token', token);
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
