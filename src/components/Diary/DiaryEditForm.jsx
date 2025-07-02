import { useState, useContext, useEffect } from "react";
import QuoteContext from "../QuoteContext";
import './DiaryEditForm.css'

export default function DiaryEditForm({ diary, onUpdate, onCancel }) {
  const { selected, setSelected } = useContext(QuoteContext);
  const [title, setTitle] = useState(diary?.title || "");
  const [text, setText] = useState(diary?.text || "");

  // 편집폼이 열릴 때 diary.mood로 이모지 초기화
  useEffect(() => {
    setSelected(diary?.mood || null);
  }, [diary, setSelected]);

  const handleSubmit = () => {
    if (!title.trim() || !text.trim()) {
      alert("제목과 내용을 입력하세요.");
      return;
    }
    onUpdate({
      ...diary,
      title,
      text,
      mood: selected ?? "😐",
      date: new Date().toLocaleString(),
    });
    onCancel();
  };

   return (
    <div className="edit-card">
      <div className="edit">
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="edit-input"
        />
      <textarea
        placeholder="내용"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="edit-text"
        />
      </div>
      <div className="edit-buttons">
      <button onClick={handleSubmit}>저장</button>
      <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
}
