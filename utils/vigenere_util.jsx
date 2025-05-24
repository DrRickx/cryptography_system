export function vigenereEncrypt(text, keyword) {
  const key = keyword.toLowerCase().replace(/[^a-z]/g, "");
  if (key.length === 0) {
    return text;
  }
  let result = "";
  let keyIndex = 0;
  for (const char of text) {
    const shift = key.charCodeAt(keyIndex % key.length) - 97;
    if (/[a-zA-Z]/.test(char)) {
      result += shiftChar(char, shift);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

export function vigenereDecrypt(text, keyword) {
  const key = keyword.toLowerCase().replace(/[^a-z]/g, "");
  if (key.length === 0) return text;

  let result = "";
  let keyIndex = 0;

  for (const char of text) {
    const shift = 26 - (key.charCodeAt(keyIndex % key.length) - 97);
    if (/[a-zA-Z]/.test(char)) {
      result += shiftChar(char, shift);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

function shiftChar(char, shift) {
  const code = char.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
  }

  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
  }

  return char;
}
