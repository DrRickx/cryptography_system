import { useState } from "react";
import {
  columnarEncrypt,
  columnarDecrypt,
} from "../../utils/columnarTransposition_util";

export default function ColumnarTransposition() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const handleEncrypt = () => {
    if (!key) {
      setOutput("Please enter a key.");
      return;
    }
    setOutput(columnarEncrypt(input, key));
  };

  const handleDecrypt = () => {
    if (!key) {
      setOutput("Please enter a key.");
      return;
    }
    // Pass the original input with spaces to keep them after decryption
    setOutput(columnarDecrypt(input, key));
  };

  return (
    <div>
      <p>Columnar Transposition Cipher</p>
      <p>Message:</p>
      <input
        type="text"
        placeholder="Enter text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Key:</p>
      <input
        type="text"
        placeholder="Enter Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <p>Result:</p>
      <p>{output}</p>
    </div>
  );
}
