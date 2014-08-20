// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

var cache = [];

var pusher = new Pusher("7c1db8905b12d9aa6a03", {
  // Disable stats purely because Chrome doesn't allow non-HTTPS scripts
  disableStats: true
});

var popupPort;
chrome.extension.onConnect.addListener(function(port) {
  popupPort = port;

  popupPort.onDisconnect.addListener(function() {
    popupPort = undefined;
  });
});

var channel = pusher.subscribe("ph-posts");

channel.bind("pusher:subscription_succeeded", function() {});

channel.bind("new-post", function(post) {
  // Trigger desktop notification
  var options = {
    type: "basic",
    title: post.name,
    message: post.tagline,
    iconUrl: "icon.png"
  }

  chrome.notifications.create("new-post-" + post.id, options, function(id) {});

  // Send post to popup if connected
  if (popupPort) {
    popupPort.postMessage(post);
  }
});