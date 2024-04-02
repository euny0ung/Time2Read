import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_v2;

// 은영 : 1 /혜진 :3 / 수혁 : 4
//kakao로그인 되면 id값 응답으로 주니까 id값을 받아서 사용해도 됨
const id = 1;

// 타임어택 기록들
export const getTimeRecords = () => {
  const apiUrl = `${baseUrl}/my/records/1`;

  return axios
    .get(apiUrl)
    .then((response) => response.result)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 카테고리별 맞은 개수
export const getSolved = () => {
  const apiUrl = `${baseUrl}/my/solved/1`;

  return axios
    .get(apiUrl)
    .then((response) => response.data.result)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 내가 푼 연도 뱃지
export const getBadge = () => {
  const apiUrl = `${baseUrl}/my/badges/1`;

  return axios
    .get(apiUrl)
    .then((response) =>{response.data.result})
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 스크랩한 기사 리스트 보기
export const getScrapArticles = () => {
  const apiUrl = `${baseUrl}/my/scraped-articles/1`;

  return axios
    .get(apiUrl)
    .then((response) => response.data.result)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 스크랩한 기사 상세보기
export const getArticleDetail = (articleId) => {
  const apiUrl = `${baseUrl}/my/scraped-article/${articleId}`;

  return axios
    .get(apiUrl)
    .then((response) => response.data.result)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 스크랩 상태 변경
export const putArticleStatus = (articleId, status) => {
  const apiUrl = `${baseUrl}/my/scraped-articles/${articleId}/${status}/1`;

  return axios
    .put(apiUrl)
    .then((response) => response.data.result)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};
