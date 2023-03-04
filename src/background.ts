import { appendStorageArray, getAndClear, getAndClearArray, getLogAndClear } from "./bufferStorage";
import { addProfileLog } from "./loggingStorage";
import { ActivityLevel, ProfileLog } from "./profileLog";


const report = async () => {
  console.log("reporting...")
  let clicks = await getAndClear("clicks");
  let keypresses = await getAndClear("keypresses");
  let scrolls = await getAndClear("scrolls");
  let urls = await getAndClearArray("urls");

  console.log("reporting... " + clicks + " " + keypresses + " " + scrolls + " " + urls);

  let activityLevel = getActivityLevel(clicks, keypresses, scrolls);

  let profileLog = new ProfileLog(new Date().toISOString(), activityLevel, urls);

  addProfileLog(profileLog);
};


const getActivityLevel = (clicks: number, keys: number, scrolls: number): ActivityLevel => {

  if (clicks > 0 || keys > 0) {
    return ActivityLevel.Active;
  }

  if (scrolls > 0) {
    return ActivityLevel.Passive;
  }

  return ActivityLevel.Paused;
};

function reportPoll() {
  report();
  setTimeout(reportPoll, 1000 * 5);
}

reportPoll();

function logPoll() {
  // logProfileLogs();
  setTimeout(logPoll, 1000 * 30);
}

logPoll();




chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab.url);
    if (tab.url) {
      appendStorageArray("urls", tab.url);
    }
  });
});