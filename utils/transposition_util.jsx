export function transpositionEncrypt(text, key) {
  const spaceIndices = [];
  let cleaned = "";

  // Record space positions and clean input
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      spaceIndices.push(i);
    } else if (/[a-zA-Z]/.test(text[i])) {
      cleaned += text[i].toUpperCase();
    }
  }

  // Pad with 'X' to fill the grid
  const padLength = key - (cleaned.length % key || key);
  const padded = cleaned + "X".repeat(padLength);

  const numRows = padded.length / key;
  const columns = Array.from({ length: key }, () => "");

  for (let i = 0; i < padded.length; i++) {
    const col = i % key;
    columns[col] += padded[i];
  }

  const encrypted = columns.join("");

  // Group by number of rows
  const grouped = encrypted.match(new RegExp(`.{1,${numRows}}`, "g")).join(" ");

  return { encrypted: grouped, spaceIndices };
}

export function transpositionDecrypt(encryptedText, key, spaceIndices) {
  const text = encryptedText.replace(/[^A-Z]/g, "");
  const numRows = Math.ceil(text.length / key);
  const numFullCols = text.length % key === 0 ? key : text.length % key;
  const columns = [];
  let index = 0;

  for (let col = 0; col < key; col++) {
    const length = col < numFullCols ? numRows : numRows - 1;
    columns[col] = text.slice(index, index + length).split("");
    index += length;
  }

  let result = "";
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < key; col++) {
      if (columns[col][row]) result += columns[col][row];
    }
  }

  // Reinsert spaces
  let chars = result.replace(/X+$/, "").split("");
  for (const i of spaceIndices) {
    if (i <= chars.length) {
      chars.splice(i, 0, " ");
    }
  }

  return chars.join("");
}
