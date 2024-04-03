import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import useScrapStore from '../../../stores/ui/scrapStore.jsx';
import BaseModal from '../../commons/modals/BaseModal.jsx';
import ArticleDetail from '../../result/article/ArticleDetail.jsx';

// 기사 디테일 모달
const CardDetailModal = ({ article, onClose }) => {
  const { scrapStatus, toggleScrap } = useScrapStore();
  console.log('카드바이카테고리 scrapStatus', scrapStatus, 'article id', article.id);

  return (
    <>
      <BaseModal onClose={onClose} animationType="slide">
        <div className="h-[80vh] w-[40vw] overflow-y-auto">
          <ArticleDetail article={article} />
        </div>
      </BaseModal>
    </>
  );
};

// 특정 카테고리만 보여주는 컴포넌트
const CardsByCategory = ({ category, articles }) => {
  const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 카드의 인덱스
  // const { scrapStatus } = useScrapStore();
  const [updatedArticles, setUpdatedArticles] = useState(articles);

  // useEffect(() => {
  //   const updated = articles.map((article) => ({
  //     ...article,
  //     isScraped: !scrapStatus[article.id] && true,
  //   }));
  //   setUpdatedArticles(updated);

  //   console.log('카드바이카테고리 updated article', updated);
  // }, [scrapStatus, articles]);

  // 모달 열고 닫기
  const openActiveIndex = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div className="mb-8">
      <h2
        className="flex items-start w-full pb-2 text-2xl font-bold text-center border-b-2"
        style={{ textTransform: 'uppercase' }}
      >
        {category}
      </h2>
      <div className="flex space-x-4 overflow-x-auto red-scrollbar">
        {updatedArticles.map((article) => (
          <div key={article.id} className="inline-block">
            <button onClick={() => openActiveIndex(article.id)}>
              <Card article={article} />
            </button>
            {article.id === activeIndex && <CardDetailModal article={article} onClose={() => setActiveIndex(null)} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsByCategory;
