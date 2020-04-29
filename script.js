window.onkeyup = keyup;
window.onload = scrollChecker;
function keyup(e){
  if(e.keyCode == 13){
    var input = document.getElementById("input").value;

    var ul = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.setAttribute('class','list-item');
    li.appendChild(document.createTextNode(input));
    ul.appendChild(li);

    var t = scrollChecker();
    console.log(t);
  }
}

function scrollChecker(){
  var container = document.querySelector(".container");
  var li = container.getElementsByTagName("li");
  if(li.length>3){
    container.setAttribute("style", "overflow-y:scroll");
    return li.length;
  }
  else{
    container.setAttribute("style", "height: 250px;");
  }
}

function strike(event) {
  var target = event.target || event.srcElement;
  target.setAttribute("style", "text-decoration: line-through;")
  // var ul = document.getElementById("dynamic-list");
  // ul.removeChild(target);
}

