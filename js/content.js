// script.js
async function scrollAndCollectLinks() {
    let links = [];
    let prevHeight = -1;
  
    while (true) {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust delay as needed
  
      const newHeight = document.body.scrollHeight;
      if (newHeight === prevHeight) {
        break;
      }
  
      prevHeight = newHeight;
    }
  
    const response = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "getLinks" }, (result) => {
        resolve(result);
      });
    });
  
    if (response && response.links) {
      links = response.links;
    }
  
    // Do something with the collected links, e.g., console.log or send them to your server.
    console.log(links);
  }
  
  scrollAndCollectLinks();
  