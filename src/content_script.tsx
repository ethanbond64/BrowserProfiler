import { incrementStorageValue } from "./bufferStorage";

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

