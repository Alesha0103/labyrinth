import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Warning } from '../models/ICells';
import { clearChosenCells, setCells, setWarning } from '../store/actions/CellsAction';
import { Cell } from './Cell';

import './Stage.scss';

export const Stage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stages, activeStageID} = useAppSelector(state => state.levelsReducer);
  const { warning, warningType, cells } = useAppSelector(state => state.cellsReducer);

  const [warningColor, setWarningColor] = React.useState("");

  const clearCells = () => {
    dispatch(clearChosenCells());
  }

  React.useEffect(() => {
    if (!!stages.length) {
      const stage = stages.find(stage => stage.id === activeStageID)!;
      dispatch(setCells(stage.cells));
    }
  }, [stages, activeStageID])
  
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
      <div className='stage'>
        {cells.map(cell => {
          return <Cell key={cell.id} cell={cell}/>
        })}
      </div>
      <div style={{padding: "25px", borderStyle: "solid"}} onClick={()=>clearCells()}> clear cells </div>
    </>
  )
}
