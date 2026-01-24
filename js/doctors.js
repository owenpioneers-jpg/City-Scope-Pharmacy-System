document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("doctorPatientTable");
  if (!table) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "doctor") {
    alert("Access denied: Doctors only");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("doctorName").textContent = currentUser.name;

  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  patients.forEach((p, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.name}</td>
      <td>${p.email || "-"}</td>
      <td>${p.age || "-"}</td>
      <td>${p.phone || "-"}</td>
      <td>
        <button onclick="openPrescriptions(${index})">Prescriptions</button>
        <button onclick="openEvidence(${index})">Evidence</button>
      </td>
    `;

    table.appendChild(row);
  });
});

function openPrescriptions(index) {
  localStorage.setItem("currentPatientIndex", index);
  window.location.href = "prescription.html";
}

function openEvidence(index) {
  localStorage.setItem("currentPatientIndex", index);
  window.location.href = "evidence.html";
}
