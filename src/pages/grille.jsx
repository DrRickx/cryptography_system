import { useState } from "react";
import {
  grilleEncrypt,
  grilleDecrypt,
  rotateMatrix,
} from "../../utils/grille_util";
import Modal from "../../components/modal";

const GRID_SIZE = 4;

// Mask validation function with invalid cells and message including positions
function validateMask(mask) {
  const n = mask.length;
  const requiredHoles = (n * n) / 4;

  // Count holes
  let holesCount = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (mask[r][c]) holesCount++;
    }
  }
  if (holesCount !== requiredHoles) {
    return {
      valid: false,
      message: `Mask must have exactly ${requiredHoles} holes. Found ${holesCount}.`,
      invalidCells: [], // no specific cells to highlight here
    };
  }

  // Collect all covered positions across all 4 rotations
  let covered = new Set();
  let rotatedMask = mask;
  let invalidCells = [];

  for (let i = 0; i < 4; i++) {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (rotatedMask[r][c]) {
          const key = `${r},${c}`;
          if (covered.has(key)) {
            // Overlap cell
            invalidCells.push([r, c]);
          } else {
            covered.add(key);
          }
        }
      }
    }
    rotatedMask = rotateMatrix(rotatedMask);
  }

  if (invalidCells.length > 0) {
    // Format positions for message (1-based)
    const posStr = invalidCells
      .map(([r, c]) => `(${r + 1}, ${c + 1})`)
      .join(", ");
    return {
      valid: false,
      message: `Overlap found in mask at positions ${posStr}. Each cell can only be a hole once.`,
      invalidCells,
    };
  }

  if (covered.size !== n * n) {
    // Find uncovered cells
    let uncoveredCells = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (!covered.has(`${r},${c}`)) uncoveredCells.push([r, c]);
      }
    }
    // Format uncovered positions for message (1-based)
    const posStr = uncoveredCells
      .map(([r, c]) => `(${r + 1}, ${c + 1})`)
      .join(", ");
    return {
      valid: false,
      message: `Mask does not cover all cells after rotations. Uncovered cells at positions: ${posStr}.`,
      invalidCells: uncoveredCells,
    };
  }

  return { valid: true, invalidCells: [] };
}

export default function GrilleCipher() {
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");
  const [outputGrid, setOutputGrid] = useState([]);
  const [grille, setGrille] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false))
  );

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Mask validation states
  const [invalidCells, setInvalidCells] = useState([]);
  const [maskValid, setMaskValid] = useState(true);

  const toggleCell = (row, col) => {
    setGrille((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[row][col] = !copy[row][col];
      return copy;
    });
  };

  const validate = () => {
    if (!message.trim()) {
      setMaskValid(true);
      setInvalidCells([]);
      setModalMessage("Please enter a message.");
      setModalOpen(true);
      return false;
    }
    const anyCellToggled = grille.some((row) => row.some((cell) => cell));
    if (!anyCellToggled) {
      setMaskValid(true);
      setInvalidCells([]);
      setModalMessage("Please toggle at least one cell in the grille mask.");
      setModalOpen(true);
      return false;
    }

    const maskValidation = validateMask(grille);
    if (!maskValidation.valid) {
      setMaskValid(false);
      setInvalidCells(maskValidation.invalidCells || []);
      setModalMessage(maskValidation.message);
      setModalOpen(true);
      return false;
    }

    setMaskValid(true);
    setInvalidCells([]);
    return true;
  };

  const handleEncrypt = () => {
    if (!validate()) return;

    const result = grilleEncrypt(message, grille);
    setOutput(result);
    setOutputGrid(toGrid(result));
  };

  const handleDecrypt = () => {
    if (!validate()) return;

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
    <>
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
          <div
            className={`grid grid-cols-4 gap-1 w-48 mx-auto border rounded-md p-1 ${
              maskValid
                ? "border-gray-300 bg-white"
                : "border-red-600 bg-red-50"
            }`}
          >
            {grille.map((row, r) =>
              row.map((cell, c) => {
                const isInvalid = invalidCells.some(
                  ([ir, ic]) => ir === r && ic === c
                );
                return (
                  <button
                    key={`${r}-${c}`}
                    className={`w-10 h-10 border rounded transition-colors flex items-center justify-center select-none
                      ${
                        isInvalid
                          ? "bg-red-600 text-white border-red-800"
                          : cell
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }
                    `}
                    onClick={() => toggleCell(r, c)}
                    type="button"
                    aria-pressed={cell}
                    aria-label={`Toggle cell at row ${r + 1}, column ${c + 1}`}
                  >
                    {cell ? "●" : ""}
                  </button>
                );
              })
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Validation Error"
        footer={
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        }
      >
        {modalMessage}
      </Modal>
    </>
  );
}
