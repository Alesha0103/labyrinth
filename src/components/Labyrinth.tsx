import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchLevel } from '../store/actions/LevelsActions';
import { Stage } from './Stage';

import './Labyrinth.scss';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { level, stages, isLoading, error } = useAppSelector(state => state.levelsReducer);

  const unpassedStageID = !!stages.find(stage => !stage.done)?.id;

  React.useEffect(() => {
    dispatch(fetchLevel(level));
  }, [])

  React.useEffect(() => {
    if(!unpassedStageID && !!stages.length) {
      dispatch(fetchLevel(level+1));
      // зробити Component з переходом на новий рівень. + було б прикольно показувати бали за невдалі спроби.
      // виправити баг!!! коли залишається останній рівень і робиш невірний крок то маю помилку
    }
  }, [unpassedStageID])

  if (error) {
    return <h2>Error Page</h2>
  }
  
  if (!level || isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <React.Fragment>
      <h2>Level №{level}</h2>
      <Stage />
    </React.Fragment>
  )
}
