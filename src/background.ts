import Profile, { ActivityLevel } from "./Profile";
import ArrayStorage from "./Storage/ArrayStorage";
import NumberStorage from "./Storage/NumberStorage";
import ProfileStorage from "./Storage/ProfileStorage";

const HEARTBEAT = 5;
const SLEEP = 10;

const numberStorage = new NumberStorage();
const arrayStorage = new ArrayStorage();
const profileStorage = new ProfileStorage();

const report = async () => {

  console.log("reporting...")
  let clicks = await numberStorage.pop("clicks");
  let keydowns = await numberStorage.pop("keydowns");
  let scrolls = await numberStorage.pop("scrolls");
  let urls = await arrayStorage.pop("urls") as string[];

  console.log("reporting... " + clicks + " " + keydowns + " " + scrolls + " " + urls);

  let activityLevel = Profile.getActivityLevel(clicks, keydowns, scrolls);

  let profile = new Profile(new Date().toISOString(), activityLevel, urls);

  profileStorage.appendProfile(profile);
};

function reportPoll() {

  report();

  profileStorage.evaluate((profiles: Profile[]) => {

    console.log("evaluating profile logs", profiles);

    //
    // If we have less than SLEEP logs, then we need to keep polling
    //
    if (profiles.length < SLEEP) {
      setTimeout(reportPoll, HEARTBEAT * 1000);
    }

    //
    // If the last SLEEP logs are all idle, then we can stop polling  
    //
    if (!profiles.slice(-SLEEP).every((profile: Profile) => {
      return profile.activityLevel === ActivityLevel.Idle;
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