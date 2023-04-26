const form = document.querySelector("form");
const urlInput = document.querySelector("#url");
const message = document.querySelector("#message");
const downloadBtnMobile = document.querySelector("#download-mobile");
const downloadBtnTeblet = document.querySelector("#download-tablet");
const downloadBtnDesktop = document.querySelector("#download-desktop");

const BASE_URL = "http://localhost:3000";

// get screenshot
const downloadScreenshot = async (device) => {
  message.innerText = "Loading...";
  try {
    // in extension url will change to chroma.tabs[0] or something like that
    const url = urlInput.value;
    const res = await fetch(`${BASE_URL}/screenshot/${device}?url=${url}`);
    const blob = await res.blob();
    const urlObject = window.URL.createObjectURL(blob);

    // Create a link element with the screenshot as its href and download attribute
    const link = document.createElement("a");
    link.href = urlObject;
    const fileName = url.slice(8);
    link.download = `${fileName}-${device}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Show success message
    message.innerText = "Screenshot downloaded successfully!";
  } catch (err) {
    console.error(err);
    message.innerText = "Error downloading screenshot. Please try again.";
  }
};
// have 3 buttons, each download different size
downloadBtnMobile.addEventListener("click", () => downloadScreenshot("mobile"));
downloadBtnTeblet.addEventListener("click", () => downloadScreenshot("tablet"));
downloadBtnDesktop.addEventListener("click", () =>
  downloadScreenshot("desktop")
);

// downloadBtnMobile.addEventListener("click", async () => {
//   // Disable the submit button and show "Loading" status message
//   downloadBtnMobile.disabled = true;
//   message.innerText = "Loading...";

//   try {
//     const url = urlInput.value;
//     const res = await fetch(
//       `http://localhost:3000/screenshot/mobile?url=${url}`
//     );
//     const blob = await res.blob();
//     const urlObject = window.URL.createObjectURL(blob);

//     // Create a link element with the screenshot as its href and download attribute
//     const link = document.createElement("a");
//     link.href = urlObject;
//     link.download = `${url}-mobile.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     // Show success message
//     message.innerText = "Screenshot downloaded successfully!";
//   } catch (error) {
//     console.error(error);
//     message.innerText = "Error downloading screenshot. Please try again.";
//   }

//   // Enable the submit button
//   submitBtn.disabled = false;
// });
