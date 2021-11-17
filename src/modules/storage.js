
const activeTasks = [];
const activeProjects = [];

const Storage = {
    addProject: (proj) => {
        activeProjects.push(proj);
    },
    getProjects: () => {
        return activeProjects;
    },
    checkProject: (projName) => {
        return activeProjects.some(project => project.getName() === projName);
    },
    updateProject: (oldProjName, newProjName) => {
        activeProjects[activeProjects.findIndex(proj => Storage.checkProject(oldProjName))].setName(newProjName);
    },
    deleteProject: (projName) => {
        activeProjects.splice(activeProjects.findIndex(proj => Storage.checkProject(projName)), 1);
    }
}


export { Storage }