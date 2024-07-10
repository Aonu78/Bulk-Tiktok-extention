// https://www.tikwm.com/video/media/hdplay/
document.addEventListener('DOMContentLoaded', function () {
  
  document.getElementById('extractLinks').addEventListener('click', extractLinks);
});

function extractLinks() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];

    if (!activeTab) {
      
      console.error('No active tab found.');
      return;
    }


    chrome.scripting.executeScript(
      {
        target: { tabId: activeTab.id },
        function: getLinks,
      },
      (result) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        const links = result[0].result;
        const linksList = document.getElementById('linksList');
        linksList.innerHTML = '';
        for (const link of links) {
          window.open('https://www.tikwm.com/video/media/hdplay/'+link+".mp4");
        }
        for (const link of links) {
          const listItem = document.createElement('li');
          var a = document.createElement('a');
          a.target = '_blank';
          a.href = 'https://www.tikwm.com/video/media/hdplay/'+link+".mp4";
          a.innerText = 'Download';
          listItem.innerHTML = '<a href='+a.href+'>'+a.innerText+'</a>';
          linksList.appendChild(listItem);
        }
        // for (const link of links) {
        //   var a = document.createElement('a');
        //   a.target = '_blank';
        //   a.href = 'https://www.tikwm.com/video/media/hdplay/'+link+".mp4";
        //   a.innerText = 'Download';
       
        //   // var container = document.getElementById('linksList');
        //   linksList.appendChild(a);
        //   // container.appendChild(document.createElement('br'));
        // }
        // function makelink() {
        //   var li = document.getElementsByClassName('navi')[0];
        //   li.innerHTML = '<a href="#hOME">HTML</a>';
        // }
      }
    );
  });
}
function hasAtSymbol(link) {
  return link.includes('@');
}
// export const getIdVideo = (link: string): string => {
//   const strSplit = link.split('/video/');
//   return strSplit[1];
// };
// if (!videoId) {
//   videoId = getIdVideo(link);
// }

// function scrolling(){
//   let prevHeight = -1;

//   while (true) {
//     // window.alert(document.body.scrollHeight);
//     window.scrollTo(0, document.body.scrollHeight);
//     setTimeout(resolve, 1000); // Adjust delay as needed
//     const newHeight = document.body.scrollHeight;
 
//     if (newHeight === prevHeight) {
//       window.alert("scrol stop");
//       break;
//     }

//     prevHeight = newHeight;
//   }
// }

function getLinks() {

  // scrolling();
  const links = Array.from(document.querySelectorAll('a')).map((a) => a.href);
  const mainlinks = [];
  j=0;
  for (let i = 0; i < links.length; i++) {
    
    if(links[i].includes("@") && links[i].includes("/video")){
      // window.alert(links[i]);
      const strSplit = links[i].split('/video/');
      mainlinks[j] = strSplit[1];
      j= j +1;
    }
  }
  // let chars = ['A', 'B', 'A', 'C', 'B'];
  let uniqueChars = [...new Set(mainlinks)];
  // window.alert(mainlinks);

  return uniqueChars;
}



