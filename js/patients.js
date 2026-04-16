document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("patientTable");
  if (!table) return;

  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const statEl = document.getElementById("totalPatients");
  if (statEl) statEl.textContent = patients.length;

  if (patients.length === 0) {
    table.innerHTML = `<tr><td colspan="6" class="empty-state"><div class="empty-icon">🧑‍🤝‍🧑</div>No patients registered yet.</td></tr>`;
    return;
  }
  patients.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td style="color:var(--white);font-weight:500">${p.name}</td>
      <td>${p.email || "—"}</td>
      <td>${p.age || "—"}</td>
      <td>${p.phone || "—"}</td>
      <td>${p.address || "—"}</td>
    `;
    table.appendChild(row);
  });
});
