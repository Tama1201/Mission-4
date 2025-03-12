// Retrieve todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTask);
  displayTask();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    const currentTime = new Date().toLocaleString();
    const newTodo = {
      text: newTask,
      disabled: false,
      time: currentTime,
    };
    todo.push(newTodo);
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function deleteAllTask() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled; // Toggle antara true & false
  saveToLocalStorage(); // Simpan perubahan ke localStorage
  displayTasks(); // Refresh tampilan
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
          <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}">${
      item.text
    }</p>
          <span class="timestamp">${
            item.time ? item.time : "No time available"
          }</span>
        </div>
    `;
    li.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(li);
  });
  todoCount.textContent = todo.length;
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
