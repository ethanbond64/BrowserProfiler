function polling() {
  console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();


chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab.url);
  });
});