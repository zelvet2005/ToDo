"use strict";

const finishedTab = document.querySelector(".finished-tab");
const activeTab = document.querySelector(".active-tab");
const navigation = document.querySelector(".navigation");

const finishedTasksContainer = document.querySelector(".finished-tasks");
const activeTasksContainer = document.querySelector(".active-tasks");

const addTaskInput = document.querySelector(".add-task-input");
const addTaskBtn = document.querySelector(".add-task-btn");

const separator = "^@&#&@^";

const activeTasksKeyLS = "activeTasks";
const finishedTasksKeyLS = "finishedTasks";

const activeTasksArr = localStorage.getItem(activeTasksKeyLS)
  ? localStorage.getItem(activeTasksKeyLS).split(separator)
  : [];
const finishedTasksArr = localStorage.getItem(finishedTasksKeyLS)
  ? localStorage.getItem(finishedTasksKeyLS).split(separator)
  : [];

localStorage.setItem(activeTasksKeyLS, activeTasksArr.join(separator));
localStorage.setItem(finishedTasksKeyLS, finishedTasksArr.join(separator));

const deleteTaskFromArr = function (element, isFinished = false) {
  const taskTextForDelete = element.parentElement.querySelector("input").value;
  const tasksArr = isFinished ? finishedTasksArr : activeTasksArr;
  const indexForDelete = tasksArr.indexOf(taskTextForDelete);

  tasksArr.splice(indexForDelete, 1);

  const key = isFinished ? finishedTasksKeyLS : activeTasksKeyLS;
  localStorage.setItem(key, tasksArr.join(separator));

  return taskTextForDelete;
};

const createTaskElement = function (taskValue, isFinished = false) {
  const taskHtml = `
    <div class="task margin-bottom">
      <input class="${
        isFinished ? "finished-task-value" : "active-task-value"
      }" type="text" value="${taskValue}" />
      <button class="${isFinished ? "redo-btn" : "complete-btn"}">${
    isFinished ? "&#8635;" : "&#10004;"
  }</button>
      <button class="delete-btn">&#128465;</button>
    </div>
    `;
  const container = isFinished ? finishedTasksContainer : activeTasksContainer;
  container.insertAdjacentHTML("beforeend", taskHtml);
};

const updateUI = function (isFinished = false) {
  const container = isFinished ? finishedTasksContainer : activeTasksContainer;
  const tasksArr = isFinished ? finishedTasksArr : activeTasksArr;
  container.innerHTML = "";

  tasksArr.forEach(function (taskValue) {
    createTaskElement(taskValue, isFinished);
  });
};

const taskButtonsHandler = function (event) {
  const clickedElement = event.target;
  const isFinished = this;
  const redoOrCompleteClass = isFinished ? "redo-btn" : "complete-btn";
  if (clickedElement.classList.contains("delete-btn")) {
    deleteTaskFromArr(clickedElement, isFinished);
  } else if (clickedElement.classList.contains(redoOrCompleteClass)) {
    const task = deleteTaskFromArr(clickedElement, isFinished);

    const tasksArr = isFinished ? activeTasksArr : finishedTasksArr;
    tasksArr.push(task);
    const key = isFinished ? activeTasksKeyLS : finishedTasksKeyLS;
    localStorage.setItem(key, tasksArr.join(separator));
  }
  updateUI(false);
  updateUI(true);
};

activeTasksContainer.addEventListener("click", taskButtonsHandler.bind(false));
finishedTasksContainer.addEventListener("click", taskButtonsHandler.bind(true));

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

navigation.addEventListener("click", function (event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("nav-btn")) {
    navigation.querySelectorAll(".nav-btn").forEach(function (child) {
      child.classList.remove("current-tab");
    });
    clickedElement.classList.add("current-tab");

    if (clickedElement.textContent.toLowerCase() === "active") {
      activeTab.classList.remove("no-display");
      finishedTab.classList.add("no-display");
    } else {
      activeTab.classList.add("no-display");
      finishedTab.classList.remove("no-display");
    }
  }
});

updateUI(false);
updateUI(true);
