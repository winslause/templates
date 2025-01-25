"use strict";
let students = [
    {
        id: 1,
        name: "John Wachira",
        email: "do@gmail.com",
        age: 12,
        location: "Transline Galaxy - Kasarani",
        parentName: "Jane Doe",
        parentPhone: "0721000001"
    },
    {
        id: 2,
        name: "Alice Aoko",
        email: "Ngeche@gmail.com",
        age: 14,
        location: "PCEA Ciiko Church",
        parentName: "Robert Kimbo",
        parentPhone: "0732000002"
    },
    {
        id: 3,
        name: "Peter Wako",
        email: "johnson@gmail.com",
        age: 15,
        location: "Kasarani Hunters Genesis 2nd Street",
        parentName: "Patricia Johnson",
        parentPhone: "0743000003"
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "davis@gmail.com",
        age: 13,
        location: "Santon Chemist",
        parentName: "Mark Davis",
        parentPhone: "0754000004"
    }
];
let studentIdCounter = 5; // Start counter from 5 since we have 4 default students
document.getElementById("studentForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = parseInt(document.getElementById("age").value);
    const location = document.getElementById("location").value;
    const parentName = document.getElementById("parentName").value;
    const parentPhone = document.getElementById("parentPhone").value;
    const newStudent = {
        id: studentIdCounter++,
        name,
        email,
        age,
        location,
        parentName,
        parentPhone
    };
    students.push(newStudent);
    renderStudentTable();
    clearForm();
});
function renderStudentTable() {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";
    students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.location}</td>
      <td>${student.parentName}</td>
      <td>${student.parentPhone}</td>
    `;
        tableBody.appendChild(row);
    });
}
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("location").value = "";
    document.getElementById("parentName").value = "";
    document.getElementById("parentPhone").value = "";
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.innerText = "Add Student";
}
// Initial Render
renderStudentTable();
