
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Received message");
//     if (message.action === 'tabActivated') {
//         console.log('Tab activated: ', message.tabId);
//         console.log('At: ', message.activeAt);
//     }
// });
// content.js

// let head = document.querySelector('.article-view-head');
// let title = head.querySelector('h2');
// let company = head.querySelector('a.point') ?? head.querySelector('.name > span');
// let content = document.querySelector('p#contentArea');
// let watchedAt = new Date();
// console.log(title.innerText);
// console.log(company?.innerText);
// console.log(content.innerText);
// console.log(window.location.href);

/*
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
*/
//setTimeout(() => {

axios.post('http://localhost:3000/blind', {
    url: window.location.href,
    title: document.querySelector('.article-view-head').querySelector('h2').innerText,
    company: document.querySelector('a.point') ?? document.querySelector('.name > span').innerText,
    content: document.querySelector('p#contentArea'),
    watchedAt: new Date()
})
.then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
//}, 5000);