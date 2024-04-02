import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API;

// 타임어택 기록들
export const getTimeRecords = () => {
  const apiUrl = `${baseUrl}/my/records`;

  return axios
    .get(apiUrl)
    .then((response) => {
      console.log(response);
      return response.data.result;
    })
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 카테고리별 맞은 개수
export const getSolved = () => {
  const apiUrl = `${baseUrl}/my/solved`;

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
  const apiUrl = `${baseUrl}/my/badges`;

  return axios
    .get(apiUrl)
    .then((response) => {
      console.log('내가 푼 연도 뱃지 response', response);
      return response.data.result;
    })
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 스크랩한 기사 리스트 보기
export const getScrapArticles = () => {
  const apiUrl = `${baseUrl}/my/scraped-articles`;

  return axios
    .get(apiUrl)
    .then((response) => {
<<<<<<< HEAD
      console.log('myApi 스크랩 리스트', response.data.result.data);
=======
      console.log('스크랩한 기사 리스트 response', response);
>>>>>>> 58514cb45661905cabc2460141d0fbaf70fb9bda
      return response.data.result.data;
    })
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
  const apiUrl = `${baseUrl}/my/scraped-articles/${articleId}/${status}`;

  return axios
    .put(apiUrl)
    .then((response) => response.data.result)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};
