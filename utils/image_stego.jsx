// Helper to convert number to 32-bit binary string
const numberTo32BitBinary = (num) => num.toString(2).padStart(32, "0");

// Helper to convert 32-bit binary string to number
const binaryToNumber = (bin) => parseInt(bin, 2);

export const hideTextInImage = async (file, message, callback) => {
  const img = new Image();
  const reader = new FileReader();

  reader.onload = () => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Encode message length as 32-bit binary header
      const lengthBinary = numberTo32BitBinary(message.length);

      // Convert message to binary string
      const messageBinary = message
        .split("")
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("");

      // Full binary = header + message
      const fullBinary = lengthBinary + messageBinary;

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < fullBinary.length; i++) {
        // Modify the least significant bit of the red channel
        data.data[i * 4] = (data.data[i * 4] & 0xfe) | Number(fullBinary[i]);
      }

      ctx.putImageData(data, 0, 0);

      const imageUrl = canvas.toDataURL("image/png");
      callback?.(imageUrl);
    };

    img.src = reader.result;
  };

  reader.readAsDataURL(file);
};

export const extractTextFromImage = (file, callback) => {
  const img = new Image();
  const reader = new FileReader();

  reader.onload = () => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Extract first 32 bits for length
      let lengthBinary = "";
      for (let i = 0; i < 32; i++) {
        lengthBinary += (data[i * 4] & 1).toString();
      }
      const messageLength = binaryToNumber(lengthBinary);

      // Now extract messageLength * 8 bits starting after the header (32 bits)
      let messageBinary = "";
      for (let i = 32; i < 32 + messageLength * 8; i++) {
        messageBinary += (data[i * 4] & 1).toString();
      }

      // Convert binary to string
      const chars = messageBinary
        .match(/.{1,8}/g)
        .map((b) => String.fromCharCode(parseInt(b, 2)));

      callback(chars.join(""));
    };

    img.src = reader.result;
  };

  reader.readAsDataURL(file);
};
