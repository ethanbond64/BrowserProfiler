import NumberStorage from "./Storage/NumberStorage";
import { executeSafe } from "./Utils";

const numberStorage = new NumberStorage();
const EXPIRATION = 1000 * 5 * 5;

var localAwake = false;

const resetLocalAwake = () => {
  localAwake = true;
  setTimeout(() => {
    localAwake = false;
  }, EXPIRATION);
};

const wakeEngine = () => {
  if (!localAwake) {
    console.log("WAKING ENGINE");
    chrome.runtime.sendMessage({ awake: true });
    resetLocalAwake();
  }
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

