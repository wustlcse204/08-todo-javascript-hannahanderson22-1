/*ToDo Personal JS*/
//Hannah Anderson ToDo API Key: d7cd5a-c3dbb2-67c015-083077-c82435

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if((this.readyState == 4) && (this.status == 200)){
    var tasklist = JSON.parse(this.responseText);
    console.log(tasklist);
    console.log(tasklist.length);

    for(var tasknum=0; tasknum<tasklist.length; tasknum++){
      createTask(tasklist[tasknum]);
    }
  }
};

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key", "d7cd5a-c3dbb2-67c015-083077-c82435");
xhttp.send();

function createTask(input){
  var taskid = input.id;
  var tasktext = input.text;
  var task = document.createElement("li");
  task.innerHTML = tasktext; //?

  var completetask = document.createElement("input");
  completetask.setAttribute("type", "checkbox");
  completetask.style.position="absolute";
  completetask.style.top="15px";
  completetask.style.left="5px";

  var deletetask = document.createElement("button");
  deletetask.innerHTML="Remove";
  deletetask.style.position="absolute";
  deletetask.style.top="15px";
  deletetask.style.left="30px";

  if(input.completed){ //?
    task.style.fontStyle="italic";
    task.style.textDecoration = "line-through";
  }

  var taskdiv = document.getElementById("tasks");
  task.setAttribute("id",taskid);
  task.setAttribute("text",tasktext);
  taskdiv.appendChild(task);
  task.appendChild(completetask);
  task.appendChild(deletetask);

  console.log(input.id);
  completetask.addEventListener("click", function(event){markComplete(taskid)}); //?
  deletetask.addEventListener("click", function(event){deleteItem(taskid)}); //?
}

document.getElementById("addtaskbutton").addEventListener("click", function(event){addTask()});

function addTask(){
  var inputsect = {text: document.getElementById("usertasksect").value};

  var xhttpb = new XMLHttpRequest();
  xhttpb.onreadystatechange = function (){
    if((this.readyState == 4)&&(this.status==200)){
      var task = JSON.parse(this.responseText);
      createTask(task);
    }
    else if(this.readyState==4){
      console.log(this.responseText);
    }
  };

  xhttpb.open("POST", "https://cse204.work/todos", true);
  xhttpb.setRequestHeader("content-type", "application/json"); //?
  xhttpb.setRequestHeader("x-api-key", "d7cd5a-c3dbb2-67c015-083077-c82435");
  xhttpb.send(JSON.stringify(inputsect));

  document.getElementById("usertasksect").value = "";
}

function markComplete(currentid){
  var taskcompletedid = currentid;
  var xhttpc = new XMLHttpRequest();
  var stat = {completed: true}; //?

  xhttpc.onreadystatechange = function(){
    if((this.readyState==4)&&(this.status==200)){
      console.log(document.getElementById(taskcompletedid));
      document.getElementById(taskcompletedid).style.textDecoration="line-through";
    }
    else if(this.readyState==4){
      console.log(this.responseText);
    }
  };

  xhttpc.open("PUT", "https://cse204.work/todos/"+taskcompletedid, true);
  xhttpc.setRequestHeader("content-type", "application/json");
  xhttpc.setRequestHeader("x-api-key", "d7cd5a-c3dbb2-67c015-083077-c82435");
  xhttpc.send(JSON.stringify(stat));
}
