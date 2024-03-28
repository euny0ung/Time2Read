import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const FullCard = ({ card }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !contentRef.current) return;

    // 내용 요소에 대한 애니메이션 설정
    gsap.from(contentRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 20,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75">
      {/* 내용 요소 */}
      <div ref={contentRef} className="flex items-center justify-center w-full h-full">
        <div ref={cardRef} className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
          <img src={card.imageUrl} alt={card.title} className="w-full h-auto mb-4 rounded-lg" />
          <h2 className="mb-2 text-2xl font-bold">{card.title}</h2>
          <p className="text-gray-700">{card.description}</p>
          {/* 카드 디자인 */}
          <div className="max-w-sm shadow-xl card rounded-xl">
            <article className="p-6 bg-white information">
              <span className="inline-block px-3 py-2 mt-4 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg tag">
                Feature
              </span>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 title">Never miss your important meetings</h2>
              <p className="mt-4 text-gray-600 info">
                Elemenatary tracks all the events for the day as you scheduled and you will never have to worry.
              </p>
              <button className="inline-flex items-center justify-between gap-2 px-4 py-2 mt-4 font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg button hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white">
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
                </svg>
              </button>
              <div className="flex gap-4 details">
                <div className="flex flex-col-reverse w-1/2 gap-1 p-3 rounded-lg bg-titan-white">
                  <dt className="text-sm text-cold-purple">Detail 1</dt>
                  <dd className="text-lg font-semibold text-indigo-600">Value 1</dd>
                </div>
                {/* Add more details divs if needed */}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCard;
