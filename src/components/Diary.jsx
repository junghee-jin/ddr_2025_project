import { useContext, useState, useEffect } from "react";
import QuoteContext from "./QuoteContext";
import DiaryForm from "./Diary/DiaryForm";
import DiaryList from "./Diary/DiaryList";
import WeatherWithXML from './Diary/Weather';
import "./Diary.css";
import emotions from "../emotion";

export default function Diary() {
  const { mood } = useContext(QuoteContext);

  // 초기값으로 localStorage에서 불러오기
  const [diaries, setDiaries] = useState(() => {
    const saved = localStorage.getItem('diaries');
    return saved ? JSON.parse(saved) : [];
  });

  // diaries가 변경될 때마다 localStorage에 저장하기
  useEffect(() => {
    localStorage.setItem('diaries', JSON.stringify(diaries));
  }, [diaries]);

  // 새 일기 추가
  const handleAdd = (newDiary) => {
    setDiaries((prev) => [newDiary, ...prev]);
  };

  // 일기 삭제
  const handleDelete = (id) => {
    setDiaries((prev) => prev.filter((d) => d.id !== id));
  };

  // 일기 수정
  const handleUpdate = (updatedDiary) => {
    setDiaries((prev) =>
      prev.map((d) => (d.id === updatedDiary.id ? updatedDiary : d))
    );
  };

  const selectedEmotion = emotions.find((emotion)=> emotion.mood === mood);

  return (
    <div className="diary">
      <div className="left-pane">
        <div className="mood-weather-box">
          <p className="mood-label">
            내 마음의 날씨: {selectedEmotion ? `${selectedEmotion.mood} ${selectedEmotion.emoji}` : "맑으면 좋겠다~😄"}
          </p>
          <WeatherWithXML/>
        </div>
        <DiaryForm onAdd={handleAdd} />
      </div>
      <div className="right-pane">
        <DiaryList
          diaries={diaries}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
