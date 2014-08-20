var posts;
var port = chrome.extension.connect({name: "Product Hunt Connector"});

// Run as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  init();
});

var init = function() {
  posts = document.querySelector(".posts");

  // Request most recent Product Hunt posts
  $.getJSON("http://localhost:5001/posts", function(posts) {
    // Reverse posts
    posts.reverse();

    for (var i = 0; i < posts.length; i++) {
      addPost(posts[i]);
    };
  });

  // Listen for realtime updates from background process
  port.onMessage.addListener(function(post) {
    addPost(post);
  });
};

var addPost = function(post) {
  var postDOM = document.createElement("li"); 
  postDOM.innerHTML = "<a href='' target='_blank'>" + post.name + "</a>";

  posts.insertBefore(postDOM, posts.firstChild);
}