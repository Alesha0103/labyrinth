import React from 'react';

import "./Hints.scss";
import { Dot } from './Dot';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { showHint } from '../../store/actions/LevelsActions';

type HintsProps = {
  hints: number,
  setHints?: Function,
}

export const Hints: React.FC<HintsProps> = ({hints}) => {
  const dispatch = useAppDispatch();
  const [hintIDs, setHintIDs] = React.useState<number[]>([]);
  const [freeHints, setFreeHints] = React.useState<number[]>([]);

  const { activeStageID, disableHints } = useAppSelector(state => state.levelsReducer);

  React.useEffect(() => {
    const IDs = []
    for (let i = 1; i <= hints; i++) {
      IDs.push(i);
    }
    setHintIDs(IDs);
    setFreeHints(IDs);
  }, [hints, activeStageID, disableHints])

  const handleHint = () => {
    setFreeHints(freeHints.slice(0,-1))
    dispatch(showHint(true));
  }

  const renderDots = () => {
    return hintIDs.map((id, index) => <Dot key={id+index} id ={id} freeHints={freeHints} disabled={disableHints}/>)
  }

  return (
    <div className="hints">
      <div className="hints-section" id="hints-section">
        <button 
          disabled={disableHints || !freeHints.length}
          onClick={handleHint}
        >Show hint</button>
        {renderDots()}
      </div>
    </div>
  )
}
