chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

document.addEventListener("click", (e) => {
  console.log("YOU CLICKED");
})

document.addEventListener("keypress", (e) => {
  console.log("YOU PRESSED");
});

document.addEventListener("scroll", (e) => {
  console.log("YOU SCROLLED");
});
