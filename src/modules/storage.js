import { Inbox, Project } from './project'
import { Task } from './task'

const PROJ_LIMIT = 1000;
const TASK_LIMIT = 10000;
let activeProjects = [];
let activeTaskIDs = [];
let activeProjIDs = [];

const getIndexByID = (projID) => {
    return activeProjects.findIndex(proj => proj.getID() === projID);
}

const Storage = {
    loadSampleProjects: () => {
        const inbox = Inbox();
        Storage.addProject(inbox);
        
        Storage.addProject(Project('proj1', 'Cleaning'));
        Storage.addProject(Project('proj2', 'Packing'));
        Storage.addProject(Project('proj3', 'Mopping'));
        
        const task1 = Task('task1', 'Garbage', 'Take garbage out to street','2021-12-31', 'p3', 'projInbox');
        const task2 = Task('task2', 'Bathroom Floors', 'Clean bathroom floors','2021-12-09', 'p1', 'projInbox');
        const task3 = Task('task3', 'Kitchen Floors', 'Clean kitchen floors','2021-12-31', 'p2', 'projInbox');
        const task4 = Task('task4', 'Vacation', 'Buy ticket to Mexico','2021-12-31', 'p3', 'projInbox');

        Storage.getProject(inbox.getID()).addTask(task1);
        Storage.getProject(inbox.getID()).addTask(task2);
        Storage.getProject(inbox.getID()).addTask(task3);
        Storage.getProject(inbox.getID()).addTask(task4);

        Storage.addTaskID('task1');
        Storage.addTaskID('task2');
        Storage.addTaskID('task3');
        Storage.addTaskID('task4');
    },
    createLocalStorage: () => {
        Storage.loadSampleProjects();
        Storage.saveToLocalStorage();
    },
    loadLocalStorage: () => {
        const arrayProjData = JSON.parse(localStorage.getItem('activeProjects'));
        activeProjects = Storage.convertJSONtoProjObj(arrayProjData);
        activeTaskIDs = JSON.parse(localStorage.getItem('activeTaskIDs'));
        activeProjIDs = JSON.parse(localStorage.getItem('activeProjIDs'));
    },
    convertJSONtoProjObj: (arrProjs) => {
        let arrayProjObj = [];
        arrProjs.forEach(projData => {
            const projObj = Project(projData.id, projData.name);
    
            projData.tasks.forEach(task => {
                const newTask = Task(task.id, task.title, task.description, task.date, task.priority, task.projID);
                if (task.completed) newTask.check();
                projObj.addTask(newTask);
            })
            
            arrayProjObj.push(projObj);
        })
        return arrayProjObj;
    },
    saveToLocalStorage: () => {
        let stringifiedProjects = Storage.getActiveProjectsStringified();
        localStorage.setItem('activeProjects', JSON.stringify(stringifiedProjects));
        localStorage.setItem('activeTaskIDs', JSON.stringify(activeTaskIDs));
        localStorage.setItem('activeProjIDs', JSON.stringify(activeProjIDs));
    },
    getActiveProjectsStringified: () => {
        let arrayProjData = [];
        activeProjects.forEach(project => {
            arrayProjData.push({ 
                id: project.getID(), 
                name: project.getName(), 
                tasks: Storage.getTasksStringified(project.getTasks()) })
        })
        return arrayProjData;
    },
    getTasksStringified: (tasks) => {
        let arrayTaskData = [];
        tasks.forEach(task => {
            arrayTaskData.push({
                id: task.getID(),
                title: task.getTitle(),
                description: task.getDescription(),
                date: task.getDate(),
                priority: task.getPriority(),
                projID: task.getProjID(),
                completed: task.isCompleted()
            })
        })
        return arrayTaskData;
    },
    checkLocalStorage: () => {
        return localStorage.getItem('activeProjects');
    },
    addTaskID: (id) => {
        activeTaskIDs.push(id);
        Storage.saveToLocalStorage();
    },
    removeTaskID: (id) => {
        activeTaskIDs.splice(activeTaskIDs.indexOf(id), 1);
        Storage.saveToLocalStorage();
    },
    addProject: (proj) => {
        activeProjects.push(proj);
        activeProjIDs.push(proj.getID());
    },
    getProjects: () => {
        return activeProjects;
    },
    getProject: (projID) => {
        return activeProjects[getIndexByID(projID)];
    },
    isProjNameTaken: (projName) => {
        return activeProjects.some(project => project.getName() === projName);
    },
    updateProject(projID, newProj) {
        activeProjects.splice(getIndexByID(projID), 1, newProj);
        Storage.saveToLocalStorage();
    },
    updateProjectName: (projID, newProjName) => {
        activeProjects[getIndexByID(projID)].setName(newProjName);
    },
    deleteProject: (projID) => {
        activeProjects.splice(activeProjects.findIndex(proj => proj.getID() === projID), 1);
        activeProjIDs.splice(activeProjIDs.indexOf(projID), 1)
    },
    getTask: (taskID) => {
        if (activeTaskIDs.includes(taskID)) return activeProjects.find(proj => proj.getTask(taskID)).getTask(taskID);
    },
    generateTaskID: () => {
        
        if (activeTaskIDs.length >= TASK_LIMIT) return false;
        
        let rand;
        do {
            rand = Math.ceil(Math.random() * TASK_LIMIT);
        } while (Storage.taskID_exists(`task${rand}`));
        
        return `task${rand}`;
    },
    generateProjID: () => {
        if (activeProjIDs.length >= PROJ_LIMIT) return false;

        let rand;
        do {
            rand = Math.ceil(Math.random() * PROJ_LIMIT);
        } while (Storage.projID_exists(`proj${rand}`));
        
        return `proj${rand}`;

    },
    projID_exists: (id) => {
        return activeProjIDs.includes(id);
    },
    taskID_exists: (id) => {
        return activeTaskIDs.includes(id);
    }
}


export { Storage }