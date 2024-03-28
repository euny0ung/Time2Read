import { format } from 'date-fns';
import ImageComponent from '../commons/ImageComponent.jsx';

// 상세 기사 컴포넌트
const ArticleDetail = ({ article, handleScrap, isScraped, AfterScrap, BeforeScrap }) => {
  const formattedDate = format(new Date(article.wroteAt), 'yyyy/MM/dd HH:mm:ss');

  return (
    <div>
      <div>
        <span className="inline-block px-3 py-2 mt-4 mr-2 text-sm font-semibold rounded-lg bg-rose-100 text-rose-600 main-category-tag">
          # {article.mainCategory}
        </span>
        <span className="inline-block px-3 py-2 mt-4 mr-2 text-sm font-semibold rounded-lg bg-rose-100 text-rose-600 sub-category-tag">
          # {article.subCategory}
        </span>
      </div>
      <div className="flex flex-row items-start justify-between">
        <div>
          <div className="mt-4 text-2xl font-semibold text-gray-900 title">{article.title}</div>
          <div className="mt-4 text-gray-500">
            <span className="mr-2">{article.copyRight || '한겨레'}</span>
            <span className="mr-2">|</span>
            <span className="mr-2">{formattedDate}</span>
          </div>
        </div>
        <button
          onClick={handleScrap}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleScrap();
            }
          }}
          className="m-4 focus:outline-none"
        >
          <img className="h-8" src={isScraped ? AfterScrap : BeforeScrap} alt="Scrap Button" />
        </button>
      </div>

      <div
        className="items-center justify-between gap-2 px-3 py-2 mt-4 font-semibold text-teal-600 border-2 border-teal-600 rounded-lg summary"
        style={{ lineHeight: '1.6' }}
      >
        {article.summary}
      </div>
      <div className="flex justify-center mt-4 max-h-[600px]">
        <ImageComponent src={article.image} alt={article.imageCaption} width={600} />
      </div>
      <div className="px-3 py-2 mt-4 font-light text-gray-600" style={{ lineHeight: '2' }}>
        {article.content}
      </div>
    </div>
  );
};

export default ArticleDetail;
