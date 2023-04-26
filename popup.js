// Add an event listener to the button
document.querySelector("#download").addEventListener("click", function () {
  // Call the Node.js function using AJAX
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/my-function");
  xhr.send();
});
