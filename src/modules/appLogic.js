import { updateProjectList, updateTaskList, closeAllForms, removeTaskForm } from './updateDOM'
import { createDOM, createAddProj, createProjForm, createAddTaskForm } from './createDOM'
import { setupProjEventListeners, setupProjFormListener, setupTaskFormListener, setupNavEventListeners } from './eventListeners'
import { Storage } from './storage'
import { Project } from './project'
import { Schedule, Task } from './task'
import { isBefore, parseISO } from 'date-fns'

let currActiveProjID = 'projInbox';

const loadApp = () => {
    if (Storage.checkLocalStorage()) Storage.loadLocalStorage();
    else Storage.createLocalStorage();
    createDOM();
    setupNavEventListeners(); // nav corresponds to ('inbox, 'today', 'this week')
    updateProjectList();
    updateTaskList('projInbox');

}
const displayProject = (event) => {

    closeAllForms();
    const projID = event.target.id.slice(0, -2);
    updateTaskList(projID);
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
    const liNode = document.querySelector(`#${currProjID}LI`);
    const projForm = createProjForm(currProjID);
    liNode.replaceWith(projForm);

    setupProjFormListener(projForm);

}
const submitProject = (event) => {
    
    
    const projID = event.target.id.slice(0,-4);
    const newProjName = document.querySelector('#projInput').value;
    const ulElement = document.querySelector('#projList');

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

    const addProjLI = event.target;
    const projID = Storage.generateProjID();
    const projForm = createProjForm(projID);

    addProjLI.replaceWith(projForm);
    setupProjFormListener(projForm);

}
const getTasks = (projID) => {

    if (projID.startsWith('proj')) {
        return Storage.getProject(projID).getTasks();

    } else if (projID === 'Today') {
        const allTasks = Storage.getProjects().map(proj => proj.getTasks()).flat();
        const tasksToday = allTasks.filter(task => task.getDate() === Schedule().getDateToday());

        return tasksToday;

    } else if (projID === 'This Week') {
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
// Need to refactor this function when we add ability to change project for each Task
// add task (need to add to curr active project)
// edit task (update task with values from form)
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

    const currTaskID = event.target.id.slice(0, -4);
    const currTaskItem = document.querySelector(`#${currTaskID}ITEM`);
    const currProjID = Storage.getTask(currTaskID).getProjID();
    const taskForm = createAddTaskForm(currTaskID, currProjID);
    currTaskItem.replaceWith(taskForm);

    setupTaskFormListener(taskForm, currProjID);

}
const deleteTask = (event) => {
    
    closeAllForms();

    const taskID = event.target.id.slice(0, -3);

    // delete task from project
    const activeProjID = Storage.getTask(taskID).getProjID();
    const activeProj = Storage.getProject(activeProjID);
    activeProj.removeTask(taskID);
    Storage.updateProject(activeProjID, activeProj);

    // remove taskID from storage
    Storage.removeTaskID(taskID);
    
    updateTaskList();
    Storage.saveToLocalStorage();
}
const toggleCheck = (event) => {

    const taskID = event.target.id.slice(0, -5);
    const task = Storage.getTask(taskID);

    if (!task.isCompleted()) {
        // event.target.classList.toggle('far');
        // event.target.classList.toggle('fas');
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


export { loadApp, displayProject, editProject, submitProject, deleteProject, addProject, getTasks, sortTasks, addTask, submitTask, editTask, deleteTask, toggleCheck, checkTask, displayToday, displayThisWeek }