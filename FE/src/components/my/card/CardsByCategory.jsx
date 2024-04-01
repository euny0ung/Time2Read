import { useState } from 'react';
import Card from './Card.jsx';
import BaseModal from '../../commons/modals/BaseModal.jsx';
import ArticleDetail from '../../result/article/ArticleDetail.jsx';

const CardDetailModal = ({ article, onClose }) => {
  return (
    <>
      <BaseModal onClose={onClose} animationType="slide">
        <ArticleDetail article={article} />
      </BaseModal>
    </>
  );
};

const CardsByCategory = ({ category, articles }) => {
  const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 카드의 인덱스

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
      <div className="flex space-x-4 overflow-x-auto scrollbar">
        {articles.map((article) => (
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
