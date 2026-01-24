document.addEventListener("DOMContentLoaded", function() {

  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.getElementById("mobile-menu");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (navLinks) {
    if (user) {
      if (user.role === "doctor") {
        navLinks.innerHTML = `
          <li><a href="doctor-dashboard.html">Dashboard</a></li>
          <li><a href="patient-dashboard.html">Patients</a></li>
          <li><a href="add-patient.html">Add Patient</a></li>
          <li><a href="prescription.html">Prescriptions</a></li>
          <li><a href="#" onclick="logout()">Logout</a></li>
        `;
      } else if (user.role === "patient") {
        navLinks.innerHTML = `
          <li><a href="patient-dashboard.html">My Dashboard</a></li>
          <li><a href="prescription.html">My Prescriptions</a></li>
          <li><a href="evidence.html">Upload Evidence</a></li>
          <li><a href="#" onclick="logout()">Logout</a></li>
          <li><a href="contact.html">Contact</a></li>
        `;
      }
    } else {
      navLinks.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="signup.html">Sign Up</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="contact.html">Contact</a></li>
      `;
    }
  }


  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

});


function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
const profileBox = document.getElementById("doctorProfile");
const user = JSON.parse(localStorage.getItem("currentUser"));

if (profileBox && user && user.role === "doctor") {
  profileBox.innerHTML = `
    <div class="profile-wrapper">
      <img src="${user.profileImage}" alt="Doctor">
      <span>${user.displayName}</span>
    </div>
  `;
}
