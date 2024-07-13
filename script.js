"use strict";

const tasks = document.querySelector(".tasks");
const addTaskInput = document.querySelector(".add-task-input");
const addTaskBtn = document.querySelector(".add-task-btn");

const tasksKeyLS = "tasks";
const separator = "^";
const tasksArr = localStorage.getItem(tasksKeyLS)
  ? localStorage.getItem(tasksKeyLS).split(separator)
  : [];

localStorage.setItem(tasksKeyLS, tasksArr.join(separator));

const updateUI = function () {
  tasks.innerHTML = "";

  tasksArr.forEach(function (task) {
    const taskHtml = `
    <div class="task margin-bottom">
      <input class="task-value" type="text" value="${task}" />
      <button class="complete-btn">&#10004;</button>
      <button class="delete-btn">&#128465;</button>
    </div>
    `;

    tasks.insertAdjacentHTML("beforeend", taskHtml);
  });
};

addTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const task = addTaskInput.value;

  if (task !== "") {
    tasksArr.push(task);
    localStorage.setItem(tasksKeyLS, tasksArr.join(separator));

    updateUI();
  }
  addTaskInput.value = "";
});

updateUI();
