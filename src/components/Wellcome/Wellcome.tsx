import React from 'react'

import './Wellcome.scss'
import Troll from '../../assets/strange_troll_c.png';
import { useAppSelector } from '../../hooks/redux';
import classNames from 'classnames';

export const Wellcome = () => {
  const [wellcome, setWellcome] = React.useState(true);
  const { blackTheme } = useAppSelector(state => state.levelsReducer);

  const hideThisPage = () => {
    setWellcome(false);
  }
  if (!wellcome) {
    return null;
  }

  return (
    <div className={classNames("wellcome-view", {"black-wellcome": blackTheme})}>
      <h1>Greetings, dear traveler!</h1>
      <div className="img">
        <img src={Troll} alt="troll_pic" />
      </div>
      <div className="explanation">
        <span>Looks like you are lost in the Labyrinth!</span>       
        <span className="rules">Here you can see the rules of this game:</span>
        <p>
          You can choose a cell for your step. 
          The cell must be adjacent to the one where you are already standing but you can't go back. 
          You have a few trying to make right step.
          If you loose it then the Labyrinth will take you to another stage of this level. 
          However, this stage is not counted. All levels have 5 stages. 
          Your task is to pass all of them to proceed to the next level. 
          Looks easy. Let's see. Good luck!
        </p>
      </div>
      <button onClick={hideThisPage}>Start game</button>
    </div>
  )
}
