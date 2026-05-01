let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// SAVE TO LOCAL STORAGE
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ADD TASK
function addTask() {
  let text = document.getElementById("taskInput").value;
  let date = document.getElementById("dueDate").value;
  let priority = document.getElementById("priority").value;

  if (text === "") return;

  tasks.push({
    text,
    date,
    priority,
    completed: false,
  });

  saveTasks();
  displayTasks();

  document.getElementById("taskInput").value = "";
}

// DISPLAY TASKS
function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let priorityClass = task.priority.toLowerCase();
    li.classList.add(priorityClass);

    // delay animation
    li.style.animationDelay = `${index * 0.1}s`;

    li.innerHTML = `
    <div class="${task.completed ? "completed" : ""}">
      <strong>${task.text}</strong><br>
      <small>${task.priority} | ${task.date}</small>
    </div>

    <div class="actions">
      <button onclick="toggleTask(${index})">✔</button>
      <button onclick="deleteTask(${index})">❌</button>
    </div>
  `;

    list.appendChild(li);
  });
}

// TOGGLE COMPLETE
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

// DELETE TASK
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// INITIAL LOAD
displayTasks();
