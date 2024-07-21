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

let isFinished = false;

let tasksArr = activeTasksArr;
let keyLS = activeTasksKeyLS;
let container = activeTasksContainer;
let taskValueClass = "active-task-value";
let redoOrCompleteBtnClass = "complete-btn";
let unicodeBtn = "&#10004;";

const switcher = function () {
  tasksArr = isFinished ? finishedTasksArr : activeTasksArr;
  keyLS = isFinished ? finishedTasksKeyLS : activeTasksKeyLS;
  container = isFinished ? finishedTasksContainer : activeTasksContainer;
  taskValueClass = isFinished ? "finished-task-value" : "active-task-value";
  redoOrCompleteBtnClass = isFinished ? "redo-btn" : "complete-btn";
  unicodeBtn = isFinished ? "&#8635;" : "&#10004;";
};

const deleteTaskFromArr = function (element) {
  const taskTextForDelete = element.parentElement.querySelector("input").value;
  const indexForDelete = tasksArr.indexOf(taskTextForDelete);

  tasksArr.splice(indexForDelete, 1);
  localStorage.setItem(keyLS, tasksArr.join(separator));

  return taskTextForDelete;
};

const createTaskElement = function (taskValue) {
  const taskHtml = `
    <div class="task margin-bottom">
      <input class="${taskValueClass}" type="text" value="${taskValue}" />
      <button class="${redoOrCompleteBtnClass}">${unicodeBtn}</button>
      <button class="delete-btn">&#128465;</button>
    </div>
    `;
  container.insertAdjacentHTML("beforeend", taskHtml);
};

const updateUI = function () {
  container.innerHTML = "";

  tasksArr.forEach(function (taskValue) {
    createTaskElement(taskValue, isFinished);
  });
};

const taskButtonsHandler = function (event) {
  const clickedElement = event.target;
  if (clickedElement.tagName.toLowerCase() === "input") return;
  if (clickedElement.classList.contains("delete-btn")) {
    deleteTaskFromArr(clickedElement);
  } else if (clickedElement.classList.contains(redoOrCompleteBtnClass)) {
    const task = deleteTaskFromArr(clickedElement);

    const toTasksArr = isFinished ? activeTasksArr : finishedTasksArr;
    const toKeyLS = isFinished ? activeTasksKeyLS : finishedTasksKeyLS;
    toTasksArr.push(task);
    localStorage.setItem(toKeyLS, toTasksArr.join(separator));
  }
  updateUI();
};

activeTasksContainer.addEventListener("click", taskButtonsHandler);
finishedTasksContainer.addEventListener("click", taskButtonsHandler);

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
  if (clickedElement.textContent === "Active") {
    isFinished = false;
  } else {
    isFinished = true;
  }
  switcher();
  updateUI();
});

updateUI();
