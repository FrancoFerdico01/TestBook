const btnLogout = document.getElementById('logout')

const logout = () => {
    localStorage.removeItem('currentUser')
    setTimeout(function () {
        window.location.href = "./index.html";
      }, 1000);
}

btnLogout.addEventListener('click', logout )