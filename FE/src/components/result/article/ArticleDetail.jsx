import { useState, useEffect } from 'react';
import { putArticleStatus } from '@apis/myApi';
import { format } from 'date-fns';
import AfterScrap from '../../../assets/scrap/afterScrap.png';
import BeforeScrap from '../../../assets/scrap/beforeScap.png';
import { usePreLoginPathStore, usePreLoginStateStore } from '../../../stores/ui/preLoginStore.jsx';
import useScrapStore from '../../../stores/ui/scrapStore.jsx';
import ImageComponent from '../../commons/ImageComponent.jsx';
import InducementModal from '../../commons/modals/InducementModal.jsx';

// 상세 기사 컴포넌트
const ArticleDetail = ({ quizNumber, currentStep, article }) => {
  const { scrapStatus, toggleScrap } = useScrapStore();
  const isScraped = scrapStatus[article.id] || false; // 기사의 스크랩 상태를 조회
  const { setScrollPosition, setOpenedQuiz } = usePreLoginStateStore();
  const { setPreLoginPath } = usePreLoginPathStore();
  const [openLoginInducementModal, setOpenLoginInducementModal] = useState(false);

  console.log('scrapStatus', scrapStatus, 'isScraped', isScraped, 'article', article);

  const handleScrap = () => {
    const email = sessionStorage.getItem('email');
    if (email !== null) {
      // 로그인 되어 있을 때: 스크랩 상태 변경 API 호출
      putArticleStatus(article.id, !isScraped)
        .then(() => {
          // API 호출 성공: 스크랩 상태 토글
          toggleScrap(article.id);
        })
        .catch((error) => {
          // API 호출 실패: 에러 처리
          console.error('Failed to update scrap status:', error);
        });
    } else {
      // 로그인 되어 있지 않을 때
      setPreLoginPath(window.location.pathname); // 현재 경로 저장
      setScrollPosition(window.scrollY); // 현재 스크롤 위치 저장
      setOpenedQuiz({
        // 현재 토글이 열려있는 문제와 기사 정보 저장
        quizNumber, // 현재 문제 번호
        articleIndex: currentStep, // 현재 기사 인덱스
      });

      setOpenLoginInducementModal(true); // 로그인 유도 모달 표시
    }
  };

  useEffect(() => {
    console.log('Scrap status in component:', scrapStatus);
  }, [scrapStatus]);

  return (
    <>
      {openLoginInducementModal && <InducementModal onClose={() => setOpenLoginInducementModal(false)} />}
      <div className="flex flex-col justify-center h-full">
        {/* 대분류, 중분류, 제목, 스크랩 버튼, 요약 */}
        <div className="flex flex-col items-start text-left">
          {/* 대분류, 중분류 */}
          <div className="flex">
            <span className="inline-block px-3 py-2 mt-4 mr-2 text-sm font-semibold rounded-lg bg-rose-100 text-rose-600 main-category-tag">
              # {article.mainCategory}
            </span>
            <span className="inline-block px-3 py-2 mt-4 mr-2 text-sm font-semibold rounded-lg bg-rose-100 text-rose-900 sub-category-tag">
              # {article.subCategory}
            </span>
          </div>
          {/* 제목 */}
          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-col items-start">
              <div className="mt-4 text-3xl font-semibold text-gray-900 title">{article.title}</div>
              <div className="mt-4 text-gray-500">
                <span className="mr-2">{article.copyRight || '한겨레'}</span>
                <span className="mr-2">|</span>
                <span className="mr-2">{format(new Date(article.wroteAt), 'yyyy/MM/dd HH:mm:ss')}</span>
              </div>
            </div>
            {/* 스크랩 버튼 */}
            <button onClick={handleScrap} className="m-4 focus:outline-none">
              <img className="object-contain h-10" src={isScraped ? AfterScrap : BeforeScrap} alt="Scrap Button" />
            </button>
          </div>
        </div>
        {/* 이미지와 컨텐츠 */}
        <div className="flex flex-col mt-4 px-3 items-center text-left max-h-[90vh] overflow-y-auto gray-scrollbar">
          {/* 요약 */}
          <div
            className="px-3 py-2 mt-4 text-xl font-semibold leading-6 text-left text-gray-800 rounded-lg bg-rose-100 summary"
            style={{ lineHeight: '1.8' }}
          >
            {article.summary}
          </div>
          {/* 이미지 */}
          <div className="max-h-[600px]">
            <ImageComponent src={article.image} alt={article.imageCaption} width={600} />
          </div>
          {/* 컨텐츠 */}
          <div className="py-2 font-light text-left text-gray-600 " style={{ lineHeight: '2' }}>
            {article.content}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
