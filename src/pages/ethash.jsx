import { useState } from "react";
import { generateLightCache, simulateEthash } from "../../utils/ethash_util";
export default function Ethash() {
  const [header, setHeader] = useState("abcd1234");
  const [nonce, setNonce] = useState("00000001");
  const [result, setResult] = useState("");
  const [cache, setCache] = useState([]);

  const handleGenerateCache = () => {
    const newCache = generateLightCache(header);
    setCache(newCache);
  };

  const handleSimulate = () => {
    if (cache.length === 0) return alert("Generate cache first!");
    const hash = simulateEthash(header, nonce, cache);
    setResult(hash);
  };

  return (
    <div className="p-8 font-mono">
      <h1 className="text-2xl font-bold mb-4">Simplified Ethash Demo</h1>

      <div className="mb-2">
        <label>Block Header: </label>
        <input
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          className="border p-1"
        />
      </div>
      <div className="mb-2">
        <label>Nonce: </label>
        <input
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          className="border p-1"
        />
      </div>

      <p>Light Cache</p>
      <input type="text" readOnly value={cache} />
      <br />

      <button
        onClick={handleGenerateCache}
        className="bg-blue-500 text-white p-2 mr-2"
      >
        Generate Light Cache
      </button>

      <button onClick={handleSimulate} className="bg-green-500 text-white p-2">
        Simulate Ethash
      </button>

      {result && (
        <div className="mt-4">
          <strong>Resulting Hash:</strong>
          <pre className="bg-gray-100 p-2 mt-2">{result}</pre>
        </div>
      )}
    </div>
  );
}
