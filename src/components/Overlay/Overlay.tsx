import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import './Overlay.scss'

export const Overlay = () => {
  const { loserOverlay, winerOverlay} = useAppSelector(state => state.levelsReducer);
  const overlay = loserOverlay || winerOverlay;

  if (!overlay) {
    return null;
  }
  
  return (
    <div className='overlay'>
      {winerOverlay && <h3>You've made this stage!</h3>}
      {loserOverlay && <h3>Wasted! Loading new stage...</h3>}
    </div>
  )
}
