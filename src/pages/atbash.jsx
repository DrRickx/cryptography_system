import React, { useState } from "react";
import { atbashEncryptDecrypt } from "../../utils/atbash_util";

export default function Atbash() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encrypt");

  const handleProcess = () => {
    const result = atbashEncryptDecrypt(input);
    setOutput(result);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Atbash Cipher</h1>

      <label className="block mb-2">
        Mode:
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="ml-2 border rounded p-1"
        >
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
      </label>

      <label className="block mb-2">
        Enter text:
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full border rounded p-2 mt-1"
          placeholder={`Type your message to ${mode}`}
        />
      </label>

      <button
        onClick={handleProcess}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {mode === "encrypt" ? "Encrypt" : "Decrypt"}
      </button>

      <label className="block mt-4">
        Result:
        <textarea
          value={output}
          readOnly
          rows={4}
          className="w-full border rounded p-2 mt-1 bg-gray-100"
          placeholder="Result will appear here"
        />
      </label>
    </div>
  );
}
