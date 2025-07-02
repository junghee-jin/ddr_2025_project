import { useContext, useState } from "react";
import QuoteContext from '../QuoteContext';

import './DiaryForm.css';

export default function DiaryForm({ onAdd }) {
  const { mood } = useContext(QuoteContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const newDiary = () => {
    console.log('writeDiary 실행');

    const diary = {      
      id: Date.now(),
      date: new Date().toLocaleString(),
      title,
      text,
      mood,
    };

    console.log("저장할 일기 객체:", diary);

    onAdd(diary);

    setTitle('');
    setText('');
    alert('저장 완료');
  };

  return (
    <div className="main-wrapper">
        <h2>💭 왜 그럴까?</h2>
      <div className="diary-container">
        <input 
          type="text" 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='제목을 적어요'
          className='diary-title'
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="내 마음의 이야기를을 적어보세요..."
          className="diary-text"
        />
        <button onClick={newDiary}>
          저장
        </button>
      </div>
    </div>
  );
}
