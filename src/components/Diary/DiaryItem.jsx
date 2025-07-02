import { useContext, useState } from "react";
import QuoteContext from "../QuoteContext";
import DiaryEditForm from "./DiaryEditForm";
import emotions from '../../emotion'
import './DiaryItem.css'

export default function DiaryItem({ diary, onDelete, onUpdate }) {
  const { mood } = useContext(QuoteContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!diary) return null;

  const findEmotion = emotions.find((emotions)=> emotions.mood === mood);

  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
      {isEditing ? (
        <DiaryEditForm
          diary={diary}
          onUpdate={(updatedDiary) => {
            onUpdate(updatedDiary);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="diary-list">
          <p className="diary-emoji">{findEmotion? findEmotion.emoji : "😄"}</p>
          <div className="diary-content">
            <p><strong>{diary.date}</strong></p>
            <h3>{diary.title}</h3>
            <p>{diary.text}</p>
          </div>
          <div className="diary-buttons">
            <button onClick={() => setIsEditing(true)}>수정</button>
            <button onClick={() => onDelete(diary.id)}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}
