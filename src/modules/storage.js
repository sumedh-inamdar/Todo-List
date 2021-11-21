const TASK_LIMIT = 10000;
const inboxTasks = [];
const activeProjects = [];
const activeIDs = [];

const Storage = {
    addProject: (proj) => {
        activeProjects.push(proj);
    },
    getProjects: () => {
        return activeProjects;
    },
    getProject: (projName) => {
        return activeProjects.find(proj => proj.getName() === projname);
    },
    checkProject: (projName) => {
        return activeProjects.some(project => project.getName() === projName);
    },
    updateProject: (oldProjName, newProjName) => {
        activeProjects[activeProjects.findIndex(proj => Storage.checkProject(oldProjName))].setName(newProjName);
    },
    deleteProject: (projName) => {
        activeProjects.splice(activeProjects.findIndex(proj => Storage.checkProject(projName)), 1);
    },
    addInboxTask: (task) => {
        inboxTasks.push(task);
        activeIDs.push(task.getID());
    },
    getInboxTasks: () => {
        return inboxTasks;
    },
    generateTaskID: () => {
        
        if (activeIDs.length >= TASK_LIMIT) return false;
        
        let rand;
        do {
            rand = Math.ceil(Math.random() * TASK_LIMIT);
        } while (activeIDs.includes(rand));
        
        return rand;
    }
}


export { Storage }