"use strict";
const busForm = document.getElementById('busForm');
const busTableBody = document.getElementById('busTableBody');
// Default buses if no data exists in local storage
const defaultBuses = [
    { busNumber: 'KBC 123X', driver: 'John Wachira', capacity: 14, status: 'active', phone: '+254712345678' },
    { busNumber: 'KBC 456Y', driver: 'Jane Wachira', capacity: 15, status: 'active', phone: '+2547987654321' },
    { busNumber: 'KBC 789Z', driver: 'Tom Ngeche', capacity: 12, status: 'active', phone: '+254755555555' }
];
// Load buses from local storage (or use default if not available)
let buses = JSON.parse(localStorage.getItem('buses') || '[]');
// If no buses were found in local storage, use the default buses
if (buses.length === 0) {
    buses = defaultBuses;
    saveToLocalStorage(); // Save the default buses to local storage
}
// Function to render the bus table
function renderBusTable() {
    busTableBody.innerHTML = ''; // Clear previous rows
    buses.forEach((bus, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${bus.busNumber}</td>
      <td>${bus.driver}</td>
      <td>${bus.capacity}</td>
      <td>${bus.status}</td>
      <td>${bus.phone}</td>
      <td>
        <button class="btn btn-info btn-sm" data-index="${index}">Edit</button>
        <button class="btn btn-danger btn-sm" data-index="${index}">Delete</button>
      </td>
    `;
        busTableBody.appendChild(row);
    });
    // Add event listeners to dynamically created Edit and Delete buttons
    document.querySelectorAll('.btn-info').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (index !== null) {
                editBus(Number(index));
            }
        });
    });
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (index !== null) {
                deleteBus(Number(index));
            }
        });
    });
}
// Add Bus or Edit Bus
busForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const saveBtn = document.getElementById('saveBtn');
    const busNumber = document.getElementById('busNumber').value;
    const driver = document.getElementById('driver').value;
    const capacity = parseInt(document.getElementById('capacity').value);
    const status = document.getElementById('status').value;
    const phone = document.getElementById('phone').value;
    // Check if the form is being used to edit or add a bus
    if (saveBtn.innerText === 'Update Bus') {
        // Get the bus index stored in the form's data attribute
        const index = parseInt(busForm.getAttribute('data-index') || '-1');
        if (index !== -1) {
            // Update existing bus
            buses[index] = { busNumber, driver, capacity, status, phone };
            busForm.removeAttribute('data-index'); // Clear the index for future add operations
        }
    }
    else {
        // Add new bus
        buses.push({ busNumber, driver, capacity, status, phone });
    }
    // Reset form and button text after submit
    busForm.reset();
    const saveBtnText = document.getElementById('saveBtn');
    saveBtnText.innerText = 'Add Bus';
    saveToLocalStorage();
    renderBusTable();
});
// Edit Bus
function editBus(index) {
    const bus = buses[index];
    // Populate the form with the selected bus's details
    document.getElementById('busNumber').value = bus.busNumber;
    document.getElementById('driver').value = bus.driver;
    document.getElementById('capacity').value = bus.capacity.toString();
    document.getElementById('status').value = bus.status;
    document.getElementById('phone').value = bus.phone;
    // Change the button text to "Update Bus" and store the index in a custom attribute
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = 'Update Bus';
    // Store the bus index in the form to later identify it for updating
    busForm.setAttribute('data-index', index.toString());
}
// Delete Bus
function deleteBus(index) {
    // Confirm before deletion
    if (confirm('Are you sure you want to delete this bus?')) {
        buses.splice(index, 1); // Remove the bus from the array
        saveToLocalStorage(); // Update local storage
        renderBusTable(); // Re-render the table
    }
}
// Save buses to local storage
function saveToLocalStorage() {
    localStorage.setItem('buses', JSON.stringify(buses));
}
// Initial Render
renderBusTable();
