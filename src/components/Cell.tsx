import React from 'react';
import { ICell, Warning } from '../models/ICells';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { chooseCell, clearChosenCells, setWarning } from '../store/actions/CellsAction';
import { hideOverlay, setLoserOverlay } from '../store/actions/LevelsActions';

import './Cells.scss';

type CellPropsType = {
  cell: ICell,
}

export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const chosenCells = useAppSelector(state => state.cellsReducer.chosenCells);

  React.useEffect(() => {
    const isCellChosen = chosenCells.some(el => el.id === cell.id);

    if(isCellChosen && cell.toVictory) {
      setColor("green");
    }
    if(isCellChosen && !cell.toVictory) {
      setColor("red");
      dispatch(setLoserOverlay(true));

      setTimeout(() => {
        dispatch(clearChosenCells());
        dispatch(hideOverlay());
      }, 3000)
    }
  }, [chosenCells])

  const onClickHandle = () => {
    const neighbor = chosenCells[chosenCells.length-1].neighbor;
  
    if (neighbor && neighbor.some(el => el === cell.id)) {
      dispatch(chooseCell(cell));
      dispatch(setWarning(Warning.clear))
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
