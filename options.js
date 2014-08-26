// Saves options to chrome.storage
function save_options() {
  var notifications = document.getElementById("notifications").checked;
  chrome.storage.local.set({
    notifications: notifications
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function() {
      status.textContent = "";
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.local.get({
    notifications: true
  }, function(items) {
    document.getElementById("notifications").checked = items.notifications;
  });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);