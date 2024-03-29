import React, { useState } from 'react';
import Card from './Card.jsx';
import FullCard from './CardDetail.jsx';

const CardsByCategory = ({ category, articles }) => {
  const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 카드의 인덱스

  const toggleActiveIndex = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto">
      <h2 className="w-full my-4 text-2xl font-bold text-center">{category}</h2>
      {articles.map((article) => (
        <button
          key={article.id}
          onClick={() => toggleActiveIndex(article.id)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              toggleActiveIndex(article.id);
            }
          }}
          className="border-4 border-teal-400 focus:outline-none"
        >
          <Card
            image={article.image}
            title={article.title}
            mainCategory={article.mainCategory}
            subCategory={article.subCategory}
            summary={article.summary}
            isActive={article.id === activeIndex}
            onClick={() => toggleActiveIndex(article.id)}
          />
          {article.id === activeIndex && <FullCard article={article} />}
        </button>
      ))}
    </div>
  );
};
export default CardsByCategory;
