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
        const taskList = [];

        Storage.addProject(inbox);
        
        Storage.addProject(Project('proj1', 'Household'));
        Storage.addProject(Project('proj2', 'Odin Project'));
        Storage.addProject(Project('proj3', 'Holidays'));
        Storage.addProject(Project('proj4', 'Vacation'));
        
        taskList.push(Task('task1', 'Garbage', 'Take garbage out to street','2021-12-31', 'p3', 'proj1'));
        taskList.push(Task('task2', 'Bathroom Floors', 'Clean bathroom floors','2021-12-23', 'p1', 'proj1'));
        taskList.push(Task('task3', 'Kitchen Floors', 'Clean kitchen floors','2021-12-27', 'p2', 'proj1'));

        taskList.push(Task('task4', 'SOLID', 'Read and understand SOLID principles', '2021-12-30', 'p1', 'proj2'));
        taskList.push(Task('task5', 'CSS', 'Play around / get familiar with Flexbox', '2022-01-05', 'p2', 'proj2'));

        taskList.push(Task('task6', 'Gifts', 'Buy christmas gifts for partner','2021-12-23', 'p1', 'proj3'));
        taskList.push(Task('task7', 'Wrapping', 'Wrap all gifts and attach bowtie','2021-12-23', 'p2', 'proj3'));

        taskList.push(Task('task8', 'Vacation', 'Buy tickets to Mexico','2022-01-31', 'p3', 'proj4'));

        taskList.push(Task('task9', 'Todo list', 'Finish up todo list project','2021-12-22', 'p1', 'projInbox'));
        taskList.push(Task('task10', 'Javascript', 'Get familiar with advanced javascript methods','2021-12-28', 'p2', 'projInbox'));
        taskList.push(Task('task11', 'Tennis', 'Reserve court and schedule next league match','2021-12-24', 'p3', 'projInbox'));
        taskList.push(Task('task12', 'Call back Tim', '','2022-01-15', 'p4', 'projInbox'));

        taskList.forEach(task => {
            Storage.getProject(task.getProjID()).addTask(task);
            Storage.addTaskID(task.getID());
        })
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