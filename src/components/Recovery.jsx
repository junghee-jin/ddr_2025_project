import ArrRBtn from './Recovery/ArrRBtn'
import moodData from '../moodData'
import RecoveryMap from './Recovery/RecoveryMap'
import './Recovery.css'

export default function Recovery() {
  return (
    <div className='recovery'>
    <div className="arrRBtn">
      <ArrRBtn moodDatas={moodData} />
    </div>
    <div className="recoveryMap">
      <RecoveryMap />
    </div>
    </div>
  );
}
