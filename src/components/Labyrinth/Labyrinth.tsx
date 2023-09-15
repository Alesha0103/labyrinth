import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStages } from '../../store/actions/LevelsActions';

import './Labyrinth.scss';
import { Stage } from '../Stage/Stage';
import { Loader } from '../Loader/Loader';
import RedTroll from '../../assets/red_troll.png'

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { level, isLoading, error } = useAppSelector(state => state.levelsReducer);

  React.useEffect(() => {
    dispatch(fetchStages(level));
    localStorage.setItem("level", level.toString())
  }, [level])

  if (error) {
    return (
      <>
        <div className="img">
          <img src={RedTroll} alt="red_troll" />
        </div>
        <h2>
          <span>Ooh, an ERROR...</span><br/><br/>
          It looks like this troll has hacked the Labyrinth.
        </h2>
      </>
    )
  }
  
  if (!level || isLoading) {
    return <Loader />
  }

  return (
    <React.Fragment>
      <h2>Level №{level}</h2>
      <Stage />
    </React.Fragment>
  )
}
