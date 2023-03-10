import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAllLevels } from '../store/actions/LevelsActions';
import './Labyrinth.scss';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { levels, isLoading, error } = useAppSelector(state => state.levelsReducer);

  const activeLevel = levels?.find(level => level.isLevelActive);

  React.useEffect(() => {
    dispatch(fetchAllLevels())
  }, [])

  if (error) {
    return <h2>Error Page</h2>
  }
  
  if (!levels || isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <React.Fragment>
      <h2>Level №{activeLevel?.id}</h2>
    </React.Fragment>
  )
}
