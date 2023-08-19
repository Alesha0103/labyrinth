import React from 'react'

type HintProps = {
  id: number,
  freeHints: number[],
  disabled?: boolean,
}

export const Dot: React.FC<HintProps> = ({id, freeHints, disabled}) => {
  const [color, setColor] = React.useState("");

  React.useEffect(() => {
    if(!!freeHints.length && !disabled && freeHints.some(hint => hint === id)) {
      setColor("green");
    } else {
      setColor("red");
    }
  }, [freeHints])

  return (
    <div style={{backgroundColor: color}}></div>
  )
}
