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
  incrementStorageValue("clicks");
})

document.addEventListener("keypress", (e) => {
  console.log("YOU PRESSED");
  incrementStorageValue("keypresses");
});

document.addEventListener("scroll", (e) => {
  console.log("YOU SCROLLED");
  incrementStorageValue("scrolls");
});

const incrementStorageValue = async (key: string) => {
  console.log("incrementing storage value");
  chrome.storage.local.get(key, function (result) {
    var value = result[key] || 0;
    chrome.storage.local.set({ [key]: value + 1 });
  });
}