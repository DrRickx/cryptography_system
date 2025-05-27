import { useState } from "react";
import { generateLightCache, simulateEthash } from "../../utils/ethash_util";
import Modal from "../../components/modal";

export default function Ethash() {
  const [header, setHeader] = useState("abcd1234");
  const [nonce, setNonce] = useState("00000001");
  const [result, setResult] = useState("");
  const [cache, setCache] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleGenerateCache = () => {
    const newCache = generateLightCache(header);
    setCache(newCache);
  };

  const handleSimulate = () => {
    if (cache.length === 0) {
      setModalMessage("Generate cache first!");
      setIsModalOpen(true);
      return;
    }
    const hash = simulateEthash(header, nonce, cache);
    setResult(hash);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4 border font-mono">
        <h1 className="text-2xl font-bold text-center">Simplified Ethash</h1>

        <div>
          <label className="block mb-1 font-semibold">Block Header:</label>
          <input
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Nonce:</label>
          <input
            type="text"
            value={nonce}
            onChange={(e) => setNonce(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Light Cache:</label>
          <textarea
            className="w-full p-2 border rounded bg-gray-100"
            readOnly
            rows={2}
            value={cache.join(", ")}
            placeholder="Generate light cache to see values"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleGenerateCache}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Generate Light Cache
          </button>
          <button
            onClick={handleSimulate}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Simulate Ethash
          </button>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Result</label>
          <textarea
            value={result}
            readOnly
            rows={4}
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800 resize-none"
            placeholder="Result will appear here"
          />
        </div>
      </div>

      {/* Modal for validation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Validation Error"
        footer={
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            OK
          </button>
        }
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
