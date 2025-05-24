export function atbashEncryptDecrypt(text) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const reversed = alphabet.split("").reverse().join("");
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      const index = alphabet.indexOf(char);
      return index === -1 ? char : reversed[index];
    })
    .join("");
}
