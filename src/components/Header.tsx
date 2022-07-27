import React from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch } from "utils/hooks";
import {
  toggleDarkMode,
  showInstructionsModal,
  showStatisticsModal,
} from "slices/AppSlice";

function Header() {
  const dispatch = useAppDispatch();

  const toggleChangeTheme = () => {
    dispatch(toggleDarkMode());
  };

  const handleShowInstructions = () => {
    dispatch(showInstructionsModal());
  };

  const handleShowStatistics = () => {
    dispatch(showStatisticsModal());
  };

  return (
    <header className="w-[50rem] mb-20 bg-stone-100 dark:bg-gray-dark rounded-xl p-6  grid grid-cols-[auto_1fr_auto_auto] items-center">
      <button onClick={handleShowInstructions}>
        <Icon
          className="text-icon-gray dark:text-white"
          icon="bi:question-circle-fill"
          width={25}
          height={25}
        />
      </button>
      <h1 className="uppercase text-5xl font-semibold text-center pl-24">
        Wordle
      </h1>
      <button onClick={handleShowStatistics}>
        <Icon
          icon="bxs:bar-chart-square"
          className="text-icon-gray dark:text-white"
          width={30}
          height={30}
        />
      </button>
      <span
        className="w-20 h-10 cursor-pointer ml-2  bg-switch-light rounded-full bg-cover dark:bg-switch-dark "
        onClick={toggleChangeTheme}
      />
    </header>
  );
}

export default Header;
