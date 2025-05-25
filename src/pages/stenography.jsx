import React, { useState } from "react";
import TextStego from "../../components/textStego";
import ImageStego from "../../components/imageStego";
import VideoStego from "../../components/videoStego";
import AudioStego from "../../components/audioStego";

export default function Steganography() {
  const [mode, setMode] = useState("text");

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Steganography Tool</h1>

      <select
        className="border p-2 rounded"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="text">Text Steganography</option>
        <option value="image">Image Steganography</option>
        <option value="video">Video Steganography</option>
        <option value="audio">Audio Steganography</option>
      </select>

      <div className="bg-white shadow-md border rounded-xl p-6 transition-all duration-300">
        {mode === "text" && <TextStego />}
        {mode === "image" && <ImageStego />}
        {mode === "video" && <VideoStego />}
        {mode === "audio" && <AudioStego />}
      </div>
    </div>
  );
}
