const patientIndex = localStorage.getItem("currentPatientIndex");
const patients = JSON.parse(localStorage.getItem("patients")) || [];

if (!patients[patientIndex]) {
  alert("No patient selected");
  window.location.href = "patient-dashboard.html";
}

document.getElementById("patientName").textContent =
  "Patient: " + patients[patientIndex].name;

let evidences = JSON.parse(localStorage.getItem("evidences")) || [];

const table = document.getElementById("evidenceTable");

function loadEvidence() {
  table.innerHTML = "";

  const patientEvidence = evidences.filter(
    e => e.patientIndex == patientIndex
  );

  patientEvidence.forEach((e, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${e.date}</td>
      <td>${e.note}</td>
    `;

    table.appendChild(row);
  });
}

loadEvidence();

document.getElementById("evidenceForm")
  .addEventListener("submit", function (e) {

  e.preventDefault();

  const note = document.getElementById("note").value;

  const newEvidence = {
    patientIndex: patientIndex,
    note: note,
    date: new Date().toLocaleString()
  };

  evidences.push(newEvidence);

  localStorage.setItem("evidences", JSON.stringify(evidences));

  document.getElementById("note").value = "";

  loadEvidence();
});
