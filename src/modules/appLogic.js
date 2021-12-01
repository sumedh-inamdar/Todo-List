import { updateProjectList, updateTaskList, closeAllForms, removeTaskForm } from './updateDOM'
import { createDOM, createAddProj, createProjForm, createAddTaskForm } from './createDOM'
import { setupAllEventListeners, setupProjEventListeners, setupProjFormListener, setupTaskFormListener } from './eventListeners'
import { Storage } from './storage'
import { Project } from './project'
import { Task } from './task'

let currActiveProjID = 'projInbox';

const loadApp = () => {
    createDOM();
    updateProjectList();
    updateTaskList(currActiveProjID);
}
const editProject = (event) => {
    
    event.preventDefault();
    closeAllForms(currActiveProjID);

    const currProjID = event.target.id.slice(0,-4);
    const liNode = document.querySelector(`#${currProjID}LI`);
    const projForm = createProjForm(currProjID);
    liNode.replaceWith(projForm);

    setupProjFormListener(projForm);

}
const submitProject = (event) => {
    
    event.preventDefault();
    const projID = event.target.id.slice(0,-4);
    const newProjName = document.querySelector('#projInput').value;
    const ulElement = document.querySelector('#projList');

    if (Storage.checkProjectName(newProjName)) {
        alert('Project name exists');
        return;
    } else if (Storage.getProject(projID)) {
        Storage.updateProjectName(projID, newProjName);  
    } else {
        Storage.addProject(Project(projID, newProjName));
        
        // move below two lines of code to updateDOM
        event.target.parentNode.remove();
        ulElement.appendChild(createAddProj());
    }
    updateProjectList();
}
const deleteProject = (event) => {
    
    event.preventDefault();
    closeAllForms(currActiveProjID);

    const projID = event.target.id.slice(0, -3);
    Storage.deleteProject(projID);

    updateProjectList();

}
const addProject = (event) => {
    
    event.preventDefault();
    closeAllForms(currActiveProjID);

    const addProjLI = event.target;
    const projID = Storage.generateProjID();
    const projForm = createProjForm(projID);

    addProjLI.replaceWith(projForm);
    setupProjFormListener(projForm);
    

}
const getTasks = (projID) => {
    
    currActiveProjID = projID;

    return Storage.getProject(projID).getTasks();

    // Later: Setup Today and This week task fetch logic
}
const addTask = (event) => {
    
    event.preventDefault();
    closeAllForms(currActiveProjID);

    const addTaskDIV = document.querySelector('#addTask');
    const taskID = Storage.generateTaskID();
    const taskForm = createAddTaskForm(taskID, currActiveProjID);

    addTaskDIV.replaceWith(taskForm);
    setupTaskFormListener(currActiveProjID, taskForm);

}
const submitTask = (event) => {
    event.preventDefault();

    const currProj = Storage.getProject(currActiveProjID);

    const taskID = event.target.id.slice(0, -4);
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDesc = document.querySelector('#taskDesc').value;
    const taskDate = document.querySelector('#taskDate').value;

    if (currProj.getTask(taskID)) {
        const newTask = currProj.getTask(taskID);
        newTask.update(taskTitle, taskDesc, taskDate);
        currProj.updateTask(taskID, newTask);
    } else {
        const newTask = Task(taskID, taskTitle, taskDesc, taskDate);
        currProj.addTask(newTask);
        Storage.addTaskID(taskID);
        removeTaskForm(event.target);
    }

    Storage.updateProject(currActiveProjID, currProj);
    updateTaskList(currActiveProjID);

}
const editTask = (event) => {
    event.preventDefault();
    closeAllForms(currActiveProjID);

    const currTaskID = event.target.id.slice(0, -4);
    const currTaskItem = document.querySelector(`#${currTaskID}ITEM`);
    const taskForm = createAddTaskForm(currTaskID, currActiveProjID);
    currTaskItem.replaceWith(taskForm);

    setupTaskFormListener(currActiveProjID, taskForm);

}
const deleteTask = (event) => {
    console.log('delete task clicked');
}

export { loadApp, editProject, submitProject, deleteProject, addProject, getTasks, addTask, submitTask, editTask, deleteTask }