import React from 'react'
import './FinishedGame.scss';
import { useTranslation } from '../../hooks/useTranslations';

export const FinishedGame = () => {
  const congratulations = useTranslation("CONGRATULATIONS");
  const finishGame = useTranslation("FINISH_GAME_LABEL");

  React.useEffect(() => {
    localStorage.removeItem("level");
  }, [])

  return (
    <div className="finished-game-page">
      <span>{congratulations}</span>
      <span>{finishGame}</span>
    </div>
  )
}
