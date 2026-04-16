document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("doctorPatientTable");
  if (!table) return;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "doctor") {
    showToast("Access denied: Doctors only", "error");
    window.location.href = "login.html"; return;
  }
  const nameEl = document.getElementById("doctorName");
  if (nameEl) nameEl.textContent = currentUser.name;
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  // Update stat
  const statEl = document.getElementById("totalPatients");
  if (statEl) statEl.textContent = patients.length;

  if (patients.length === 0) {
    table.innerHTML = `<tr><td colspan="6" class="empty-state"><div class="empty-icon">🧑‍⚕️</div>No patients added yet.</td></tr>`;
    return;
  }

  patients.forEach((p, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td style="color:var(--white);font-weight:500">${p.name}</td>
      <td>${p.email || "—"}</td>
      <td>${p.age || "—"}</td>
      <td>${p.phone || "—"}</td>
      <td style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="openPrescriptions(${index})">💊 Prescriptions</button>
        <button class="btn btn-sm" style="background:rgba(255,179,71,0.12);color:var(--amber);border:1px solid rgba(255,179,71,0.25)" onclick="openEvidence(${index})">📋 Evidence</button>
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
