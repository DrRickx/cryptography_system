import { useState } from "react";
import { grilleEncrypt, grilleDecrypt } from "../../utils/grille_util";

const GRID_SIZE = 4;

export default function GrilleCipher() {
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");
  const [outputGrid, setOutputGrid] = useState([]);
  const [grille, setGrille] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false))
  );

  const toggleCell = (row, col) => {
    setGrille((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[row][col] = !copy[row][col];
      return copy;
    });
  };

  const handleEncrypt = () => {
    const result = grilleEncrypt(message, grille);
    setOutput(result);
    setOutputGrid(toGrid(result));
  };

  const handleDecrypt = () => {
    const result = grilleDecrypt(message, grille);
    setOutput(result);
    setOutputGrid(toGrid(message));
  };

  const toGrid = (str) => {
    const clean = str
      .replace(/[^A-Z]/gi, "")
      .toUpperCase()
      .padEnd(GRID_SIZE * GRID_SIZE, "X");
    const grid = [];
    for (let i = 0; i < clean.length; i += GRID_SIZE) {
      grid.push(clean.slice(i, i + GRID_SIZE).split(""));
    }
    return grid;
  };

  return (
    <div className="space-y-4 p-4 max-w-md">
      <h2 className="text-xl font-bold">Grille Cipher</h2>

      <textarea
        className="w-full p-2 border"
        rows={3}
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div>
        <p className="font-semibold">Grille Mask (Click to toggle):</p>
        <div className="grid grid-cols-4 gap-1 w-48">
          {grille.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`w-10 h-10 border rounded ${
                  cell ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => toggleCell(r, c)}
              >
                {cell ? "●" : ""}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="space-x-2">
        <button
          onClick={handleEncrypt}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Decrypt
        </button>
      </div>

      <div>
        <p className="font-semibold">Grid Output:</p>
        <div className="grid grid-cols-4 gap-1 w-48 border p-2">
          {outputGrid.flat().map((char, i) => (
            <div
              key={i}
              className="w-10 h-10 flex items-center justify-center border bg-white rounded"
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mt-4">Result Text:</p>
        <div className="p-2 bg-gray-100 border rounded">{output}</div>
      </div>
    </div>
  );
}
