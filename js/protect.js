(function () {

  const current = JSON.parse(localStorage.getItem("currentUser"));

  if (!current) {
    window.location.href = "signup.html";
    return;
  }

})();
document.addEventListener("DOMContentLoaded", function () {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const bodyClass = document.body.classList;

  if (bodyClass.contains("doctor-dashboard") && currentUser.role !== "doctor") {
    alert("Access denied. Doctors only.");
    window.location.href = "login.html";
    return;
  }


  if (bodyClass.contains("patient-dashboard") && currentUser.role !== "patient") {
    alert("Access denied. Patients only.");
    window.location.href = "login.html";
    return;
  }

});

