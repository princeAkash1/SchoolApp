function toggleForm() {
    var formPopup = document.querySelector('.center');
    formPopup.classList.toggle("hideForm");
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("close").addEventListener("click", function() {
        var formPopup = document.querySelector(".center");
        formPopup.classList.add("hideForm");
    });
});

document.getElementById('schoolForm').addEventListener('submit', function(event){
    event.preventDefault();
    let studentName =  document.getElementById('name').value;
    let studentClass = document.getElementById('class').value; // Corrected
    let studentSchool = document.getElementById('school').value;
    let studentAddress = document.getElementById('address').value;

    let studentsData = {
        name: studentName,
        class: studentClass,
        school: studentSchool,
        address: studentAddress
    };
    saveStudentData(studentsData);
    clearForm();
});

function saveStudentData(studentsData){
    let existedStudentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
    existedStudentsData.push(studentsData);
    localStorage.setItem("studentsData", JSON.stringify(existedStudentsData)); // Corrected
    updateStudentsData();
}

function clearForm(){
    document.getElementById('schoolForm').reset();
}

function updateStudentsData(){
    let tableTBody = document.getElementById('tbody'); // Corrected
    tableTBody.innerHTML = ""; // Clearing existing rows
    var studentUpdateData = JSON.parse(localStorage.getItem("studentsData")) || [];
    studentUpdateData.forEach(function(studentUpdateData,index){
        var newRow = "<tr><td>" + studentUpdateData.name + "</td><td>" + studentUpdateData.class + "</td><td>" + studentUpdateData.school + "</td><td>" + studentUpdateData.address + "</td><td><button class='btn btn-danger' onclick='confirmDelete(" + index + ")'>Delete</button></td><td><button class='btn btn-primary'  onclick='editStudent(" + index + ")'>Edit</button></td></tr>";
        tableTBody.innerHTML += newRow; // Appending new row HTML
    });
}

function confirmDelete(index){
    if(confirm("Are you sure you want to Delete?"))
        deleteContact(index);
}
function editStudent(index) {
    let studentsEditData = JSON.parse(localStorage.getItem("studentsData")) || [];
    let student = studentsEditData[index];
    
    document.getElementById('name').value = student.name;
    document.getElementById('class').value = student.class;
    document.getElementById('school').value = student.school;
    document.getElementById('address').value = student.address;

    // Show the form
    var formPopup = document.querySelector('.center');
    formPopup.classList.remove("hideForm");

    // Optionally, you can also show the table if it's hidden
    var tableContainer = document.querySelector('.container.school-data');
    tableContainer.style.display = "block";
}

function deleteContact(index){
    let studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
    studentsData.splice(index,1);
    localStorage.setItem("studentsData" ,JSON.stringify(studentsData));
    updateStudentsData();
}
