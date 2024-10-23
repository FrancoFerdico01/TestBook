const imgBtn = document.getElementById("profile-image");
const modalImg = document.getElementById("modalImg");
const btnExit = document.getElementById("btnExit");
const imgContainer = document.getElementById("img-content");
const userData = JSON.parse(localStorage.getItem("userData"));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
imgBtn.src = currentUser[0].image || "../assets/icon.jpg";
const choiceImgProfile = () => {
  modalImg.style.display = "flex";
};

btnExit.addEventListener("click", function () {
  modalImg.style.display = "none";
});

imgBtn.addEventListener("click", choiceImgProfile);

imgContainer.addEventListener("click", (e) => {
  const findUser = userData.findIndex(
    (user) => user.email === currentUser[0].email
  );

  if (findUser !== -1 && e.target.nodeName === "IMG") {
    userData[findUser].image = e.target.src;

    const updatedData = userData[findUser];

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("currentUser", JSON.stringify([updatedData]));
    const newCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

    imgBtn.src = newCurrentUser[0].image;
  }
});
