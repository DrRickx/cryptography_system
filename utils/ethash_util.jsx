import { keccak_256 } from "js-sha3";

// Simulate a cache (in real Ethash, it's a large memory-hard structure)
export function generateLightCache(seed, size = 16) {
  const cache = [];
  let current = seed;
  for (let i = 0; i < size; i++) {
    current = keccak_256(current + i);
    cache.push(current);
  }
  return cache;
}

export function simulateEthash(header, nonce, cache) {
  const headerNonce = header + nonce;
  const hashed = keccak_256(headerNonce);
  const index = parseInt(hashed.slice(0, 8), 16) % cache.length;

  // Simulate mixing with cache
  const mixed = keccak_256(hashed + cache[index]);

  // Final hash (mixing again)
  const finalHash = keccak_256(mixed);
  return finalHash;
}
