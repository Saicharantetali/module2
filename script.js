const students = [
  { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
  { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
  { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
];

let editMode = false;

function renderStudents(studentsArray) {
  const tableBody = document.getElementById('studentTableBody');
  tableBody.innerHTML = '';

  studentsArray.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.ID}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree}</td>
      <td>${student.email}</td>
      <td>
        <button class="edit" data-id="${student.ID}">&#9998;</button>
        <button class="delete" data-id="${student.ID}">&#128465;</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function clearForm() {
  const form = document.getElementById('studentForm');
  form.reset();
  form.querySelector('button[type="submit"]').textContent = 'Add Student';
  editMode = false;
}

function addStudent(event) {
  event.preventDefault();

  const form = document.getElementById('studentForm');
  const name = form.elements.name.value;
  const age = form.elements.age.value;
  const grade = form.elements.grade.value;
  const degree = form.elements.degree.value;
  const email = form.elements.email.value;

  if (editMode) {
    const studentId = form.elements.studentId.value;
    const studentIndex = students.findIndex(student => student.ID === parseInt(studentId));
    if (studentIndex !== -1) {
      students[studentIndex] = { ID: parseInt(studentId), name, age, grade, degree, email };
      renderStudents(students);
      clearForm();
    }
  } else {
    const studentId = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
    students.push({ ID: studentId, name, age, grade, degree, email });
    renderStudents(students);
    clearForm();
  }
}

function editStudent(event) {
  const studentId = event.target.getAttribute('data-id');
  const student = students.find(student => student.ID === parseInt(studentId));
  if (student) {
    const form = document.getElementById('studentForm');
    form.elements.studentId.value = student.ID;
    form.elements.name.value = student.name;
    form.elements.age.value = student.age;
    form.elements.grade.value = student.grade;
    form.elements.degree.value = student.degree;
    form.elements.email.value = student.email;
    form.querySelector('button[type="submit"]').textContent = 'Edit Student';
    editMode = true;
  }
}

function deleteStudent(event) {
  const studentId = event.target.getAttribute('data-id');
  const studentIndex = students.findIndex(student => student.ID === parseInt(studentId));
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    renderStudents(students);
  }
}

function searchStudents() {
  const searchInput = document.getElementById('searchInput');
  const searchText = searchInput.value.toLowerCase();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchText) ||
    student.email.toLowerCase().includes(searchText) ||
    student.degree.toLowerCase().includes(searchText)
  );

  renderStudents(filteredStudents);
}

document.getElementById('studentForm').addEventListener('submit', addStudent);
document.getElementById('cancelButton').addEventListener('click', clearForm);
document.getElementById('searchInput').addEventListener('input', searchStudents);

document.getElementById('studentTableBody').addEventListener('click', (event) => {
  if (event.target.classList.contains('edit')) {
    editStudent(event);
  } else if (event.target.classList.contains('delete')) {
    deleteStudent(event);
  }
});

renderStudents(students);
