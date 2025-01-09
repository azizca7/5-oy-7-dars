const taskInput = document.querySelector(".task-box input");
const taskList = document.getElementById("taskList");
const doneList = document.getElementById("doneList");
const taskCount = document.getElementById("taskCount");
const doneCount = document.getElementById("doneCount");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
  tasks.forEach(task => createTaskElement(task));
  doneTasks.forEach(task => createTaskElement(task, true));
  updateCounts();
}

function createTaskElement(taskText, completed = false) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span>${taskText}</span>
    <div>
      ${!completed ? `<button onclick="completeTask(this)"><img src="./images/check-btn.png" alt="check-btn"></button>` : ""}
      <button onclick="deleteTask(this)"><img src="./images/delete-btn.png" alt="delete-btn"></button>
    </div>`;
  taskItem.classList.toggle("completed", completed);
  (completed ? doneList : taskList).appendChild(taskItem);
}

function addTask() {
  if (!taskInput.value.trim()) return alert("iltimos ishni yozing!");
  createTaskElement(taskInput.value);
  saveTasks();
  taskInput.value = "";
  updateCounts();
}

function completeTask(button) {
  const taskItem = button.closest("li");
  taskItem.classList.add("completed");
  doneList.appendChild(taskItem);
  button.remove();
  saveTasks();
  updateCounts();
}

function deleteTask(button) {
  button.closest("li").remove();
  saveTasks();
  updateCounts();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify([...taskList.querySelectorAll("li span")].map(item => item.textContent)));
  localStorage.setItem("doneTasks", JSON.stringify([...doneList.querySelectorAll("li span")].map(item => item.textContent)));
}

function updateCounts() {
  taskCount.textContent = taskList.children.length;
  doneCount.textContent = doneList.children.length;
}

document.querySelector(".task-box button").addEventListener("click", addTask);
taskInput.addEventListener("keypress", event => { if (event.key === "Enter") addTask(); });

loadTasks();
