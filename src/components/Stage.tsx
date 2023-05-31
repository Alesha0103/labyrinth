import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Warning } from '../models/ICells';
import { setCells, setRightWay, setWarning } from '../store/actions/CellsAction';
import { setActiveStage } from '../store/actions/LevelsActions';

import './Stage.scss';
import { Cell } from './Cell';
import { WARNING_TIMEOUT } from '../constants';

export const Stage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { level, stages, activeStageID} = useAppSelector(state => state.levelsReducer);
  const { warning, warningType, cells } = useAppSelector(state => state.cellsReducer);

  const [warningColor, setWarningColor] = React.useState("");

  React.useEffect(() => {
    if(!!stages.length) {
      const activeStage = stages[0];
      dispatch(setActiveStage(activeStage.id));
      dispatch(setCells(activeStage.cells));
      dispatch(setRightWay(activeStage.rightWay));
    }
  }, []);

  React.useEffect(() => {
    const activeStage = !!stages.length && stages.find(stage => stage.id === activeStageID);
    if (activeStage) {
      dispatch(setActiveStage(activeStage.id));
      dispatch(setCells(activeStage.cells));
      dispatch(setRightWay(activeStage.rightWay));
    }
  }, [activeStageID]);
  
  React.useEffect(() => {
    if(warningType === Warning.error || warningType === Warning.lastStage) {
      setWarningColor("red");
    } else {
      setWarningColor("#afaf1e");
    }
    const timeout = setTimeout(() => {
      dispatch(setWarning(Warning.clear));
    }, WARNING_TIMEOUT)
  
    return () => clearTimeout(timeout);
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
