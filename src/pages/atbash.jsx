import React, { useState } from "react";
import Modal from "../../components/modal";
import { atbashEncryptDecrypt } from "../../utils/atbash_util";

export default function Atbash() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encrypt");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const handleProcess = () => {
    if (!input.trim()) {
      showModal("Please enter some text before proceeding.");
      return;
    }
    const result = atbashEncryptDecrypt(input);
    setOutput(result);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10 bg-gray-50">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-700">
            Atbash Cipher
          </h1>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">Enter Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              className="w-full border rounded px-3 py-2 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Type your message to ${mode}`}
            />
          </div>

          <button
            onClick={handleProcess}
            className="w-full py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>

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
