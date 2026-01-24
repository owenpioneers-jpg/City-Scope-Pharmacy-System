const approvedDoctors = [
  "owenicardi254@gmail.com",
  "drremmiemwatee@gmail.com",
  "drkabibimwendah@gmail.com"
];

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let role = document.getElementById("role").value;

    const users = getUsers();

    if (users.some(u => u.email === email)) {
      alert("Email already registered!");
      return;
    }

    if (role === "doctor" && !approvedDoctors.includes(email)) {
      alert("You are not authorized as doctor.");
      role = "patient";
    }

    const newUser = { name, email, password, role };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = role === "doctor" ? "doctor-dashboard.html" : "patient-dashboard.html";
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = user.role === "doctor" ? "doctor-dashboard.html" : "patient-dashboard.html";
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

const showPass = document.getElementById("showPass");
const passwordInput = document.getElementById("password");
if (showPass && passwordInput) {
  showPass.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password";
  });
}
