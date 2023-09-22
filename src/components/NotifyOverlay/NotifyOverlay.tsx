import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import './NotifyOverlay.scss'
import { WINNER_COLOR, WINNER_COLOR_THEME, LOOSER_COLOR_THEME } from '../../constants';
import GreenTroll from "../../assets/green_troll.png";
import RedTroll from "../../assets/red_troll.png";
import classNames from 'classnames';

export const NotifyOverlay = () => {
  const { loserOverlay, winerOverlay, blackTheme } = useAppSelector(state => state.levelsReducer);
  const overlay = loserOverlay || winerOverlay;

  if (!overlay) {
    return null;
  }
  
  return (
    <div className={classNames("overlay", { "black-notify-overlay": blackTheme })}>
      <div className="img">
        {winerOverlay && <img src={GreenTroll} alt="green_troll" />}
        {loserOverlay && <img src={RedTroll} alt="pink_troll" />}
      </div>
      {winerOverlay && <h3 style={{color: WINNER_COLOR, backgroundColor: blackTheme ? WINNER_COLOR_THEME : undefined}}>You've made this stage!</h3>}
      {loserOverlay && <h3 style={{backgroundColor: blackTheme ? LOOSER_COLOR_THEME : undefined}}>Wasted! Loading new stage...</h3>}
    </div>
  )
}
