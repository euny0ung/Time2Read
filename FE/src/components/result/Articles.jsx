import { useState, useEffect } from 'react';
import { postRelationArticles } from '@/apis/resultApi.jsx';
import QuizArticleGroup from '@/components/result/QuizArticleGroup.jsx';
import { useChallengedArticleStore } from '@/stores/game/gameStore.jsx';

const articlesData2 = [
  {
    id: '1',
    related: [
      {
        id: '1',
        copyRight: '한겨레',
        mainCategory: '경제',
        subCategory: '금융·증권',
        time: '2024-01-08 05:00',
        title: '은행 의결권 다 합쳐도 33%…태영 채권단의 표심은 어디로',
        image: 'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/original/2024/0107/20240107502017.jpg',
        imageCaption: '7일 서울 영등포구 태영건설 본사. 연합뉴스',
        content: '이 기사의 내용은 변경되었습니다.',
        summary:
          '과거엔 산은 특정 은행의 의결권 비중이 워크아웃 개시 주요 의사결정에서 주채권은행의 의중이 가장 중요했고 영향력도 절대적이었다. 2001년 현대건설 워크아웃 당시 산업은행 의결권은 22.7%, 2014년 팬택 워크아웃 때는 의결권 비중이 40%에 이르렀다. 워크아웃 개시 이후 신규 자금을 투입해야 공산이 있는 주요 채권은행은 선순위 채권 비중이 높고 담보권을 확보한 상태다.',
        url: 'https://www.hani.co.kr/arti/economy/finance/1123350.html',
      },
      {
        id: '12',
        copyRight: '한겨레',
        mainCategory: '사회',
        subCategory: '사회일반',
        time: '2024-03-15 09:30',
        title: '한겨레 뉴스 기사 제목',
        image: 'https://example.com/image2.jpg',
        imageCaption: '이미지 캡션2',
        content: '내용2',
        summary: '요약 내용2',
        url: 'https://www.hani.co.kr/arti/society/general/123456.html',
      },
      {
        id: '13',
        copyRight: '한겨레',
        mainCategory: '사회',
        subCategory: '사회일반',
        time: '2024-03-15 09:30',
        title: '한겨레 뉴스 기사 제목',
        image: 'https://example.com/image2.jpg',
        imageCaption: '이미지 캡션2',
        content: '내용2',
        summary: '요약 내용2',
        url: 'https://www.hani.co.kr/arti/society/general/123456.html',
      },
      {
        id: '14',
        copyRight: '한겨레',
        mainCategory: '정치',
        subCategory: '국회·정당',
        time: '2024-03-20 14:20',
        title: '국회에서 토론이 벌어졌습니다.',
        image: 'https://example.com/image3.jpg',
        imageCaption: '이미지 캡션3',
        content: '내용3',
        summary: '요약 내용3',
        url: 'https://www.hani.co.kr/arti/politics/assembly/789012.html',
      },
      {
        id: '15',
        copyRight: '한겨레',
        mainCategory: '국제',
        subCategory: '미국',
        time: '2024-03-20 16:40',
        title: '미국의 새로운 경제 정책 발표',
        image: 'https://example.com/image4.jpg',
        imageCaption: '이미지 캡션4',
        content: '내용4',
        summary: '요약 내용4',
        url: 'https://www.hani.co.kr/arti/international/usa/567890.html',
      },
    ],
  },
  {
    id: '2',
    related: [
      {
        id: '2',
        copyRight: '한겨레',
        mainCategory: '경제',
        subCategory: '금융·증권',
        time: '2024-01-08 05:00',
        title: '삐리리ㅣ로',
        image: 'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/original/2024/0107/20240107502017.jpg',
        imageCaption: '7일 서울 영등포구 태영건설 본사. 연합뉴스',
        content: '이 기사의 내용은 변경되었습니다.',
        summary:
          '과거엔 산은 특정 은행의 의결권 비중이 워크아웃 개시 주요 의사결정에서 주채권은행의 의중이 가장 중요했고 영향력도 절대적이었다. 2001년 현대건설 워크아웃 당시 산업은행 의결권은 22.7%, 2014년 팬택 워크아웃 때는 의결권 비중이 40%에 이르렀다. 워크아웃 개시 이후 신규 자금을 투입해야 공산이 있는 주요 채권은행은 선순위 채권 비중이 높고 담보권을 확보한 상태다.',
        url: 'https://www.hani.co.kr/arti/economy/finance/1123350.html',
      },
      {
        id: '22',
        copyRight: '한겨레',
        mainCategory: '사회',
        subCategory: '사회일반',
        time: '2024-03-15 09:30',
        title: '한겨레 뉴스 기사 제목',
        image: 'https://example.com/image2.jpg',
        imageCaption: '이미지 캡션2',
        content: '내용2',
        summary: '요약 내용2',
        url: 'https://www.hani.co.kr/arti/society/general/123456.html',
      },
      {
        id: '23',
        copyRight: '한겨레',
        mainCategory: '사회',
        subCategory: '사회일반',
        time: '2024-03-15 09:30',
        title: '한겨레 뉴스 기사 제목',
        image: 'https://example.com/image2.jpg',
        imageCaption: '이미지 캡션2',
        content: '내용2',
        summary: '요약 내용2',
        url: 'https://www.hani.co.kr/arti/society/general/123456.html',
      },
      {
        id: '24',
        copyRight: '한겨레',
        mainCategory: '정치',
        subCategory: '국회·정당',
        time: '2024-03-20 14:20',
        title: '국회에서 토론이 벌어졌습니다.',
        image: 'https://example.com/image3.jpg',
        imageCaption: '이미지 캡션3',
        content: '내용3',
        summary: '요약 내용3',
        url: 'https://www.hani.co.kr/arti/politics/assembly/789012.html',
      },
      {
        id: '25',
        copyRight: '한겨레',
        mainCategory: '국제',
        subCategory: '미국',
        time: '2024-03-20 16:40',
        title: '미국의 새로운 경제 정책 발표',
        image: 'https://example.com/image4.jpg',
        imageCaption: '이미지 캡션4',
        content: '내용4',
        summary: '요약 내용4',
        url: 'https://www.hani.co.kr/arti/international/usa/567890.html',
      },
    ],
  },
];

const Articles = () => {
  // const { challengeArticlesIdList } = useChallengedArticleStore(); // 유저가 게임에서 도전한(정답,오답 모두 포함한) 문제의 기사 아이디들로 만든 배열
  const [articlesData, setArticlesData] = useState([]); // 모든 기사

  useEffect(() => {
    postRelationArticles(['1', '2'])
      .then((data) => {
        setArticlesData(data.articles);
        console.log('Articles Data:', data);
      })
      .catch((error) => {
        console.error('Error requesting relation articles:', error);
      });
  }, []);

  return (
    <>
      {/* {articlesData2.map((quizArticleGroup, i) => (
        <QuizArticleGroup key={quizArticleGroup.id} relatedArticles={quizArticleGroup.related} num={i + 1} />
      ))} */}
      {articlesData.map((quizArticleGroup, i) => (
        <QuizArticleGroup key={quizArticleGroup[0].id} relatedArticles={quizArticleGroup.related} num={i + 1} />
      ))}
    </>
  );
};

export default Articles;
