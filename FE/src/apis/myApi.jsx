import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

// 내가 푼 연도 뱃지
const getBadge = () => {
  const apiUrl = `${baseUrl}/my/badges`;

  return axios
    .get(apiUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

export default getBadge;
