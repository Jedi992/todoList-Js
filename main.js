const taskList = document.querySelector(".nav__list-ul");
const addButton = document.querySelector(".todo__add-button");
const input = document.querySelector(".todo__text-input");
const nav = document.querySelector(".nav__list");
let todoArr = [];

// загружаем состояние
function loadLocalStorage() {
  const data = JSON.parse(localStorage.getItem("todoArr"));
  if (data !== "" && data !== null) {
    todoArr = data;
    renderTasks();
  }
}
// сохраняем состояния
function saveLocalStorage() {
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
}
// Добавление задачи
function addTodo() {
  const taskText = input.value;
  const newTask = {
    id: Date.now(),
    taskName: taskText,
    complete: false,
  };
  todoArr.push(newTask);
  if (input.value) {
    input.value = "";
  }
  saveLocalStorage();
  renderTask(newTask);
  updateButton();
}
function renderTask(task) {
  const taskHTML = ` <li id=${task.id} 
  }  class="task ${task.complete && "task-done"}" >
  <div class="task-content">
              <label>
                <input data-action="done" class="input-checkbox" type="checkbox" ${
                  task.complete && "checked"
                }  name="languages" />
                <span>${task.taskName}</span>
              </label>
                <svg data-action="delete" class="close-btn"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
               </div>
                </li>`;
  taskList.insertAdjacentHTML("beforeend", taskHTML);
}

function renderTasks() {
  taskList.innerHTML = "";
  todoArr.forEach((task) => {
    renderTask(task);
  });
}
// Удаление задачи
function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  const searchTask = event.target.closest(".task");
  const id = Number(searchTask.id);
  todoArr = todoArr.filter((task) => task.id !== id);
  searchTask.remove();
  saveLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const searchTask = event.target.closest(".task");
  const id = Number(searchTask.id);
  const findTask = todoArr.find((taskId) => taskId.id === id);

  if (findTask) {
    findTask.complete = event.target.checked;
    console.log(findTask.complete);
    searchTask.classList.toggle("task-done", findTask.complete);
    saveLocalStorage();
  }
}

// отслеживание поля ввода
function updateButton() {
  input.value.length <= 1 || input.value.length >= 32
    ? (addButton.disabled = true)
    : (addButton.disabled = false);
}
loadLocalStorage();

input.addEventListener("input", updateButton);
addButton.addEventListener("click", addTodo);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);
