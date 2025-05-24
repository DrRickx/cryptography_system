// Helper: get the order of columns by alphabetical order of the keyword letters
function getKeywordOrder(keyword) {
  return [...keyword]
    .map((char, i) => ({ char, i }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map(({ i }) => i);
}

export function columnarEncrypt(text, keyword) {
  const clean = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
  const cols = keyword.length;
  const rows = Math.ceil(clean.length / cols);
  const paddedText = clean.padEnd(rows * cols, "X");

  // Fill the grid row by row
  const grid = Array.from({ length: rows }, (_, r) =>
    paddedText.slice(r * cols, (r + 1) * cols)
  );

  const order = getKeywordOrder(keyword);
  const columnBlocks = [];

  for (const colIndex of order) {
    let colStr = "";
    for (let row = 0; row < rows; row++) {
      colStr += grid[row][colIndex];
    }
    columnBlocks.push(colStr);
  }

  return columnBlocks.join(" ");
}

export function columnarDecrypt(ciphertext, keyword) {
  const clean = ciphertext.replace(/[^A-Z]/g, "");
  const cols = keyword.length;
  const rows = Math.ceil(clean.length / cols);
  const total = rows * cols;

  const order = getKeywordOrder(keyword);

  const colLengths = Array(cols).fill(rows);
  const padding = total - clean.length;
  for (let i = cols - padding; i < cols; i++) {
    colLengths[order[i]]--;
  }

  const columns = Array(cols);
  let index = 0;
  for (let i = 0; i < cols; i++) {
    const colIndex = order[i];
    const len = colLengths[colIndex];
    columns[colIndex] = clean.slice(index, index + len).split("");
    index += len;
  }

  let decrypted = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (columns[c][r]) decrypted += columns[c][r];
    }
  }

  decrypted = decrypted.replace(/X+$/g, ""); // remove padding

  // Remove all whitespace just in case (shouldn't be any)
  return decrypted.replace(/\s+/g, "");
}
