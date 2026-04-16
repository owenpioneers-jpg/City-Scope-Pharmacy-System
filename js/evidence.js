document.addEventListener("DOMContentLoaded", function () {
  const patientIndex = localStorage.getItem("currentPatientIndex");
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  if (!patients[patientIndex]) {
    showToast("No patient selected", "error");
    window.location.href = "patient-dashboard.html"; return;
  }

  const nameEl = document.getElementById("patientName");
  if (nameEl) nameEl.textContent = patients[patientIndex].name;

  let evidences = JSON.parse(localStorage.getItem("evidences")) || [];
  const table = document.getElementById("evidenceTable");

  function loadEvidence() {
    table.innerHTML = "";
    const patientEvidence = evidences.filter(e => e.patientIndex == patientIndex);
    if (patientEvidence.length === 0) {
      table.innerHTML = `<tr><td colspan="3" class="empty-state"><div class="empty-icon">📋</div>No evidence recorded yet.</td></tr>`;
      return;
    }
    patientEvidence.forEach((e, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${i + 1}</td><td style="color:rgba(240,246,255,0.5);font-size:13px">${e.date}</td><td style="color:var(--white)">${e.note}</td>`;
      table.appendChild(row);
    });
  }

  loadEvidence();

  const form = document.getElementById("evidenceForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const note = document.getElementById("note").value.trim();
      if (!note) return;
      evidences.push({ patientIndex, note, date: new Date().toLocaleString() });
      localStorage.setItem("evidences", JSON.stringify(evidences));
      document.getElementById("note").value = "";
      loadEvidence();
      showToast("Evidence saved!");
    });
  }
});
