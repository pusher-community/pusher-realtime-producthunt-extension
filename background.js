// Enable Pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

var notificationCache = {};
var badgeCount = 0;

chrome.browserAction.setBadgeBackgroundColor({color: [100,100,100,255]});

var pusher = new Pusher("7c1db8905b12d9aa6a03", {
  // Disable stats purely because Chrome doesn't allow non-HTTPS scripts
  disableStats: true
});

var popupPort;
chrome.extension.onConnect.addListener(function(port) {
  popupPort = port;

  // Reset badge count when popup is open
  badgeCount = 0;
  chrome.browserAction.setBadgeText({text: ""});

  popupPort.onDisconnect.addListener(function() {
    popupPort = undefined;
  });
});

var channel = pusher.subscribe("ph-posts");

channel.bind("pusher:subscription_succeeded", function() {});

chrome.notifications.onClicked.addListener(function(id) {
  var post = notificationCache[id];

  if (!post || !post.discussion_url) {
    return;
  }

  window.open(post.discussion_url);

  // Remove post from notification cache
  delete notificationCache[post.id];
});

channel.bind("new-post-test", function(post) {
  chrome.storage.local.get({
    notifications: true
  }, function(items) {
    if (items.notifications) {
      // Trigger desktop notification
      var options = {
        type: "basic",
        title: post.name,
        message: post.tagline,
        iconUrl: "ph-notification-icon.png",
        isClickable: true
      }

      chrome.notifications.create("new-post-" + post.id, options, function(id) {});
    }
  });

  badgeCount++;

  chrome.browserAction.setBadgeText({text: badgeCount.toString()});

  notificationCache["new-post-" + post.id] = post;

  // Send post to popup if connected
  if (popupPort) {
    popupPort.postMessage(post);
  }
});