const baseUrl = import.meta.env.VITE_BASE_URL;

// 선택한 연도의 키워드
export const fetchYearSummary = async (year) => {
  try {
    const apiUrl = `${baseUrl}/result/summary?year=${year}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchRelationArticles = async () => {};
