const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const port = 3000;

const viewPorts = {
  mobile: {
    width: 390,
    height: 844,
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
    await page.goto(url);

    // Wait for the page to load completely
    // await page.waitForLoadState("networkidle");

    // Take a screenshot of the page
    const screenshot = await page.screenshot({ fullPage: true });

    // Send the screenshot back as a response
    res.set("Content-Type", "image/png");
    res.send(screenshot);
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

// Launch Puppeteer ** working do not touch
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: "new",
//   });
//   const page = await browser.newPage();

//   // Endpoint for taking a screenshot
//   app.get("/screenshot/mobile", async (req, res) => {
//     const { url } = req.query;
//     try {
//       // Set the viewport to a mobile device
//       await page.setViewport({
//         width: 375,
//         height: 667,
//         deviceScaleFactor: 2,
//         isMobile: true,
//         hasTouch: true,
//         isLandscape: false,
//       });

//       // Navigate to the URL and wait for the page to load
//       await page.goto(url);

//       // Take a screenshot of the page and return it as a PNG image
//       const screenshot = await page.screenshot({ type: "png" });
//       res.set("Content-Type", "image/png");
//       res.send(screenshot);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error taking screenshot");
//     }
//   });
// })();
