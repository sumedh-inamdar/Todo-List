/*

- Tasks
    - Seperate module
    - Factory function to generate task
    - Properties: 
        - title
        - description
        - due date
        - priority
        - isComplete
    - functions
        - change properties
- Projects
    - contains many tasks
    - properties:
        - 
- DOM


*/

import { Storage } from './modules/storage.js'
import { Project, Inbox } from './modules/project.js'
import { Schedule, Task } from './modules/task.js'
import { loadApp } from './modules/appLogic'

const render = (() => {
    
    // sample projects
    const inbox = Inbox();
    Storage.addProject(inbox);
    Storage.addProject(Project('proj1', 'Cleaning'));
    Storage.addProject(Project('proj2', 'Packing'));
    Storage.addProject(Project('proj3', 'Mopping'));

    // sample inbox tasks
    const task1 = Task('task1', 'Garbage', 'Take garbage out to street','2021-12-08', 'p1');
    const task2 = Task('task2', 'Bathroom Floors', 'Clean bathroom floors','2021-12-09', 'p2');
    const task3 = Task('task3', 'Kitchen Floors', 'Clean kitchen floors','2021-12-31', 'p3');
    const task4 = Task('task4', 'Vacation', 'Buy ticket to Mexico','2022-01-28', 'p3');
    
    Storage.getProject(inbox.getID()).addTask(task1);
    Storage.getProject(inbox.getID()).addTask(task2);
    Storage.getProject(inbox.getID()).addTask(task3);
    Storage.getProject(inbox.getID()).addTask(task4);

    Storage.addTaskID('task1');
    Storage.addTaskID('task2');
    Storage.addTaskID('task3');
 
    loadApp();

})();

render;
