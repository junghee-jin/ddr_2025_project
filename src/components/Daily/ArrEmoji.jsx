import { useState } from 'react';
import Emoji from './Emoji';
import Info from './Info';
import './ArrEmoji.css'

export default function ArrEmoji({emojis}){
    const [showInfo, setShowInfo] = useState(true);

    const handleCloseInfo = () => {
        setShowInfo(false);
    }

    if(!emojis) return `잠시만 기다려 주세요. 당신을 기다리고 있었어요!`;
    
    return (
        <div>
            {showInfo && <Info onClose={handleCloseInfo}/>}
        <h1 className="arr-title"> 내 마음은? </h1>
        <div className="arrEmoji">
            {emojis.map((emoji)=>(
                <Emoji emoji={emoji} key={emoji.id}/>
            ))}
        </div>
            <h4 className="arr-text">스크롤을 옆으로 옮겨 지금 마음을 선택해 주세요</h4>
        </div>
    )
}