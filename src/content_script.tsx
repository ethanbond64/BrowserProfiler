import { incrementStorageValue } from "./bufferStorage";
import NumberStorage from "./Storage/NumberStorage";

const numberStorage = new NumberStorage();

document.addEventListener("click", (e) => {
  // console.log("YOU CLICKED");
  numberStorage.increment("clicks");
})

document.addEventListener("keydown", (e) => {
  // console.log("YOU PRESSED");
  numberStorage.increment("keydowns");
});

document.addEventListener("scroll", (e) => {
  // console.log("YOU SCROLLED");
  numberStorage.increment("scrolls");
});

