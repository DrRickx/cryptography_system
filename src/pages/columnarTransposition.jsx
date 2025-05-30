import { useState } from "react";
import {
  columnarEncrypt,
  columnarDecrypt,
} from "../../utils/columnarTransposition_util";
import Modal from "../../components/modal"; // Adjust path if needed

export default function ColumnarTransposition() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const validateInput = () => {
    if (!input.trim()) {
      showModal("Please enter a message to encrypt or decrypt.");
      return false;
    }
    if (!key.trim()) {
      showModal("Please enter a key before proceeding.");
      return false;
    }
    return true;
  };

  const handleEncrypt = () => {
    if (!validateInput()) return;
    setOutput(columnarEncrypt(input, key));
  };

  const handleDecrypt = () => {
    if (!validateInput()) return;
    setOutput(columnarDecrypt(input, key));
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Columnar Transposition Cipher
        </h1>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Message</label>
          <input
            type="text"
            placeholder="Enter text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Key</label>
          <input
            type="text"
            placeholder="Enter Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleEncrypt}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Encrypt
          </button>
          <button
            onClick={handleDecrypt}
            className="w-full py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
          >
            Decrypt
          </button>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Result</label>
          <p className="w-full border rounded p-3 bg-gray-100 text-gray-800 min-h-[80px] whitespace-pre-wrap break-words">
            {output}
          </p>
        </div>
      </div>

      {/* Modal validation */}
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
