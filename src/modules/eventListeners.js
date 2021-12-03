// Module responsiblibilities:
// - Query elements and setup event listeners
// - Calls appLogic functions 
import { displayProject, editProject, submitProject, deleteProject, addProject, addTask, submitTask, editTask, deleteTask, checkTask, toggleCheck } from './appLogic'
import { closeProjForms, closeTaskForms } from './updateDOM'

const setupAllEventListeners = () => {
    setupProjEventListeners();
    setupTaskEventListeners();
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
const setupTaskEventListeners = () => {
    const checkNodes = document.querySelectorAll('.check');
    const editNodes = document.querySelectorAll('.taskItem .fa-edit');
    const delNodes = document.querySelectorAll('.taskItem .fa-trash-alt');
    const addTaskDIV = document.querySelector('#addTask');

    checkNodes.forEach(checkNode => checkNode.addEventListener('mouseenter', toggleCheck));
    checkNodes.forEach(checkNode => checkNode.addEventListener('mouseleave', toggleCheck));
    checkNodes.forEach(checkNode => checkNode.addEventListener('click', checkTask));
    editNodes.forEach(editNode => editNode.addEventListener('click', editTask));
    delNodes.forEach(delNode => delNode.addEventListener('click', deleteTask));
    addTaskDIV.addEventListener('click', addTask);
}
const setupTaskFormListener = (projID, taskForm) => {
    const taskID = taskForm.id.slice(0, -4);
    const cancelButton = document.querySelector(`#${taskID}CANCEL`);

    cancelButton.addEventListener('click', () => closeTaskForms(projID));

    taskForm.addEventListener('submit', submitTask);
}

export { setupAllEventListeners, setupProjEventListeners, setupProjFormListener, setupTaskEventListeners, setupTaskFormListener };