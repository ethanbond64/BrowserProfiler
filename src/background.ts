import { addProfileLog, evaluateProfileLogs } from "./loggingStorage";
import { ActivityLevel, ProfileLog } from "./profileLog";
import ArrayStorage from "./Storage/ArrayStorage";
import NumberStorage from "./Storage/NumberStorage";

const HEARTBEAT = 5;
const SLEEP = 10;

const numberStorage = new NumberStorage();
const arrayStorage = new ArrayStorage();

const report = async () => {

  console.log("reporting...")
  let clicks = await numberStorage.pop("clicks");
  let keydowns = await numberStorage.pop("keydowns");
  let scrolls = await numberStorage.pop("scrolls");
  let urls = await arrayStorage.pop("urls");

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
      arrayStorage.append("urls", tab.url);
    }
  });
});