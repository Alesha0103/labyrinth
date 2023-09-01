import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Warning } from '../../models/ICells';
import { clearChosenCells, setCells, setRightWay, setWarning } from '../../store/actions/CellsAction';
import { setActiveStage } from '../../store/actions/LevelsActions';

import './Stage.scss';
import { WARNING_TIMEOUT } from '../../constants';
import { calculateHints } from '../../helpers';
import { IStage } from '../../models/ILevel';
import { Hints } from '../Hints/Hints';
import { Cell } from '../Cell/Cell';

export const Stage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { level, stages, activeStageID } = useAppSelector(state => state.levelsReducer);
  const { warning, warningType, cells } = useAppSelector(state => state.cellsReducer);

  const [warningColor, setWarningColor] = React.useState("");
  const [hints, setHints] = React.useState(0);
  const [geometry, setGeometry] = React.useState({ columns: 3, rows: 3 });

  const updateStage = (activeStage: IStage) => {
    dispatch(setActiveStage(activeStage.id));
    dispatch(setCells(activeStage.cells));
    dispatch(setRightWay(activeStage.rightWay));
    setHints(calculateHints(activeStage.rightWay));
    setGeometry(activeStage.geometry);
  }

  React.useEffect(() => {
    if(!!stages.length) {
      dispatch(clearChosenCells());
      const activeStage = stages[0];
      updateStage(activeStage);
    }
  }, [level]);

  React.useEffect(() => {
    const activeStage = !!stages.length && stages.find(stage => stage.id === activeStageID);
    if (activeStage) {
      dispatch(clearChosenCells());
      updateStage(activeStage);
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
  }, [warningType]);
  
  return (
    <>
      <h3 className="warning" style={{color: warningColor}}>{warning}</h3>
      {!!hints && <Hints hints={hints}/>}
      <div className="stage" style={{
          gridTemplateColumns: `repeat(${geometry?.columns}, 75px)`,
          gridTemplateRows: `repeat(${geometry?.rows}, 75px)`,
      }}>
        {cells.map(cell => {
          return <Cell key={cell.id} cell={cell}/>
        })}
      </div>
    </>
  )
}
