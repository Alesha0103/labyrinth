import React from 'react'
import RedTroll from '../../assets/red_troll.png';
import './ErrorPage.scss'

import { useAppSelector } from '../../hooks/redux';
import { useTranslation } from '../../hooks/useTranslations';

export const ErrorPage = () => {
  const { error: {active, message} } = useAppSelector(state => state.levelsReducer);

  const errorText = useTranslation("ERROR");
  const defaultError = useTranslation("DEFAULT_ERROR");
  const errorMessage = useTranslation(message);

  return (
    <>
      <div className="error-page__img">
        <img src={RedTroll} alt="red_troll" />
      </div>
      <h2>
        <span>{errorText}</span><br/><br/>
        {active && message ? errorMessage : defaultError}
      </h2>
    </>
  )
}
