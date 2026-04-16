const approvedDoctors = [
  "owenicardi254@gmail.com",
  "drremmiemwatee@gmail.com",
  "drkabibimwendah@gmail.com"
];

function getUsers() { return JSON.parse(localStorage.getItem("users")) || []; }
function saveUsers(u) { localStorage.setItem("users", JSON.stringify(u)); }

// ── Signup ──────────────────────────────────────────────────────
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name     = document.getElementById("name").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let   role     = document.getElementById("role").value;
    const users    = getUsers();

    if (users.some(u => u.email === email)) {
      showToast("Email already registered!", "error"); return;
    }
    if (role === "doctor" && !approvedDoctors.includes(email)) {
      showToast("Not an approved doctor email. Registered as patient.", "error");
      role = "patient";
    }
    const newUser = { name, email, password, role };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = role === "doctor" ? "doctor-dashboard.html" : "patient-dashboard.html";
  });
}

// ── Login ───────────────────────────────────────────────────────
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const user     = getUsers().find(u => u.email === email && u.password === password);
    if (!user) { showToast("Invalid email or password!", "error"); return; }
    localStorage.setItem("currentUser", JSON.stringify(user));
    showToast("Welcome back, " + user.name + "!");
    setTimeout(() => {
      window.location.href = user.role === "doctor" ? "doctor-dashboard.html" : "patient-dashboard.html";
    }, 900);
  });
}

// ── Show/Hide password ──────────────────────────────────────────
const showPass = document.getElementById("showPass");
const passInput = document.getElementById("password");
if (showPass && passInput) {
  showPass.addEventListener("change", function () {
    passInput.type = this.checked ? "text" : "password";
  });
}
