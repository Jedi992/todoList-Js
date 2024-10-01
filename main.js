const taskList = document.querySelector(".nav__list-ul");
const addButton = document.querySelector(".todo__add-button");
const input = document.querySelector(".todo__text-input");
const nav = document.querySelector(".nav__list");
const task = document.querySelector(".task");
const taskCheckBox = document.querySelector(".input-checkbox");
let todoArr = [];
let id = 1;

// Добовление задачи
function addTodo() {
  const taskText = input.value;
  const newTask = {
    id: id++,
    taskName: taskText,
    complete: false,
  };
  todoArr.push(newTask);
  if (input.value) {
    input.value = "";
  }

  const TaskHTML = ` <li id=${newTask.id} class="task " >
              <label>
                <input data-action="done" class="input-checkbox" type="checkbox" name="languages" />
                <span>${newTask.taskName}</span>
              </label>
              <button data-action="delete" class="close-btn">
                <img
                data-action="delete"
                  width="40"
                  src="./public/close.png"
                  alt="close"
                  class="close-icon"
                />
              </button>
            </li>`;
  taskList.insertAdjacentHTML("beforeend", TaskHTML);

  updateButton();
}

// Удаление задачи
function deleteTask(event) {
  // еслит не кнопка с дата сэтом делит , останавливаем функцию
  if (event.target.dataset.action !== "delete") return;
  // поиск задачи
  const searchTask = event.target.closest(".task");
  const id = Number(searchTask.id);
  // удаляем задачи с помощью фильтрации
  todoArr = todoArr.filter((task) => task.id !== id);
  searchTask.remove();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const searchTask = event.target.closest(".task");
  const id = Number(searchTask.id);

  const findTask = todoArr.find((taskId) => taskId.id === id);
  if (todoArr[findTask] !== -1) {
    todoArr[findTask].complete = true;
    console.log(todoArr);
  } else {
  }
}

// отслеживание поля ввода
function updateButton() {
  if (input.value.length <= 1) {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
}

input.addEventListener("input", updateButton);
addButton.addEventListener("click", addTodo);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);
