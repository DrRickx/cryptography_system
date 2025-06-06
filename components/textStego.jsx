import React, { useState } from "react";
import { encodeMessage, decodeMessage } from "../utils/text_stego";
import Modal from "../components/modal";

export default function TextStego() {
  const [carrier, setCarrier] = useState("");
  const [secret, setSecret] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showError = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "text/plain") {
      showError("Please upload a valid .txt file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCarrier(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleEncode = () => {
    if (!carrier.trim()) {
      return showError("Carrier text is required.");
    }
    if (!secret.trim()) {
      return showError("Secret message is required.");
    }
    try {
      const result = encodeMessage(carrier, secret);
      setEncoded(result);
    } catch {
      showError("Failed to encode the message.");
    }
  };

  const handleDecode = () => {
    if (!(encoded || carrier)) {
      return showError("No encoded message found.");
    }
    try {
      const result = decodeMessage(encoded || carrier);
      setDecoded(result);
    } catch {
      showError("Failed to decode the message.");
    }
  };

  const handleDownload = () => {
    if (!encoded) {
      return showError("No encoded message to save.");
    }
    const blob = new Blob([encoded], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "encoded_message.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Validation Error"
        footer={[
          <button
            key="close"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>,
        ]}
      >
        <p>{modalMessage}</p>
      </Modal>

      <div>
        <label className="block font-medium mb-1">
          Upload Carrier Text File (.txt):
        </label>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="mb-2"
        />
      </div>

      <textarea
        placeholder="Or manually enter carrier text"
        className="w-full border p-2"
        rows={4}
        value={carrier}
        onChange={(e) => setCarrier(e.target.value)}
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Decode
        </button>
      </div>

      {encoded && (
        <div>
          <label className="block font-medium">Encoded Text:</label>
          <textarea
            readOnly
            className="w-full border p-2 bg-gray-100"
            rows={4}
            value={encoded}
          />
          <button
            onClick={handleDownload}
            className="mt-2 bg-purple-500 text-white px-4 py-2 rounded"
          >
            Save to File
          </button>
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
    </div>
  );
}
