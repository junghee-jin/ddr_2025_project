import DiaryItem from "./DiaryItem";
import './DiaryList.css';

// DiaryList.jsx
export default function DiaryList({ diaries, onDelete, onUpdate }) {
  return (
    <>
    <h3 className="fight"> 앞으로는 더 빛날거에요~ </h3>
    <div className="diary-items-wrapper">
      {diaries.length === 0 ? (
        <p className="diary-list-empty">지금 내 마음이 왜 그런지 적어보면 어떨까요?^^</p>
      ) : (
        diaries.map((diary) => (
          <DiaryItem
            key={diary.id}
            diary={diary}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
    </>
  );
}

