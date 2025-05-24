import { useState } from "react";
import { scryptHash } from "../../utils/scrypt_util";

export default function Scrypt() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHash = async () => {
    if (!password) return alert("Please enter a password");
    setLoading(true);
    const result = await scryptHash(password);
    setHash(result);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Scrypt Hash</h1>

      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleHash}
        disabled={loading}
      >
        {loading ? "Hashing..." : "Generate Hash"}
      </button>
      <br />

      <strong>Hash:</strong>
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
