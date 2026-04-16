(function () {
  const current = JSON.parse(localStorage.getItem("currentUser"));
  if (!current) { window.location.href = "login.html"; return; }
  const body = document.body;
  if (body.classList.contains("doctor-dashboard") && current.role !== "doctor") {
    alert("Access denied. Doctors only."); window.location.href = "login.html";
  }
  if (body.classList.contains("patient-dashboard") && current.role !== "patient") {
    alert("Access denied. Patients only."); window.location.href = "login.html";
  }
})();
