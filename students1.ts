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
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const age = parseInt((document.getElementById("age") as HTMLInputElement).value);
  const location = (document.getElementById("location") as HTMLInputElement).value;
  const parentName = (document.getElementById("parentName") as HTMLInputElement).value;
  const parentPhone = (document.getElementById("parentPhone") as HTMLInputElement).value;

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
  renderStudentTable();
  clearForm();
});

function renderStudentTable() {
  const tableBody = document.getElementById("studentTableBody")!;
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
  (document.getElementById("name") as HTMLInputElement).value = "";
  (document.getElementById("email") as HTMLInputElement).value = "";
  (document.getElementById("age") as HTMLInputElement).value = "";
  (document.getElementById("location") as HTMLInputElement).value = "";
  (document.getElementById("parentName") as HTMLInputElement).value = "";
  (document.getElementById("parentPhone") as HTMLInputElement).value = "";
  
  const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
  saveBtn.innerText = "Add Student";
}

// Initial Render
renderStudentTable();
