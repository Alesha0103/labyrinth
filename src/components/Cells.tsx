import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ICell, Warning } from '../models/ICells';
import { chooseCell, setWarning } from '../store/actions/CellsAction';
import { Cell } from './Cell';

import './Cells.scss';
import { finishStage } from '../store/actions/LevelsActions';

type CellsPropsType = {
  cells: ICell[],
}

export const Cells: React.FC<CellsPropsType> = ({cells}) => {
  const dispatch = useAppDispatch();
  const { warning, warningType } = useAppSelector(state => state.cellsReducer);
  const [warningColor, setWarningColor] = React.useState("");

  React.useEffect(() => {
    const firstStep = cells.find(cell => cell.toVictory);

    if(firstStep) {
      dispatch(chooseCell(firstStep));
    }
  }, [cells]);
  
  React.useEffect(() => {
    if(warningType === Warning.error) {
      setWarningColor("red");
    } else {
      setWarningColor("#afaf1e");
    }
    setTimeout(() => {
      dispatch(setWarning(Warning.clear));
    }, 2000)
  }, [warningType])
  
  return (
    <>
      <h3 className='warning' style={{color: warningColor}}>{warning}</h3>
      <div className='cells'>
        {cells.map(cell => {
          return <Cell key={cell.id} cell={cell}/>
        })}
      </div>
      <div style={{border: "solid", padding: "20px"}} onClick={()=>dispatch(finishStage(2))}>Finish!</div>
    </>
  )
}
