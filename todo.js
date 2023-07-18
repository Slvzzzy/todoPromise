'use strict'
const inputBox = document.getElementById("input-box"),
    taskContainer = document.querySelector(".container");
let activeEditTaskIndex;
const todoTask = JSON.parse(localStorage.getItem("todoTask")) || []
const saveTaskToLocalStorage = () => {
    localStorage.setItem('todoTask', JSON.stringify(todoTask));
}
window.onload = () => {
    render();
}
const task = () => {
    const text = inputBox.value;
    const newTask = {
        text,
        checked: true
    };
    todoTask.push(newTask);
    render();
}
const render = () => {
    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild);
    }
    todoTask.map(({text, checked},i) => {
        if (activeEditTaskIndex === i) {
            createEditTask({text, checked},i)
        }
        else {
            creatActiveTask({text, checked},i)
        }
    } )
    inputBox.value = '';
    saveTaskToLocalStorage();
    saveCheckBoxToLocalStorage();
}

const createEditTask = ({text, checked},i) => {
    const
        containerDiv = document.createElement('div'),
        editInput = document.createElement('input'),
        editButton = document.createElement('button')
    editInput.id = 'inputText';
    editInput.type = 'text';
    editInput.value =  {text, checked}.text;
    editButton.innerHTML = 'Apply';
    editButton.onclick = function () { editTask(i) };
    containerDiv.appendChild(editInput);
    containerDiv.appendChild(editButton);
    taskContainer.appendChild(containerDiv);
}
const creatActiveTask = ({text, checked},i) => {
    const
        containerDivMane = document.createElement('div'),
        checkBoxInput = document.createElement('input'),
        containerDivTask = document.createElement('div'),
        containerEditButton = document.createElement('button'),
        containerDeleteButton = document.createElement('button');
    containerDivTask.innerHTML = `task: ${{text, checked}.text}`;
    checkBoxInput.onclick = function () { editCheckBox(i) };
    checkBoxInput.id = 'checkedStorage';
    checkBoxInput.type = 'checkbox';
    checkBoxInput.checked = {text, checked}.checked;
    containerDeleteButton.onclick = function () { onDeleteTask(i) };
    containerDeleteButton.innerHTML = 'delete';
    containerEditButton.onclick = function () { onEditTask(i) };
    containerEditButton.innerHTML = 'edit';
    containerDivMane.appendChild(containerDivTask);
    containerDivMane.appendChild(containerDeleteButton);
    containerDivMane.appendChild( containerEditButton);
    containerDivMane.appendChild( checkBoxInput);
    taskContainer.appendChild( containerDivMane);
}
const onDeleteTask = (i) => {
    todoTask.splice(i,1);
    render();
}
const onEditTask = (i) => {
    activeEditTaskIndex = i;
    render();
}
const editTask = (i) => {
    const editTaskText = taskContainer.querySelector('#inputText');
    todoTask[i].text = editTaskText.value;
    activeEditTaskIndex = null;
    render();
}
const editCheckBox =(i) => {
    const editTaskChecked = taskContainer.querySelector('#checkedStorage');
    todoTask[i].checked = editTaskChecked.checked;
    saveTaskToLocalStorage();
}

const editTaskCheckBox = JSON.parse(localStorage.getItem("editTaskCheckBox")) || []
const saveCheckBoxToLocalStorage = () => {
    localStorage.setItem('editTaskCheckBox', JSON.stringify(editTaskCheckBox));
}