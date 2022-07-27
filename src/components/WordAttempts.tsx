import Word from "components/Word";
import { useCallback, useEffect } from "react";
import { useAppSelector } from "utils/hooks";
import { WordText } from "components/Word";
import { useAppDispatch } from "../utils/hooks";

import {
  setAttempts,
  setCurrentAttempt,
  showStatisticsModal,
  wonGame,
  lostGame,
} from "slices/AppSlice";
import wordsCatalogue from "static/wordsCatalogue";

function WordAttempts() {
  const dispatch = useAppDispatch();
  const allowedKeys = useAppSelector((state) => state.allowedKeys);
  const wordVal = useAppSelector((state) => state.word?.value);
  const word = useAppSelector((state) => state.word);
  const attempts = useAppSelector((state) => state.attempts);
  const currentAttempt = useAppSelector((state) => state.currentAttempt);
  const canGuessWord = useAppSelector((state) => state.canGuessWord);

  const rowsLeft = [];
  if (attempts.length < 4) {
    for (let i = 0; i < 5 - attempts.length - 1; i++) {
      rowsLeft.push(<Word key={i} />);
    }
  }

  const enterHandler = useCallback(() => {
    if (wordsCatalogue.includes(currentAttempt.join("")) && wordVal) {
      let hits = 0;
      const currentAttemptStatus: WordText = currentAttempt.map(
        (char, index) => {
          if (wordVal[index] === char) {
            hits++;
            return [char, 1];
          } else if (wordVal.indexOf(char) > -1) return [char, 2];
          return [char, 3];
        }
      );
      dispatch(setAttempts([...attempts, currentAttemptStatus]));
      dispatch(setCurrentAttempt([]));

      if (hits === 5) {
        dispatch(wonGame());
        setTimeout(() => dispatch(showStatisticsModal()), 100);
      } else if (attempts.length === 4) {
        dispatch(lostGame());
        setTimeout(() => dispatch(showStatisticsModal()), 100);
      }
    } else {
      dispatch(setCurrentAttempt([]));
    }
  }, [currentAttempt, wordVal, attempts, dispatch]);

  const keyDownHandler = useCallback(
    ({ key }: { key: string }) => {
      if (attempts.length < 5) {
        key = key.toLowerCase();
        if (allowedKeys.includes(key.toLowerCase())) {
          if (key === "backspace") {
            dispatch(setCurrentAttempt([...currentAttempt.slice(0, -1)]));
          } else if (key === "enter") {
            if (currentAttempt.length === 5) {
              enterHandler();
            }
          } else {
            if (currentAttempt.length < 5) {
              dispatch(setCurrentAttempt([...currentAttempt, key]));
            }
          }
        }
      }
    },
    [allowedKeys, currentAttempt, enterHandler, attempts.length, dispatch]
  );

  useEffect(() => {
    if (canGuessWord) {
      window.addEventListener("keydown", keyDownHandler);
      return () => {
        window.removeEventListener("keydown", keyDownHandler);
      };
    } else {
      window.removeEventListener("keydown", keyDownHandler);
    }
  }, [keyDownHandler, canGuessWord]);

  return (
    <div>
      {attempts.map((attempt, index) => (
        <Word text={attempt} key={index} />
      ))}
      {attempts.length < 5 && <Word text={currentAttempt} />}
      {rowsLeft}
    </div>
  );
}

export default WordAttempts;
