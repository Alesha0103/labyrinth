import React from 'react';
import { ICell } from '../models/ILevel';

import { useAppDispatch, useAppSelector } from '../hooks/redux';

import './Cells.scss';
import { cellsSlice } from '../store/reducers/CellsSlice';

type CellPropsType = {
  cell: ICell,
}

export const Cell: React.FC<CellPropsType> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");

  const chosenCells = useAppSelector(state => state.cellsReducer.chosenCells);

  React.useEffect(() => {
  }, [])

  const onClickHandle = () => {
    if(cell.toVictory) {
      setColor("green")
    }
    if (!cell.toVictory) {
      setColor("red");
    }
  }
  
  return (
    <div className='cell' onClick={onClickHandle} style={{backgroundColor: color}}/>
  )
}
