export const toBinary = (text) =>
  text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

export const fromBinary = (binary) => {
  const chars = binary.match(/.{1,8}/g) || [];
  return chars.map((bin) => String.fromCharCode(parseInt(bin, 2))).join("");
};

export const encodeMessage = (carrierText, secret) => {
  const binary = toBinary(secret);
  const hidden = binary.replace(/0/g, "\u200b").replace(/1/g, "\u200c");
  return carrierText + hidden;
};

export const decodeMessage = (text) => {
  const hidden = text.match(/[\u200b\u200c]+/g)?.[0] || "";
  const binary = hidden.replace(/\u200b/g, "0").replace(/\u200c/g, "1");
  return fromBinary(binary);
};
