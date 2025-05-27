import React, { useState, useEffect } from "react";
import { encodeAudio, decodeAudio } from "../utils/audio_stego";
import Modal from "../components/modal";

const AudioStego = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState("");
  const [decoded, setDecoded] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleEncode = () => {
    if (!file) return showModal("Please select a WAV file first.");
    if (!secret.trim()) return showModal("Please enter a secret message.");
    encodeAudio(file, secret, setResult);
    setDecoded(""); // Clear any previous decode result
  };

  const handleDecode = () => {
    if (!file) return showModal("Please select a WAV file to decode.");
    decodeAudio(file, setDecoded);
    setResult(""); // Clear any previous encode result
  };

  // Cleanup preview URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept=".wav"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
          if (selectedFile) {
            const previewURL = URL.createObjectURL(selectedFile);
            setPreview(previewURL);
          } else {
            setPreview(null);
          }
        }}
      />

      {preview && (
        <div className="space-y-2 mt-2">
          <p className="text-sm text-gray-600">Selected audio preview:</p>
          <audio controls src={preview}></audio>
        </div>
      )}

      <input
        className="w-full border p-2"
        placeholder="Secret message"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleEncode}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="bg-green-600 text-white px-4 py-2"
        >
          Decode
        </button>
      </div>

      {result && (
        <div className="space-y-2 mt-2">
          <p className="text-sm text-gray-600">Encoded audio preview:</p>
          <audio controls src={result}></audio>
          <a
            href={result}
            download="stego-audio.wav"
            className="bg-purple-600 text-white px-4 py-2 rounded inline-block"
          >
            Download Audio
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

      {/* Modal for validation */}
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
};

export default AudioStego;
