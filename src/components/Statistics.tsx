import { useAppDispatch, useAppSelector, useWordRemainTime } from "utils/hooks";
import { hideStatisticsModal } from "slices/AppSlice";

function Statistics() {
  const dispatch = useAppDispatch();
  const remainTime = useWordRemainTime();
  const word = useAppSelector((state) => state.word);
  const wins = useAppSelector((state) => state.wins);
  const games = useAppSelector((state) => state.games);
  const lostGame = useAppSelector((state) => state.lostGame);

  const handleHideStatistics = () => {
    dispatch(hideStatisticsModal());
  };

  return (
    <div className="w-full h-full z-10 bg-white dark:bg-blue-dark  bg-opacity-90 dark:bg-opacity-90 absolute flex justify-center items-center p-16 overflow-auto animate-fade-in">
      <div className="w-[42rem] bg-gray-50 dark:bg-blue-dark border-black border dark:border-gray-500 rounded-3xl h-auto p-8 flex flex-col">
        <p className="mb-10 font-extrabold text-4xl min-w text-center pt-6 ">
          Estadísticas
        </p>
        <div className="flex justify-between mx-20 mb-16">
          <span>
            <p className="text-center text-4xl font-extrabold mb-4">{games}</p>
            <p>Jugadas</p>
          </span>
          <span>
            <p className="text-center text-4xl font-extrabold mb-4">{wins}</p>
            <p>Victorias</p>
          </span>
        </div>
        {lostGame && (
          <p className="text-center mb-8">
            La palabra era: <b className="uppercase">{word?.value}</b>
          </p>
        )}
        <p className="uppercase text-center mb-2">Siguiente palabra</p>
        <p className="uppercase text-center mb-5 font-bold">
          {remainTime?.formatted}
        </p>
        <button
          onClick={handleHideStatistics}
          className="m-auto mt-6 p-2 w-72 text-white text-3xl font-extrabold bg-correct-green rounded-lg"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default Statistics;
