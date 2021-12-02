// Module responsiblibilities:
// - Handles updating DOM elements
// - Updates DOM with current active projects / tasks
import { createProject, createAddProj, createTask, createHR, createAddTask, createAddTaskForm } from './createDOM'
import { setupProjEventListeners, setupTaskEventListeners } from './eventListeners';
import { Storage } from './storage'
import { getTasks } from './appLogic'

const updateProjectList = () => {

    document.querySelectorAll('.projItem').forEach(item => item.remove());

    const refNode = document.querySelector('#addProj');
    const parentNode = refNode.parentNode;

    Storage.getProjects().forEach(proj => parentNode.insertBefore(createProject(proj), refNode));

    setupProjEventListeners();
}
const updateTaskList = (projID) => {

    closeTaskForms(projID);
    document.querySelectorAll('.taskItem').forEach(task => task.remove());
    document.querySelectorAll('hr').forEach(hr => hr.remove());

    const mainHeader = document.querySelector('#mainHeader');
    const refNode = document.querySelector('#addTask');
    const parentNode = refNode.parentNode;

    const activeTasks = getTasks(projID);

    activeTasks.forEach(task => {
        parentNode.insertBefore(createTask(task), refNode);
        parentNode.insertBefore(createHR(), refNode);
    });
    mainHeader.textContent = Storage.getProject(projID).getName();

    // Later
    setupTaskEventListeners();
}
const closeAllForms = (projID) => {
    closeProjForms();
    closeTaskForms(projID);
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
const closeTaskForms = (projID) => {
    const taskForms = document.querySelectorAll('.taskForm');

    taskForms.forEach(taskForm => {
        const taskID = taskForm.id.slice(0, -4);
        const task = Storage.getProject(projID).getTask(taskID);
        const taskDIV = task ? createTask(task) : createAddTask();

        taskForm.replaceWith(taskDIV);
    })

    setupTaskEventListeners();
}
const removeTaskForm = (taskForm) => {
    taskForm.replaceWith(createAddTask());
}

export { updateProjectList, updateTaskList, closeAllForms, closeProjForms, closeTaskForms, removeTaskForm };