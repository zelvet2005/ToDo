"use strict";

const tasks = document.querySelector(".tasks");
const addTaskInput = document.querySelector(".add-task-input");
const addTaskBtn = document.querySelector(".add-task-btn");

const tasksKey = "tasks";
const tasksArr = localStorage.getItem(tasksKey).split("^");

(function () {
  localStorage.setItem(tasksKey, tasksArr.join("^"));
})();

const showTasks = function () {
  tasks.innerHTML = "";
  tasksArr.forEach(function (task) {
    tasks.insertAdjacentHTML("beforeend", task);
  });
};

addTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const task = addTaskInput.value;
  if (task !== "") {
    const taskHtml = `
    <div class="task margin-bottom">
      <input class="task-value" type="text" value="${task}" />
      <button class="complete-btn">&#10004;</button>
      <button class="delete-btn">&#128465;</button>
    </div>
    `;
    addTaskInput.value = "";
    tasksArr.push(taskHtml);
    localStorage.setItem(tasksKey, tasksArr.join("^"));
    showTasks();
  }
});

showTasks();
