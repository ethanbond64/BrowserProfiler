import Engine from "./worker/Engine";
import Reporter from "./worker/Reporter";
import Settings from "./models/Settings";
import ArrayStorage from "./storage/ArrayStorage";


//
// Engine and Engine listener
//
Settings.getSettings((settings: Settings) => {

  //
  // Construct engine and reporter from settings
  //
  const reporter = new Reporter(settings);
  const engine = new Engine(settings, reporter);

  //
  // Start engine listener
  //
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.awake) {
        console.log("wake message received");
        engine.start();
      }
    }
  );
});


//
// Tab change listener
//
const arrayStorage = new ArrayStorage();

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab.url);
    if (tab.url) {
      arrayStorage.append("urls", tab.url);
    }
  });
});


//
// Reinject script on extension update listener
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