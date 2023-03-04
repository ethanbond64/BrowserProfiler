import { incrementStorageValue } from "./bufferStorage";

document.addEventListener("click", (e) => {
  console.log("YOU CLICKED");
  incrementStorageValue("clicks");
})

document.addEventListener("keydown", (e) => {
  console.log("YOU PRESSED");
  incrementStorageValue("keydowns");
});

document.addEventListener("scroll", (e) => {
  console.log("YOU SCROLLED");
  incrementStorageValue("scrolls");
});

