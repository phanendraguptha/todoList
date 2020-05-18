window.onload = fetchData;
window.onkeyup = keyup;

var arr = [
  { task: "wash your hands", completed: false },
  { task: "check out new todo tutorial", completed: false },
  { task: "wash your hands", completed: false },
];

function fetchData() {
  arr.forEach((item) => {
    addTasksToUi(item.task);
  });
}

var count = 1;

const addTasksToUi = (item) => {
  var ul = document.getElementById("dynamic-list");
  var li = document.createElement("li");
  li.setAttribute("class", "list-item");
  li.setAttribute("value", `${item}`);
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", `${count}`);
  var label = document.createElement("label");
  label.setAttribute("for", `${count}`);
  var span = document.createElement("span");
  span.appendChild(document.createTextNode(item));
  var img = document.createElement("img");
  img.setAttribute("src", "./assets/bin.svg");
  var img1 = document.createElement("img");
  img1.setAttribute("src", "./assets/edit.svg");
  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(img);
  li.appendChild(img1);
  // li.appendChild(document.createTextNode(item));
  ul.appendChild(li);

  count++;
  scrollChecker();
};

function keyup(e) {
  if (e.keyCode == 13) {
    var input = document.getElementById("input").value;
    addTasksToUi(input);
  }
}

function scrollChecker() {
  var container = document.querySelector(".container");
  var li = container.getElementsByTagName("li");
  if (li.length > 3) {
    container.setAttribute("style", "overflow-y:scroll");
  } else {
    container.setAttribute("style", "height: 250px;");
  }
}

// const task = `<li> <input type="checkbox" id=${count}> <label for=${count}></label> <span>${item}</span> <img src="./assets/bin.svg" alt="bin"> <img src="./assets/edit.svg" alt="edit"></li>`;
