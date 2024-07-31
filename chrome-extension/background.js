chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && (tab.url.includes('teamblind.com/kr/post/'))) {
      console.log(tab.url);
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['axios.min.js', 'content.js']
      });
    }
  });

  // background.js

// 탭이 활성화될 때 메시지를 보내기
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.sendMessage(activeInfo.tabId, { action: 'tabActivated', tabId: activeInfo.tabId, activeAt: new Date() });
});