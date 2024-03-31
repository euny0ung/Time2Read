import React, { useState, useEffect } from 'react';

// "00:00" 형식의 문자열을 초 단위로 변환하는 함수
const timeToSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

// "00:00" 형식의 문자열을 빠르게 증가시키는 함수
const incrementTime = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  let newSeconds = seconds + 1; // 1초씩 증가
  let newMinutes = minutes;
  if (newSeconds >= 60) {
    newMinutes += Math.floor(newSeconds / 60); // 분 추가
    newSeconds %= 60; // 초 재설정
  }
  return `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
};

// 시간 표시 및 갱신
const TimeLoader = ({ targetNumber }) => {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeSeconds = timeToSeconds(time);
      const targetSeconds = timeToSeconds(targetNumber);

      if (currentTimeSeconds < targetSeconds) {
        const newTime = incrementTime(time);
        setTime(newTime);
      } else {
        clearInterval(interval);
      }
    }, 5); // 5밀리초마다 업데이트 (0.05초마다)

    return () => {
      clearInterval(interval);
    };
  }, [targetNumber, time]);

  return (
    <div className="Loader" data-size={time}>
      {time}
    </div>
  );
};

export default TimeLoader;
