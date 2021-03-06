import { createProject, createAddProj, createTask, createHR, createAddTask, createProjSelectButton, createPrioritySelectButton } from './createDOM'
import { setupProjEventListeners, setupTaskEventListeners } from './eventListeners';
import { Storage } from './storage'
import { getTasks, sortTasks } from './appLogic'

let currDispID = 'projInbox';
let currSortOrder = 'byDefault';

const updateProjectList = () => {
    const projList = document.querySelector('#projList');

    while (projList.firstChild) projList.removeChild(projList.firstChild);

    Storage.getProjects().forEach(proj => {
        if(proj.getID() !== 'projInbox') projList.appendChild(createProject(proj));
    });
    projList.appendChild(createAddProj());

    setupProjEventListeners();
}
const updateTaskList = (dispID) => {
    if(dispID) currDispID = dispID;
    
    const headerName = currDispID.startsWith('proj') ? Storage.getProject(currDispID).getName() : currDispID;
    const currTasks = getTasks(currDispID);
    const sortedTasks = sortTasks(currTasks, currSortOrder);
    
    closeTaskForms();
    removeTaskItems();
    addTaskItems(sortedTasks);
    updateNavBar();
    updateProjQty();
    updateHeader(headerName);
    updateSortBy();
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
const updateNavBar = () => {
    document.querySelector('#inbox-qty-span').textContent = Storage.getProject('projInbox').getTasks().length;
    document.querySelector('#today-qty-span').textContent = getTasks('Today').length;
    document.querySelector('#thisWeek-qty-span').textContent = getTasks('This Week').length;
}
const updateProjQty = () => {
    document.querySelectorAll('.projQty').forEach(projNumber => {
        const projID = projNumber.closest('.projItem').id.slice(0, -4);
        projNumber.textContent = Storage.getProject(projID).getTasks().length;
    })
}
const updateHeader = (headerName) => {
    const mainHeader = document.querySelector('#mainHeader');
    mainHeader.textContent = headerName;
}
const updateSortBy = () => {
    document.querySelector('#sortByButton').textContent = 'Sort by: ' + currSortOrder.slice(2);
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
        if (proj) {
            projForm.replaceWith(createProject(proj));
        } else {
            projForm.replaceWith(createAddProj());
        }
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
const updateProjDropdown = (projID) => {
    const projCont = createProjSelectButton(projID);
    document.querySelector('.projSelCont').replaceWith(projCont);
}
const updatePriDropdown = (priority) => {
    const priCont = createPrioritySelectButton(priority);
    document.querySelector('.priSelCont').replaceWith(priCont);
}
const updateSortDropdown = (sortOrder) => {
    currSortOrder = sortOrder;
}

export { updateProjectList, updateTaskList, closeAllForms, closeProjForms, closeTaskForms, removeTaskForm, updateProjDropdown, updatePriDropdown, updateSortDropdown };