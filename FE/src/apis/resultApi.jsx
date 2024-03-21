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

export const getRelationArticles = async () => {};
