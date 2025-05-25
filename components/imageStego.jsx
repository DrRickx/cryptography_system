import React, { useState } from "react";
import { hideTextInImage, extractTextFromImage } from "../utils/image_stego";

const ImageStego = () => {
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState("");
  const [decoded, setDecoded] = useState("");

  const handleEncode = () => {
    if (file && secret.trim()) {
      hideTextInImage(file, secret, setResult);
      setDecoded(""); // clear previous decode result
    }
  };

  const handleDecode = () => {
    if (file) {
      extractTextFromImage(file, setDecoded);
      setResult(""); // clear previous encoded image
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
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

      {decoded && (
        <div className="p-2 bg-yellow-100 border mt-2">
          <strong>Decoded Message:</strong> {decoded}
        </div>
      )}
    </div>
  );
};

export default ImageStego;
