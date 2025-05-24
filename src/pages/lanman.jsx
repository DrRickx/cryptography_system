import { useState } from "react";
import { lanmanHash } from "../../utils/lanman_util";

export default function LanmanPage() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const handleHash = () => {
    setHash(lanmanHash(input));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">LANMAN Hash Generator</h1>

      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleHash}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Hash
      </button>

      <p>Result</p>
      <textarea
        className="w-full p-2 border rounded"
        rows={4}
        readOnly
        value={hash}
        placeholder="Hash will appear here"
      />
    </div>
  );
}
