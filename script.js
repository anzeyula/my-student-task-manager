const taskForm=
document.getElementById("taskForm");
const taskName=
document.getElementById("taskName");
const taskDate=
document.getElementById("taskDate");
const taskPriority=
document.getElementById("taskPriority");
const taskList=
document.getElementById("taskList");
const totalTask=
document.getElementById("totalTask");
const completedTasks=
document.getElementById("completedTasks");
const pendingTasks =
document.getElementById("pending Tasks");
let tasks=[];

try{
    task=
    JSON.parse(localStorage.getItem("studentTasks"))||[];
}catch (error){
    tasks=[];
}

function saveTasks(){
    localStorage.setItem("studentTasks",JSON.stringify(tasks));
    
}
function updateSummary() {
    totalTasks.textContent=tasks.length;

    const completed=tasks.filter(tasks=>task.completed).length;

    completedTasks.textContent=completed;
    pendingTasks.textContent=tasks.length-completed;
    
}
function renderTasks(){
    taskList.replaceChildren();
    
    if(tasks.length===0){
const message=document.createElement("p");
message.textContent="No tasks yet.Add your first task!";
taskList.appendChild(message);
}
tasks.forEach(task=>{
    const card=document.createElement("div");
    card.className="task";

    if(task.completed){
        card.classList.add("completed");
    }

    const info=document.createElement("div");
    info.className="task-info";

    const title=document.createElement("h3");
    title.textContent=task.name;

    const date=document.createElement("p");
    date.textContent="Due:"+task.date;

    const priority=document.createElement("p");
    priority.textContent="priority:"+task.priority;

    info.append(title,date,priority);

    const actions=document.createElement("div");
    actions.className="task-actions";


    const completeButton=document.createElement("button");
    completeButton.textContent=task.completed?"Undo":"Complete";

    completeButton.addEventListener("click",()=>{ task.completed=!task.completed;
    saveTasks();
renderTasks();
 });

const deleteButton=document.createElement("button");
deleteButton.textContent="Delete";
deleteButton.className="delete-btn";


deleteButton.addEventListener("click",()=>{tsks=tasks.filter(item=>item.id!==task.id);
saveTasks();
renderTasks();
});

actions.append(completeButton,deleteButton);
card.append(info,actions);
taskList.appendChild(card);
 });

 updateSummary();
}

taskForm.addEventListener("submit",event=>{event.preventDefault();

    const name=taskName.value.trim();
    const date=taskDate.value;
    const priority=taskPriroty.value;

    if(!name||!date){
        alert("Please enter a task name and due date.");
        return;
    }

    task.push({
        id:Date.now()+Math.random(),
        name:name,
        date:date,
        priority:priority,
        completed:false,
    });
    saveTasks();
    renderTasks();

    taskForm.reset();
    taskName.focus();

});
renderTasks();
