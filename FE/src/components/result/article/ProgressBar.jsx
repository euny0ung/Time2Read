import { format } from 'date-fns';
import ImageComponent from '@/components/commons/ImageComponent.jsx';
import Tooltip from '@/components/commons/Tooltip.jsx';

const ProgressBar = ({ relatedArticles, currentStep, goToStep, setIsToggleOn, titleMaxWidth }) => {
  return (
    <div className="relative w-full">
      {/* 프로그래스바 원 위에 설명 - 연도 */}
      <div className="flex justify-between w-full">
        {relatedArticles.map((article, i) => {
          return (
            <Tooltip
              key={article.id}
              text={article.title}
              image={<ImageComponent src={article.image} alt={article.imageCaption} width={150} />}
            >
              <button
                key={article.id}
                className={`truncate cursor-pointer text-xl font-bold ${i === currentStep ? 'text-primary-indigo-4' : 'text-white'}`}
                onClick={() => {
                  goToStep(i);
                  setIsToggleOn(true);
                }}
              >
                {format(new Date(article.wroteAt), 'yyyy')}
              </button>
            </Tooltip>
          );
        })}
      </div>
      {/* 프로그래스바 선 및 원 */}
      <div className="relative flex justify-between h-1 m-4 bg-white">
        {/* 프로그래스바 채워진 선 */}
        <div
          className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out bg-primary-indigo-3"
          style={{ width: `calc(${(currentStep / (relatedArticles.length - 1)) * 100}%)` }}
        />
        {/* 프로그래스바 원들 */}
        {relatedArticles.map((article, i) => {
          let circleColor = '#FFFFFF'; // Default color
          if (i < currentStep) {
            circleColor = '#8096C5'; // Filled color
          } else if (i === currentStep) {
            circleColor = '#603049'; // Current color
          }

          return (
            <Tooltip
              key={article.id}
              text={article.title}
              image={<ImageComponent src={article.image} alt={article.imageCaption} width={150} />}
            >
              <button
                key={article.id}
                className="absolute top-0.5 flex items-center justify-center transform -translate-y-1/2 w-4 h-4 rounded-full"
                style={{
                  left: `calc(${(i / (relatedArticles.length - 1)) * 100}% - 0.5rem)`,
                  backgroundColor: circleColor,
                }}
                onClick={() => {
                  goToStep(i);
                  setIsToggleOn(true);
                }}
              />
            </Tooltip>
          );
        })}
      </div>
      {/* 프로그래스바 원 아래 설명 - 타이틀 */}
      <div className="flex justify-between w-full">
        {relatedArticles.map((article, i) => {
          return (
            <Tooltip
              key={article.id}
              text={article.title}
              image={<ImageComponent src={article.image} alt={article.imageCaption} width={150} />}
            >
              <button
                key={article.id}
                className={`truncate cursor-pointer flex-grow flex-shrink text-lg font-bold ${i === currentStep ? 'text-primary-indigo-4' : 'text-white'}`}
                style={{ maxWidth: titleMaxWidth }}
                onClick={() => {
                  goToStep(i);
                  setIsToggleOn(true);
                }}
              >
                {article.title}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
