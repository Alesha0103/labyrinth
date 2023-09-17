import React from 'react'
import { FIX_ARRAY_LENGTH, HINT_COLOR, LAST_HINT_ID, LOOSER_COLOR, WINNER_COLOR } from '../../constants';
import { useAppSelector } from '../../hooks/redux';

type HintProps = {
  id: number,
  freeHints: number[],
  disabled?: boolean,
}

export const Dot: React.FC<HintProps> = ({id, freeHints, disabled}) => {
  const [color, setColor] = React.useState("");
  const { hintIndicator } = useAppSelector(state => state.cellsReducer);

  React.useEffect(() => {
    if (
      !!freeHints.length &&
      !disabled &&
      freeHints.some((hint) => hint === id)
    ) {
      setColor(WINNER_COLOR);
    } else if (
      (hintIndicator &&
        freeHints[freeHints.length - FIX_ARRAY_LENGTH] + FIX_ARRAY_LENGTH === id) ||
      (hintIndicator && id === LAST_HINT_ID)
    ) {
      setColor(HINT_COLOR);
    } else {
      setColor(LOOSER_COLOR);
    }
  }, [freeHints, hintIndicator]);

  return (
    <div style={{backgroundColor: color}}></div>
  )
}
