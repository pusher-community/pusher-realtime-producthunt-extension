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
  var postDOM = document.createElement("div"); 
  postDOM.classList.add("post");

  postDOM.innerHTML += "<h2><a href='" + post.discussion_url + "' target='_blank'>" + post.name + "</a></h2>";
  postDOM.innerHTML += "<p>" + post.tagline + "</p>";
  postDOM.innerHTML += "<span class='avatar'><img src='" + post.user.image_url["73px"] + "'></span>";

  posts.insertBefore(postDOM, posts.firstChild);
}