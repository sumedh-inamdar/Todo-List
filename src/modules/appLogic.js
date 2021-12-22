import { updateProjectList, updateTaskList, closeAllForms, removeTaskForm } from './updateDOM'
import { createDOM, createProjForm, createAddTaskForm } from './createDOM'
import { setupProjFormListener, setupTaskFormListener, setupNavEventListeners } from './eventListeners'
import { Storage } from './storage'
import { Project } from './project'
import { Schedule, Task } from './task'
import { isBefore, parseISO } from 'date-fns'

const loadApp = () => {
    if (Storage.checkLocalStorage()) Storage.loadLocalStorage();
    else Storage.createLocalStorage();

    createDOM();
    setupNavEventListeners(); // nav corresponds to ('inbox, 'today', 'this week')
    updateProjectList();
    updateTaskList('projInbox');
}
const expandSidebar = () => {
    const sidebar = document.querySelector('#sideBar');
    sidebar.classList.toggle('collapsed');
}
const displayProject = (event) => {
    if (event.target.matches('i')) return;
    closeAllForms();
    const projID = event.target.closest('.projItem').id.slice(0, -4);
    updateTaskList(projID);
}
const displayInbox = (event) => {
    closeAllForms();
    updateTaskList('projInbox');
}
const displayToday = (event) => {
    closeAllForms();
    updateTaskList('Today');
}
const displayThisWeek = (event) => {
    closeAllForms();
    updateTaskList('This Week');
}
const editProject = (event) => {
    closeAllForms();

    const currProjID = event.target.id.slice(0,-4);
    const projForm = createProjForm(currProjID);
    const projItem = event.target.closest('.projItem');

    projItem.replaceWith(projForm);
 
    setupProjFormListener(projForm);
}
const submitProject = (event) => {
    const projID = event.target.id.slice(0,-4);
    const newProjName = document.querySelector('#projInput').value;

    if (Storage.isProjNameTaken(newProjName) ) alert('Project name exists');
    else if (Storage.getProject(projID)) Storage.updateProjectName(projID, newProjName);  
    else Storage.addProject(Project(projID, newProjName));

    updateProjectList();
    Storage.saveToLocalStorage();
    event.preventDefault();
}
const deleteProject = (event) => {
    closeAllForms();

    const projID = event.target.id.slice(0, -3);
    Storage.deleteProject(projID);

    updateProjectList();
    updateTaskList('projInbox');
    Storage.saveToLocalStorage();
}
const addProject = (event) => {
    closeAllForms();

    const projID = Storage.generateProjID();
    const projForm = createProjForm(projID);

    document.querySelector('#addProj').replaceWith(projForm);
    setupProjFormListener(projForm);
}
const toggleProjIcons = (event) => {
    const projItem = event.target.closest('.projItem');
    const projIcons = projItem.querySelectorAll('.fa-edit, .fa-trash-alt');

    projIcons.forEach(projIcon => projIcon.classList.toggle('inactive'));
}
const expandProjHeader = (event) => {
    const projList = document.querySelector('#projList');
    const arrowIcon = document.querySelector('#proj-expand-icon');

    projList.classList.toggle('projList-transitioned');
    arrowIcon.classList.toggle('collapsed');
}
const toggleTaskHover = (event) => {
    const taskItem = event.target.closest('.taskItem');
    const taskIcons = taskItem.querySelectorAll('.fa-edit, .fa-trash-alt');

    taskItem.classList.toggle('taskHover');
    taskIcons.forEach(taskIcon => taskIcon.classList.toggle('inactive'));
}
const getTasks = (projID) => {
    if (projID.startsWith('proj')) return Storage.getProject(projID).getTasks();
    if (projID === 'Today') {
        const allTasks = Storage.getProjects().map(proj => proj.getTasks()).flat();
        const tasksToday = allTasks.filter(task => task.getDate() === Schedule().getDateToday());

        return tasksToday;
    } 
    else if (projID === 'This Week') {
        const allTasks = Storage.getProjects().map(proj => proj.getTasks()).flat();
        const tasksThisWeek = allTasks.filter(task => Schedule().isThisWeek(task.getDate()));
        
        return tasksThisWeek;
    }
}
const sortTasks = (tasks, sortOrder) => {
    let shallowCopy = tasks.slice(); // ensures default ordering is untouched

    if (sortOrder === 'byDefault') return shallowCopy;
    if (sortOrder === 'byDate') return shallowCopy.sort((a, b) => {
        if (compareTaskByDate(a, b) !== 0) return compareTaskByDate(a, b);
        if (compareTaskByPriority(a, b) !== 0) return compareTaskByPriority(a, b);
        return 0;
    });
    if (sortOrder === 'byPriority') return shallowCopy.sort((a, b) => {
        if (compareTaskByPriority(a, b) !== 0) return compareTaskByPriority(a, b);
        if (compareTaskByDate(a, b) !== 0) return compareTaskByDate(a, b);
        return 0;
    });
}
const compareTaskByDate = (a, b) => {
    const dateA = a.getDate();
    const dateB = b.getDate();
    
    if (isBefore(parseISO(dateA), parseISO(dateB))) return -1;
    if (isBefore(parseISO(dateB), parseISO(dateA))) return 1;
    return 0;
}
const compareTaskByPriority = (a, b) => {
    const priA = a.getPriority()[1];
    const priB = b.getPriority()[1];

    if (priA - priB < 0) return -1;
    if (priA - priB > 0) return 1;
    return 0;
}
const addTask = (dispID) => {
    closeAllForms();

    const addTaskDIV = document.querySelector('#addTask');
    const taskID = Storage.generateTaskID();
    const taskForm = createAddTaskForm(taskID, dispID);

    addTaskDIV.replaceWith(taskForm);
    setupTaskFormListener(taskForm, dispID);
}
const submitTask = (event, dispID) => {
    event.preventDefault();

    const taskID = event.target.id.slice(0, -4);
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDesc = document.querySelector('#taskDesc').value;
    const taskDate = document.querySelector('#taskDate').value;
    const taskPriority = document.querySelector('.priSelCont').id.slice(0, -6); 
    const taskProj = document.querySelector('.projSelCont').id.slice(0, -6); 

    if (Storage.taskID_exists(taskID)) {
        const newTask = Storage.getTask(taskID);
        const currProjID = newTask.getProjID();
        newTask.update(taskTitle, taskDesc, taskDate, taskPriority, taskProj);

        if (taskProj === currProjID) { // checks if user changed project of task
            Storage.getProject(taskProj).updateTask(taskID, newTask);
        } else {
            Storage.getProject(currProjID).removeTask(taskID);
            Storage.getProject(taskProj).addTask(newTask);
        }
    } else {
        const newTask = Task(taskID, taskTitle, taskDesc, taskDate, taskPriority, taskProj);
        Storage.getProject(taskProj).addTask(newTask);
        Storage.addTaskID(taskID);
        removeTaskForm(event.target);
    }
    updateTaskList();
    Storage.saveToLocalStorage();
}
const editTask = (event) => {
    closeAllForms();

    const currTaskID = event.target.closest('.taskItem').id.slice(0, -4);
    const currTaskItem = document.querySelector(`#${currTaskID}ITEM`);
    const currProjID = Storage.getTask(currTaskID).getProjID();
    const taskForm = createAddTaskForm(currTaskID, currProjID);
    currTaskItem.replaceWith(taskForm);

    setupTaskFormListener(taskForm, currProjID);
}
const deleteTask = (event) => {
    closeAllForms();

    const taskID = event.target.id.slice(0, -3);

    const activeProjID = Storage.getTask(taskID).getProjID();
    const activeProj = Storage.getProject(activeProjID);
    activeProj.removeTask(taskID);
    Storage.updateProject(activeProjID, activeProj);

    Storage.removeTaskID(taskID);
    
    updateTaskList();
    Storage.saveToLocalStorage();
}
const toggleCheck = (event) => {
    const taskID = event.target.id.slice(0, -5);
    const task = Storage.getTask(taskID);

    if (!task.isCompleted()) {
        event.target.classList.toggle('fa-check-circle');
        event.target.classList.toggle('fa-circle');
    }
}
const checkTask = (event) => {
    const taskID = event.target.id.slice(0, -5);
    const task = Storage.getTask(taskID);

    task.check();
    updateTaskList();
    Storage.saveToLocalStorage();
}

export { loadApp, expandSidebar, displayProject, editProject, submitProject, deleteProject, addProject, toggleProjIcons, expandProjHeader, toggleTaskHover, getTasks, sortTasks, addTask, submitTask, editTask, deleteTask, toggleCheck, checkTask, displayInbox, displayToday, displayThisWeek }