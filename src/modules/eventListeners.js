import { expandSidebar, displayProject, editProject, submitProject, deleteProject, addProject, toggleProjIcons, expandProjHeader, toggleTaskHover, addTask, submitTask, editTask, deleteTask, checkTask, toggleCheck, displayInbox, displayToday, displayThisWeek } from './appLogic'
import { closeProjForms, closeTaskForms, updateProjDropdown, updatePriDropdown, updateSortDropdown, updateTaskList } from './updateDOM'

const setupNavEventListeners = () => {
    const navMenuIcon = document.querySelector('#nav-menu-icon');
    const inboxNode = document.querySelector('#projInboxLI');
    const todayNode = document.querySelector('#today');
    const thisWeekNode = document.querySelector('#thisWeek');

    navMenuIcon.addEventListener('click', expandSidebar);
    inboxNode.addEventListener('click', displayInbox);
    todayNode.addEventListener('click', displayToday);
    thisWeekNode.addEventListener('click', displayThisWeek);
}
const setupProjEventListeners = () => {
    const projHeader = document.querySelector('#proj-header-div');
    const projItems = document.querySelectorAll('.projItem');
    const editNodes = document.querySelectorAll('.projItem > .fa-edit');
    const delNodes = document.querySelectorAll('.projItem > .fa-trash-alt');
    const addProjNode = document.querySelector('#addProj');
    
    projHeader.addEventListener('click', expandProjHeader);
    projItems.forEach(projItem => projItem.addEventListener('mouseenter', toggleProjIcons));
    projItems.forEach(projItem => projItem.addEventListener('mouseleave', toggleProjIcons));
    projItems.forEach(projNode => projNode.addEventListener('click', displayProject))
    editNodes.forEach(editNode => editNode.addEventListener('click', editProject));
    delNodes.forEach(delNode => delNode.addEventListener('click', deleteProject));
    addProjNode.addEventListener('click', addProject);
}
const setupProjFormListener = (projForm) => {
    const projID = projForm.id.slice(0, -4);
    const cancelIcon = document.querySelector(`#${projID}CANCEL`);
    const projInput = document.querySelector('#projInput');

    projInput.focus();
    cancelIcon.addEventListener('click', () => closeProjForms());
    projForm.addEventListener('submit', submitProject);
    projForm.addEventListener('keyup', (event) => {
        if (event.code === 'Escape') return closeProjForms()
    })
}
const setupTaskEventListeners = (dispID) => {
    const checkNodes = document.querySelectorAll('.check');
    const editNodes = document.querySelectorAll('.taskItem .fa-edit');
    const delNodes = document.querySelectorAll('.taskItem .fa-trash-alt');
    const addTaskDIV = document.querySelector('#addTask');
    const taskCont = document.querySelectorAll('.taskCont');

    taskCont.forEach(taskNode => taskNode.addEventListener('mouseenter', toggleTaskHover));
    taskCont.forEach(taskNode => taskNode.addEventListener('mouseleave', toggleTaskHover));
    taskCont.forEach(taskNode => taskNode.addEventListener('click', editTask));
    checkNodes.forEach(checkNode => checkNode.addEventListener('mouseenter', toggleCheck));
    checkNodes.forEach(checkNode => checkNode.addEventListener('mouseleave', toggleCheck));
    checkNodes.forEach(checkNode => checkNode.addEventListener('click', checkTask));
    editNodes.forEach(editNode => editNode.addEventListener('click', editTask));
    delNodes.forEach(delNode => delNode.addEventListener('click', deleteTask));
    addTaskDIV.addEventListener('click', () => addTask(dispID));
    document.addEventListener('click', setupDropdownListener);
}
const setupTaskFormListener = (taskForm, dispID) => {
    const taskID = taskForm.id.slice(0, -4);
    const cancelButton = document.querySelector(`#${taskID}CANCEL`);
    const taskTitle = document.querySelector('#taskTitle');
    const saveButton = document.querySelector('.saveButton');

    taskTitle.focus();
    cancelButton.addEventListener('click', () => closeTaskForms());
    taskForm.addEventListener('submit', (e) => submitTask(e, dispID));
    document.addEventListener('keyup', (event) => {
        if (event.code === 'Escape') return closeTaskForms();
    })
}
const setupDropdownListener = (event) => {
    const isDropDownButton = event.target.closest('.dropdown');
    const isDropDownItem = event.target.closest('.dropdown-item');
    const isTaskForm = event.target.closest('.taskForm');
    const isProjForm = event.target.closest('.projForm');

    if (isDropDownItem) {
        if (isDropDownItem.closest('.menu-proj')) {
            const selectedProjID = isDropDownItem.id.slice(0, -8);
            updateProjDropdown(selectedProjID);    
        } else if(isDropDownItem.closest('.menu-pri')) {
            const selectedPriority = isDropDownItem.id;
            updatePriDropdown(selectedPriority);
        } else if(isDropDownItem.closest('.menu-sort')) {
            const selectedSort = isDropDownItem.id;
            updateSortDropdown(selectedSort);
            updateTaskList();
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
    if ((isTaskForm && !isDropDownButton) || isProjForm) return; // allows other form click events to occur
    event.preventDefault();
}

export { setupProjEventListeners, setupProjFormListener, setupTaskEventListeners, setupTaskFormListener, setupNavEventListeners };