import React from 'react';
import { ICell, Warning } from '../models/ICells';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

import './Stage.scss';
import {
  chooseCell,
  clearChosenCells,
  setWarning,
} from '../store/actions/CellsAction';
import {
  fetchLevel,
  finishStage,
  hideOverlay,
  getRandomStage,
  setLoserOverlay,
  setWinnerOverlay,
} from '../store/actions/LevelsActions';

type CellPropsType = {
  cell: ICell,
}


export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const { cells, chosenCells, rightWay } = useAppSelector(state => state.cellsReducer);
  const { activeStageID } = useAppSelector(state => state.levelsReducer);

  const skipStage = () => {
    dispatch(hideOverlay());
    dispatch(clearChosenCells());
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

  const onClickHandle = () => {
    const isClickable = chosenCells[chosenCells.length-1].neighbor.some(id => id === cell.id);
    const winnerCell = rightWay[rightWay.length-1];

    if(isClickable && cell.toVictory) {
      setColor("green");
      dispatch(chooseCell(cell));
      if (cell.id === winnerCell) {
        dispatch(setWinnerOverlay(true));
        dispatch(finishStage(activeStageID));

        setTimeout(() => {
          skipStage();
          dispatch(fetchLevel());
        }, 3000)
      }
    }
    if(isClickable && !cell.toVictory) {
      setColor("red");
      dispatch(setLoserOverlay(true));
      setTimeout(() => {
        skipStage();
      }, 3000)
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
