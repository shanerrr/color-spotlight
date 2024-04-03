const { createCanvas, loadImage } = require("canvas");

const componentToHex = (c) => {
  const hex = parseInt(c, 10).toString(16);
  return hex.padStart(2, "0");
};

const rgbToHex = (r, g, b) =>
  `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

const getMostProminentColor = async (imageUrl) => {
  try {
    const image = await loadImage(imageUrl);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const colorCount = {};
    for (let i = 0; i < data.length; i += 4) {
      const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`;
      colorCount[rgb] = (colorCount[rgb] || 0) + 1;
    }

    let maxCount = 0;
    let mostProminentColor = {};
    for (const [rgb, count] of Object.entries(colorCount)) {
      if (count > maxCount) {
        maxCount = count;
        const [r, g, b] = rgb.split(",").map(Number);
        mostProminentColor = { rgb, hex: rgbToHex(r, g, b) };
      }
    }

    return mostProminentColor;
  } catch (error) {
    throw new Error("Error processing image: " + error.message);
  }
};

module.exports = getMostProminentColor;
