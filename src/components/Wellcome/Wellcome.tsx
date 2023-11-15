import React from 'react'

import './Wellcome.scss'
import Troll from '../../assets/strange_troll_c.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classNames from 'classnames';
import { hideWellcomePage } from '../../store/actions/LevelsActions';

export const Wellcome = () => {
  const dispatch = useAppDispatch();
  const { wellcomePage, blackTheme } = useAppSelector(state => state.levelsReducer);

  const hideThisPage = () => {
    dispatch(hideWellcomePage());
  }
  if (!wellcomePage) {
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
        When you start the game you will see the number of cells. 
        Your task is to match these cells to build the correct path. 
        You can only click on a cell that is adjacent to the one you are already standing on, 
        but not on the previous one you selected. 
        If you make a wrong move, the Labyrinth will take you to another stage of that level. 
        However, this stage is not counted. 
        All levels have 5 stages. Your task is to pass all of them to proceed to the next level. 
        Looks easy. Let's see. Good luck!
        </p>
      </div>
      <button onClick={hideThisPage}>Start game</button>
    </div>
  )
}
