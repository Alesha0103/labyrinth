import React from 'react'
import RedTroll from '../../assets/red_troll.png';
import './ErrorPage.scss'

import { useAppSelector } from '../../hooks/redux';

export const ErrorPage = () => {
  const { error: {active, message} } = useAppSelector(state => state.levelsReducer);
  return (
    <>
      <div className="img">
        <img src={RedTroll} alt="red_troll" />
      </div>
      <h2>
        <span>Ooh, an ERROR...</span><br/><br/>
        {active && message ? message : "It looks like this troll has hacked the Labyrinth."}
      </h2>
    </>
  )
}
