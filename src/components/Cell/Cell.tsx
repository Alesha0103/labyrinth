import React from 'react';
import { ICell, Warning } from '../../models/ICells';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import '../Stage/Stage.scss'
import {
  chooseCell,
  setAttempts,
  setWarning,
} from '../../store/actions/CellsAction';
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
} from '../../store/actions/LevelsActions';
import { OVERLAY_TIMEOUT, WARNING_TIMEOUT } from '../../constants';

type CellPropsType = {
  cell: ICell,
}

export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const { cells, chosenCells, rightWay, attempts } = useAppSelector(state => state.cellsReducer);
  const { level, stages, activeStageID, hint } = useAppSelector(state => state.levelsReducer);
  const lastChosenCell = chosenCells?.[chosenCells.length - 1];

  const hideStage = () => {
    dispatch(hideOverlay());
    dispatch(getRandomStage());
  };

  React.useEffect(() => {
    if(lastChosenCell) {
      const filtred = lastChosenCell.neighbor.filter(id => !chosenCells.find(cell => cell.id === id))?.length-2;
      dispatch(setAttempts(filtred));
    }
  }, [lastChosenCell]);

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
      && nextRightStep === cell.id
    ) {
      setColor("pink");
    }
  }, [hint]);

  const handleErrorWarning = () => {
    dispatch(setWarning(Warning.lastStage));
    dispatch(setAttempts(attempts - 2));
    const timeout = setTimeout(() => {
      setColor("");
    }, WARNING_TIMEOUT)
    return () => clearTimeout(timeout);
  };

  const onClickHandle = () => {
    const isClickable = chosenCells[chosenCells.length-1].neighbor.some(id => id === cell.id && !chosenCells.includes(cell));
    const winnerCell = rightWay[rightWay.length-1];
    const isLastStage = stages.length === 1;

    const currentIndex = rightWay.indexOf(lastChosenCell?.id);
    const nextRightStep = rightWay[currentIndex+1];

    const checkNextStep = nextRightStep === cell.id;

    dispatch(showHint(false));

    if(isClickable && checkNextStep) {
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
          hideStage();
          dispatch(fetchStages(level));
        }, OVERLAY_TIMEOUT)
        return () => clearTimeout(timeout);
      }
    }
    if(isClickable && !checkNextStep && !isLastStage) {
      setColor("red");
      if (attempts < 1) {
        dispatch(setLoserOverlay(true));

        const timeout = setTimeout(() => {
          hideStage();
        }, OVERLAY_TIMEOUT);

        return () => clearTimeout(timeout);
      } else {
        handleErrorWarning();
      }
    }

    if(isClickable && !checkNextStep && isLastStage) {
      setColor("red");
      handleErrorWarning();
    }

    if(!isClickable) {
      dispatch(setWarning(Warning.error))
    }
    if(!isClickable && chosenCells[chosenCells.length-1].id === cell.id) {
      dispatch(setWarning(Warning.warning))
    }
  };

  return (
    <div className="cell" onClick={onClickHandle} style={{backgroundColor: color}}/>
  )
}