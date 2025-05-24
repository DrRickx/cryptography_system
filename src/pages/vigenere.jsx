import { useState } from "react";
import { vigenereDecrypt, vigenereEncrypt } from "../../utils/vigenere_util";

export default function Vigenere() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const handleEncrypt = () => {
    setOutput(vigenereEncrypt(input, key));
  };

  const handleDecrypt = () => {
    setOutput(vigenereDecrypt(input, key));
  };

  return (
    <div>
      <p>Vigenere Cipher</p>
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
