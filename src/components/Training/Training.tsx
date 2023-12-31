import React from 'react';
import "./Training.scss"
import { useAppSelector } from '../../hooks/redux';
import { TrainingCell } from '../TrainingCell/TrainingCell';
import { LOOSER_COLOR, LOOSER_COLOR_THEME } from '../../constants';
import classNames from 'classnames';
import { useTranslation } from '../../hooks/useTranslations';
import { Languages } from '../../models/IGeneral';

export const Training = () => {
  const [checked, checkbox] = React.useState(false);
  const [rule, setRule] = React.useState(1);
  const [warning, setWarning] = React.useState("");
  const [animation, setAnimation] = React.useState("");
  const [animationCells, setAnimationCells] = React.useState("");

  const { language, trainingLevel, blackTheme } = useAppSelector(state => state.generalReducer);
  const { isLevelFinished } = useAppSelector(state => state.levelsReducer);

  const looserColor = blackTheme ? LOOSER_COLOR_THEME : LOOSER_COLOR;

  const rule1 = useTranslation("RULE_1");
  const rule2 = useTranslation("RULE_2");
  const rule3 = useTranslation("RULE_3");
  const rule4 = useTranslation("RULE_4");
  const rule5 = useTranslation("RULE_5");
  const rule6 = useTranslation("RULE_6");
  const levelText = useTranslation("TRAINING_LEVEL");
  const hintText = useTranslation("SHOW_HINT");
  const warningText = useTranslation(warning);

  const switchRules = (rule: number) => {
    switch (rule) {
      case 1:
        return (
          language === Languages.USA ?
            <span dangerouslySetInnerHTML={{ __html: rule1!.replace(
              "green",
              '<span class="green">green</span>'
            )}}/>
            : <span dangerouslySetInnerHTML={{ __html: rule1!.replace(
              "зеленій",
              '<span class="green">зеленій</span>'
            )}}/>
        );
      case 2:
        return (
          language === Languages.USA ?
            <span dangerouslySetInnerHTML={{ __html: rule2!.replace(
              "yellow",
              '<span class="yellow">yellow</span>'
            )}}/>
            : <span dangerouslySetInnerHTML={{ __html: rule2!.replace(
              "жовту",
              '<span class="yellow">жовту</span>'
            )}}/>
        );
      case 3:
        return (
          language === Languages.USA ?
            <span dangerouslySetInnerHTML={{ __html: rule3!.replace(
              "yellow",
              '<span class="yellow">yellow</span>'
            )}}/>
            : <span dangerouslySetInnerHTML={{ __html: rule3!.replace(
              "жовту",
              '<span class="yellow">жовту</span>'
            )}}/>
        );
      case 4:
        return rule4;
      case 5:
        return rule5;
      case 6:
        return rule6;
    }
  }

  const handleRuleAsProp = (rule: number) => {
    setRule(rule)
  }
  const handleWarningAsProp = (warning: string) => {
    setWarning(warning);
  }
  const handleAnimatioAsProp = (name: string) => {
    setAnimation(name);
  }
  const handleAnimationCellAsProp = (name: string) => {
    setAnimationCells(name);
  }

  const setCheckbox = () => {
    checkbox(true);
    setAnimation("disappear");
    setAnimationCells("disappear-cells")
    setTimeout(() => {
      setRule(rule+1);
      checkbox(false);
    }, 600)
  }

  const animationName: object = {
    "--animationName": animation
  }
  const animationCellsName: object = {
    "--animationCells": animationCells
  }

  React.useEffect(() => {
    if(rule !== 1) {
      setAnimation("appear");
      setAnimationCells("appear-cells")
    }
  }, [rule])

  return (
    <>
      <h2>{levelText}</h2>
      {!isLevelFinished && (<div className="training-container" style={animationName}>
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
          })}
          style={animationName}
        >
          <button>{hintText}</button>
        </div>}

        <div className="cells-container" style={animationCellsName}>
          <h3 className="training-container__warning" style={{color: looserColor}}>{warningText}</h3>

          <div className="training-cells">
            {trainingLevel.cells.map(cell => {
              return <TrainingCell
                key={cell.id}
                rule={rule}
                id={cell.id}
                handleRule={handleRuleAsProp}
                handleWarning={handleWarningAsProp}
                handleAnimation={handleAnimatioAsProp}
                handleAnimationCell={handleAnimationCellAsProp}
                className="cell"
              />
            })}
          </div>
        </div>
      </div>)}
    </>
  )
}
