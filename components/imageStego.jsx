import React, { useState, useEffect } from "react";
import { hideTextInImage, extractTextFromImage } from "../utils/image_stego";
import Modal from "../components/modal";

export default function ImageStego() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState("");
  const [decoded, setDecoded] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const showModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleEncode = () => {
    if (!file) return showModal("Please select an image first.");
    if (!secret.trim()) return showModal("Please enter a secret message.");

    hideTextInImage(file, secret, setResult);
    setDecoded("");
  };

  const handleDecode = () => {
    if (!file) return showModal("Please select an image first.");

    extractTextFromImage(file, setDecoded);
    setResult("");
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {preview && (
        <div>
          <p className="text-sm text-gray-600">Image Preview:</p>
          <img src={preview} alt="Preview" className="border max-w-xs" />
        </div>
      )}
      <input
        placeholder="Secret message"
        className="w-full border p-2"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={handleEncode}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="bg-green-500 text-white px-4 py-2"
        >
          Decode
        </button>
      </div>

      {result && (
        <div className="space-y-2 mt-2">
          <img src={result} alt="Encoded" className="border max-w-xs" />
          <a
            href={result}
            download="stego-image.png"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded"
          >
            Download Image
          </a>
        </div>
      )}

      <div className="space-y-2">
        <label className="font-medium text-gray-700">Result</label>
        <textarea
          value={decoded}
          readOnly
          rows={4}
          className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800 resize-none"
          placeholder="Result will appear here"
        />
      </div>

      {/* Validation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Validation Error"
        footer={
          <button
            onClick={() => setModalOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
