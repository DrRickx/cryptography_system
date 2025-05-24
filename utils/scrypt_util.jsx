import { scrypt } from "scrypt-js";

export async function scryptHash(password, salt = "default_salt") {
  const N = 16384,
    r = 8,
    p = 1,
    dkLen = 32;

  const passwordBuffer = new TextEncoder().encode(password);
  const saltBuffer = new TextEncoder().encode(salt);

  const derivedKey = await scrypt(passwordBuffer, saltBuffer, N, r, p, dkLen);

  return Array.from(derivedKey)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
