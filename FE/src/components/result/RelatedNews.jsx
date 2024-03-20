import React, { useState } from 'react';

const RelatedNews = () => {
  const steps = ['2013', '2015', '2020', '2022', '2024'];
  const stepContents = ['content 1', 'content 2', 'content 3', 'content 4', 'Final step content'];
  const [currentStep, setCurrentStep] = useState(0);

  // 현재 스텝에 따라 채워진 연결선의 너비를 계산
  const filledLineWidth = `${(currentStep / (steps.length - 1)) * 100}%`;

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <>
      <div className="relative flex items-center justify-center py-4 border-4 border-gray-500">
        {/* 연결선 전체 컨테이너 */}
        <div className="absolute z-0 w-full px-3 transform -translate-y-1/2 top-[30%]">
          <div className="w-full h-1 bg-gray-200">
            {/* 채워진 연결선 */}
            <div
              className="h-full bg-[#8188FD] transition-all duration-700 ease-in-out"
              style={{ width: filledLineWidth }}
            />
          </div>
        </div>
        {/* 스텝 써클 및 설명 */}
        <div className="z-10 flex justify-between w-full">
          {steps.map((step, i) => {
            let bgColor = 'bg-gray-200'; // 기본 배경색
            if (i < currentStep) {
              bgColor = 'bg-[#8188FD]'; // 이전 스텝
            } else if (i === currentStep) {
              bgColor = 'bg-[#5159fb]'; // 현재 스텝
            }

            return (
              <div
                key={i}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => goToStep(i)}
                onKeyPress={(e) => e.key === 'Enter' && goToStep(i)}
                role="button"
                tabIndex={0}
              >
                <div
                  className={`w-4 h-4 flex items-center justify-center rounded-full text-white ${bgColor} transition-colors duration-300`}
                />
                <div className={`mt-2  ${i === currentStep ? 'text-[#5159fb]' : 'text-gray-500'}`}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 현재 스텝의 내용 */}
      <div className="text-center border-4 border-orange-500">{stepContents[currentStep]}</div>

      {/* 이전/다음 버튼 */}
      <div className="flex justify-between border-4 border-blue-900">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </>
  );
};

export default RelatedNews;
