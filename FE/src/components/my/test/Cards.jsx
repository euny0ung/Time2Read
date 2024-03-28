import React, { useState, useRef, useEffect } from 'react';
import Card from './Card.jsx';
import FullCard from './FullCard.jsx';

const cardsData = [
  {
    title: 'The Fountain',
    category: 'Science Fiction',
    imageUrl: 'https://xl.movieposterdb.com/07_12/2006/414993/xl_414993_0cbd42ba.jpg',
    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui.',
  },
  {
    title: 'Mother!',
    category: 'Horror',
    imageUrl: 'https://xl.movieposterdb.com/20_06/2017/5109784/xl_5109784_051e160f.jpg',
    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui.',
  },
  {
    title: 'Black Swan',
    category: 'Psychological Thriller',
    imageUrl: 'https://xl.movieposterdb.com/10_09/2010/947798/xl_947798_f9a08ddf.jpg',
    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui.',
  },
  {
    title: 'Black 이미지가""',
    category: 'Psychological Thriller',
    imageUrl: '',
    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui.',
  },
  {
    title: '언디파인드',
    category: 'Psychological Thriller',
    imageUrl: undefined,
    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui.',
  },
  {
    title: '널',
    category: 'Psychological Thriller',
    imageUrl: null,
    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui.',
  },
];

const Cards = () => {
  const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 카드의 인덱스

  const toggleActiveIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto">
      {cardsData.map((card, index) => (
        <div key={index} onClick={() => toggleActiveIndex(index)} className="border-4 border-teal-400">
          <Card
            imageUrl={card.imageUrl}
            title={card.title}
            category={card.category}
            description={card.description}
            isActive={index === activeIndex}
            onClick={() => toggleActiveIndex(index)}
          />
          {index === activeIndex && <FullCard card={card} />}
        </div>
      ))}
    </div>
  );
};
export default Cards;
