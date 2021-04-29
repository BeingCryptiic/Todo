//Query Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
window.addEventListener("load", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Functions
function addTodo(e) {
  //Preventing the default event for button
  e.preventDefault();
  //Creating the div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Creating the li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Saving the data to local storage
  saveTodos(todoInput.value);
  //Creating the buttons
  //Completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Appending the todDiv to our UL
  todoList.appendChild(todoDiv);
  //Clearing out the input
  todoInput.value = "";
}

function deleteCheck(e) {
  //Trash-btn
  if (e.target.classList[0] === "trash-btn") {
    e.target.parentElement.classList.add("fall");
    deleteTodos(e.target.parentElement);
    e.target.parentElement.addEventListener("transitionend", function () {
      e.target.parentElement.remove();
    });
  }

  //Complete-btn
  if (e.target.classList[0] === "complete-btn") {
    e.target.parentElement.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodos(todo) {
  //Check if the todo exists
  let todos;
  if (localStorage.getItem("todo") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todo"));
  }
  todos.push(todo);
  localStorage.setItem("todo", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todo") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todo"));
  }
  todos.forEach(function (todo) {
    //Creating the div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Creating the li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Creating the buttons
    //Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Appending the todDiv to our UL
    todoList.appendChild(todoDiv);
  });
}

function deleteTodos(todo) {
  let todos;
  if (localStorage.getItem("todo") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todo"));
  }
  const index = todo.childNodes[0].textContent;
  todos.splice(todos.indexOf(index), 1);
  localStorage.setItem("todo", JSON.stringify(todos));
}
