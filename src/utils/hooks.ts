import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useState, useEffect } from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type WordRemainTime = {
  minSec: {
    min: number,
    sec: number
  },
  formatted: string
}

export const useWordRemainTime = () => {
  const word = useAppSelector((state) => state.word);
  const toMinSec = (timestamp: number) => {
    const min = Math.floor(timestamp / 1000 / 60);
    timestamp -= min * 60 * 1000;
    let sec = Math.floor(timestamp / 1000);
    return { min, sec }
  };

  const calcTimeRemain = (set = true) => {
    const difference = Date.now() - (word?.selectedAt ? word.selectedAt : Date.now());
    const remainMilliseconds = 300000 - difference;
    const minSec = toMinSec(remainMilliseconds);
    const addZero = (value: number) => value < 10 ? "0" + value : value
    return {
      minSec,
      formatted: `${addZero(minSec.min)}:${addZero(minSec.sec)}`,
    }
  };

  const [timeRemain, setTimeRemain] = useState<WordRemainTime>(calcTimeRemain())

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeRemain(calcTimeRemain())
    }, 1000);
    return () => clearTimeout(timeout);
  });

  return timeRemain
}