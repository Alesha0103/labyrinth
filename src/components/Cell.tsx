import React from 'react';
import { ICell, Warning } from '../models/ICells';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

import './Stage.scss';
import {
  chooseCell,
  setWarning,
} from '../store/actions/CellsAction';
import {
  fetchStages,
  finishStage,
  hideOverlay,
  getRandomStage,
  setLoserOverlay,
  setWinnerOverlay,
  showHint,
  checkIfGameFinished,
  setActiveStage,
} from '../store/actions/LevelsActions';
import { OVERLAY_TIMEOUT, WARNING_TIMEOUT } from '../constants';

type CellPropsType = {
  cell: ICell,
}

export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const { cells, chosenCells, rightWay } = useAppSelector(state => state.cellsReducer);
  const { level, stages, activeStageID, hint } = useAppSelector(state => state.levelsReducer);
  const lastChosenCell = chosenCells?.[chosenCells.length - 1];

  const skipStage = () => {
    dispatch(hideOverlay());
    dispatch(getRandomStage());
  }

  React.useEffect(() => {
    setColor("");
    const firstStep = cells.find(cell => cell.firstStep);
    if(firstStep && firstStep.id === cell.id) {
      setColor("green");
      dispatch(chooseCell(firstStep));
    }
  }, [cells]);

  React.useEffect(() => {
    const currentIndex = rightWay.indexOf(lastChosenCell?.id);
    const nextRightStep = rightWay[currentIndex+1];
    if (
      hint
      && nextRightStep
      && nextRightStep===cell.id
    ) {
      setColor("pink");
    }
  }, [hint])

  const onClickHandle = () => {
    const isClickable = chosenCells[chosenCells.length-1].neighbor.some(id => id === cell.id);
    const winnerCell = rightWay[rightWay.length-1];
    const isLastStage = stages.length === 1;

    dispatch(showHint(false));

    if(isClickable && cell.toVictory) {
      setColor("green");
      dispatch(chooseCell(cell));
      if (cell.id === winnerCell && isLastStage) {
        dispatch(finishStage(activeStageID));
        dispatch(checkIfGameFinished(level+1));
        dispatch(setActiveStage(1));
      }
      if (cell.id === winnerCell && !isLastStage) {
        dispatch(setWinnerOverlay(true));
        dispatch(finishStage(activeStageID));

        const timeout = setTimeout(() => {
          skipStage();
          dispatch(fetchStages(level));
        }, OVERLAY_TIMEOUT)
        return () => clearTimeout(timeout);
      }
    }
    if(isClickable && !cell.toVictory && !isLastStage) {
      setColor("red");
      dispatch(setLoserOverlay(true));
      const timeout = setTimeout(() => {
        skipStage();
      }, OVERLAY_TIMEOUT)
      return () => clearTimeout(timeout);
    }

    if(isClickable && !cell.toVictory && isLastStage) {
      setColor("red");
      dispatch(setWarning(Warning.lastStage));
      const timeout = setTimeout(() => {
        setColor("");
      }, WARNING_TIMEOUT)
      return () => clearTimeout(timeout);
    }

    if(!isClickable) {
      dispatch(setWarning(Warning.error))
    }
    if(!isClickable && chosenCells[chosenCells.length-1].id === cell.id) {
      dispatch(setWarning(Warning.warning))
    }
  }

  return (
    <div className='cell' onClick={onClickHandle} style={{backgroundColor: color}}/>
  )
}
