import React from 'react'
import { HINT_COLOR, LOOSER_COLOR, WINNER_COLOR } from '../../constants';
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
    if(!!freeHints.length && !disabled && freeHints.some(hint => hint === id)) {
      setColor(WINNER_COLOR);
    } else if(disabled || freeHints.length < 1) {
      setColor(LOOSER_COLOR);
    }
    else {
      setColor(HINT_COLOR);
    }
  }, [freeHints])

  return (
    <div style={{backgroundColor: color}}></div>
  )
}
