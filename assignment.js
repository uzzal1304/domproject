const taskTable=document.getElementById("taskTable");
const addBtn=document.getElementById("addBtn");
const taskinput=document.getElementById("taskinput");
const summary=document.getElementById("summary");

let tasks =[];
addBtn.addEventListener("click", addTask);
taskinput.addEventListener("keypress",(e)=>{
    if(e.key==="Enter") addTask();
});
function addTask(){
    const text = taskinput.value.trim();
    if(text=== "") return;

    const today = new Date();
    const date = today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
    });
    const task = {
        id:Date.now(),
        text,
        date,
        completed: false,
    };
    tasks.push(task);
    taskinput.value="";
    renderTasks();
}
function renderTasks(){
    taskTable.innerHTML="";
    tasks.forEach((task, index) =>{
        const row = document.createElement("tr");
        row.className ="border-b hover:bg-gray-50";

        row.innerHTML = `<td class="py-2 border">${index + 1}</td>
        <td class="py-2 border">${task.text}</td>
        <td class="py-2 border">${task.date}</td>
        <td class="py-2 border"><input type="checkbox" ${task.completed ? "checked" : ""} class="accent-teal-500">        </td>
        <td class="py-2 border">
        <button class="edit-btn text-blue-500 hover:text-blue-700 mr-2">pen</button>    </td>        
        <button class="delete-btn text-red-500 hover:text-red-700 ">delete</button> </td>`;  
        
        row.querySelector("input").addEventListener("change", (e)=>{
            task.completed = e.target.checked;
            updateSummary();
        });
        row.querySelector(".delete-btn").addEventListener("click",()=>{
            tasks = tasks.filter((t)=> t.id !==task.id);
            renderTasks();
        });
        row.querySelector(".edit-btn").addEventListener("click",()=>{
            const newText= prompt("Edit your task:", task.text);
            if (newText !== null &&newText.trim() !== ""){task.text = newText.trim();
                renderTasks();
            }
        });
        taskTable.appendChild(row);
    });
    updateSummary();
}
function updateSummary(){
    const total = tasks.length;
    const completed = tasks.filter((t)=>t.completed).length;
    const pending = total - completed;
    summary.textContent = `${total} Total, ${completed}, ${pending} Pending`;
}