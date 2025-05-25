import { useState } from "react";
import { ntlmHash } from "../../utils/ntlm_util";

export default function Ntlm() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const handleHash = async () => {
    if (!input.trim()) {
      setHash("Please enter a password.");
      return;
    }
    const result = await ntlmHash(input);
    setHash(result.toUpperCase());
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4 border">
        <h1 className="text-2xl font-bold text-center">NTLM Hash Generator</h1>

        <div>
          <label htmlFor="ntlmInput" className="block font-semibold mb-1">
            Enter Password:
          </label>
          <input
            id="ntlmInput"
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleHash();
            }}
          />
        </div>

        <button
          onClick={handleHash}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="button"
        >
          Generate Hash
        </button>

        <div>
          <label htmlFor="ntlmOutput" className="block font-semibold mb-1">
            Result:
          </label>
          <textarea
            id="ntlmOutput"
            className="w-full p-2 border rounded bg-gray-100"
            rows={4}
            readOnly
            value={hash}
            placeholder="Hash will appear here"
          />
        </div>
      </div>
    </div>
  );
}
