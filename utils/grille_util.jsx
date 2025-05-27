export function rotateMatrix(matrix) {
  const n = matrix.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => matrix[n - j - 1][i])
  );
}

export function grilleEncrypt(message, grille) {
  const n = grille.length;
  const clean = message.replace(/[^A-Z]/gi, "").toUpperCase();
  const totalCells = n * n;
  const padded = clean.padEnd(totalCells, "X");

  const grid = Array.from({ length: n }, () => Array(n).fill(""));

  let idx = 0;
  let mask = grille;

  for (let rot = 0; rot < 4; rot++) {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (mask[r][c] === true) {
          grid[r][c] = padded[idx++];
        }
      }
    }
    mask = rotateMatrix(mask);
  }

  // Replace any remaining empty cells with 'X'
  return grid
    .flat()
    .map((ch) => (ch === "" ? "X" : ch))
    .join("");
}

export function grilleDecrypt(ciphertext, grille) {
  const n = grille.length;
  const clean = ciphertext.replace(/[^A-Z]/gi, "").toUpperCase();

  const grid = Array.from({ length: n }, () => Array(n).fill(""));
  let idx = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      grid[r][c] = clean[idx++] || "X";
    }
  }

  let result = "";
  let mask = grille;

  for (let rot = 0; rot < 4; rot++) {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (mask[r][c] === true) {
          result += grid[r][c];
        }
      }
    }
    mask = rotateMatrix(mask);
  }

  // Remove trailing padding X's
  return result.replace(/X+$/g, "");
}
