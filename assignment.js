const taskTable=document.getElementById("taskTable");
const addBtn=document.getElementById("addBtn");
const taskinput=document.getElementById("taskinput");
const summary=document.getElementById("summary");

let tasks =[];
addBtn.addEventListener("click", addTask);
