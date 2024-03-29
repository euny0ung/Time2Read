import { format } from 'date-fns';
import ImageComponent from '../../commons/ImageComponent.jsx';
import Tooltip from '../../commons/Tooltip.jsx';

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
              <div
                key={article.id}
                className={`truncate cursor-pointer text-xl font-bold ${i === currentStep ? 'text-teal-900' : 'text-white'}`}
                onClick={() => {
                  goToStep(i);
                  setIsToggleOn(true);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    goToStep(i);
                    setIsToggleOn(true);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {format(new Date(article.wroteAt), 'yyyy')}
              </div>
            </Tooltip>
          );
        })}
      </div>
      {/* 프로그래스바 선 및 원 */}
      <div className="relative flex justify-between h-1 m-4 bg-white">
        {/* 프로그래스바 채워진 선 */}
        <div
          className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out bg-teal-300"
          style={{ width: `calc(${(currentStep / (relatedArticles.length - 1)) * 100}%)` }}
        />
        {/* 프로그래스바 원들 */}
        {relatedArticles.map((article, i) => (
          <Tooltip
            key={article.id}
            text={article.title}
            image={<ImageComponent src={article.image} alt={article.imageCaption} width={150} />}
          >
            <div
              key={article.id}
              className={`absolute top-0.5 z-10 flex items-center justify-center w-4 h-4 transform -translate-y-1/2 rounded-full ${i < currentStep ? 'bg-teal-300' : 'bg-white'} ${i === currentStep ? 'bg-teal-700' : ''}`}
              style={{
                left: `calc(${(i / (relatedArticles.length - 1)) * 100}% - 0.5rem)`,
              }}
              onClick={() => {
                goToStep(i);
                setIsToggleOn(true);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  goToStep(i);
                  setIsToggleOn(true);
                }
              }}
              role="button"
              tabIndex={0}
            />
          </Tooltip>
        ))}
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
              <div
                key={article.id}
                className={`truncate cursor-pointer flex-grow flex-shrink text-lg font-bold ${i === currentStep ? 'text-teal-900' : 'text-white'}`}
                style={{ maxWidth: titleMaxWidth }}
                onClick={() => {
                  goToStep(i);
                  setIsToggleOn(true);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    goToStep(i);
                    setIsToggleOn(true);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {article.title}
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
