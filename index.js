const { createCanvas, loadImage } = require("canvas");

function componentToHex(c) {
  let hex = parseInt(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

async function getMostProminentColor(imageUrl) {
  try {
    // Load the image
    const image = await loadImage(imageUrl);

    // Create a canvas and draw the image on it
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Calculate the frequency of each color
    const colorCount = {};
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const rgb = `${r},${g},${b}`;
      colorCount[rgb] = (colorCount[rgb] || 0) + 1;
    }

    // Find the most frequent color
    let maxCount = 0;
    let mostProminentColor = {};
    for (const color in colorCount) {
      if (colorCount[color] > maxCount) {
        maxCount = colorCount[color];
        mostProminentColor = { rgb: color, hex: rgbToHex(...color.split(",")) };
      }
    }

    return mostProminentColor;
  } catch (error) {
    throw new Error("Error processing image: " + error.message);
  }
}

module.exports = getMostProminentColor;
