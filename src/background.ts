import Engine from "./Engine";
import Profile, { ActivityLevel } from "./Profile";
import ArrayStorage from "./Storage/ArrayStorage";
import NumberStorage from "./Storage/NumberStorage";
import ProfileStorage from "./Storage/ProfileStorage";

const HEARTBEAT = 5;
const SLEEP = 6;

const numberStorage = new NumberStorage();
const arrayStorage = new ArrayStorage();
const profileStorage = new ProfileStorage();

const report = async () => {

  console.log("reporting...")
  let clicks = await numberStorage.pop("clicks");
  let keydowns = await numberStorage.pop("keydowns");
  let scrolls = await numberStorage.pop("scrolls");
  let urls = new Set(await arrayStorage.pop("urls") as string[]);

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    if (url) {
      urls.add(url);
    }
  });

  console.log("reporting... " + clicks + " " + keydowns + " " + scrolls + " " + urls);

  let activityLevel = Profile.getActivityLevel(clicks, keydowns, scrolls);

  let profile = new Profile(new Date().toISOString(), activityLevel, Array.from(urls));

  profileStorage.appendProfile(profile);
};

const engine = new Engine(HEARTBEAT, SLEEP, report);

// engine.start();

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("wake message received");
    if (request.awake) {
      engine.start();
    }
  }
);

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab.url);
    if (tab.url) {
      arrayStorage.append("urls", tab.url);
    }
  });
});

//
// Reinject script on extension update
//
chrome.runtime.onInstalled.addListener(async () => {
  for (const cs of chrome.runtime.getManifest().content_scripts || []) {
    for (const tab of await chrome.tabs.query({ url: cs.matches })) {
      if (tab.id !== undefined && cs.js !== undefined && !tab.url?.startsWith("chrome://")) {
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id },
            files: cs.js,
          });
      }
    }
  }
});