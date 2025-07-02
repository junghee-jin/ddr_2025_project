import './ArrRBtn.css'
import RecoveryBtn from './RecoveryBtn'

export default function ArrRBtn({moodDatas}){
    return (
        <div className='btns'>
            <h3>하트를 누르면 당신을 위한 위로가 나와요~</h3>
            {moodDatas.map((moodData)=>(
                <div key={moodData.mood}>
                <RecoveryBtn mood={moodData.mood}/>
                </div>
            ))}
        </div>
    );
}