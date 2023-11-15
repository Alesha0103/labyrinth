import React from 'react'

import './Wellcome.scss'
import Troll from '../../assets/strange_troll_c.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classNames from 'classnames';
import { hideWellcomePage } from '../../store/actions/LevelsActions';
import { useTranslation } from '../../hooks/useTranslations';

export const Wellcome = () => {
  const dispatch = useAppDispatch();
  const { wellcomePage, blackTheme } = useAppSelector(state => state.levelsReducer);

  const greetingsText = useTranslation("GREETINGS");
  const enterText = useTranslation("ENTER");
  const rulesTopicText = useTranslation("RULES");
  const rulesText = useTranslation("RULES_RULES");
  const startButtonText = useTranslation("START_GAME");

  const hideThisPage = () => {
    dispatch(hideWellcomePage());
  }
  if (!wellcomePage) {
    return null;
  }

  return (
    <div className={classNames("wellcome-view", {"black-wellcome": blackTheme})}>
      <h1>{greetingsText}</h1>
      <div className="img">
        <img src={Troll} alt="troll_pic" />
      </div>
      <div className="explanation">
        <span>{enterText}</span>       
        <span className="rules">{rulesTopicText}</span>
        <p>{rulesText}</p>
      </div>
      <button onClick={hideThisPage}>{startButtonText}</button>
    </div>
  )
}
