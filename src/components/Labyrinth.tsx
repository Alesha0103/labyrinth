import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAllLevelsAction } from '../store/actions/LevelsActions';
import { Cells } from './Cells';
import './Labyrinth.scss';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { levels, isLoading, error } = useAppSelector(state => state.levelsReducer);

  const activeLevel = levels.find(level => level.isLevelActive)!;
  const cells = activeLevel?.variants[0].cells

  React.useEffect(() => {
    dispatch(fetchAllLevelsAction())
  }, [])

  if (error) {
    return <h2>Error Page</h2>
  }
  
  if (!activeLevel || isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <React.Fragment>
      <h2>Level №{activeLevel.id}</h2>
      <Cells cells={cells} />
    </React.Fragment>
  )
}
