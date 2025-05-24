function padPassword(password) {
  password = password.toUpperCase().slice(0, 14);
  const padded = new Array(14).fill("\0");
  for (let i = 0; i < password.length; i++) {
    padded[i] = password[i];
  }
  return padded.join("");
}

function strToHex(str) {
  return Array.from(str)
    .map((ch) => ch.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

function desEncrypt(key, message) {
  return strToHex(key.slice(0, 7)) + strToHex(message);
}

export function lanmanHash(password) {
  const padded = padPassword(password);
  const part1 = padded.slice(0, 7);
  const part2 = padded.slice(7, 14);

  const magic = "KGS!@#$%";

  const hash1 = desEncrypt(part1, magic);
  const hash2 = desEncrypt(part2, magic);

  return (hash1 + hash2).toUpperCase();
}
