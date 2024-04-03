import { scaleSequential } from 'd3-scale';
import { interpolateRainbow } from 'd3-scale-chromatic';
import WordCloud from 'react-d3-cloud';

const Keyword = ({ data, width, height }) => {
  const color = scaleSequential(interpolateRainbow).domain([0.5, 2]);

  return (
    <WordCloud
      data={data}
      width={width}
      height={height}
      font="SUITE-Regular"
      fontStyle="italic"
      fontWeight="bold"
      fontSize={(word) => Math.log2(word.value) * 2.5}
      spiral="rectangular"
      random={Math.random}
      fill={(d) => color(d.value / Math.max(...data.map((word) => word.value)))}
      // onWordClick={(event, d) => {
      //   console.log(`onWordClick: ${d.text}`);
      // }}
      // onWordMouseOver={(event, d) => {
      //   console.log(`onWordMouseOver: ${d.text}`);
      // }}
      // onWordMouseOut={(event, d) => {
      //   console.log(`onWordMouseOut: ${d.text}`);
      // }}
    />
  );
};

export default Keyword;
