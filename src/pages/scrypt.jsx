import { useState } from "react";
import { scryptHash } from "../../utils/scrypt_util";
import Modal from "../../components/modal"; // Adjust this path if needed

export default function Scrypt() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const validateInput = () => {
    if (!password.trim()) {
      showModal("Please enter a password to generate its scrypt hash.");
      return false;
    }
    return true;
  };

  const handleHash = async () => {
    if (!validateInput()) return;

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

      {/* Modal for input validation */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Input Validation"
        footer={[
          <button
            key="close"
            onClick={() => setModalOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Close
          </button>,
        ]}
      >
        <p className="text-gray-700">{modalMessage}</p>
      </Modal>
    </div>
  );
}
