document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login!");
    window.location.href = "login.html";
    return;
  }

  const prescriptionTable = document.getElementById("prescriptionTable");
  const patientNameHeading = document.getElementById("patientName");
  const addPrescriptionForm = document.getElementById("addPrescriptionForm");

  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  let currentPatientIndex = parseInt(localStorage.getItem("currentPatientIndex"));

  if (currentPatientIndex === null || isNaN(currentPatientIndex)) {
    alert("No patient selected!");
    window.location.href = currentUser.role === "doctor" ? "doctor-dashboard.html" : "patient-dashboard.html";
    return;
  }

  const patient = patients[currentPatientIndex];
  patientNameHeading.textContent = patient.name;

  function renderPrescriptions() {
    if (!prescriptionTable) return;

    prescriptionTable.innerHTML = "";
    if (!patient.prescriptions) patient.prescriptions = [];

    patient.prescriptions.forEach((pres, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${pres.medicine}</td>
        <td>${pres.dosage}</td>
        <td>${pres.taken ? "Yes" : "No"}</td>
      `;

      if (currentUser.role === "doctor") {
        const actionTd = document.createElement("td");
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = pres.taken ? "Mark Not Taken" : "Mark Taken";
        toggleBtn.style = "padding:5px 10px;cursor:pointer;";
        toggleBtn.addEventListener("click", function () {
          pres.taken = !pres.taken;
          patients[currentPatientIndex] = patient;
          localStorage.setItem("patients", JSON.stringify(patients));
          renderPrescriptions();
        });
        actionTd.appendChild(toggleBtn);
        row.appendChild(actionTd);
      }

      prescriptionTable.appendChild(row);
    });
  }

  renderPrescriptions();

  if (currentUser.role === "doctor" && addPrescriptionForm) {
    addPrescriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const medicine = document.getElementById("medicine").value.trim();
      const dosage = document.getElementById("dosage").value.trim();

      if (!medicine || !dosage) return;

      const newPres = { medicine, dosage, taken: false };
      if (!patient.prescriptions) patient.prescriptions = [];
      patient.prescriptions.push(newPres);

      patients[currentPatientIndex] = patient;
      localStorage.setItem("patients", JSON.stringify(patients));

      addPrescriptionForm.reset();
      renderPrescriptions();
      alert("Prescription added!");
    });
  } else if (addPrescriptionForm) {
    addPrescriptionForm.style.display = "none";
  }
});
