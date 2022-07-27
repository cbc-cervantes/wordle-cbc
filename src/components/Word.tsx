type CharProps = {
  char: string;
  status: number;
};

/*
  Word char status
  0 = default
  1 = in word, correct position
  2 = in word, wrong position
  3 = not in word
*/
export type WordText = Array<string | [string, 0 | 1 | 2 | 3]>;

type Props = {
  text?: WordText;
  inverted?: boolean;
};

function Word({ text, inverted }: Props) {
  const statusStyle = [
    `  border-black ${
      inverted
        ? "bg-white dark:bg-transparent dark:border-gray-500 border"
        : "bg-gray-200  dark:bg-gray-700 dark:border-none"
    }`,
    "bg-correct-green",
    "bg-almost-yellow",
    "bg-wrong-gray",
  ];

  const Char = ({ char, status }: CharProps) => (
    <span
      className={`m-2 w-24 h-24 uppercase flex items-center justify-center text-5xl font-bold  rounded-lg
        ${statusStyle[status]}
        ${
          inverted || (status === 0 && char !== "")
            ? "text-black dark:text-white"
            : "text-white "
        }
      `}
    >
      {char}
    </span>
  );

  const wordChars = [];

  for (let i = 0; i < 5; i++) {
    if (text && text[i]) wordChars.push(text[i]);
    else wordChars.push("");
  }

  const word = wordChars.map((char, index) => {
    if (Array.isArray(char)) {
      return <Char key={index} char={char[0]} status={char[1]} />;
    } else {
      return <Char key={index} char={char} status={0} />;
    }
  });

  return <div className="flex justify-center">{word}</div>;
}

export default Word;
