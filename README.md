# color-spotlight

[![https://nodei.co/npm/color-spotlight.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/color-spotlight.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/color-spotlight)

## Overview

`color-spotlight` is a lightweight Node.js module that spotlights the dominant color in an image. It provides an easy-to-use interface for extracting the most prominent color from an image, making it ideal for web developers, designers, and anyone working with image analysis in their projects.

## Features

- Identifies and spotlights the dominant color in an image.
- Supports various image formats, including PNG, JPEG, and others.
- Simple API for integrating color analysis into your Node.js applications.

## Installation

You can install `color-spotlight` via npm:

```bash
npm install color-spotlight
```

## Usage

```javascript
const spotlight = require("color-spotlight");

// Specify the URL of the image you want to analyze
const imageUrl = "https://example.com/image.jpg";

// Get the dominant color from the image
spotlight(imageUrl)
  .then((color) => {
    console.log("Dominant color (RGB):", color.rgb);
    console.log("Dominant color (HEX):", color.hex);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// or using async/await
const { rgb, hex } = await spotlight(imageUrl);
```
