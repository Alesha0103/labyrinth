import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAllLevelsAction } from '../store/actions/LevelsActions';
import { Cells } from './Cells';
import './Labyrinth.scss';

const getRandomIndex = (previous: number, max: number) => {
  let previousNumber = previous
  let randomNumber = Math.floor(Math.random() * max);

  while (randomNumber === previousNumber) {
    randomNumber = Math.floor(Math.random() * max);
  }

  previousNumber = randomNumber;
  return randomNumber;
}

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { levels, isLoading, error, loserOverlay } = useAppSelector(state => state.levelsReducer);

  const [variant, setVariant] = React.useState(0);

  const activeLevel = levels.find(level => level.isLevelActive)!;
  const cells = activeLevel?.stages[variant].cells;
  const variantsCount = activeLevel?.stages.length;

  React.useEffect(() => {
    dispatch(fetchAllLevelsAction())
  }, [])

  React.useEffect(() => {
    if(!loserOverlay && variantsCount) {
      const randomNumber = getRandomIndex(variant, variantsCount);
      setVariant(randomNumber);
    }
  }, [loserOverlay])

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
