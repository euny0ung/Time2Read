import React from 'react';
import ApexCharts from 'react-apexcharts';

const RadarChart = ({ solvedCount }) => {
  // solvedCount 객체 형식
  // const solvedCount = {
  //     social: 0,
  //     politics: 0,
  //     economy: 0,
  //     international: 0,
  //     culture: 0,
  //     sports: 0,
  //   };

  const categoryMapping = {
    social: '사회',
    politics: '정치',
    economy: '경제',
    international: '국제',
    culture: '문화',
    sports: '스포츠',
  };

  // solvedCount 객체에서 카테고리 이름과 데이터 추출
  const countCategories = Object.keys(solvedCount).map((category) => categoryMapping[category]);
  const countData = Object.values(solvedCount);

  const series = [
    {
      name: '카테고리별 맞은 개수',
      data: countData,
    },
  ];
  const options = {
    chart: {
      width: 'auto',
      height: 'suto',
    },
    xaxis: {
      categories: countCategories,
      labels: {
        style: {
          colors: ['#212529', '#212529', '#212529', '#212529', '#212529', '#212529'], // x 축 레이블의 색상을 변경
          fontSize: '14px',
          fontFamily: undefined,
          fontWeight: 600,
        },
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 600,
        },
        offsetX: 0,
        offsetY: 5,
      },
    },
    title: {
      text: '카테고리별 맞은 개수',
      align: 'left',
      margin: 0,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '',
      },
    },
    fill: {
      opacity: 0.5,
      colors: ['#FEFEC3'],
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'diagonal1',
        shadeIntensity: 0.5,
        gradientToColors: ['#D3FFEE'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.8,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['#A4E3D6'],
    },
    markers: {
      size: 5,
      colors: ['#FEFEC3'],
      strokeColors: '#2BBAB4',
      strokeWidth: 3,
      strokeOpacity: 0.7,
      strokeDashArray: 0,
      fillOpacity: 1,
      hover: {
        size: 10,
        sizeOffset: 3,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',
      },
      x: {
        show: true,
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      radar: {
        size: 100, // 레이더 차트 크기
        offsetX: -2, // 레이더 차트 왼쪽 여백
        offsetY: 25, // 레이더 차트 오른쪽 여백
        polygons: {
          strokeColors: '#bdbdbd',
          strokeWidth: 1,
          connectorColors: '#bdbdbd',
          fill: {
            colors: undefined,
          },
        },
      },
    },
  };

  return (
    <div>
      <ApexCharts options={options} series={series} type="radar" height={300} />
    </div>
  );
};

export default RadarChart;
