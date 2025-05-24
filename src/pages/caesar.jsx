import { useState } from "react";
import { caesarDecrypt, caesarEncrypt } from "../../utils/caesar_util";
export default function Caesar() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(0);
  const [output, setOutput] = useState("");

  const handleEncrypt = () => {
    setOutput(caesarEncrypt(input, shift));
  };

  const handleDecrypt = () => {
    setOutput(caesarDecrypt(input, shift));
  };

  return (
    <div>
      <h2>Caesar Cipher</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Shift Number</p>
      <input
        type="number"
        placeholder="Enter Shift Value"
        value={shift}
        onChange={(e) => setShift(e.target.value)}
        min={0}
        max={25}
      />
      <br />
      <button onClick={handleEncrypt}>Encrypt</button>
      <br />
      <button onClick={handleDecrypt}>Decrypt</button>

      <p>Result</p>
      <p>{output}</p>
    </div>
  );
}
