var facebooktabs = [];
var url = "https://www.facebook.com/";
var timer_flag = false;
var facebookshutdown = 0;
var facebookShutdownValue = 0;
var countdown = 0;

chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
chrome.browserAction.setBadgeText({text: ''});

chrome.tabs.onCreated.addListener(function(tab) {
        console.log("New tab");
    if (tab.url.match(url)) {
        var tabIdentification = tab.id;
        console.log("New facebook " + tabIdentification);
        facebooktabs.push(tabIdentification);
        if (facebooktabs.length == 1) {
            setTimer();
        }
    }  
});

chrome.tabs.onRemoved.addListener(function(tabId) { 
    var tabInde = facebooktabs.indexOf(tabId);
    console.log("Remove " + tabInde);

    if (tabInde > -1) {
        facebooktabs.splice(tabInde,tabInde+1);
    }
    if(facebooktabs.length == 0) {
        stopInterval(); 
    }
});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
    if (changeInfo.status != "complete") {
        return;
    }

    var tabIdentification = tab.id;

    var tabInde = facebooktabs.indexOf(tabIdentification);
    
    console.log("Update " + tabInde);

    if (tabInde > -1) {
        facebooktabs.splice(tabInde,tabInde+1);
    }  

    if (tab.url.match(url)) {
        console.log("Facebook tab " + tabInde);
        var tabIdentification = tab.id;
        facebooktabs.push(tabIdentification);
        if (facebooktabs.length == 1){
            setTimer();
        }
    }

    if (facebooktabs.length == 0) {
        stopInterval();
    }   

});

function countdownT(){
    console.log("countdownT");
    if(timer_flag) {
        facebookShutdownValue = facebookShutdownValue - 1000;
        chrome.browserAction.setBadgeText({text: ""+ Math.floor((facebookShutdownValue - 1000) / 60000)});
    }
}

function setTimer(){
    console.log("timer start");
    if (!timer_flag) {
        timer_flag = true;
        facebookShutdownValue = localStorage.getItem("facebookshutdown");
        facebookshutdown = setInterval(closeFacebooktabs, facebookShutdownValue);
        countdown = setInterval(countdownT, 1000)
    }
}

function stopInterval() {
  clearInterval(facebookshutdown);
  clearInterval(countdown);
  chrome.browserAction.setBadgeText({text: ''});
  timer_flag = false;
}

function closeFacebooktabs() {
    chrome.tabs.remove(facebooktabs);
    timer_flag = false;
}

function openPopUp() {
    var notification = webkitNotifications.createNotification(
        'images/facebook-48.png',
        'Facebook Timer',
        chrome.i18n.getMessage(myArray[Math.floor(Math.random() * myArray.length)])  
    );
    notification.show();
}

function setFacebookTimerShutdown(value) {
    localStorage.setItem("facebookshutdown", (value * 60000));
}

function getFacebookTimerShutDown() {
    var facebook_shutdown = localStorage.getItem("facebookshutdown");
    return facebook_shutdown / 60000;
}
