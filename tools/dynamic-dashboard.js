// --- Dynamic Date & Time ---
function updateDateTime() {
  const now = new Date();
  const dateTime = now.toLocaleString('en-MY', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('datetime').textContent = dateTime;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// --- Fake Dynamic Stats ---
function randomPercent() {
  return Math.floor(Math.random() * 100);
}

function updateStats() {
  const cpu = randomPercent();
  const memory = randomPercent();
  const progress = randomPercent();

  document.getElementById('cpu').textContent = cpu + '%';
  document.getElementById('memory').textContent = memory + '%';
  document.getElementById('progress').style.width = progress + '%';
  document.getElementById('progressText').textContent = progress + '%';
}
setInterval(updateStats, 3000);
updateStats();

// --- To-Do List Functionality ---
const taskInput = document.getElementById('taskText');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load saved tasks
const savedTasks = JSON.parse(localStorage.getItem('dashboardTasks')) || [];
savedTasks.forEach(addTaskToDOM);

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;
  savedTasks.push(text);
  localStorage.setItem('dashboardTasks', JSON.stringify(savedTasks));
  addTaskToDOM(text);
  taskInput.value = '';
});

function addTaskToDOM(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    const index = savedTasks.indexOf(text);
    if (index > -1) {
      savedTasks.splice(index, 1);
      localStorage.setItem('dashboardTasks', JSON.stringify(savedTasks));
    }
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}
