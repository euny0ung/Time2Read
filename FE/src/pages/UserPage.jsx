import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { getTimeRecords, getSolved } from '../apis/myApi.jsx';
import ResultButton from '../components/commons/buttons/ResultButton.jsx';
import TranslucentContainer from '../components/commons/containers/TranslucentContainer.jsx';
import WhiteContainer from '../components/commons/containers/WhiteContainer.jsx';
import ResultContent from '../components/commons/ResultContent.jsx';
import ResultTitle from '../components/commons/ResultTitle.jsx';
import Badges from '../components/my/Badges.jsx';
import RadarChart from '../components/my/RadarChart.jsx';

// {
// 	"records": [
// 		{
// 			"timeAttactTime": str
// 			"playDate": datetime
// 		},
// 		...
// 	]
// }

// {
//   "social": int,
//   "politics": int,
//   "economy": int,
//   "international": int,
//   "culture": int,
//   "sports": int
// }

const UserPage = () => {
  const [timeRecords, setTimeRecords] = useState([]);
  const [solvedCount, setSolvedCount] = useState({
    social: 10,
    politics: 80,
    economy: 20,
    international: 90,
    culture: 40,
    sports: 60,
  });

  useEffect(() => {
    getTimeRecords()
      .then((data) => {
        setTimeRecords(data.records);
        console.log('TimeRecords Data:', data.records);
      })
      .catch((error) => {
        console.error('Error requesting badge:', error);
      });

    getSolved()
      .then((data) => {
        setSolvedCount(data);
        console.log('SolvedCount Data:', data);
      })
      .catch((error) => {
        console.error('Error requesting badge:', error);
      });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-purple-200 to-blue-200">
        <div className="w-full max-w-[90%] lg:max-w-[60%] md:max-w-[75%] mx-auto ">
          <h1>마이페이지</h1>
          <div className="relative flex flex-col items-center w-full gap-4 border-4 border-red-500 ">
            {/* 나의 기록 myRecordbox */}
            <TranslucentContainer>
              <ResultTitle title={'나의 기록'} />
              <div className="flex flex-col items-center justify-center w-full gap-6 border-4 border-blue-500 lg:flex-row">
                <div className="w-2/12">
                  <WhiteContainer>
                    <ResultTitle title={'타임어택 기록'} />
                    <ResultContent>
                      {timeRecords.map((record, i) => (
                        <div key={record.playDate} className="flex justify-between">
                          <span>{`기록 ${i + 1}:`}</span>
                          <span>{record.timeAttackTime}</span>
                          <span>{format(new Date(record.playDate), 'yyyy-MM-dd HH:mm')}</span>
                        </div>
                      ))}
                    </ResultContent>
                  </WhiteContainer>
                </div>
                <div className="w-3s/12">
                  <WhiteContainer>
                    <ResultTitle title={'카테고리별 기록'} />
                    <RadarChart solvedCount={solvedCount} />
                  </WhiteContainer>
                </div>
                <div className="w-2/12">
                  <WhiteContainer>
                    <ResultTitle title={'획득한 뱃지'} />
                    <div className="overflow-y-auto h-[200px]">
                      <Badges />
                    </div>
                  </WhiteContainer>
                </div>
              </div>
            </TranslucentContainer>
            {/* 스크랩한 기사 scapedArticlebox */}
            <TranslucentContainer>
              <ResultTitle title={'스크랩한 기사'} />
              <WhiteContainer>
                <div className="h-40">스크랩한 기사 컴포넌트 만들어서 여기 넣으면 됨</div>
              </WhiteContainer>
            </TranslucentContainer>
            {/* 다시 시계토끼 쫓아가기 */}
            <div className="flex justify-end w-full">
              <ResultButton>
                <ResultTitle title={'다시 시계토끼 쫓아가기'} />
              </ResultButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
