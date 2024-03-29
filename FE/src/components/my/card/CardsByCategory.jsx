import React, { useState } from 'react';
import Card from './Card.jsx';
import FullCard from './CardDetail.jsx';

const CardsByCategory = ({ category, articles }) => {
  const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 카드의 인덱스

  const toggleActiveIndex = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };
  return (
    <div className="my-4">
      <h2 className="flex items-start w-full my-4 text-2xl font-bold text-center">{category}</h2>
      <div className="flex p-2 space-x-4 overflow-x-auto">
        {articles.map((article) => (
          <div key={article.id} className="inline-block">
            <button
              onClick={() => toggleActiveIndex(article.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  toggleActiveIndex(article.id);
                }
              }}
              className=""
            >
              <Card
                image={article.image}
                title={article.title}
                mainCategory={article.mainCategory}
                subCategory={article.subCategory}
                summary={article.summary}
                isActive={article.id === activeIndex}
              />
            </button>
            {article.id === activeIndex && <FullCard article={article} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsByCategory;
