import { useState } from "react";
import Modal from "../../components/modal";
import {
  playfairEncrypt,
  playfairDecrypt,
  generatePlayfairMatrix,
} from "../../utils/playfair_util";

const defaultAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function PlayfairCipher() {
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");
  const [removedLetter, setRemovedLetter] = useState("J");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const getMatrix = () => {
    return generatePlayfairMatrix(removedLetter);
  };

  const showModal = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const handleEncrypt = () => {
    if (!message.trim()) {
      showModal("Please enter a message.");
      return;
    }
    if (!removedLetter) {
      showModal("Please specify the letter to remove.");
      return;
    }
    const encrypted = playfairEncrypt(message, removedLetter);
    setOutput(encrypted);
  };

  const handleDecrypt = () => {
    if (!message.trim()) {
      showModal("Please enter a message.");
      return;
    }
    if (!removedLetter) {
      showModal("Please specify the letter to remove.");
      return;
    }
    const decrypted = playfairDecrypt(message, removedLetter);
    setOutput(decrypted);
  };

  const handleRemovedLetterChange = (e) => {
    const val = e.target.value.toUpperCase();
    if (val.length === 1 && defaultAlphabet.includes(val)) {
      setRemovedLetter(val);
    }
  };

  const handleLetterClick = (letter) => {
    setRemovedLetter(letter);
  };

  const matrix = getMatrix();

  return (
    <>
      <div className="max-w-md mx-auto p-4 space-y-4 font-sans">
        <h1 className="text-2xl font-bold">Playfair Cipher</h1>

        <label className="block font-semibold mb-1" htmlFor="message">
          Message:
        </label>
        <textarea
          id="message"
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Enter your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <label
          className="block font-semibold mb-1 mt-4"
          htmlFor="removedLetter"
        >
          Letter to remove from matrix (click letter or type):
        </label>
        <input
          id="removedLetter"
          className="w-16 p-2 border rounded text-center"
          maxLength={1}
          value={removedLetter}
          onChange={handleRemovedLetterChange}
          required
        />

        <div className="mt-2">
          <h2 className="font-semibold mb-2">Matrix (5x5):</h2>
          <div className="grid grid-cols-5 gap-1 w-60 border p-2 rounded bg-white select-none">
            {matrix.map((char, idx) => (
              <div
                key={idx}
                onClick={() => handleLetterClick(char)}
                className={`w-10 h-10 flex items-center justify-center border text-lg font-bold cursor-pointer
                  ${
                    char === removedLetter
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  }
                  hover:bg-red-300 hover:text-white
                `}
                title={`Click to remove '${char}'`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex space-x-3">
            <button
              onClick={handleEncrypt}
              className="flex-grow bg-green-600 text-white py-2 rounded hover:bg-green-700"
              type="button"
            >
              Encrypt
            </button>
            <button
              onClick={handleDecrypt}
              className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              type="button"
            >
              Decrypt
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold mb-1">Result:</h2>
          <div className="p-2 border rounded bg-gray-100 whitespace-pre-wrap break-words min-h-[3rem]">
            {output}
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
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
