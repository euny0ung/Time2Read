const HighlightedContent = ({ content, keywords }) => {
  // 키워드가 포함된 단어를 찾아서 스타일을 적용하는 함수
  const applyHighlight = (word) => {
    // 단어에 키워드가 포함되어 있는지 확인하여 스타일을 적용
    return keywords.some((keyword) => word.includes(keyword)) ? (
      <span className="highlighted">{word} </span>
    ) : (
      <span>{word} </span>
    );
  };

  // 콘텐츠를 공백으로 분리하여 배열로 변환한 후, 각 단어에 스타일을 적용하여 반환
  const highlightedContent = content.split(' ').map((word, index) => applyHighlight(word, index));

  return (
    <div className="px-3 py-2 mt-4 leading-relaxed text-gray-600" style={{ lineHeight: '2' }}>
      {/* 스타일이 적용된 콘텐츠 출력 */}
      {highlightedContent}
    </div>
  );
};

export default HighlightedContent;
