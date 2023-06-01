import React from 'react'
import { useAppSelector } from '../../hooks/redux';

type HintProps = {
  id: number,
  freeHint: number[],
}

export const Hint: React.FC<HintProps> = ({id, freeHint}) => {
  const [hintColor, setColor] = React.useState("green");

  React.useEffect(() => {
    if (!freeHint.some(freeId => freeId === id)) {
      setColor("red");
    }
  }, [freeHint])

  return (
    <div style={{backgroundColor: hintColor}}></div>
  )
}
