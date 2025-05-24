// Remove duplicates and a specific letter, then fill matrix
export function generatePlayfairMatrix(removedLetter = "J") {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".replace(
    removedLetter.toUpperCase(),
    ""
  );
  return alphabet.split("");
}

function prepareText(text, removedLetter) {
  text = text.toUpperCase().replace(/[^A-Z]/g, "");
  text = text.replace(new RegExp(removedLetter, "g"), ""); // remove removed letter
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const a = text[i];
    const b = text[i + 1];

    if (!b || a === b) {
      result += a + "X";
    } else {
      result += a + b;
      i++;
    }
  }

  if (result.length % 2 !== 0) result += "X";
  return result.match(/.{2}/g); // digraphs
}

function findPosition(matrix, char) {
  const index = matrix.indexOf(char);
  return [Math.floor(index / 5), index % 5];
}

function getChar(matrix, row, col) {
  return matrix[(row % 5) * 5 + (col % 5)];
}

export function playfairEncrypt(text, removedLetter = "J") {
  const matrix = generatePlayfairMatrix(removedLetter);
  const digraphs = prepareText(text, removedLetter);
  let result = "";

  for (let pair of digraphs) {
    const [a, b] = pair;
    const [r1, c1] = findPosition(matrix, a);
    const [r2, c2] = findPosition(matrix, b);

    if (r1 === r2) {
      // Same row
      result += getChar(matrix, r1, c1 + 1);
      result += getChar(matrix, r2, c2 + 1);
    } else if (c1 === c2) {
      // Same column
      result += getChar(matrix, r1 + 1, c1);
      result += getChar(matrix, r2 + 1, c2);
    } else {
      // Rectangle (swap columns)
      result += getChar(matrix, r1, c2);
      result += getChar(matrix, r2, c1);
    }
  }

  return result;
}

export function playfairDecrypt(text, removedLetter = "J") {
  text = text.toUpperCase().replace(/[^A-Z]/g, "");

  const matrix = generatePlayfairMatrix(removedLetter);
  const digraphs = text.match(/.{2}/g) || [];
  let result = "";

  for (let pair of digraphs) {
    const [a, b] = pair;
    const [r1, c1] = findPosition(matrix, a);
    const [r2, c2] = findPosition(matrix, b);

    if (r1 === r2) {
      // Same row
      result += getChar(matrix, r1, (c1 + 4) % 5);
      result += getChar(matrix, r2, (c2 + 4) % 5);
    } else if (c1 === c2) {
      // Same column
      result += getChar(matrix, (r1 + 4) % 5, c1);
      result += getChar(matrix, (r2 + 4) % 5, c2);
    } else {
      // Rectangle (swap columns)
      result += getChar(matrix, r1, c2);
      result += getChar(matrix, r2, c1);
    }
  }

  return result;
}
