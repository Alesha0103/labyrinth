import React from 'react';

import "./Hints.scss";
import { Hint } from './Hint';
import { useAppDispatch } from '../../hooks/redux';
import { showHint } from '../../store/actions/LevelsActions';

type HintsProps = {
  hints: number,
  setHints?: Function,
}

export const Hints: React.FC<HintsProps> = ({hints}) => {
  const dispatch = useAppDispatch();
  const [hintIDs, setHintIDs] = React.useState<number[]>([]);
  const [freeHint, setFreeHint] = React.useState<number[]>([]);

  React.useEffect(() => {
    const IDs = []
    for (let i = 1; i <= hints; i++) {
      IDs.push(i);
    }
    setHintIDs(IDs);
    setFreeHint(IDs);
  }, [hints])

  const handleHint = () => {
    setFreeHint(freeHint.slice(0,-1))
    dispatch(showHint(true));
  }

  const renderHints = () => {
    return hintIDs.map(id => <Hint key={id} id={id} freeHint={freeHint}/>)
  }

  return (
    <div className="hints">
      <div className="hints-section" id="hints-section">
        <button 
          disabled={!freeHint.length}
          onClick={handleHint}
          className={!freeHint.length ? "disabled" : undefined}
        >Show hint</button>
        {renderHints()}
      </div>
    </div>
  )
}
