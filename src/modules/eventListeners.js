// Module responsiblibilities:
// - Query elements and setup event listeners
// - Calls appLogic functions 
import { displayProject, editProject, submitProject, deleteProject, addProject, addTask, submitTask, editTask, deleteTask, checkTask, toggleCheck, displayToday, displayThisWeek } from './appLogic'
import { closeProjForms, closeTaskForms, updateProjDropdown, updatePriDropdown } from './updateDOM'

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

    document.removeEventListener('click', setupDropdownListener);
}
const setupTaskFormListener = (taskForm, dispID) => {
    const taskID = taskForm.id.slice(0, -4);
    const cancelButton = document.querySelector(`#${taskID}CANCEL`);
    const projDropdown = document.querySelector('.projSelCont');

    cancelButton.addEventListener('click', () => closeTaskForms());
    taskForm.addEventListener('submit', (e) => submitTask(e, dispID));
    document.addEventListener('click', setupDropdownListener);
}

const setupDropdownListener = (event) => {
    // figure out how to enable other listeners in form
    const isDropDownButton = event.target.closest('.dropdown');
    const isDropDownItem = event.target.closest('.dropdown-item');
    const isTaskForm = event.target.closest('.taskForm');
    // if (!isDropDownButton && event.target.closest('.dropdown') != null) return; // do nothing if click is inside dropdown menu

    if (isDropDownItem) {
        
        if (isDropDownItem.closest('.menu-proj')) {
            const selectedProjID = isDropDownItem.id.slice(0, -8);
            updateProjDropdown(selectedProjID);    
        } else if(isDropDownItem.closest('.menu-pri')) {
            // const selectedTaskID = isDropDownItem.closest('.taskForm').id.slice(0, -4);
            const selectedPriority = isDropDownItem.id;
            updatePriDropdown(selectedPriority);
        }
    }
    
    let currentDropdown;
    if (isDropDownButton) {
        currentDropdown = event.target.closest('.dropdown');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('.dropdown.active').forEach(dropDown => {
        if (dropDown === currentDropdown) return;
        dropDown.classList.remove('active');
    })

    if (isTaskForm && !isDropDownButton) return; // allows other form click events to occur
    event.preventDefault();

}

export { setupProjEventListeners, setupProjFormListener, setupTaskEventListeners, setupTaskFormListener, setupNavEventListeners };