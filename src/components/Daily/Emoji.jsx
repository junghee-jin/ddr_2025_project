import { useContext } from 'react';
import './Emoji.css'
import QuoteContext from '../QuoteContext';

export default function Emoji({emoji}){
    const {image, label, mood, context, id} = emoji;
    const {selected, setSelected, mood: currentMood, setMood, setQuoteTrigger} = useContext(QuoteContext);

    const isSelected = selected === emoji.id;

    const selectMood = () => {
       if(currentMood === mood){
            setQuoteTrigger(prev => prev + 1);
       } else {
            setMood(mood);
       } setSelected(id);
    }

    return (
        <div
            className={
            `emoji-card ${isSelected ? 'selected' : ''}`}
            onClick={selectMood}>
            <img src={image} alt={`${mood}이미지`} />
        <div className='emoji-text'>
            <h5>{label}</h5>
            <p>{mood}</p>
        </div>
        <div className="emoji-context">
            <p dangerouslySetInnerHTML={{__html:context}}></p>
        </div>
    </div>
    
    )
}
