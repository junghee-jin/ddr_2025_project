import { useContext } from "react";
import QuoteContext from "./QuoteContext";
import ArrEmoji from "./Daily/ArrEmoji";
import DailyHeart from './Daily/DailyHeart';
import emotions from '../emotion';

export default function Daily() {
  const { mood } = useContext(QuoteContext);
  
  return (
    <div>
      <ArrEmoji emojis={emotions} />
      {mood && <DailyHeart />}
    </div>
  );
}
