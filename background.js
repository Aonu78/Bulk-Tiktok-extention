// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//        target: { tabId: tab.id },
//       files: ["js/script.js"],
//     });
//   });


chrome.action.onClicked.addListener((tab) => {
    window.alert("*******************");
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: loadScript
    });
  });

  function loadScript() {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("js/content.js");
    document.head.appendChild(script);
  }