window.onload = fetchData;
window.onkeyup = keyup;

const add = document.getElementById("add");
const input = document.getElementById("input");

// var arr = [
//   { task: "wash your hands", completed: true },
//   { task: "check out new todo tutorial", completed: false },
//   { task: "wash your hands", completed: true },
// ];
if (JSON.parse(localStorage.getItem("tasks")) == null) {
  var arr = [];
  updLocalStorage();
}
var arr = JSON.parse(localStorage.getItem("tasks"));

const arrSize = arr.length;

function fetchData() {
  if (arr !== null) {
    arr.forEach((item) => {
      addTasksToUi(item.task, item.completed);
    });
  }
}

var count = 0;

const addTasksToUi = (item, status) => {
  const ul = document.getElementById("dynamic-list");
  const li = document.createElement("li");
  li.setAttribute("class", "list-item");
  li.setAttribute("value", `${item}`);
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", `${count}`);
  input.setAttribute("onclick", "check(event)");
  const label = document.createElement("label");
  label.setAttribute("for", `${count}`);
  const span = document.createElement("span");
  span.setAttribute("onclick", "strike(event)");
  span.appendChild(document.createTextNode(item));
  const img = document.createElement("img");
  img.setAttribute("src", "./assets/bin.svg");
  img.setAttribute("onclick", "removeTask(event)");
  const img1 = document.createElement("img");
  img1.setAttribute("src", "./assets/edit.svg");
  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(img);
  li.appendChild(img1);
  // li.appendChild(document.createTextNode(item));
  ul.appendChild(li);

  if (count >= arrSize) {
    arr.push({ task: `${item}`, completed: false });
    updLocalStorage();
  }
  if (status == true) {
    span.setAttribute("style", "text-decoration: line-through;");
    document.getElementById(count).checked = true;
  }

  count++;
  scrollChecker();
};

function keyup(e) {
  if (e.keyCode == 13 && input.value !== '') {
    addTasksToUi(input.value, false);
  }
}

add.onclick = () => {
  addTasksToUi(input.value, false);
};

function strike(event) {
  event.preventDefault();
  const target = event.target || event.srcElement;
  const id = target.parentNode.children[0].id;
  const targetStyle = target.getAttribute("style");
  if (targetStyle == null) {
    target.setAttribute("style", "text-decoration: line-through;");
    document.getElementById(id).checked = true;
    changeStatus(id, "completed");
  }
  else if (targetStyle == "text-decoration: line-through;") {
    target.setAttribute("style", "text-decoration: none;");
    document.getElementById(id).checked = false;
    changeStatus(id, "notCompleted");
  }
  else if (targetStyle == "text-decoration: none;") {
    target.setAttribute("style", "text-decoration: line-through;");
    document.getElementById(id).checked = true;
    changeStatus(id, "completed");
  }
}

function check() {
  const span = event.target.parentNode.children[2];
  if (span.getAttribute("style") == null) {
    span.setAttribute("style", "text-decoration: line-through;");
    const id = event.target.parentNode.children[0].id;
    changeStatus(id, "completed");
  }
  else if (span.getAttribute("style") == "text-decoration: line-through;") {
    span.setAttribute("style", "text-decoration: none;");
    const id = event.target.parentNode.children[0].id;
    changeStatus(id, "notCompleted");
  }
  else if (span.getAttribute("style") == "text-decoration: none;") {
    span.setAttribute("style", "text-decoration: line-through;");
    const id = event.target.parentNode.children[0].id;
    changeStatus(id, "completed");
  }
}

function removeTask(event) {
  const ul = event.target.parentNode.parentNode;
  const id = event.target.parentNode.children[0].id;
  const li = event.target.parentNode;
  ul.removeChild(li);
  arr.splice(id, 1);
  updLocalStorage();
  window.location.reload(true);
}

// helper functions

function changeStatus(id, status) {
  if (status == "completed") {
    arr[id].completed = true;
    updLocalStorage();
  }
  else {
    arr[id].completed = false;
    updLocalStorage();
  }
}

function scrollChecker() {
  const container = document.querySelector(".container");
  const li = container.getElementsByTagName("li");
  if (li.length > 3) {
    container.setAttribute("style", "overflow-y:scroll");
  } else {
    container.setAttribute("style", "height: 250px;");
  }
}

function updLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(arr));
}



// const task = `<li> <input type="checkbox" id=${count}> <label for=${count}></label> <span>${item}</span> <img src="./assets/bin.svg" alt="bin"> <img src="./assets/edit.svg" alt="edit"></li>`;