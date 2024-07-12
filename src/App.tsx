import { useState } from "react";
import confetti from "canvas-confetti";
import classNames from "classnames";

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: number[]) {
  const ret = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return ret;
}

function getTop(array: number[], top: number) {
  return array.slice(0, top).sort((a, b) => a - b);
}

// 双色球
const redArray = Array.from({ length: 33 }, (_, i) => i + 1);
const blueArray = Array.from({ length: 16 }, (_, i) => i + 1);

// 大乐透
const lottoRedArray = Array.from({ length: 35 }, (_, i) => i + 1);
const lottoBlueArray = Array.from({ length: 12 }, (_, i) => i + 1);

function App() {
  const [type, setType] = useState<"unionLotto" | "lotto">("unionLotto");
  const [red, setRed] = useState(getTop(shuffleArray(redArray), 6));
  const [blue, setBlue] = useState(getTop(shuffleArray(blueArray), 1));
  const [lottoRed, setLottoRed] = useState(
    getTop(shuffleArray(lottoRedArray), 5)
  );
  const [lottoBlue, setLottoBlue] = useState(
    getTop(shuffleArray(lottoBlueArray), 2)
  );
  const luckyRed = type === "unionLotto" ? red : lottoRed;
  const luckyBlue = type === "unionLotto" ? blue : lottoBlue;

  const handleShuffle = () => {
    setRed(getTop(shuffleArray(redArray), 6));
    setBlue(getTop(shuffleArray(blueArray), 1));
    setLottoRed(getTop(shuffleArray(lottoRedArray), 5));
    setLottoBlue(getTop(shuffleArray(lottoBlueArray), 2));

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.75 },
    });
  };

  return (
    <div className="space-y-20 mx-auto">
      <div className="flex items-center justify-center gap-2">
        <div
          onClick={() => setType("unionLotto")}
          className={classNames("underline-offset-4", {
            underline: type === "unionLotto",
          })}
        >
          双色球
        </div>
        <div
          onClick={() => setType("lotto")}
          className={classNames("underline-offset-4", {
            underline: type === "lotto",
          })}
        >
          大乐透
        </div>
      </div>

      <div className="flex items-center gap-3 justify-center">
        <div className="flex items-center gap-2">
          {luckyRed.map((it) => {
            return (
              <div
                className="bg-red-200 rounded-full w-8 h-8 text-sm flex items-center justify-center"
                key={it}
              >
                {it}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {luckyBlue.map((it) => {
            return (
              <div
                className="bg-blue-200 rounded-full w-8 h-8 text-sm flex items-center justify-center"
                key={it}
              >
                {it}
              </div>
            );
          })}
        </div>
      </div>
      <div className="!mt-20">
        <button onClick={handleShuffle}>I'm Feeling Lucky</button>
      </div>
    </div>
  );
}

export default App;
