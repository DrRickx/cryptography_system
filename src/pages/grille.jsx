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
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-700">
        Grille Cipher
      </h1>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Enter Message
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={3}
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div>
        <p className="font-semibold mb-2">
          Grille Mask (Click cells to toggle):
        </p>
        <div className="grid grid-cols-4 gap-1 w-48 mx-auto">
          {grille.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`w-10 h-10 border rounded transition-colors ${
                  cell ? "bg-blue-600 text-white" : "bg-gray-200"
                } flex items-center justify-center select-none`}
                onClick={() => toggleCell(r, c)}
                type="button"
                aria-pressed={cell}
                aria-label={`Toggle cell at row ${r + 1}, column ${c + 1}`}
              >
                {cell ? "●" : ""}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleEncrypt}
          className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
          type="button"
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          type="button"
        >
          Decrypt
        </button>
      </div>

      <div>
        <p className="font-semibold mb-2">Grid Output:</p>
        <div className="grid grid-cols-4 gap-1 w-48 mx-auto border border-gray-300 rounded-md p-2 bg-white">
          {outputGrid.flat().map((char, i) => (
            <div
              key={i}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded"
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Result Text:</p>
        <div className="p-3 bg-gray-100 border border-gray-300 rounded-md min-h-[3rem] whitespace-pre-wrap break-words">
          {output || "Result will appear here."}
        </div>
      </div>
    </div>
  );
}
