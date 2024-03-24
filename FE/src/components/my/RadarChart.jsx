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
    },
    title: {
      text: 'Solved Count',
    },
    fill: {
      opacity: 0.5,
      colors: ['#f9d833'],
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['#0b91e3'],
      dashArray: 1,
    },
    markers: {
      size: 5,
      colors: ['#0b91e3'],
      strokeColors: '#fff',
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      hover: {
        size: 10,
        sizeOffset: 3,
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColor: '#e8e8e8',
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
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
