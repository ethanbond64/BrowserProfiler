import Settings from "./models/Settings";
import NumberStorage from "./storage/NumberStorage";
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

//
// Video check listeners
//
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === "isVideoPlaying") {

      console.log("video message received");

      let videoPlaying = document.querySelector("video") && !document.querySelector("video")?.paused;

      sendResponse({
        videoPlaying: videoPlaying,
      });

      //
      // Convention to make async.
      //
      return true;
    }
  }
);