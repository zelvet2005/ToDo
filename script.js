"use strict";

const tasksContainer = document.querySelector(".tasks");
const addTaskInput = document.querySelector(".add-task-input");
const addTaskBtn = document.querySelector(".add-task-btn");

const separator = "^@&#&@^";

const activeTasksKeyLS = "tasks";

const activeTasksArr = localStorage.getItem(activeTasksKeyLS)
  ? localStorage.getItem(activeTasksKeyLS).split(separator)
  : [];

localStorage.setItem(activeTasksKeyLS, activeTasksArr.join(separator));

const createTaskElement = function (taskValue) {
  const taskHtml = `
    <div class="task margin-bottom">
      <input class="task-value" type="text" value="${taskValue}" />
      <button class="complete-btn">&#10004;</button>
      <button class="delete-btn">&#128465;</button>
    </div>
    `;
  tasksContainer.insertAdjacentHTML("beforeend", taskHtml);
};

const updateUI = function () {
  tasksContainer.innerHTML = "";

  activeTasksArr.forEach(function (taskValue) {
    createTaskElement(taskValue);
  });
};

addTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const task = addTaskInput.value;

  if (task !== "") {
    activeTasksArr.push(task);
    localStorage.setItem(activeTasksKeyLS, activeTasksArr.join(separator));

    updateUI();
  }
  addTaskInput.value = "";
});

tasksContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("delete-btn")) {
    const taskTextForDelete =
      clickedElement.parentElement.querySelector("input").value;
    const indexForDelete = activeTasksArr.indexOf(taskTextForDelete);

    activeTasksArr.splice(indexForDelete, 1);
    updateUI();

    localStorage.setItem(activeTasksKeyLS, activeTasksArr.join(separator));
  }
});

updateUI();
