import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const res = error.response;

        if (!res) {
          console.log('네트워크 에러 발생');

          return res;
        }

        if (res.status === 400 && res.data.message) {
          console.log(res.data.message);

          return res;
        }
        // if (res.status === 401 || res.status === 403) {
        //   // 로그아웃 처리
        //   console.log('재로그인 필요');
        //   // sessionStorage.removeItem('name');
        //   navigate('/');
        // } else if (res.status === 404) {
        //   console.log('존재하지 않는 페이지 입니다.');
        //   return navigate('/not-found');
        // } else if (res.status === 500) {
        //   console.log('문제를 불러오는데 많은 시간이 걸려요. 새로고침 후 다시 시도해주세요');
        // }
        // return Promise.reject(error);
      },
    );
    return () => {
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [navigate]);

  return null;
};

export default AxiosInterceptor;
