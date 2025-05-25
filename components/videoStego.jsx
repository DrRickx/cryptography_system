import React, { useState } from "react";
import { hideTextInVideo, extractTextFromVideo } from "../utils/video_stego";

const VideoStego = () => {
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [decoded, setDecoded] = useState("");

  const handleEncode = () => {
    if (file && secret.trim()) {
      hideTextInVideo(file, secret, setResultImage);
      setDecoded("");
    }
  };

  const handleDecode = () => {
    if (file) {
      extractTextFromVideo(file, setDecoded);
      setResultImage("");
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
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

      {decoded && (
        <div className="p-2 bg-yellow-100 border mt-2">
          <strong>Decoded Message:</strong> {decoded}
        </div>
      )}
    </div>
  );
};

export default VideoStego;
