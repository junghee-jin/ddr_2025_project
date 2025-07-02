import './Bubble.css'; 
import { useNavigate } from "react-router-dom";
import QuoteContext from "../QuoteContext";
import { useContext } from "react";

export default function Bubble({ quote, translatedQuote, author, onClose }) {
   const navigate = useNavigate();
   const { mood } = useContext(QuoteContext);

  return (
    <div className="bubble-overlay" onClick={onClose}>
      <div className="bubble-container">
        <img src="/emoji/bubble.svg" alt="말풍선" className="bubble-bg" />
        <div className="bubble-content">
          <p>{quote}</p>
          <h4>{translatedQuote}</h4>
          <p>- {author}</p>
        </div>
        <div className='click'>
          <p>지금 선택한 내 마음을 더 깊이 살펴보면 어때요~?</p>
          {mood && (
        <>
          <button className='button1' onClick={() => navigate("/")} >내 마음 다시 click!</button>
          <button className='button2' onClick={() => navigate("/diary")} >일기 쓰러 가기</button>
          <button className='button3' onClick={() => navigate("/recovery")} >위로 받으러 가기</button>
        </>
      )}
        </div>
      </div>
    </div>
  );
};
