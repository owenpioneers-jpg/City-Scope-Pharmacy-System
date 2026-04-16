// ── Toast Notifications ─────────────────────────────────────────
function showToast(message, type = 'success') {
  let toast = document.getElementById('csToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'csToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = 'toast' + (type === 'error' ? ' error' : '');
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ── Navbar Builder ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.getElementById("mobile-menu");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (navLinks) {
    let links = '';
    if (user && user.role === "doctor") {
      links = `
        <li><a href="doctor-dashboard.html">Dashboard</a></li>
        <li><a href="patient-dashboard.html">Patients</a></li>
        <li><a href="add-patient.html">Add Patient</a></li>
        <li><a href="prescription.html">Prescriptions</a></li>
        <li><a href="contact.html">Doctors</a></li>
        <li><a href="#" onclick="csLogout()">Logout</a></li>
      `;
    } else if (user && user.role === "patient") {
      links = `
        <li><a href="patient-dashboard.html">My Dashboard</a></li>
        <li><a href="prescription.html">Prescriptions</a></li>
        <li><a href="evidence.html">Evidence</a></li>
        <li><a href="contact.html">Doctors</a></li>
        <li><a href="#" onclick="csLogout()">Logout</a></li>
      `;
    } else {
      links = `
        <li><a href="index.html">Home</a></li>
        <li><a href="signup.html">Sign Up</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="contact.html">Doctors</a></li>
      `;
    }
    navLinks.innerHTML = links;

    // Mark active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('a[href]').forEach(a => {
      if (a.getAttribute('href') === currentPage) a.classList.add('active');
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Quick links toggle in footer
  const toggle = document.getElementById("quickLinksToggle");
  const menu = document.getElementById("quickLinksMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      toggle.textContent = menu.classList.contains("show") ? "Quick Links ▴" : "Quick Links ▾";
    });
  }
});

function csLogout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
// Keep old logout name too
function logout() { csLogout(); }
