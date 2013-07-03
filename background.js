var myArray = ["msg1", "msg2", "msg3", "msg4", "msg5", "msg6"];

var facebooktabs = [];

localStorage.setItem("timer", (2 * 60000));
localStorage.setItem("facebookshutdown", (1 * 60000));

var timer_flag = false;
var facebook;
var facebookshutdown;

chrome.tabs.onCreated.addListener(function(tab) {
    if (tab.url.match("https://www.facebook.com/")) {
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

    if (tab.url.match("https://www.facebook.com/")) {
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

function setTimer(){
    if (!timer_flag) {
        var facebook_timer = localStorage.getItem("timer");
        var facebook_shutdown = localStorage.getItem("facebookshutdown");
        if (facebook_timer != 0) { 
            facebook = setInterval(openPopUp, facebook_timer);
        }
        if (facebook_shutdown !=0) {
            facebookshutdown = setInterval(closeFacebooktabs, facebook_shutdown);
        }
        timer_flag = true;
    }
}

function stopInterval() {
  clearInterval(facebook);
  timer_flag = false;
}

function closeFacebooktabs() {
    chrome.tabs.remove(facebooktabs);
}

function openPopUp() {
    var notification = webkitNotifications.createNotification(
        'images/facebook-48.png',
        'Facebook Timer',
        chrome.i18n.getMessage(myArray[Math.floor(Math.random() * myArray.length)])  
    );
    notification.show();
}
