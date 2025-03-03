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
    if (Event.key === "Enter") {
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
    todo.push({
      text: newTask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTask();
  }
}

function deleteAllTask() {
  console.log("test");
}

function displayTask() {
  todoList.innerHTML = "";
  todo.forEach((item, index)=> {
    const p = document.createElement("p");
    p.innerHTML = `
    <div class="todo-container>
    <input type="checkbox" class="todo-checkbox" id="input-${}">
    </div>    
    `
  });
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
