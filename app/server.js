const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const port = 3000;

// Launch Puppeteer
(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  // Endpoint for taking a screenshot
  app.get("/screenshot/mobile", async (req, res) => {
    const { url } = req.query;
    try {
      // Set the viewport to a mobile device
      await page.setViewport({
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
      });

      // Navigate to the URL and wait for the page to load
      await page.goto(url);

      // Take a screenshot of the page and return it as a PNG image
      const screenshot = await page.screenshot({ type: "png" });
      res.set("Content-Type", "image/png");
      res.send(screenshot);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error taking screenshot");
    }
  });
})();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(cors());
const corsOptions = {
  origin: "http://127.0.0.1:5500",
};

app.use(cors(corsOptions));
