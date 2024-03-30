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
        summary: 'Exploring how community support can make a big difference in times of need.',
        image:
          'https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg',
      },
      {
        id: '2',
        mainCategory: 'Social',
        subCategory: 'Activism',
        title: 'Rising Trends in Social Activism',
        wroteAt: '2023-04-01T10:30:00',
        summary: 'A look at how social activism has evolved in the digital age.',
      },
      {
        id: '22',
        mainCategory: 'Social',
        subCategory: 'Activism',
        title: 'Rising Trends in Social Activism',
        wroteAt: '2023-04-01T10:30:00',
        summary: 'A look at how social activism has evolved in the digital age.',
      },
      {
        id: '23',
        mainCategory: 'Social',
        subCategory: 'Activism',
        title: 'Rising Trends in Social Activism',
        wroteAt: '2023-04-01T10:30:00',
        image: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
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
        image: '',
        summary: 'Analyzing the role of social media in shaping political campaigns and voter opinions.',
      },
      {
        id: '4',
        mainCategory: 'Politics',
        subCategory: 'International Relations',
        title: 'Recent Developments in International Relations',
        wroteAt: '2023-03-15T14:45:00',
        image: '',
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
        image: '',
        summary: 'Exploring groundbreaking technological innovations that have the potential to impact our future.',
      },
      {
        id: '6',
        mainCategory: 'Technology',
        subCategory: 'Cybersecurity',
        title: 'The Future of Cybersecurity',
        wroteAt: '2023-03-30T11:00:00',
        image: '',
        summary:
          'Understanding the evolving landscape of cybersecurity and what it means for personal and national security.',
      },
    ],
  },
];

const ScrapPage = () => {
  return (
    <>
      <div className="p-6">
        <h1>스크랩페이지</h1>
        <Cards data={categoriesData} />
      </div>
    </>
  );
};

export default ScrapPage;
