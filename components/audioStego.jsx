import React, { useState } from "react";
import { encodeAudio, decodeAudio } from "../utils/audio_stego";

const AudioStego = () => {
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState("");
  const [decoded, setDecoded] = useState("");

  const handleEncode = () => {
    if (file && secret) {
      encodeAudio(file, secret, setResult);
    }
  };

  const handleDecode = () => {
    if (file) {
      decodeAudio(file, setDecoded);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept=".wav"
        onChange={(e) => setFile(e.target.files[0])}
      />
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

      {decoded && (
        <div className="p-2 bg-yellow-100 border mt-2">
          <strong>Decoded Message:</strong> {decoded}
        </div>
      )}
    </div>
  );
};

export default AudioStego;
