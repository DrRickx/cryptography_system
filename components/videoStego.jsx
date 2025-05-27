import React, { useState } from "react";
import { hideTextInVideo, extractTextFromVideo } from "../utils/video_stego";
import Modal from "../components/modal";

const VideoStego = () => {
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [decoded, setDecoded] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreviewURL(selected ? URL.createObjectURL(selected) : "");
  };

  const handleEncode = () => {
    if (!file) return showModal("Please select a video file.");
    if (!secret.trim()) return showModal("Please enter a secret message.");
    hideTextInVideo(file, secret, setResultImage);
    setDecoded("");
  };

  const handleDecode = () => {
    if (!file) return showModal("Please select a video file.");
    extractTextFromVideo(file, setDecoded);
    setResultImage("");
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {previewURL && (
        <video
          controls
          src={previewURL}
          className="w-full max-w-md border rounded"
        />
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

      {resultImage && (
        <div className="space-y-2 mt-2">
          <img
            src={resultImage}
            alt="Encoded Frame"
            className="border max-w-xs"
          />
          <a
            href={resultImage}
            download="stego-frame.png"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded"
          >
            Download Encoded Frame
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
      {/* Modal */}
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

export default VideoStego;
