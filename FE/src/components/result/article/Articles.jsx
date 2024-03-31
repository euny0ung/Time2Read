import { useState, useEffect } from 'react';
import QuizArticleGroup from './QuizArticleGroup.jsx';
import { postRelationArticles } from '@/apis/resultApi.jsx';
import { useChallengedArticleStore } from '@/stores/game/gameStore.jsx';

const Articles = () => {
  const { challengeArticlesIdList } = useChallengedArticleStore(); // 유저가 게임에서 도전한(정답,오답 모두 포함한) 문제의 기사 아이디들로 만든 배열
  const [articlesData, setArticlesData] = useState([]); // 모든 기사
  const removeSameId = [...new Set(challengeArticlesIdList)]; // 기사 ID 중복 제거

  useEffect(() => {
    postRelationArticles(removeSameId)
      .then((data) => {
        setArticlesData(data.result);
      })
      .catch((error) => {
        console.error('Error requesting relation articles:', error);
      });
  }, []);

  return (
    <>
      {articlesData.map((quizArticleGroup, i) => (
        <QuizArticleGroup
          key={quizArticleGroup.relatedArticleId}
          relatedArticles={quizArticleGroup.article}
          num={i + 1}
        />
      ))}
    </>
  );
};

export default Articles;
