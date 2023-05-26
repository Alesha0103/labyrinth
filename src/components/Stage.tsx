import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Warning } from '../models/ICells';
import { setCells, setRightWay, setWarning } from '../store/actions/CellsAction';
import { setActiveStage } from '../store/actions/LevelsActions';

import './Stage.scss';
import { Cell } from './Cell';

export const Stage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stages, activeStageID} = useAppSelector(state => state.levelsReducer);
  const { warning, warningType, cells, chosenCells } = useAppSelector(state => state.cellsReducer);
  

  const [warningColor, setWarningColor] = React.useState("");

  console.log('stages :>> ', stages);
  console.log('chosenCells :>> ', chosenCells);

  React.useEffect(() => {
    if (!!stages.length) {
      let stage = stages.find(stage => stage.id === activeStageID);
      if (!stage) {
        stage = stages[0];
        dispatch(setActiveStage(stage.id));
      }
      dispatch(setCells(stage.cells));
      dispatch(setRightWay(stage.rightWay));
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
    </>
  )
}
