document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) { window.location.href = "login.html"; return; }

  const prescriptionTable = document.getElementById("prescriptionTable");
  const patientNameEl = document.getElementById("patientName");
  const addPrescriptionForm = document.getElementById("addPrescriptionForm");

  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  let currentPatientIndex = parseInt(localStorage.getItem("currentPatientIndex"));

  if (isNaN(currentPatientIndex) || !patients[currentPatientIndex]) {
    showToast("No patient selected", "error");
    window.location.href = currentUser.role === "doctor" ? "doctor-dashboard.html" : "patient-dashboard.html";
    return;
  }

  const patient = patients[currentPatientIndex];
  if (patientNameEl) patientNameEl.textContent = patient.name;

  function renderPrescriptions() {
    if (!prescriptionTable) return;
    prescriptionTable.innerHTML = "";
    if (!patient.prescriptions || patient.prescriptions.length === 0) {
      prescriptionTable.innerHTML = `<tr><td colspan="5" class="empty-state"><div class="empty-icon">💊</div>No prescriptions yet.</td></tr>`;
      return;
    }
    patient.prescriptions.forEach((pres, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td style="color:var(--white);font-weight:500">${pres.medicine}</td>
        <td>${pres.dosage}</td>
        <td><span class="badge ${pres.taken ? 'badge-yes' : 'badge-no'}">${pres.taken ? '✓ Taken' : '⏳ Pending'}</span></td>
        <td></td>
      `;
      if (currentUser.role === "doctor") {
        const btn = document.createElement("button");
        btn.className = `btn btn-sm ${pres.taken ? 'btn-secondary' : 'btn-primary'}`;
        btn.textContent = pres.taken ? "Mark Pending" : "Mark Taken";
        btn.addEventListener("click", function () {
          pres.taken = !pres.taken;
          patients[currentPatientIndex] = patient;
          localStorage.setItem("patients", JSON.stringify(patients));
          renderPrescriptions();
        });
        row.cells[4].appendChild(btn);
      }
      prescriptionTable.appendChild(row);
    });
  }

  renderPrescriptions();

  if (currentUser.role === "doctor" && addPrescriptionForm) {
    addPrescriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const medicine = document.getElementById("medicine").value.trim();
      const dosage   = document.getElementById("dosage").value.trim();
      if (!medicine || !dosage) return;
      if (!patient.prescriptions) patient.prescriptions = [];
      patient.prescriptions.push({ medicine, dosage, taken: false });
      patients[currentPatientIndex] = patient;
      localStorage.setItem("patients", JSON.stringify(patients));
      addPrescriptionForm.reset();
      renderPrescriptions();
      showToast("Prescription added!");
    });
  } else if (addPrescriptionForm) {
    addPrescriptionForm.style.display = "none";
  }
});
