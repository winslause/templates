interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  location: string;
  parentName: string;
  parentPhone: string;
}

let students: Student[] = [
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
  }
];

let studentIdCounter = 5; // Start counter from 5 since we have 4 default students

// Check if there's saved data in localStorage and load it
const savedStudents = localStorage.getItem("students");
if (savedStudents) {
  students = JSON.parse(savedStudents);
  studentIdCounter = students.length > 0 ? students[students.length - 1].id + 1 : 5;
}

document.getElementById("studentForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get values from form inputs
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const age = parseInt((document.getElementById("age") as HTMLInputElement).value);
  const location = (document.getElementById("location") as HTMLInputElement).value;
  const parentName = (document.getElementById("parentName") as HTMLInputElement).value;
  const parentPhone = (document.getElementById("parentPhone") as HTMLInputElement).value;

  // Ensure that no field is empty
  if (!name || !email || !age || !location || !parentName || !parentPhone) {
    alert("Please fill in all the fields.");
    return;
  }

  const newStudent: Student = {
    id: studentIdCounter++,
    name,
    email,
    age,
    location,
    parentName,
    parentPhone
  };

  students.push(newStudent);
  saveStudents();
  renderStudentTable();
  clearForm();
});

function renderStudentTable() {
  const tableBody = document.getElementById("studentTableBody")!;
  tableBody.innerHTML = "";

  students.forEach(student => {
    const row = document.createElement("tr");
    row.dataset.studentId = student.id.toString(); // Store ID in a data attribute
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.location}</td>
      <td>${student.parentName}</td>
      <td>${student.parentPhone}</td>
      <td>
        <button class="btn btn-info btn-sm edit-btn">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Bind delete and edit events after rendering the table
  bindDeleteEvents();
  bindEditEvents();
}

function bindDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  
  deleteButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      const row = (event.target as HTMLElement).closest("tr");
      const studentId = parseInt(row?.dataset.studentId || "0");
      confirmDelete(studentId);
    });
  });
}

function bindEditEvents() {
  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      const row = (event.target as HTMLElement).closest("tr");
      const studentId = parseInt(row?.dataset.studentId || "0");
      editStudent(studentId);
    });
  });
}

function editStudent(id: number) {
  const student = students.find(s => s.id === id);
  if (student) {
    // Populate the form with the student's data
    (document.getElementById("name") as HTMLInputElement).value = student.name;
    (document.getElementById("email") as HTMLInputElement).value = student.email;
    (document.getElementById("age") as HTMLInputElement).value = student.age.toString();
    (document.getElementById("location") as HTMLInputElement).value = student.location;
    (document.getElementById("parentName") as HTMLInputElement).value = student.parentName;
    (document.getElementById("parentPhone") as HTMLInputElement).value = student.parentPhone;

    // Change the button to "Update"
    const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
    saveBtn.innerText = "Update Student";
    saveBtn.onclick = function () {
      updateStudent(id);
    };
  }
}

function updateStudent(id: number) {
  const student = students.find(s => s.id === id);
  if (student) {
    student.name = (document.getElementById("name") as HTMLInputElement).value;
    student.email = (document.getElementById("email") as HTMLInputElement).value;
    student.age = parseInt((document.getElementById("age") as HTMLInputElement).value);
    student.location = (document.getElementById("location") as HTMLInputElement).value;
    student.parentName = (document.getElementById("parentName") as HTMLInputElement).value;
    student.parentPhone = (document.getElementById("parentPhone") as HTMLInputElement).value;
  }

  saveStudents();
  renderStudentTable();
  clearForm();
}

function confirmDelete(id: number) {
  const isConfirmed = confirm("Are you sure you want to delete this student?");
  
  if (isConfirmed) {
    deleteStudent(id);
  }
}

function deleteStudent(id: number) {
  students = students.filter(student => student.id !== id);
  saveStudents();
  renderStudentTable();
}

function clearForm() {
  (document.getElementById("name") as HTMLInputElement).value = "";
  (document.getElementById("email") as HTMLInputElement).value = "";
  (document.getElementById("age") as HTMLInputElement).value = "";
  (document.getElementById("location") as HTMLInputElement).value = "";
  (document.getElementById("parentName") as HTMLInputElement).value = "";
  (document.getElementById("parentPhone") as HTMLInputElement).value = "";

  const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
  saveBtn.innerText = "Add Student";
}

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Initial Render
renderStudentTable();
