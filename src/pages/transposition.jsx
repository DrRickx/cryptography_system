import { useState } from "react";
import {
  transpositionDecrypt,
  transpositionEncrypt,
} from "../../utils/transposition_util";

export default function Transposition() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [spaceIndices, setSpaceIndices] = useState([]);

  const handleEncrypt = () => {
    const result = transpositionEncrypt(input, parseInt(key));
    setOutput(result.encrypted);
    setSpaceIndices(result.spaceIndices); // Save for later decryption
  };

  const handleDecrypt = () => {
    const decrypted = transpositionDecrypt(input, parseInt(key), spaceIndices);
    setOutput(decrypted);
  };

  return (
    <div>
      <h2>Transposition Cipher</h2>

      <label>Message:</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here"
      />

      <label>Key (Characters per row):</label>
      <input
        type="number"
        min={1}
        max={input.length}
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt} style={{ marginLeft: "1rem" }}>
          Decrypt
        </button>
      </div>

      <h3>Result:</h3>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {output}
      </pre>
    </div>
  );
}
