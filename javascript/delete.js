const deleteUser = document.getElementById("delete");

const deleteAccount = () => {
  const getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const getUserData = JSON.parse(localStorage.getItem("userData"));

  const findUser = getUserData.find(
    (user) => user.email === getCurrentUser[0].email
  );

  if (findUser) {
    const removeAccount = JSON.stringify(
      getUserData.filter((user) => user.email !== findUser.email)
    );

    localStorage.setItem("userData", removeAccount);
    localStorage.removeItem("currentUser");
    setTimeout(function () {
      window.location.href = "./index.html";
    }, 1000);
  }
};

deleteUser.addEventListener("click", deleteAccount);
