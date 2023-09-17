import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import './NotifyOverlay.scss'
import { WINNER_COLOR } from '../../constants';
import GreenTroll from "../../assets/green_troll.png";
import RedTroll from "../../assets/red_troll.png";

export const NotifyOverlay = () => {
  const { loserOverlay, winerOverlay} = useAppSelector(state => state.levelsReducer);
  const overlay = loserOverlay || winerOverlay;

  if (!overlay) {
    return null;
  }
  
  return (
    <div className='overlay'>
      <div className="img">
        {winerOverlay && <img src={GreenTroll} alt="green_troll" />}
        {loserOverlay && <img src={RedTroll} alt="pink_troll" />}
      </div>
      {winerOverlay && <h3 style={{color: WINNER_COLOR}}>You've made this stage!</h3>}
      {loserOverlay && <h3>Wasted! Loading new stage...</h3>}
    </div>
  )
}
