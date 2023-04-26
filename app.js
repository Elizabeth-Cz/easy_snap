// Require the Express.js web framework
const express = require("express");

// Create a new instance of the Express.js app
const app = express();

// Define the function you want to call
function myFunction(req, res) {
  console.log("Button clicked!");
  res.send("Button clicked!");
}

// Define a route that maps to the function
app.post("/my-function", myFunction);

// Start the server and listen for requests
app.listen(3000, () => {
  console.log("Server started!");
});

// async function takeMobileScreenshot() {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 390, height: 844 });
//   await page.goto("https://www.bingofy.app");
//   await page.screenshot({ path: "./screenshots/mockup.png" });
//   await browser.close();

//   const response = await fetch("./screenshots/mockup.png");
//   const blob = await response.blob();
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "mobile-mockup.png";
//   document.body.appendChild(link);
//   link.click();
// }
