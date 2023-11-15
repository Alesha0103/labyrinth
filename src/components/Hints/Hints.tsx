import React from 'react';

import "./Hints.scss";
import { Dot } from './Dot';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setHintIndicator } from '../../store/actions/LevelsActions';
import classNames from 'classnames';
import { useTranslation } from '../../hooks/useTranslations';

type HintsProps = {
  hints: number,
  setHints?: Function,
}

export const Hints: React.FC<HintsProps> = ({hints}) => {
  const dispatch = useAppDispatch();
  const [hintIDs, setHintIDs] = React.useState<number[]>([]);
  const [freeHints, setFreeHints] = React.useState<number[]>([]);
  const [buttonAnimation, setAnimation] = React.useState(true);

  const { activeStageID, disableHints, hintIndicator, blackTheme } = useAppSelector(state => state.levelsReducer);

  const showHintText = useTranslation("SHOW_HINT");

  React.useEffect(() => {
    if (!hintIndicator) {
      setAnimation(true);
    }
  }, [hintIndicator])

  React.useEffect(() => {
    const IDs = []
    for (let i = 1; i <= hints; i++) {
      IDs.push(i);
    }
    setHintIDs(IDs);
    setFreeHints(IDs);
  }, [hints, activeStageID, disableHints])

  const handleHint = () => {
    if(!hintIndicator) {
      setFreeHints(freeHints.slice(0,-1))
      dispatch(setHintIndicator(true));
      setAnimation(false);
    }
  }

  const renderDots = () => {
    return hintIDs.map((id, index) => <Dot key={id+index} id ={id} freeHints={freeHints} disabled={disableHints}/>)
  }

  return (
    <div className="hints">
      <div className="hints-section" id="hints-section">
        <button 
          disabled={disableHints || !freeHints.length}
          className={classNames({"black-hints-button": blackTheme, "yellow-dot": !buttonAnimation})}
          onClick={handleHint}
        >
          {showHintText}
        </button>
        {renderDots()}
      </div>
    </div>
  )
}
