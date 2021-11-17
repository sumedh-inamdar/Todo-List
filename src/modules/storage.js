
const activeTasks = [];
const activeProjects = ['Cleaning', 'Packing', 'Mopping'];

const Storage = {
    addProject: (proj) => {
        activeProjects.push(proj);
    },
    getProjects: () => {
        return activeProjects;
    },
    checkProject: (proj) => {
        return activeProjects.includes(proj);
    },
    updateProject: (oldProj, newProj) => {
        activeProjects.splice(activeProjects.indexOf(oldProj), 1, newProj);
    },
    deleteProject: (proj) => {
        activeProjects.splice(activeProjects.indexOf(proj), 1);
    }
}


export { Storage }