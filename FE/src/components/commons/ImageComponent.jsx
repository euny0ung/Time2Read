import { useState } from 'react';

/**
 * 이미지를 렌더링하는 컴포넌트
 *
 * @param {string} src - 이미지 URL
 * @param {string} alt - 대체 텍스트
 * @param {number} width - 이미지의 너비. 픽셀 단위
 * @param {number} height - 이미지의 높이. 픽셀 단위
 */

const ImageComponent = ({ src, alt, width, height }) => {
  const [imageError, setImageError] = useState(false);

  const boxStyles = {
    width: width ? `${width}px` : '40px',
    height: height ? `${height}px` : 'auto',
  };

  if (!src) {
    // 이미지 URL이 없는 경우, 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <div className="flex items-center justify-center bg-gray-200 rounded-lg" style={boxStyles}>
      {imageError ? (
        // 이미지 로드 실패 시 회색 박스와 대체 텍스트를 표시
        <span className="text-xs text-center text-gray-500" style={{ padding: `${width / 4}px 0` }}>
          {alt}
        </span>
      ) : (
        // 이미지 URL이 있는 경우, img 요소를 렌더링
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)} // 이미지 로드 실패 시 처리
          className="max-w-full max-h-full rounded" // 이미지가 컨테이너를 벗어나지 않도록 함
          style={{ width: 'auto', height: 'auto' }} // 이미지의 원래 비율을 유지
        />
      )}
    </div>
  );
};

export default ImageComponent;
