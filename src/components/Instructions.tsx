import Word from "components/Word";
import { hideInstructionsModal } from "slices/AppSlice";
import { useAppDispatch } from "utils/hooks";

function Instructions() {
  const dispatch = useAppDispatch();

  const handleHideInstructions = () => {
    dispatch(hideInstructionsModal());
  };

  return (
    <div className="w-full h-full z-10 bg-white dark:bg-blue-dark  bg-opacity-90 dark:bg-opacity-90 absolute flex justify-center items-center p-16 overflow-auto animate-fade-in">
      <div className="w-[42rem] bg-gray-50 dark:bg-blue-dark border-black border dark:border-gray-500 rounded-3xl h-auto p-8 flex flex-col">
        <p className="mb-8 font-extrabold text-4xl min-w text-center pt-2">
          Cómo jugar
        </p>
        <p className="pb-4">Adivina la palabra oculta en cinco intentos.</p>
        <p className="pb-4">
          Cada intento debe ser una palabra válida de 5 letras.
        </p>
        <p className="pb-4">
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </p>
        <p className="font-bold pb-4">Ejemplos</p>
        <Word text={[["g", 1], "a", "t", "o", "s"]} inverted />
        <p className="py-4">
          La letra <b>G</b> está en la palabra y en la posición correcta.
        </p>
        <Word text={["v", "o", ["c", 2], "a", "l"]} inverted />
        <p className="py-4">
          La letra <b>C</b> está en la palabra pero en la posición incorrecta.
        </p>
        <Word text={["c", "a", "n", "t", ["o", 3]]} inverted />
        <p className="py-4">
          La letra <b>O</b> no está en la palabra.
        </p>
        <p className="py-4">
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>
        <p className="py-4 text-center">¡Una palabra nueva cada 5 minutos!</p>
        <button
          onClick={handleHideInstructions}
          className="m-auto mt-6 p-2 w-72 text-white uppercase text-3xl font-extrabold bg-correct-green rounded-lg"
        >
          !Jugar¡
        </button>
      </div>
    </div>
  );
}

export default Instructions;
