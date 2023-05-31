import React from 'react'

import './Wellcome.scss'

export const Wellcome = () => {
  const [wellcome, setWellcome] = React.useState(true);

  const hideThisPage = () => {
    setWellcome(false);
  }
  if (!wellcome) {
    return null;
  }

  return (
    <div className='wellcome-view'>
      <h1>Greetings, dear traveler!</h1>
      <div className="explanation">
        <span>Looks like you are lost in the Labyrinth!</span>       
        <span className='rules'>Here you can see the rules of this game:</span>
        <p>
          You can choose a cell for your step. 
          The cell must be adjacent to the one where you are already standing. 
          If you make a mistake, the Labyrinth will take you to another stage of this level. 
          However, this stage is not counted. 
          Your task is to pass all the stages of the level to proceed to the next level. 
          Looks simple. Let's see. Good luck!
        </p>
      </div>
      <button onClick={hideThisPage}>Start game</button>
    </div>
  )
}
