import { appendStorageArray, getAndClear, getAndClearArray, getLogAndClear } from "./bufferStorage";
import { addProfileLog, evaluateProfileLogs } from "./loggingStorage";
import { ActivityLevel, ProfileLog } from "./profileLog";

const HEARTBEAT = 5;
const SLEEP = 10;

const report = async () => {
  console.log("reporting...")
  let clicks = await getAndClear("clicks");
  let keydowns = await getAndClear("keydowns");
  let scrolls = await getAndClear("scrolls");
  let urls = await getAndClearArray("urls");

  console.log("reporting... " + clicks + " " + keydowns + " " + scrolls + " " + urls);

  let activityLevel = getActivityLevel(clicks, keydowns, scrolls);

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

  return ActivityLevel.Idle;
};

function reportPoll() {
  report();
  evaluateProfileLogs((profileLogs: ProfileLog[]) => {
    console.log("evaluating profile logs", profileLogs);
    if (profileLogs.length < SLEEP) {
      setTimeout(reportPoll, HEARTBEAT * 1000);
    }

    if (!profileLogs.slice(-SLEEP).every((profileLog: ProfileLog) => {
      return profileLog.activityLevel === ActivityLevel.Idle;
    })) {
      setTimeout(reportPoll, HEARTBEAT * 1000);
    }

  });

}

reportPoll();




chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab.url);
    if (tab.url) {
      appendStorageArray("urls", tab.url);
    }
  });
});