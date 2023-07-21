function extractText() {
  return { 
    text: window.getSelection().toString().trim()
  }
};

chrome.action.onClicked.addListener( (tab) => {
  if(tab.url.indexOf("chrome://") === -1){
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractText,
    }).then(async (r) => {
      const res = r[0].result
      let resTab = await chrome.tabs.create({url: chrome.runtime.getURL("plain-text-transformer.html?text=" + encodeURIComponent(res.text))});
      //console.log("resTab", resTab);
    });
  } else {
    chrome.tabs.create({url: chrome.runtime.getURL("plain-text-transformer.html")});
  }
});