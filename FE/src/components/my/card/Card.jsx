import { useState } from 'react';
import { putArticleStatus } from '@apis/myApi';
import { format } from 'date-fns';
import AfterScrap from '../../../assets/scrap/afterScrap.png';
import BeforeScrap from '../../../assets/scrap/beforeScap.png';

const Card = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScraped, setIsScraped] = useState(false);

  const handleScrap = () => {
    const name = sessionStorage.getItem('name');
    if (name !== null) {
      // 로그인 했다면
      putArticleStatus(article.id, !isScraped).then(() => {
        setIsScraped((prevState) => !prevState);
      });
    } else {
      // 로그인 하지 않은 경우
      console.log('로그인이 필요해요');
    }
  };

  return (
    <div
      className={`relative w-64 h-64 md:w-72 md:h-72 mx-4 my-6 cursor-pointer rounded-lg overflow-hidden border border-gray-200 ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {article.image ? (
        <div
          className={`w-full h-full  overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          <img
            src={article.image}
            alt={article.title}
            className={`w-full h-full object-cover transition-transform duration-300 ease-in-out transform ${
              isHovered ? 'scale-110' : ''
            }`}
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full text-center transition-opacity duration-300 ease-in-out px-4 pb-4 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        >
          {/* 대분류, 중분류, 제목, 요약 */}
          <div className="flex flex-col items-start w-full p-2 text-left">
            {/* 대분류, 중분류 */}
            <div className="flex max-w-full">
              <span className="inline-block px-3 py-2 mt-4 mr-2 text-sm font-semibold truncate rounded-lg bg-rose-100 text-rose-600 main-category-tag">
                # {article.mainCategory}
              </span>
              <span className="inline-block px-3 py-2 mt-4 mr-2 text-sm font-semibold truncate rounded-lg bg-rose-100 text-rose-600 sub-category-tag">
                # {article.subCategory}
              </span>
            </div>
            {/* 제목 */}
            <div className="flex flex-wrap items-start justify-between overflow-hidden max-h-20">
              <div className="flex flex-col items-start">
                <div className="mt-4 text-xl font-semibold text-gray-900 title">{article.title}</div>
              </div>
            </div>
            {/* 요약 */}
            <div className="w-full">
              <div className="mt-4 text-gray-800 truncate">{article.summary}</div>
            </div>
            <div className="flex flex-row px-3 py-2 mt-6 font-semibold leading-6 text-left truncate border-2 rounded-lg text-rose-600 border-rose-600 hover:bg-rose-600 hover:text-white">
              <span>기사 보기</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
