import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import WordCloud from 'react-d3-cloud';

const Keyword = ({ data, width, height }) => {
  const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

  return (
    <WordCloud
      data={data}
      width={width}
      height={height}
      font="Times"
      fontStyle="italic"
      fontWeight="bold"
      fontSize={(word) => Math.log2(word.value) * 3}
      spiral="rectangular"
      random={Math.random}
      fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
      onWordClick={(event, d) => {
        console.log(`onWordClick: ${d.text}`);
      }}
      onWordMouseOver={(event, d) => {
        console.log(`onWordMouseOver: ${d.text}`);
      }}
      onWordMouseOut={(event, d) => {
        console.log(`onWordMouseOut: ${d.text}`);
      }}
    />
  );
};

export default Keyword;
