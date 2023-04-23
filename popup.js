document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('btn-mobile')
    mobileBtn.addEventListener('click', takeScreenshot(350, 580))
});



// const takeScreenshot = (width, height) => {
//     chrome.windows.create({
//         width,
//         height,
//         type: 'popup',
//         focused: false
//     }, (win) => {
//         chrome.tabs.captureVisibleTab(win.id, { format: 'png' }, (dataUrl) => {
//             chrome.windows.remove(win.id);
//             chrome.downloads.download({
//                 url: dataUrl,
//                 filename: 'screenshot.png'
//             });
//         });
//     });
// };


const takeScreenshot = (width, height) => {
    chrome.windows.getCurrent((currentWindow) => {
        chrome.windows.create({
            url: chrome.runtime.getURL('screenshot.html'),
            left: 0,
            top: 0,
            width: width,
            height: height,
            type: 'popup',
        }, (newWindow) => {
            const listener = (tabId, changeInfo, tab) => {
                if (tabId === newWindow.tabs[0].id && changeInfo.status === 'complete') {
                    chrome.tabs.captureVisibleTab(newWindow.id, { format: 'png' }, (dataUrl) => {
                        chrome.windows.remove(newWindow.id);
                        const image = new Image();
                        image.src = dataUrl;
                        image.onload = () => {
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');

                            // Set the canvas dimensions to match the desired viewport size
                            canvas.width = width;
                            canvas.height = height;

                            // Draw the screenshot on the canvas
                            context.drawImage(image, 0, 0, width, height);

                            // Convert the canvas to a data URL and download the image
                            const dataUrlScreenshot = canvas.toDataURL('image/png');
                            chrome.downloads.download({
                                url: dataUrlScreenshot,
                                filename: 'screenshot.png',
                            });
                        };
                    });
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        });
    });
};




// const takeScreenshot = (width, height) => {
//     chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
//         const image = new Image();
//         image.src = dataUrl;
//         image.onload = () => {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');

//             // Set the canvas dimensions to match the desired viewport size
//             canvas.width = width;
//             canvas.height = height;

//             // Draw the screenshot on the canvas
//             context.drawImage(image, 0, 0, width, height);

//             // Convert the canvas to a data URL and download the image
//             const dataUrlScreenshot = canvas.toDataURL('image/png');
//             chrome.downloads.download({
//                 url: dataUrlScreenshot,
//                 filename: 'screenshot.png',
//             });
//         };
//     });
// };



// const takeScreenshot = () => {
//     chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
//         const image = new Image();
//         image.src = dataUrl;
//         image.onload = () => {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');

//             // Set the canvas dimensions to match the viewport
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;

//             // Draw the screenshot on the canvas
//             context.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);

//             // Set the viewport dimensions to control the size of the screenshot
//             chrome.windows.getCurrent((currentWindow) => {
//                 chrome.windows.update(currentWindow.id, { width: 350, height: 580 }, () => {
//                     // Capture the screenshot with the updated viewport
//                     chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
//                         // Download the new screenshot as a PNG file
//                         chrome.downloads.download({
//                             url: dataUrl,
//                             filename: 'screenshot.png',
//                             saveAs: true
//                         });
//                     });
//                 });
//             });
//         };
//     });
// };



// const takeScreenshot = () => {
//     chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
//         const image = new Image();
//         image.src = dataUrl;
//         image.onload =  ()=> {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');

//             // Set the canvas dimensions to match the viewport
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;

//             // Draw the screenshot on the canvas
//             context.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);

//             // Set the viewport dimensions to control the size of the screenshot
//             chrome.windows.getCurrent((currentWindow) => {
//                 chrome.windows.update(currentWindow.id, { width: 350, height: 580 }, () => {
//                     // Capture the screenshot with the updated viewport
//                     chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
//                         // Do something with the new screenshot dataUrl
//                         console.log(`dataUrl ${dataUrl}`);
//                     });
//                 });
//             });
//         };
//     });
// }

