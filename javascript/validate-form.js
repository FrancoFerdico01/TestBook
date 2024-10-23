const button = document.querySelector("button");
const form = document.querySelector(".form");
const email = document.getElementById("E-mail");
const password = document.getElementById("Password");
const firstName = document.getElementById("Nome");
const lastName = document.getElementById("Cognome");
const error = document.getElementById("set-error");
const age = document.getElementById("Età");

let hasError = false;

const validate = (e) => {
  e.preventDefault();
  hasError = false;
  if (firstName.value === "") {
    hasError = true;
    error.innerHTML = "<h2>Nome non inserito!<h2>";
    firstName.style.border = " 3px solid red";
  } else {
    firstName.style.border = " 3px solid green";
  }

  if (lastName.value === "") {
    hasError = true;
    error.innerHTML = "<h2>Cognome non inserito!<h2>";
    lastName.style.border = " 3px solid red";
  } else {
    lastName.style.border = " 3px solid green";
  }

  if (!email.value.includes("@")) {
    email.style.border = "3px solid red ";
    error.innerHTML =
      "<h2>E-mail non valida!</h2> <p> L'E-mail deve contenere la `@`!</p> <button id='error-btn'>X</button>";
    ("flex");
    error.className = "active";
    hasError = true;
  } else {
    email.style.border = " 3px solid green";
  }

  if (password.value.length < 8) {
    password.style.border = "3px solid red";
    error.innerHTML =
      "<h2>Password non valida!</h2> <p> La password deve contenere almeno 8 caratteri!</p> <button id='error-btn'>X</button>";
    ("flex");
    error.className = "active";
    hasError = true;
  } else {
    password.style.border = " 3px solid green";
  }

  if (age.value < 18) {
    age.style.border = " 3px solid red";
    error.innerHTML =
      "<h2>Non hai l'età minima!</h2> <p> Non sei maggiorenne!</p> <button id='error-btn'>X</button>";
    ("flex");
    hasError = true;
  } else if (age.value < 90) {
    age.style.border = " 3px solid green";
  } else {
    age.style.border = " 3px solid red";
    hasError = true;
    error.innerHTML =
      "<h2>Inserire età corretta!</h2> <button id='error-btn'>X</button>";
    ("flex");
  }

  const data = JSON.parse(localStorage.getItem("userData")) || [];
  const findUser = data.filter((user) => email.value === user.email);

  if (findUser.length) {
    hasError = true;
    error.innerHTML =
      "<h2>E-mail non valida</h2> <p> Questa E-mail è già esistente!</p> <button id='error-btn'>X</button>";
    error.className = "active";
    age.style.border = " 3px solid red";
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

const setData = () => {
  if (!hasError) {
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      email: email.value,
      password: password.value,
    };

    let existingData = JSON.parse(localStorage.getItem("userData")) || [];
    existingData.push(userData);
    localStorage.setItem("userData", JSON.stringify(existingData));
    alert("Dati salvati con successo!");
  }
};

form.addEventListener("submit", (e) => {
  validate(e);
  if (!hasError) {
    setData();
    window.location.href = "../index.html";
  }

  firstName.value = "";
  lastName.value = "";
  age.value = "";
  email.value = "";
  password.value = "";
});
