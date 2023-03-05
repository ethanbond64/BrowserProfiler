import Settings from "./Settings";
import NumberStorage from "./Storage/NumberStorage";
import { executeSafe } from "./Utils";

const settings = Settings.getSettings();
const numberStorage = new NumberStorage();
const EXPIRATION = (settings.getHeartbeat() * settings.getSleep()) / 2;

//
// Wake engine message logic
//
var localAwake = false;

const resetLocalAwake = () => {
  localAwake = true;
  setTimeout(() => {
    localAwake = false;
  }, 1000 * EXPIRATION);
};

const wakeEngine = () => {
  if (!localAwake) {
    console.log("WAKING ENGINE");
    chrome.runtime.sendMessage({ awake: true });
    resetLocalAwake();
  }
};

//
// Event listeners
//
settings.getTrackedEvents().forEach((eventName) => {
  document.addEventListener(eventName, (e) => {
    // console.log("YOU " + eventName.toUpperCase());
    executeSafe(() => {
      numberStorage.increment(eventName);
      wakeEngine();
    });
  });
});
