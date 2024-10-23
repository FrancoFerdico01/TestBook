const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");

postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const postContent = document.getElementById("postContent").value;
  if (postContent) {
    const postElement = document.createElement("div");
    const postTitle = document.createElement("h2");
    const post = document.createElement("p");
    const myData = localStorage.getItem("currentUser");
    const myPost = JSON.parse(myData);
    postTitle.textContent = `${myPost[0].firstName} ${myPost[0].lastName}`;
    postElement.classList.add("post");
    post.textContent = postContent;
    post.classList.add("text");
    postList.classList.add("container");

    postList.appendChild(postElement);
    postElement.appendChild(postTitle);
    postTitle.appendChild(post);

    document.getElementById("postContent").value = "";
  }
});
