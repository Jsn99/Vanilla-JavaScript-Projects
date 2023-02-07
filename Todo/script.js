const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// If there are todo we want them to load.
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  //need to check for each todo orelse localStorage
  //wont save the object properly
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  // if already todo is there, the first
  // todoText will be the previous todo
  //then the input value adds up
  if (todo) {
    //adding .text is necessary to get
    //the todoText after relaoding the application
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      //should add classList to the above todoEl
      todoEl.classList.toggle("completed");
      updateLs();
    });
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLs();
    });
    todosUL.appendChild(todoEl);
    input.value = "";
    updateLs();
  }
}

function updateLs() {
  //need make new const for the li made
  const todosEL = document.querySelectorAll("li");

  const todos = [];

  todosEL.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
