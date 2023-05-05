import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchLevel, finishStage, hideOverlay } from '../store/actions/LevelsActions';
import { clearChosenCells } from '../store/actions/CellsAction';
import { Cells } from './Cells';
import './Labyrinth.scss';
import { PayloadType, getRandomID } from '../helpers/GetRandomID';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { level, isLoading, error, loserOverlay, winerOverlay } = useAppSelector(state => state.levelsReducer);
  const chosenCells = useAppSelector(state => state.cellsReducer.chosenCells);

  const [variant, setVariant] = React.useState(1);

  const stage = level?.stages.find(stage => stage.id === variant)!;
  const variantsCount = level?.stages.length;
  const overlay = loserOverlay || winerOverlay;

  const isStageCompleted = () => {
    const cellsIDs = stage?.cells.filter(cell => cell.toVictory).map(cell => cell.id);
    const chosenCellsIDs = chosenCells.map(cell => cell.id);
    return cellsIDs ? cellsIDs.every(id => chosenCellsIDs.includes(id)) : false;
  }

  React.useEffect(() => {
    dispatch(fetchLevel(1));
  }, [])

  React.useEffect(() => {
    if(isStageCompleted()) {
      dispatch(finishStage(variant));

      setTimeout(() => {
        dispatch(clearChosenCells());
        dispatch(hideOverlay());
      }, 3000)
    }
  }, [chosenCells])

  React.useEffect(() => {
    if(!overlay && variantsCount) {
      const payload: PayloadType = {
        previous: variant,
        max: variantsCount,
        doneStages: level.stages.filter(stage => stage.done).map(stage => stage.id)
      }
      const randomNumber = getRandomID(payload);
      setVariant(randomNumber);
    }
  }, [overlay])

  if (error) {
    return <h2>Error Page</h2>
  }
  
  if (!level || isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <React.Fragment>
      <h2>Level №{level.id}</h2>
      <Cells cells={stage.cells} />
    </React.Fragment>
  )
}
