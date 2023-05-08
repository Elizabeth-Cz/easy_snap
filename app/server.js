const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const { createCanvas, loadImage } = require("canvas");

const addFrameToScreenshot = async (screenshotBuffer) => {
  // Load the PNG frame and the screenshot into a canvas
  const canvas = createCanvas(437, 885);
  const ctx = canvas.getContext("2d");
  const frame = await loadImage("./frames/Mobile-frame-large.png");
  const screenshot = await loadImage(screenshotBuffer);

  // Draw the screenshot and the frame onto the canvas
  ctx.drawImage(screenshot, 24, 129, 390, 645);
  ctx.drawImage(frame, 0, 0, 437, 885);

  // Return the canvas as a PNG buffer
  return canvas.toBuffer();
};

const app = express();
const port = 3000;

const viewPorts = {
  mobile: {
    width: 390,
    height: 645,
  },
  tablet: {
    width: 820,
    height: 1180,
  },
  desktop: {
    width: 1440,
    height: 1080,
  },
};

console.log(viewPorts);

const corsOptions = {
  origin: "http://127.0.0.1:5500",
};
app.use(cors(corsOptions));

const takeScreenshot = async (req, res) => {
  const { device } = req.params;
  const viewport = viewPorts[device];
  console.log(viewport);
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  try {
    const { url } = req.query;

    // Set the viewport based on the device type
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: device === "mobile" ? 2 : null,
      // isMobile: device === "mobile" || device === "tablet",
      // hasTouch: device === "mobile" || device === "tablet",
    });

    // Navigate to the URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the page to load completely
    // await page.waitForLoadState("networkidle");

    // Take a screenshot of the page
    const screenshot = await page.screenshot({ fullPage: false });
    const screenshotWithFrameBuffer = await addFrameToScreenshot(screenshot);

    // Send the screenshot back as a response
    res.set("Content-Type", "image/png");
    res.set("Content-Disposition", 'attachment; filename="screenshot.png"');
    res.send(screenshotWithFrameBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error taking screenshot");
  } finally {
    // Close the browser once the screenshot is taken
    await browser.close();
  }
};

// Endpoint for taking a screenshot
app.get("/screenshot/:device", takeScreenshot);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
