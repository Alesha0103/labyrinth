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
  setHintIndicator,
  checkIfGameFinished,
  setActiveStage,
} from '../../store/actions/LevelsActions';
import {
  FIX_ARRAY_LENGTH,
  HINT_COLOR,
  LOOSER_COLOR,
  OVERLAY_TIMEOUT,
  WARNING_TIMEOUT,
  WINNER_COLOR,

  HINT_COLOR_THEME,
  WINNER_COLOR_THEME,
  LOOSER_COLOR_THEME,
} from "../../constants";

type CellPropsType = {
  cell: ICell,
}

export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const { cells, chosenCells, rightWay, attempts } = useAppSelector(state => state.cellsReducer);
  const { level, stages, activeStageID, hintIndicator } = useAppSelector(state => state.levelsReducer);
  const { blackTheme } = useAppSelector(state => state.generalReducer);
  const lastChosenCell = chosenCells?.[chosenCells.length - FIX_ARRAY_LENGTH];

  const hintColor = blackTheme ? HINT_COLOR_THEME : HINT_COLOR;
  const winnerColor = blackTheme ? WINNER_COLOR_THEME : WINNER_COLOR;
  const looserColor = blackTheme ? LOOSER_COLOR_THEME : LOOSER_COLOR;

  const hideStage = () => {
    dispatch(hideOverlay());
    dispatch(getRandomStage());
    dispatch(setHintIndicator(false));
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
      setColor(winnerColor);
      dispatch(chooseCell(firstStep));
    }
  }, [cells]);

  React.useEffect(() => {
    const currentIndex = rightWay.indexOf(lastChosenCell?.id);
    const nextRightStep = rightWay[currentIndex+FIX_ARRAY_LENGTH];
    if (
      hintIndicator
      && nextRightStep
      && nextRightStep === cell.id
    ) {
      setColor(hintColor);
    }
    if (chosenCells.some(choosenCell => cell.id === choosenCell.id)) {
      setColor(winnerColor);
    }
  }, [hintIndicator, color, blackTheme]);

  const handleWarning = () => {
    dispatch(setWarning(Warning.LAST_STAGE));
    dispatch(setAttempts(attempts - 2));
    if(hintIndicator) {
      dispatch(setHintIndicator(true));
    }
    const timeout = setTimeout(() => {
      setColor("");
    }, WARNING_TIMEOUT)
    return () => clearTimeout(timeout);
  };

  const onClickHandle = () => {
    const isClickable = chosenCells[chosenCells.length-FIX_ARRAY_LENGTH].neighbor.some(id => id === cell.id && !chosenCells.includes(cell));
    const winnerCell = rightWay[rightWay.length-FIX_ARRAY_LENGTH];
    const isLastStage = stages.length === FIX_ARRAY_LENGTH;

    const currentIndex = rightWay.indexOf(lastChosenCell?.id);
    const nextRightStep = rightWay[currentIndex+FIX_ARRAY_LENGTH];

    const checkNextStep = nextRightStep === cell.id;

    if(isClickable && checkNextStep) {
      if(hintIndicator) {
        dispatch(setHintIndicator(false));
      }
      setColor(winnerColor);
      dispatch(chooseCell(cell));
      if (cell.id === winnerCell && isLastStage) {
        dispatch(finishStage(activeStageID));
        dispatch(checkIfGameFinished(level+FIX_ARRAY_LENGTH));
        dispatch(setActiveStage(FIX_ARRAY_LENGTH));
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
      setColor(looserColor);
      if (attempts < FIX_ARRAY_LENGTH) {
        dispatch(setLoserOverlay(true));

        const timeout = setTimeout(() => {
          hideStage();
        }, OVERLAY_TIMEOUT);

        return () => clearTimeout(timeout);
      } else {
        handleWarning();
      }
    }

    if(isClickable && !checkNextStep && isLastStage) {
      setColor(looserColor);
      handleWarning();
    }

    if(!isClickable) {
      dispatch(setWarning(Warning.ERROR))
    }
    if(!isClickable && chosenCells[chosenCells.length-FIX_ARRAY_LENGTH].id === cell.id) {
      dispatch(setWarning(Warning.WARNING))
    }
  };

  return (
    <div className="cell" onClick={onClickHandle} style={{
      backgroundColor: color,
      borderColor: color && "transparent",
      transform: color && "scale(0.99)"
    }}/>
  )
}
