import { useState } from 'react';
import moodData from '../../moodData';
import './RecoveryBtn.css'

export default function RecoveryBtn({ mood }) {
  const [index, setIndex] = useState(-1);

  // mood 문자열에 맞는 데이터 찾아서 items 배열 가져오기
  //const data = moodData[mood] || [];
  const data = moodData.find(item => item.mood === mood)?.items || [];

  // index가 -1 이면 아직 시작 안한 상태, 0 이상이면 문구 선택 가능
  const current = index >= 0 ? data[Math.floor(index / 2) % data.length] : null;

  const changeMoodData = () => {
    setIndex((prev) => prev + 1);
  };

  const isQuestion = index % 2 === 0;
  const isStart = index === -1;

  return (
    <div className="recovery-btn">
      <button onClick={changeMoodData}>❤️</button>
      <div>
        {isStart
          ? mood
          : current
          ? isQuestion
            ? current.question
            : current.quote
            :'위로를 준비 중이에요..'}
      </div>
    </div>
  );
}
