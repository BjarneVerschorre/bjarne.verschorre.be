function searchPosts() {

  var input = document.getElementById("searchInput").value.toLowerCase();
  var posts = document.getElementsByTagName("article");

  for (var i = 0; i < posts.length; i += 1) {
    var postTitle = posts[i].getElementsByTagName("h2")[0].innerText.toLowerCase();
    var postDescription = posts[i].getElementsByTagName("p")[0].innerText.toLowerCase();

    if (!postTitle.includes(input) && !postDescription.includes(input)) {
      posts[i].style.display = "none";
    } else {
      posts[i].style.display = "block";
    }
  }
}

window.onload = function () {
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'searchInput');
  input.setAttribute('placeholder', '🔎  Search Posts...');
  input.addEventListener('input', searchPosts);

  var main = document.getElementsByTagName('main')[0];
  main.insertBefore(input, main.childNodes[0]);
}

