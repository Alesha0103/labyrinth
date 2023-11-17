import React from 'react';

import "./Hints.scss";
import { Dot } from './Dot';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setHintIndicator } from '../../store/actions/LevelsActions';
import classNames from 'classnames';
import { useTranslation } from '../../hooks/useTranslations';
import { HINT_COLOR } from '../../constants';

type HintsProps = {
  hints: number,
  setHints?: Function,
}

export const Hints: React.FC<HintsProps> = ({hints}) => {
  const dispatch = useAppDispatch();
  const [hintIDs, setHintIDs] = React.useState<number[]>([]);
  const [freeHints, setFreeHints] = React.useState<number[]>([]);

  const { activeStageID, disableHints, hintIndicator, blackTheme } = useAppSelector(state => state.levelsReducer);

  const showHintText = useTranslation("SHOW_HINT");

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
    }
  }

  const renderDots = () => {
    return hintIDs.map((id, index) => <Dot key={id+index} id ={id} freeHints={freeHints} disabled={disableHints}/>)
  }

  //  Зараз ховер світлої теми перезаписує ховер темної. 
  // Ідея додати класи окремо для кожних ховерів щоб запобігти перезаписуванню

  return (
    <div className="hints">
      <button 
        disabled={(disableHints || !freeHints.length) && !hintIndicator}
        className={classNames({
          "black-hints-button": blackTheme,
          "yellow-dot": hintIndicator && !blackTheme,
          "yellow-dot-black-theme": hintIndicator && blackTheme,
        })}
        onClick={handleHint}
      >
        {showHintText}
      </button>
      <div className="dots" onClick={handleHint}>
          {renderDots()}
        </div>
    </div>
  )
}
