import { useState, useEffect, useRef } from 'react';
import {
  useGameResultStore,
  useGameModalStore,
  useGameItemStore,
  useVisibilityStore,
  checkCollidedStore,
  checkGameSuccessStore,
  checkGameYearStore,
  useResultDataStore,
} from '@stores/game/gameStore';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getTimeRecords, getSolved, getScrapArticles, getArticleDetail, putArticleStatus } from '../apis/myApi.jsx';
import ResultButton from '../components/commons/buttons/ResultButton.jsx';
import TranslucentContainer from '../components/commons/containers/TranslucentContainer.jsx';
import WhiteContainer from '../components/commons/containers/WhiteContainer.jsx';
import ResultContent from '../components/commons/ResultContent.jsx';
import ResultTitle from '../components/commons/ResultTitle.jsx';
import { formatTime } from '../components/game/Timer.jsx';
import Badges from '../components/my/badge/Badges.jsx';
import Cards from '../components/my/card/Cards.jsx';
import RadarChart from '../components/my/RadarChart.jsx';

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
        image: '',
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

const MyPage = () => {
  const [timeRecords, setTimeRecords] = useState([]);
  const [solvedCount, setSolvedCount] = useState({
    social: 0,
    politics: 0,
    economy: 0,
    international: 0,
    culture: 0,
    sports: 0,
  });
  const [scrapedArticle, setScrapedArticle] = useState([]);
  const [articleDetail, setArticleDetail] = useState([]);

  const { gameResult } = useGameResultStore();

  const navigate = useNavigate();

  const resetGame = () => {
    useGameModalStore.getState().reset();
    useGameResultStore.getState().reset();
    useGameItemStore.getState().reset();
    useVisibilityStore.getState().reset();
    checkCollidedStore.getState().reset();
    checkGameSuccessStore.getState().reset();
    checkGameYearStore.getState().reset();
    useResultDataStore.getState().reset();
  };
  const navigateToLandingPage = () => {
    resetGame();
    navigate('/');
  };

  useEffect(() => {
    getTimeRecords()
      .then((data) => {
        setTimeRecords(data.records);
        console.log('TimeRecords Data:', data.records);
      })
      .catch((error) => {
        console.error('Error requesting badge:', error);
      });

    getSolved()
      .then((data) => {
        setSolvedCount(data);
        console.log('SolvedCount Data:', data);
      })
      .catch((error) => {
        console.error('Error requesting badge:', error);
      });

    getScrapArticles()
      .then((data) => {
        setScrapedArticle(data);
        console.log('Scraped Articles', data);
      })
      .catch((error) => {
        console.error('Error requesting badge:', error);
      });

    getArticleDetail()
      .then((data) => {
        setArticleDetail(data);
        console.log('Article Detail', data);
      })
      .catch((error) => {
        console.error('Error requesting badge:', error);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-red-1 to-primary-teal-1">
        <div className="w-full max-w-[90%] lg:max-w-[60%] md:max-w-[75%] mx-auto ">
          <h1>마이페이지</h1>
          <div className="relative flex flex-col items-center w-full gap-4">
            {/* 나의 기록 myRecordbox */}
            <TranslucentContainer>
              <ResultTitle title={'나의 기록'} />
              <div className="flex flex-col items-center justify-between w-full gap-6 lg:flex-row lg:justify-center">
                <div className="w-full ">
                  <WhiteContainer>
                    <ResultTitle title={'타임어택 기록'} />
                    <ResultContent>
                      new! {formatTime(600 - gameResult.timeAttackTime)}
                      {timeRecords.map((record, i) => (
                        <div key={record.playDate} className="flex justify-between">
                          <div>{`기록 ${i + 1}:`}</div>
                          <div>{record.timeAttackTime}</div>
                          <div>{format(new Date(record.playDate), 'yyyy-MM-dd HH:mm')}</div>
                        </div>
                      ))}
                    </ResultContent>
                  </WhiteContainer>
                </div>
                <div className="w-full">
                  <WhiteContainer>
                    <ResultTitle title={'카테고리별 기록'} />
                    <RadarChart solvedCount={solvedCount} />
                  </WhiteContainer>
                </div>
                <div className="w-full">
                  <WhiteContainer>
                    <ResultTitle title={'획득한 뱃지'} />
                    <div className="overflow-y-auto h-[200px]">
                      <Badges />
                    </div>
                  </WhiteContainer>
                </div>
              </div>
            </TranslucentContainer>
            {/* 스크랩한 기사 scapedArticlebox */}
            <TranslucentContainer>
              <ResultTitle title={'스크랩한 기사'} />
              <WhiteContainer>
                <Cards data={categoriesData} />
              </WhiteContainer>
            </TranslucentContainer>
            {/* 다시 시계토끼 쫓아가기 */}
            <div className="flex justify-end w-full">
              <button onClick={navigateToLandingPage}>
                <ResultButton>
                  <ResultTitle title={'다시 시계토끼 쫓아가기'} />
                </ResultButton>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
