


const getAndLog = async (key: string) => {
  chrome.storage.local.get([key]).then((result) => console.log(result));
};


const getLogAndClear = async (key: string) => {
  chrome.storage.local.get([key]).then((result) => {
    console.log(result);
  });
  chrome.storage.local.set({ [key]: 0 });
};

const report = () => {
  console.log("reporting...")
  getLogAndClear("clicks");
  getLogAndClear("keypresses");
  getLogAndClear("scrolls");
};

function polling() {
  console.log("polling");
  report();
  setTimeout(polling, 1000 * 5);
}

polling();


chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab.url);
  });
});