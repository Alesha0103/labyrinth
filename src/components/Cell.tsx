import React from 'react';
import { ICell, Warning } from '../models/ICells';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { chooseCell, clearChosenCells, setWarning } from '../store/actions/CellsAction';
import { fetchLevel, finishStage, hideOverlay, setActiveStage, setLoserOverlay } from '../store/actions/LevelsActions';

import './Stage.scss';

type CellPropsType = {
  cell: ICell,
}
const LENGTH_ZERO = 0;

export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const { activeStageID } = useAppSelector(state => state.levelsReducer);
  const { cells, chosenCells } = useAppSelector(state => state.cellsReducer);
  
  const isLastElement = (currentId: number) => {
    const victoryCells = cells.filter(cell => cell.toVictory).map(cell => Number(cell.id));
    return currentId === victoryCells[victoryCells.length - 1];
  }

  const skipStage = async () => {
    dispatch(clearChosenCells());
    dispatch(setActiveStage());
    dispatch(hideOverlay());
    setColor("");
  }

  React.useEffect(() => {
    const firstStep = cells.find(cell => cell.toVictory);

    if(firstStep && chosenCells.length === LENGTH_ZERO) {
      dispatch(chooseCell(firstStep));
    }
    if(firstStep && cell.id === firstStep.id) {
      setColor("green");
    }
  }, [cells, chosenCells, activeStageID])

  const onClickHandle = () => {
    const neighbor = chosenCells[chosenCells.length-1].neighbor;
  
    if (neighbor && neighbor.some(el => el === cell.id)) {
      dispatch(chooseCell(cell));
      dispatch(setWarning(Warning.clear));

      if (cell.toVictory) {
        setColor("green");
        if(isLastElement(cell.id)) {
          dispatch(finishStage(activeStageID));
          
          setTimeout(() => {
            skipStage();
          }, 3000)
          return;
        }
      }
      if (!cell.toVictory) {
        setColor("red");
        dispatch(setLoserOverlay(true));

        setTimeout(() => {
          skipStage();
        }, 3000)
      }
    }

    if (!neighbor.some(el => el === cell.id)) {
      dispatch(setWarning(Warning.error))
    }
    if (chosenCells.some(el => el.id === cell.id)) {
      dispatch(setWarning(Warning.warning))
    }
  }
  
  return (
    <div className='cell' onClick={onClickHandle} style={{backgroundColor: color}}/>
  )
}
