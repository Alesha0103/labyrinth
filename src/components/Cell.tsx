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
  setActiveStage,
  setLoserOverlay,
  setWinnerOverlay,
} from '../store/actions/LevelsActions';

type CellPropsType = {
  cell: ICell,
}

export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const { cells, chosenCells } = useAppSelector(state => state.cellsReducer)
  const { activeStageID } = useAppSelector(state => state.levelsReducer)

  const skipStage = () => {
    dispatch(hideOverlay());
    dispatch(clearChosenCells());
    dispatch(setActiveStage());
    setColor("");
  }

  React.useEffect(() => {
    const firstStep = cells.find(cell => cell.toVictory);
    if(firstStep && firstStep.id === cell.id) {
      setColor("green");
      dispatch(chooseCell(firstStep));
    }
  }, [])

  const onClickHandle = () => {
    const isClickable = chosenCells[chosenCells.length-1].neighbor.some(id => id === cell.id);
    const winnerCells = cells.filter(cell => cell.toVictory).map(cell => cell.id);
    const winnerCell = winnerCells[winnerCells.length-1];

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
