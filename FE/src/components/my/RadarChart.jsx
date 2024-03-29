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

  // solvedCount 객체에서 카테고리 이름과 데이터 추출
  const countCategories = Object.keys(solvedCount);
  const countData = Object.values(solvedCount);

  const series = [
    {
      name: 'Solved Count',
      data: countData,
    },
  ];

  const options = {
    chart: {
      height: 300,
      type: 'radar',
    },
    xaxis: {
      categories: countCategories,
      labels: {
        style: {
          colors: ['#212529', '#212529', '#212529', '#212529', '#212529', '#212529'], // x 축 레이블의 색상을 변경
          fontSize: '16px',
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          fontSize: '14px',
        },
      },
      axisBorder: {
        color: '#249593',
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        color: '#249593',
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    title: {
      text: 'Solved Count',
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
      width: 3,
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
  };

  return (
    <div>
      <ApexCharts options={options} series={series} type="radar" height={350} />
    </div>
  );
};

export default RadarChart;
