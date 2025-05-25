import { useState } from "react";
import Modal from "../../components/modal";
import { vigenereDecrypt, vigenereEncrypt } from "../../utils/vigenere_util";

export default function Vigenere() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const validateInput = () => {
    if (!input.trim()) {
      showModal("Please enter the message text before proceeding.");
      return false;
    }
    if (!key.trim()) {
      showModal("Please enter the key before proceeding.");
      return false;
    }
    return true;
  };

  const handleEncrypt = () => {
    if (!validateInput()) return;
    setOutput(vigenereEncrypt(input, key));
  };

  const handleDecrypt = () => {
    if (!validateInput()) return;
    setOutput(vigenereDecrypt(input, key));
  };

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10 bg-gray-50">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-700">
            Vigenère Cipher
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
              placeholder="Enter key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleEncrypt}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              type="button"
            >
              Encrypt
            </button>
            <button
              onClick={handleDecrypt}
              className="w-full py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
              type="button"
            >
              Decrypt
            </button>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">Result</label>
            <textarea
              value={output}
              readOnly
              rows={4}
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800 resize-none"
              placeholder="Result will appear here"
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Validation Error"
        footer={
          <button
            onClick={() => setModalOpen(false)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="button"
          >
            Close
          </button>
        }
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
}
