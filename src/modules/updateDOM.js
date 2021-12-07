// Module responsiblibilities:
// - Handles updating DOM elements
// - Updates DOM with current active projects / tasks
import { createProject, createAddProj, createTask, createHR, createAddTask } from './createDOM'
import { setupProjEventListeners, setupTaskEventListeners } from './eventListeners';
import { Storage } from './storage'
import { getTasks } from './appLogic'

let currDispID = 'projInbox';

const updateProjectList = () => {

    document.querySelectorAll('.projItem').forEach(item => item.remove());

    const refNode = document.querySelector('#addProj');
    const parentNode = refNode.parentNode;

    Storage.getProjects().forEach(proj => {
        if(proj.getID() !== 'projInbox') parentNode.insertBefore(createProject(proj), refNode);
    });

    setupProjEventListeners();
}
const updateTaskList = (dispID) => {

    if(dispID) currDispID = dispID;

    const headerName = currDispID.startsWith('proj') ? Storage.getProject(currDispID).getName() : currDispID;

    closeTaskForms();
    removeTaskItems();
    addTaskItems(getTasks(currDispID));
    updateHeader(headerName);
    setupTaskEventListeners(currDispID);
}
const removeTaskItems = () => {
    document.querySelectorAll('.taskItem').forEach(task => task.remove());
    document.querySelectorAll('hr').forEach(hr => hr.remove());
}
const addTaskItems = (activeTasks) => {

    const refNode = document.querySelector('#addTask');
    const parentNode = refNode.parentNode;

    activeTasks.forEach(task => {
        parentNode.insertBefore(createTask(task), refNode);
        parentNode.insertBefore(createHR(), refNode);
    });
}
const updateHeader = (headerName) => {
    const mainHeader = document.querySelector('#mainHeader');
    mainHeader.textContent = headerName;
}
const closeAllForms = () => {
    closeProjForms();
    closeTaskForms();
}
const closeProjForms = () => {
    
    const projForms = document.querySelectorAll('.projForm');
    
    projForms.forEach(projForm => {
        const projID = projForm.id.slice(0, -4);
        const proj = Storage.getProject(projID);
        const liNode = proj ? createProject(proj).firstChild : createAddProj().firstChild;
        
        projForm.replaceWith(liNode);
    })

    setupProjEventListeners();
}
const closeTaskForms = () => {
    const taskForms = document.querySelectorAll('.taskForm');

    taskForms.forEach(taskForm => {
        const taskID = taskForm.id.slice(0, -4);
        const task = Storage.getTask(taskID);
        const taskDIV = task ? createTask(task) : createAddTask();

        taskForm.replaceWith(taskDIV);
    })

    setupTaskEventListeners(currDispID);
}
const removeTaskForm = (taskForm) => {
    taskForm.replaceWith(createAddTask());
}

export { updateProjectList, updateTaskList, closeAllForms, closeProjForms, closeTaskForms, removeTaskForm };