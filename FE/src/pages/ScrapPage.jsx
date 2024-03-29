import Cards from '../components/my/card/Cards.jsx';

// 테스트 데이터
const categoriesData = [
  {
    social: [
      {
        id: '1',
        mainCategory: 'Social',
        subCategory: 'Community',
        title: 'The Power of Community Support',
        wroteAt: '2023-03-25T15:00:00',
        image: 'https://example.com/images/community-support.jpg',
        summary: 'Exploring how community support can make a big difference in times of need.',
      },
      {
        id: '2',
        mainCategory: 'Social',
        subCategory: 'Activism',
        title: 'Rising Trends in Social Activism',
        wroteAt: '2023-04-01T10:30:00',
        image: 'https://example.com/images/social-activism.jpg',
        summary: 'A look at how social activism has evolved in the digital age.',
      },
    ],
  },
  {
    politics: [
      {
        id: '3',
        mainCategory: 'Politics',
        subCategory: 'Elections',
        title: 'The Impact of Social Media on Elections',
        wroteAt: '2023-02-20T09:20:00',
        image: 'https://example.com/images/social-media-elections.jpg',
        summary: 'Analyzing the role of social media in shaping political campaigns and voter opinions.',
      },
      {
        id: '4',
        mainCategory: 'Politics',
        subCategory: 'International Relations',
        title: 'Recent Developments in International Relations',
        wroteAt: '2023-03-15T14:45:00',
        image: 'https://example.com/images/international-relations.jpg',
        summary: 'Insights into the latest trends and challenges in international relations.',
      },
    ],
  },
  {
    technology: [
      {
        id: '5',
        mainCategory: 'Technology',
        subCategory: 'Innovation',
        title: 'Innovations That Could Change the World',
        wroteAt: '2023-04-05T16:00:00',
        image: 'https://example.com/images/tech-innovations.jpg',
        summary: 'Exploring groundbreaking technological innovations that have the potential to impact our future.',
      },
      {
        id: '6',
        mainCategory: 'Technology',
        subCategory: 'Cybersecurity',
        title: 'The Future of Cybersecurity',
        wroteAt: '2023-03-30T11:00:00',
        image: 'https://example.com/images/cybersecurity-future.jpg',
        summary:
          'Understanding the evolving landscape of cybersecurity and what it means for personal and national security.',
      },
    ],
  },
];

const ScrapPage = () => {
  return (
    <>
      <Cards data={categoriesData} />
    </>
  );
};

export default ScrapPage;
