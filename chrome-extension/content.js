
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Received message");
//     if (message.action === 'tabActivated') {
//         console.log('Tab activated: ', message.tabId);
//         console.log('At: ', message.activeAt);
//     }
// });
// content.js

function initialize() {

    let head = document.querySelector('.article-view-head');
    let title = head.querySelector('h2');
    let company = head.querySelector('a.point');
    let content = document.querySelector('p#contentArea');
    let watchedAt = new Date();
    console.log(title.innerText);
    console.log(company?.innerText);
    console.log(content.innerText);
    console.log(window.location.href);

    axios.post('http://localhost:3000/blind', {
        url: window.location.href,
        title: title.innerText,
        company: company.innerText,
        content: content.innerText,
        watchedAt
    })
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
}


// 페이지 로드 시 초기화 함수 호출
document.addEventListener('DOMContentLoaded', initialize);

// MutationObserver를 사용하여 DOM 변화 감지 및 초기화 함수 호출
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      initialize();
    }
  });
});

// 옵저버 설정
observer.observe(document.body, { childList: true, subtree: true });