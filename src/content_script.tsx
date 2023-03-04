import NumberStorage from "./Storage/NumberStorage";
import { executeSafe } from "./Utils";

const numberStorage = new NumberStorage();

const wakeEngine = () => {
  console.log("WAKING ENGINE");
  chrome.runtime.sendMessage({ awake: true });
};

document.addEventListener("click", (e) => {
  console.log("YOU CLICKED");
  executeSafe(() => {
    numberStorage.increment("clicks");
    wakeEngine();
  });
})

document.addEventListener("keydown", (e) => {
  // console.log("YOU PRESSED");
  executeSafe(() => {
    numberStorage.increment("keydowns");
    wakeEngine();
  });
});

document.addEventListener("scroll", (e) => {
  // console.log("YOU SCROLLED");
  executeSafe(() => {
    numberStorage.increment("scrolls");
    wakeEngine();
  });
});

