const logEmail = document.getElementById("logEmail");
const logPass = document.getElementById("logPassword");
const logForm = document.getElementById("form");
const result = document.getElementById("result");
let hasError = false;

const logValidate = (e) => {
  e.preventDefault();

  const formData = new FormData(logForm);
  const getFormData = Object.fromEntries(formData);

  const getData = JSON.parse(localStorage.getItem("userData")) || [];
  const login = getData.filter((user) => getFormData.email === user.email);

  if (getFormData.email === "") {
    hasError = false;
    result.className = "not-log";
    result.innerHTML =
      "<h2>Accesso non riuscito!<h2> <p>Devi compilare tutti i campi!<p>";
  } else if (getFormData.password === "") {
    hasError = false;
    result.className = "not-log";
    result.innerHTML =
      "<h2>Accesso non riuscito!<h2> <p>Devi compilare tutti i campi!<p>";
  } else if (getFormData.email !== login[0]?.email) {
    hasError = false;
    result.className = "not-log";
    result.innerHTML = "<h2>Accesso non riuscito!<h2> <p>E-mail errata!<p>";
  } else if (login[0].password === getFormData.password) {
    hasError = true;
    result.innerHTML =
      "<h2> Accesso riuscito <h2> <p>Tra pochi secondi verrai indirizzato al tuo profilo personale!<p>";
    result.className = "log";

    localStorage.setItem("currentUser", JSON.stringify(login));

    setTimeout(function () {
      window.location.href = "./app.html";
    }, 1000);
  } else {
    hasError = false;
    result.innerHTML = "<h2>Accesso non riuscito!<h2> <p>Password errata!<p>";
    result.className = "not-log";
  }
};

logForm.addEventListener("submit", (e) => {
  logValidate(e);
  hasError = true;
  logEmail.value = "";
  logPass.value = "";
});
