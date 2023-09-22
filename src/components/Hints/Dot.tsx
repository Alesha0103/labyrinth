import React from 'react'
import {
  FIX_ARRAY_LENGTH,
  HINT_COLOR,
  HINT_COLOR_THEME,
  LAST_HINT_ID,
  LOOSER_COLOR,
  LOOSER_COLOR_THEME,
  WINNER_COLOR,
  WINNER_COLOR_THEME,
} from '../../constants';
import { useAppSelector } from '../../hooks/redux';

type HintProps = {
  id: number,
  freeHints: number[],
  disabled?: boolean,
}

export const Dot: React.FC<HintProps> = ({id, freeHints, disabled}) => {
  const [color, setColor] = React.useState("");
  const { hintIndicator } = useAppSelector(state => state.cellsReducer);
  const { blackTheme } = useAppSelector(state => state.levelsReducer);

  const hintColor = blackTheme ? HINT_COLOR_THEME : HINT_COLOR;
  const winnerColor = blackTheme ? WINNER_COLOR_THEME : WINNER_COLOR;
  const looserColor = blackTheme ? LOOSER_COLOR_THEME : LOOSER_COLOR;

  React.useEffect(() => {
    if (
      !!freeHints.length &&
      !disabled &&
      freeHints.some((hint) => hint === id)
    ) {
      setColor(winnerColor);
    } else if (
      (hintIndicator &&
        freeHints[freeHints.length - FIX_ARRAY_LENGTH] + FIX_ARRAY_LENGTH === id) ||
      (hintIndicator && id === LAST_HINT_ID)
    ) {
      setColor(hintColor);
    } else {
      setColor(looserColor);
    }
  }, [freeHints, hintIndicator]);

  return (
    <div style={{ backgroundColor: color, boxShadow: blackTheme ? `0px 0px 10px ${color}` : undefined}}></div>
  )
}
