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
  const [count, setCount] = React.useState<number>(10);

  const { level, stages, activeStageID, disableHints, hintIndicator } = useAppSelector(state => state.levelsReducer);
  const { blackTheme } = useAppSelector(state => state.generalReducer);

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

  const chooseAnimation = () => {
    if (!count && blackTheme) {
      return { "--animationName": "borderPulseBlack" }
    }
    if (!count && !blackTheme) {
      return { "--animationName": "borderPulseLight" }
    }
  }

  React.useEffect(() => {
    setCount(10);
  }, [stages])

  React.useEffect(() => {
    if (hintIndicator || disableHints || !freeHints.length) {
      setCount(10);
    }
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hintIndicator])

  return (
    <div className="hints">
      <button 
        disabled={(disableHints || !freeHints.length) && !hintIndicator}
        className={classNames("animation", {
          "light-theme-button": !blackTheme && !hintIndicator,
          "black-theme-button": blackTheme && !hintIndicator,
          "yellow-dot": hintIndicator && !blackTheme,
          "yellow-dot-black-theme": hintIndicator && blackTheme,
        })}
        // @ts-ignore
        style={chooseAnimation()}
        onClick={handleHint}
      >
        {showHintText}
      </button>
      <div className="dots" 
        style={{ justifyContent: level === 1 ? "center" : "" }}
        onClick={handleHint}
      >
          {renderDots()}
        </div>
    </div>
  )
}
