chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'full_screen.html' });
});
