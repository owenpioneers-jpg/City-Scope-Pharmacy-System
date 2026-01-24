document.addEventListener("DOMContentLoaded", function () {
  const patientTable = document.getElementById("patientTable");
  const addPatientForm = document.getElementById("addPatientForm");

  let patientsList = JSON.parse(localStorage.getItem("patients")) || [];

  function renderPatients() {
    if (!patientTable) return;
    patientTable.innerHTML = "";

    patientsList.forEach((p, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${p.name}</td>
        <td>${p.email}</td>
        <td>${p.age}</td>
        <td>${p.phone}</td>
        <td>${p.address}</td>
      `;
      patientTable.appendChild(row);
    });
  }

  renderPatients();

  if (addPatientForm) {
    addPatientForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const age = document.getElementById("age").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;

      const newPatient = { name, email, age, phone, address };

      patientsList.push(newPatient);
      localStorage.setItem("patients", JSON.stringify(patientsList));

      addPatientForm.reset();
      renderPatients();
      alert("Patient added successfully!");
    });
  }
});
