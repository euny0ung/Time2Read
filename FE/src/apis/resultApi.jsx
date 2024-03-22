import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

// 선택한 연도의 키워드
export const getYearSummary = (year) => {
  const apiUrl = `${baseUrl}/result/summary?year=${year}`;

  return axios
    .get(apiUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 과거와 연결된 기사
export const postRelationArticles = (articleIds) => {
  const apiUrl = `${baseUrl}/result/related`;

  return axios
    .post(apiUrl, { id: articleIds })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};
