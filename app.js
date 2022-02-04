//query selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter");

//event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", completeAndDelete);
todoFilter.addEventListener("click", filterTodo);
window.addEventListener("DOMContentLoaded", getTodos);

//functions
function addTodo(event) {
  event.preventDefault();
  //create a div for one todo
  if (todoInput.value) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create a li
    const todoLi = document.createElement("li");
    todoLi.innerText = todoInput.value;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    //create a complete button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    //create a trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //save local storage
    saveLocalStorage(todoInput.value);

    //append todoDiv to ul
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

//complete and delete todo

function completeAndDelete(e) {
  //console.log(e.target.classList)
  const item = e.target;

  //console.log(item.classList)
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
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
        if (todo.className.includes("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.className.includes("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create a li
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    //create a complete button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    //create a trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //append todoDiv to ul
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const item = todo.childNodes[0].innerText;
  const todoIndex = todos.indexOf(item);
  todos.splice(todoIndex, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
