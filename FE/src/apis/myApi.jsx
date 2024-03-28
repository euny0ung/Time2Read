import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API;

// 타임어택 기록들
export const getTimeRecords = () => {
  const apiUrl = `${baseUrl}/my/records`;

  return axios
    .get(apiUrl)
    .then((response) => response.data)
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
    .then((response) => response.data)
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
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};
