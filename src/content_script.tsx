import NumberStorage from "./Storage/NumberStorage";
import { executeSafe } from "./Utils";

const numberStorage = new NumberStorage();

document.addEventListener("click", (e) => {
  console.log("YOU CLICKED");
  executeSafe(() => numberStorage.increment("clicks"));
})

document.addEventListener("keydown", (e) => {
  // console.log("YOU PRESSED");
  executeSafe(() => numberStorage.increment("keydowns"));
});

document.addEventListener("scroll", (e) => {
  // console.log("YOU SCROLLED");
  executeSafe(() => numberStorage.increment("scrolls"));
});

