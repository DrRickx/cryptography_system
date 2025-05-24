import { md4 } from "hash-wasm";

function toUtf16Le(str) {
  const buf = new Uint8Array(str.length * 2);
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    buf[i * 2] = code & 0xff;
    buf[i * 2 + 1] = code >> 8;
  }
  return buf;
}

export async function ntlmHash(password) {
  const utf16le = toUtf16Le(password);
  return await md4(utf16le);
}
