// Module responsiblibilities:
// - Query elements and setup event listeners
// - Calls appLogic functions 
import { displayProject, editProject, submitProject, deleteProject, addProject, addTask, submitTask, editTask, deleteTask, checkTask, toggleCheck, displayToday, displayThisWeek } from './appLogic'
import { closeProjForms, closeTaskForms } from './updateDOM'

// const setupAllEventListeners = () => {
//     setupProjEventListeners();
//     setupTaskEventListeners();
// }
const setupNavEventListeners = () => {
    const inboxNode = document.querySelector('#projInboxLI');
    const todayNode = document.querySelector('#today');
    const thisWeekNode = document.querySelector('#thisWeek');

    inboxNode.addEventListener('click', displayProject);
    todayNode.addEventListener('click', displayToday);
    thisWeekNode.addEventListener('click', displayThisWeek);
}
const setupProjEventListeners = () => {

    // later: setup event listeners for project LI elements
    const projNodes = document.querySelectorAll('.projItem li');
    const editNodes = document.querySelectorAll('.projItem .fa-edit');
    const delNodes = document.querySelectorAll('.projItem .fa-trash-alt');
    const addProjLI = document.querySelector('#addProjectLI');

    projNodes.forEach(projNode => projNode.addEventListener('click', displayProject))
    editNodes.forEach(editNode => editNode.addEventListener('click', editProject));
    delNodes.forEach(delNode => delNode.addEventListener('click', deleteProject));
    addProjLI.addEventListener('click', addProject);
}
const setupProjFormListener = (projForm) => {
    const projID = projForm.id.slice(0, -4);
    const cancelIcon = document.querySelector(`#${projID}CANCEL`);

    cancelIcon.addEventListener('click', () => closeProjForms());

    projForm.addEventListener('submit', submitProject);

}
const setupTaskEventListeners = (dispID) => {
    const checkNodes = document.querySelectorAll('.check');
    const editNodes = document.querySelectorAll('.taskItem .fa-edit');
    const delNodes = document.querySelectorAll('.taskItem .fa-trash-alt');
    const addTaskDIV = document.querySelector('#addTask');

    checkNodes.forEach(checkNode => checkNode.addEventListener('mouseenter', toggleCheck));
    checkNodes.forEach(checkNode => checkNode.addEventListener('mouseleave', toggleCheck));
    checkNodes.forEach(checkNode => checkNode.addEventListener('click', checkTask));
    editNodes.forEach(editNode => editNode.addEventListener('click', editTask));
    delNodes.forEach(delNode => delNode.addEventListener('click', deleteTask));
    addTaskDIV.addEventListener('click', () => addTask(dispID));
}
const setupTaskFormListener = (taskForm, dispID) => {
    const taskID = taskForm.id.slice(0, -4);
    const cancelButton = document.querySelector(`#${taskID}CANCEL`);

    cancelButton.addEventListener('click', () => closeTaskForms());

    taskForm.addEventListener('submit', (e) => submitTask(e, dispID));
}

export { setupProjEventListeners, setupProjFormListener, setupTaskEventListeners, setupTaskFormListener, setupNavEventListeners };