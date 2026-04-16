document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forgotForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);
    if (!user) { showToast("No account found with that email.", "error"); return; }
    const newPassword = prompt("Enter your new password (min 4 chars):");
    if (!newPassword || newPassword.length < 4) { showToast("Password too short.", "error"); return; }
    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Password reset! You can now log in.");
    setTimeout(() => window.location.href = "login.html", 1500);
  });
});
