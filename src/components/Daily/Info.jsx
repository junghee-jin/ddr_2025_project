import './Info.css';

export default function Info({ onClose }) {
  return (
    <div onClick={onClose} className="info-card">
      <h1 id='info'>Daily Dairy Recovery (DDR app)</h1>
      <img
        src="/emoji/1F604.svg"
        alt="smile emoji"
        style={{ width: '400px', height: '400px' }}
        draggable={false}
      />
      <h1 className="info-text">오늘도 저와 함께 하실래요? <br/>저와 함께 하신다면 화면을 클릭해 주세요~!!</h1>
    </div>
  );
}
