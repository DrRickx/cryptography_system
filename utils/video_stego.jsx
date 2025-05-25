export const hideTextInVideo = async (file, message, callback) => {
  const video = document.createElement("video");
  const reader = new FileReader();

  reader.onload = () => {
    video.src = reader.result;
    video.muted = true;
    video.play();

    video.onloadeddata = () => {
      video.currentTime = 0;
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      // Encode length (32 bits) + binary message
      const binaryMessage = message
        .split("")
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("");

      const lengthBits = message.length.toString(2).padStart(32, "0");
      const fullBinary = lengthBits + binaryMessage;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < fullBinary.length; i++) {
        data[i * 4] = (data[i * 4] & 0xfe) | Number(fullBinary[i]);
      }

      ctx.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL());
    };
  };

  reader.readAsDataURL(file);
};

export const extractTextFromVideo = async (file, callback) => {
  const video = document.createElement("video");
  const reader = new FileReader();

  reader.onload = () => {
    video.src = reader.result;
    video.muted = true;
    video.play();

    video.onloadeddata = () => {
      video.currentTime = 0;
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let lengthBinary = "";
      for (let i = 0; i < 32; i++) {
        lengthBinary += (data[i * 4] & 1).toString();
      }

      const length = parseInt(lengthBinary, 2);
      const totalBits = length * 8;

      let binaryMessage = "";
      for (let i = 32; i < 32 + totalBits; i++) {
        binaryMessage += (data[i * 4] & 1).toString();
      }

      const chars = binaryMessage
        .match(/.{1,8}/g)
        .map((b) => String.fromCharCode(parseInt(b, 2)));

      callback(chars.join(""));
    };
  };

  reader.readAsDataURL(file);
};
