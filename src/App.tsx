import { useState } from "react";

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

const redArray = Array.from({ length: 33 }, (_, i) => i + 1);
const blueArray = Array.from({ length: 16 }, (_, i) => i + 1);

function App() {
  const [red, setRed] = useState(getTop(shuffleArray(redArray), 6));
  const [blue, setBlue] = useState(getTop(shuffleArray(blueArray), 1));

  const handleShuffle = () => {
    setRed(getTop(shuffleArray(redArray), 6));
    setBlue(getTop(shuffleArray(blueArray), 1));
  };

  return (
    <div className="space-y-9 mx-auto">
      <div>双色球</div>
      <div className="flex items-center gap-3 justify-center">
        <div className="flex items-center gap-2">
          {red.map((it) => {
            return (
              <div className="bg-red-200 p-2 rounded-full w-10 h-10">{it}</div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {blue.map((it) => {
            return (
              <div className="bg-blue-200 p-2 rounded-full w-10 h-10">{it}</div>
            );
          })}
        </div>
      </div>
      <div className="card">
        <button onClick={handleShuffle}>I'm Feeling Lucky</button>
      </div>
    </div>
  );
}

export default App;
