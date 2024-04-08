import CardsByCategory from '@/components/my/card/CardsByCategory.jsx';

const Cards = ({ scrapedArticles }) => {
  return (
    <div>
      {Object.entries(scrapedArticles).map(([mainCategory, articles]) => {
        return <CardsByCategory key={mainCategory} category={mainCategory} articles={articles} />;
      })}
    </div>
  );
};

export default Cards;
