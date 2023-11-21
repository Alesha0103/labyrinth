import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  HINT_COLOR,
  HINT_COLOR_THEME,
  LOOSER_COLOR,
  LOOSER_COLOR_THEME,
  WINNER_COLOR,
  WINNER_COLOR_THEME,
} from "../../constants";
import { finishLevelPopup } from '../../store/actions/LevelsActions';
import { chooseTrainingCell, resetWrongCells } from '../../store/actions/GeneralActions';

type TrainingCellType = {
  id?: number,
  rule?: number,
  className?: string,
  handleRule?: any,
  handleWarning? : any,
}
export const TrainingCell:React.FC<TrainingCellType> = (props) => {
  const {id, rule, className, handleRule, handleWarning} = props;

  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("");
  const { blackTheme, chosenWrongCells } = useAppSelector(state => state.generalReducer);

  const hintColor = blackTheme ? HINT_COLOR_THEME : HINT_COLOR;
  const winnerColor = blackTheme ? WINNER_COLOR_THEME : WINNER_COLOR;
  const looserColor = blackTheme ? LOOSER_COLOR_THEME : LOOSER_COLOR;

  const styles: object = {
    backgroundColor: color,
    borderColor: color && "transparent",
  }
  
  const switchRules = () => {
    switch (rule) {
      case 1:
        if (id === 3) {
          setColor(winnerColor)
        }
        break;
      case 2:
        if (id === 2 || id === 4 || id === 7) {
          setColor(hintColor);
        }
        break;
      case 3:
        setColor("");
        if (id === 3) {
          setColor(winnerColor)
        }
        if (id === 7) {
          setColor(hintColor);
        }
        break;
      case 4:
        handleWarning("Follow the rules!");
        if (id === 3 || id === 7) {
          setColor(winnerColor);
        }
        if (id === 5) {
          setColor(looserColor);
        }
        break;
      case 5:
        setColor("");
        handleWarning("");
        if (id === 3 || id === 7) {
          setColor(winnerColor);
        }
        if (id === 6) {
          setColor(hintColor);
        }
        break;
      case 6:
        if (!!chosenWrongCells.length && (chosenWrongCells.some(cellId => cellId === id))) {
          setColor(looserColor);
        }
        if (id === 3 || id === 6 || id === 7) {
          setColor(winnerColor);
        }
        break;

    }
  }

  const selectingLastCell = () => {
    if (id == 10) {
      handleWarning("");
      setColor(winnerColor);
      dispatch(resetWrongCells());
      dispatch(finishLevelPopup(true));
      return;
    }
    if (id === 2 || id === 5) {
      handleWarning("You are close! Don't give up!");
      dispatch(chooseTrainingCell(id));
      setColor(looserColor);
      return;
    }
    if (id === 3 || id === 6 || id === 7) {
      handleWarning("Cell is already selected");
      return;
    }
    handleWarning("Follow the rules!");
  }

  const handleClick = () => {
    if (rule === 3 && id === 7) {
      setColor(winnerColor);
    }
    if (rule === 3) {
      setTimeout(() => {
        handleRule(rule+1);
      }, 2000)
    }
    if (rule === 6) {
      selectingLastCell()
    }
  }

  React.useEffect(() => {
    switchRules();
  }, [blackTheme, rule])

  return (
    <div
      onClick={handleClick}
      className={className}
      style={styles}
    />
  )
}
