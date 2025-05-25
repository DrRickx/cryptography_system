import { useState } from "react";
import { scryptHash } from "../../utils/scrypt_util";

export default function Scrypt() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHash = async () => {
    if (!password.trim()) {
      alert("Please enter a password");
      return;
    }

    setLoading(true);
    const result = await scryptHash(password);
    setHash(result);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4 border">
        <h1 className="text-2xl font-bold text-center">
          Scrypt Hash Generator
        </h1>

        <div>
          <label htmlFor="scryptInput" className="block font-semibold mb-1">
            Enter Password:
          </label>
          <input
            id="scryptInput"
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleHash();
            }}
          />
        </div>

        <button
          onClick={handleHash}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Hashing..." : "Generate Hash"}
        </button>

        <div>
          <label htmlFor="scryptOutput" className="block font-semibold mb-1">
            Result:
          </label>
          <textarea
            id="scryptOutput"
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
