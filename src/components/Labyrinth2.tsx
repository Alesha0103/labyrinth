import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { levelsAPI } from '../services/LevelsService';
import { fetchAllLevels } from '../store/actions/LevelsActions';
import './Labyrinth.scss';

export const Labyrinth2 = () => {
  const { data, isError, isLoading } = levelsAPI.useFetchAllLevelsQuery(1);

  if (isError) {
    return <h2>Error Page</h2>
  }
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <React.Fragment>
      <h2>Level №{data?.id}</h2>
    </React.Fragment>
  )
}
