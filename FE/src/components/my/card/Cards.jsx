import CardsByCategory from './CardsByCategory.jsx';

const Cards = ({ data }) => {
  return (
    <div>
      {data.map((categoryObj) => {
        // 메인 카테고리의 이름. 예: 'social', 'politics', ...
        const [mainCategoryName] = Object.keys(categoryObj);
        // 메인 카테고리에 속한 세부 항목들
        const articles = categoryObj[mainCategoryName];

        return <CardsByCategory key={mainCategoryName} category={mainCategoryName} articles={articles} />;
      })}
    </div>
  );
};

export default Cards;
