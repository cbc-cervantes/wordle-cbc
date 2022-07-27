import { useEffect } from "react";
import { useAppSelector, useAppDispatch, useWordRemainTime } from "utils/hooks";
import { setWord, showInstructionsModal } from "slices/AppSlice";
import Instructions from "components/Instructions";
import Header from "components/Header";
import VirtualKeyboard from "components/VirtualKeyboard";
import Statistics from "components/Statistics";
import WordAttempts from "components/WordAttempts";

function App() {
  const remainTime = useWordRemainTime();
  const showInstructions = useAppSelector((state) => state.showInstructions);
  const showStatistics = useAppSelector((state) => state.showStatistics);
  const darkMode = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!localStorage.visited) {
      dispatch(showInstructionsModal());
      localStorage.visited = true;
      dispatch(setWord());
    }
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (remainTime.minSec.min < 1) {
      dispatch(setWord());
    }
  }, [remainTime, dispatch]);

  return (
    <div className="flex justify-center items-center flex-col h-full relative dark:bg-blue-dark dark:text-white">
      {showInstructions && <Instructions />}
      {showStatistics && <Statistics />}
      <Header />
      <WordAttempts />
      <VirtualKeyboard />
    </div>
  );
}

export default App;
