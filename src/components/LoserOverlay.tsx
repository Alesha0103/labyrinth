import React from 'react';
import { useAppSelector } from '../hooks/redux';
import './LoserOverlay.scss'

export const LoserOverlay = () => {
  const { loserOverlay} = useAppSelector(state => state.levelsReducer);
  if (!loserOverlay) {
    return null;
  }
  
  return (
    <div className='loser-overlay'>
      <h3>Wasted! Loading new stage...</h3>
    </div>
  )
}
