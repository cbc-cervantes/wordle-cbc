import { Icon } from "@iconify/react";
import { useAppSelector } from "utils/hooks";
import { useEffect, useState } from "react";

function VirtualKeyboard() {
  const attempts = useAppSelector((state) => state.attempts);
  const keys = useAppSelector((state) => state.allowedKeys);
  const [included, setIncluded] = useState<Array<string>>([]);
  const [almostIncluded, setAlmostIncluded] = useState<Array<string>>([]);
  const [notIncluded, setNotIncluded] = useState<Array<string>>([]);

  const keyStyles = {
    default: "bg-gray-key dark:bg-gray-key-dark",
    included: "bg-correct-green text-white",
    almostIncluded: "bg-almost-yellow text-white",
    notIncluded: "bg-wrong-gray text-white",
  };

  const getKeyStyle = (key: string) => {
    if (included?.includes(key)) return keyStyles.included;
    if (almostIncluded?.includes(key)) return keyStyles.almostIncluded;
    if (notIncluded?.includes(key)) return keyStyles.notIncluded;
    return keyStyles.default;
  };

  const handleClickKey = (key: string) => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  };

  useEffect(() => {
    if (attempts.length > 0) {
      for (let attempt of attempts) {
        for (let keyArr of attempt) {
          switch (keyArr[1]) {
            case 1:
              setIncluded((prevVal) =>
                !prevVal.includes(keyArr[0]) ? [...prevVal, keyArr[0]] : prevVal
              );

              break;
            case 2:
              setAlmostIncluded((prevVal) =>
                !prevVal.includes(keyArr[0]) ? [...prevVal, keyArr[0]] : prevVal
              );
              break;
            default:
              setNotIncluded((prevVal) =>
                !prevVal.includes(keyArr[0]) ? [...prevVal, keyArr[0]] : prevVal
              );
          }
        }
      }
    } else {
      setIncluded([]);
      setAlmostIncluded([]);
      setNotIncluded([]);
    }
  }, [attempts]);

  return (
    <div className="w-[51rem] mt-20 dark:bg-gray-dark bg-stone-100 py-8  rounded-2xl justify-items-center grid justify-center grid-cols-[4.5rem_auto_auto_auto_auto_auto_auto_auto_4.5rem_auto] ">
      {keys.map((key, index) => (
        <button
          onClick={() => handleClickKey(key)}
          key={index}
          className={`m-[.4rem] flex justify-center items-center rounded-lg  h-16 text-center  text-[1.4rem] uppercase
                ${key === "enter" || key === "backspace" ? "w-24" : "w-14"}
                ${key === "enter" && "mr-[3rem]"}
                ${index > 9 && index < 20 && "mr-[-2.5rem]"}
                ${key === "backspace" && "ml-[3rem]"}
                ${getKeyStyle(key)}
              `}
        >
          {key !== "backspace" ? (
            key
          ) : (
            <Icon
              icon="la:backspace"
              className="text-black dark:text-white mr-2"
              width={25}
              height={25}
            />
          )}
        </button>
      ))}
    </div>
  );
}

export default VirtualKeyboard;
