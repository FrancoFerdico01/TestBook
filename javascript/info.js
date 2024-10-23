const userInfo = localStorage.getItem("currentUser");
const dataUser = localStorage.getItem("userData");
const userParse = JSON.parse(dataUser);
const error = document.getElementById("set-error");

const ul = document.getElementById("infoUl");
ul.className = "infoList";
const profileNAme = document.getElementById("name");
const form = document.getElementById("form");

const info = () => {
  if (userInfo) {
    const users = JSON.parse(userInfo);
    profileNAme.innerHTML = `${users[0].firstName} ${users[0].lastName}`;
    users.forEach((user) => {
      ul.innerHTML = `<li> Età: ${user.age} anni </Li>  <li>Email: ${user.email}</li>`;
    });
  }
};

const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "flex";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let hasError = false;

const changeData = (e) => {
  e.preventDefault();
  const data = JSON.parse(userInfo) || [];
  const formChangeData = new FormData(form);
  const getFormChangeData = Object.fromEntries(formChangeData);

  const updatedData = {
    firstName: getFormChangeData.Nome,
    lastName: getFormChangeData.Cognome,
    age: getFormChangeData.Età,
    email: getFormChangeData.Email,
    password: getFormChangeData.Password,
  };

  const index = data.findIndex((obj) => obj[0]?.email === updatedData.Email);
  const findRegisteredUser = userParse.findIndex(
    (obj) => obj?.email === data[0].email
  );

  if (index !== -1) {
    data[index] = updatedData;
    userParse[findRegisteredUser] = updatedData;
    localStorage.setItem("currentUser", JSON.stringify(data));
    localStorage.setItem("userData", JSON.stringify(userParse));
  }

  hasError = false;

  if (getFormChangeData.Età < 18) {
    hasError = true;
    error.innerHTML =
      "<h2>Non hai l'età minima</h2> <p> Non sei maggiorenne!</p> <button id='error-btn'>X</button>";
    ("flex");
    error.className = "active";
  } else if (getFormChangeData.Password.length < 8) {
    hasError = true;
    error.innerHTML =
      "<h2>Password troppo corta!</h2> <p>La password non deve contenere meno di 8 caratteri!</p> <button id='error-btn'>X</button>";
    ("flex");
    error.className = "active";
  } else if (!getFormChangeData.Email.includes("@")) {
    hasError = true;
    error.innerHTML =
      "<h2>Email errata!</h2> <p>L'email deve contenere la '@'!</p> <button id='error-btn'>X</button>";
    ("flex");
    error.className = "active";
  } else if (getFormChangeData.Nome === "") {
    hasError = true;
    error.innerHTML =
      "<h2>Nome non inserito!</h2> <button id='error-btn'>X</button>";
    ("flex");
    error.className = "active";
  } else if (getFormChangeData.Cognome === "") {
    hasError = true;
    error.innerHTML =
      "<h2>Cognome non inserito!</h2> <button id='error-btn'>X</button>";
    ("flex");
    error.className = "active";
  }

  const findUser = userParse.filter(
    (user) => getFormChangeData.Email === user.email
  );

  if (findUser.length) {
    hasError = true;
    error.innerHTML =
      "<h2>E-mail non valida</h2> <p> Questa E-mail è già esistente!</p> <button id='error-btn'>X</button>";
    error.className = "active";
  }

  if (hasError) {
    const btnError = document.getElementById("error-btn");
    btnError.addEventListener("click", removeError);
  }
};

const removeError = () => {
  const error = document.getElementById("set-error");
  error.className = "";
  error.innerHTML = "";
};

form.addEventListener("submit", (e) => {
  changeData(e);
  if (!hasError) {
    location.reload();
  }
});

info();
