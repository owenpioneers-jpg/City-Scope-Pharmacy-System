document.addEventListener("DOMContentLoaded", function () {
  const forgotForm = document.getElementById("forgotForm");

  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      let users = JSON.parse(localStorage.getItem("users")) || [];

     
      const user = users.find(u => u.email === email);

      if (!user) {
        alert("No account found with that email!");
        return;
      }

      const newPassword = prompt("Enter your new password:");

      if (!newPassword || newPassword.length < 4) {
        alert("Password must be at least 4 characters!");
        return;
      }

      user.password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      alert("Password successfully reset! You can now log in.");
      window.location.href = "login.html";
    });
  }
});
