import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ICell } from '../models/ILevel';
import { cellsSlice } from '../store/reducers/CellsSlice';
import { Cell } from './Cell';

import './Cells.scss';

type CellsPropsType = {
  cells: ICell[],
}

export const Cells: React.FC<CellsPropsType> = ({cells}) => {
  const dispatch = useAppDispatch();
  const chosenCells = useAppSelector(state => state.cellsReducer.chosenCells);

  console.log('chosenCells :>> ', chosenCells);

  React.useEffect(() => {
    const firstStep = cells.find(cell => cell.toVictory);

    if(!chosenCells.length && firstStep) {
      dispatch(cellsSlice.actions.chooseCell(firstStep));
    }
  }, []);
  
  return (
    <div className='cells'>
      {cells?.map(cell => {
        return <Cell key={cell.id} cell={cell}/>
      })}
    </div>
  )
}
