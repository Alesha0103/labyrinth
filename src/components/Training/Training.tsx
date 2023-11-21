import React from 'react';
import "./Training.scss"
import { useAppSelector } from '../../hooks/redux';
import { TrainingCell } from '../TrainingCell/TrainingCell';
import { HINT_COLOR, HINT_COLOR_THEME, LOOSER_COLOR, LOOSER_COLOR_THEME } from '../../constants';
import classNames from 'classnames';

export const Training = () => {
  const [checked, checkbox] = React.useState(false);
  const [rule, setRule] = React.useState(1);
  const [warning, setWarning] = React.useState("");
  const { trainingLevel, blackTheme } = useAppSelector(state => state.generalReducer);
  const {isLevelFinished} = useAppSelector(state => state.levelsReducer);

  const looserColor = blackTheme ? LOOSER_COLOR_THEME : LOOSER_COLOR;

  const switchRules = (rule: number) => {
    switch (rule) {
      case 1:
        return <>You are standing at the <span className="green">green</span> cell right now</>
      case 2:
        return <>You can move to any of these <span className="yellow">yellow</span> cells, but only one is right</>
      case 3:
        return <>Click on <span className="yellow">yellow</span> cell to choose it</>
      case 4:
        return <>If you try to go back or choose the cell which is not adjacent then the game will show you an error popup</>
      case 5:
        return <>You can use the hint wich will show you the right way</>
      case 6:
        return <>Try to find th last cell to finis this level</>
    }
  }

  const handleRuleAsProp = (rule: number) => {
    setRule(rule)
  }
  const handleWarningAsProp = (warning: string) => {
    setWarning(warning);
  }

  const setCheckbox = () => {
    checkbox(true);
    setTimeout(() => {
      setRule(rule+1);
      checkbox(false);
    }, 2000)
  }

  return (
    <div className="training-container">
      <h2>Training level</h2>

      <div className="rules" style={{
        display: isLevelFinished ? "none" : "grid",
        borderColor: "#ff7d7d",
        backgroundColor: blackTheme ? "#3c3c3c" : "#ffdead55"
      }}>
        <p>
          {switchRules(rule)}
        </p>
        <div className="checkbox"
          onClick={setCheckbox}
          style={{display: (rule === 3 || rule === 6) ? "none" : "block"}}
        >
          <span className="mark" style={{display: !checked ? "none" : "block"}}/>
        </div>
      </div>

      {rule === 5 && <div className={classNames("training-container__hint", {
        "black-hint": blackTheme
      })}>
        <button>Show hint</button>
      </div>}
      <h3 className="training-container__warning" style={{color: looserColor}}>{warning}</h3>

      <div className="training-cells">
        {trainingLevel.cells.map(cell => {
          return <TrainingCell
            key={cell.id}
            rule={rule}
            id={cell.id}
            handleRule={handleRuleAsProp}
            handleWarning={handleWarningAsProp}
            className="cell"
          />
        })}
      </div>
    </div>
  )
}
