"use strict";

const tasks = document.querySelector(".tasks");
const addTaskInput = document.querySelector(".add-task-input");
const addTaskBtn = document.querySelector(".add-task-btn");

const separator = "^@&#&@^";

const tasksKeyLS = "tasks";
const counterKeyLS = "count";

const tasksArr = localStorage.getItem(tasksKeyLS)
  ? localStorage.getItem(tasksKeyLS).split(separator)
  : [];
let counter = localStorage.getItem(counterKeyLS)
  ? localStorage.getItem(counterKeyLS)
  : 0;

localStorage.setItem(tasksKeyLS, tasksArr.join(separator));
localStorage.setItem(counterKeyLS, counter);

const createTaskElement = function (taskValue, id) {
  const taskHtml = `
    <div class="task margin-bottom">
      <input class="task-value" type="text" value="${taskValue}" />
      <button class="complete-btn">&#10004;</button>
      <button class="delete-btn" id="${id}">&#128465;</button>
    </div>
    `;
  tasks.insertAdjacentHTML("beforeend", taskHtml);
};

const updateUI = function () {
  tasks.innerHTML = "";

  tasksArr.forEach(function (taskValue) {
    const id = `delete-${counter}`;
    createTaskElement(taskValue, id);

    document
      .querySelector(`#${id}`)
      .addEventListener("click", function (event) {
        const parentTask = event.target.parentElement;
        const taskTextForDelete = parentTask.querySelector("input").value;
        const indexForDelete = tasksArr.indexOf(taskTextForDelete);

        tasksArr.splice(indexForDelete, 1);
        updateUI();

        localStorage.setItem(tasksKeyLS, tasksArr.join(separator));
      });
    counter++;
  });
  localStorage.setItem(counterKeyLS, counter);
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
