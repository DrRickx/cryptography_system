export const encodeAudio = async (file, message, callback) => {
  const reader = new FileReader();
  reader.onload = async () => {
    const arrayBuffer = reader.result;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const channelData = audioBuffer.getChannelData(0).slice(); // Mono for simplicity

    const textBytes = new TextEncoder().encode(message);
    const messageLength = textBytes.length;
    const binaryMessage = Array.from(textBytes)
      .map((b) => b.toString(2).padStart(8, "0"))
      .join("");

    const binaryLength = messageLength.toString(2).padStart(32, "0");

    const fullBinary = binaryLength + binaryMessage;
    const totalBits = fullBinary.length;

    if (totalBits > channelData.length) {
      alert("Message too long for this audio!");
      return;
    }

    for (let i = 0; i < totalBits; i++) {
      let intSample = Math.floor(channelData[i] * 32768);
      intSample = (intSample & ~1) | parseInt(fullBinary[i]);
      channelData[i] = intSample / 32768;
    }

    const newBuffer = audioCtx.createBuffer(
      1,
      channelData.length,
      audioBuffer.sampleRate
    );
    newBuffer.copyToChannel(channelData, 0);

    const offlineCtx = new OfflineAudioContext(
      1,
      newBuffer.length,
      newBuffer.sampleRate
    );
    const source = offlineCtx.createBufferSource();
    source.buffer = newBuffer;
    source.connect(offlineCtx.destination);
    source.start();

    const rendered = await offlineCtx.startRendering();

    const audioBlob = await new Promise((resolve) => {
      const exportWAV = (rendered) => {
        const worker = new Worker(
          URL.createObjectURL(
            new Blob(
              [
                `
            self.onmessage = function(e) {
              const [samples, sampleRate] = e.data;
              const buffer = new ArrayBuffer(44 + samples.length * 2);
              const view = new DataView(buffer);
  
              function writeString(view, offset, string) {
                for (let i = 0; i < string.length; i++) {
                  view.setUint8(offset + i, string.charCodeAt(i));
                }
              }
  
              writeString(view, 0, 'RIFF');
              view.setUint32(4, 36 + samples.length * 2, true);
              writeString(view, 8, 'WAVE');
              writeString(view, 12, 'fmt ');
              view.setUint32(16, 16, true);
              view.setUint16(20, 1, true);
              view.setUint16(22, 1, true);
              view.setUint32(24, sampleRate, true);
              view.setUint32(28, sampleRate * 2, true);
              view.setUint16(32, 2, true);
              view.setUint16(34, 16, true);
              writeString(view, 36, 'data');
              view.setUint32(40, samples.length * 2, true);
  
              for (let i = 0; i < samples.length; i++) {
                const s = Math.max(-1, Math.min(1, samples[i]));
                view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
              }
  
              postMessage(new Blob([view], { type: 'audio/wav' }));
            };
          `,
              ],
              { type: "application/javascript" }
            )
          )
        );

        worker.onmessage = (e) => resolve(e.data);
        worker.postMessage([rendered.getChannelData(0), rendered.sampleRate]);
      };

      exportWAV(rendered);
    });

    callback(URL.createObjectURL(audioBlob));
  };

  reader.readAsArrayBuffer(file);
};

export const decodeAudio = async (file, callback) => {
  const reader = new FileReader();
  reader.onload = async () => {
    const arrayBuffer = reader.result;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const data = audioBuffer.getChannelData(0);
    let binary = "";

    // Read 32 bits for length
    for (let i = 0; i < 32; i++) {
      const intSample = Math.floor(data[i] * 32768);
      binary += (intSample & 1).toString();
    }

    const length = parseInt(binary, 2);
    let messageBits = "";

    for (let i = 0; i < length * 8; i++) {
      const intSample = Math.floor(data[32 + i] * 32768);
      messageBits += (intSample & 1).toString();
    }

    const bytes = messageBits.match(/.{1,8}/g).map((b) => parseInt(b, 2));
    const message = new TextDecoder().decode(new Uint8Array(bytes));

    callback(message);
  };

  reader.readAsArrayBuffer(file);
};
