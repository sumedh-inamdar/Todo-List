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

import { DOMLoader } from './modules/DOM.js';
import { Storage } from './modules/storage.js';
import { Project } from './modules/project.js';
import { Task } from './modules/task.js';


const render = (() => {
    
    // sample projects
    Storage.addProject(Project('Cleaning'));
    Storage.addProject(Project('Packing'));
    Storage.addProject(Project('Mopping'));

    // sample inbox tasks
    Storage.addInboxTask(Task(1, 'Garbage', 'Take garbage out to street','Dec 8', 'p1'));
    Storage.addInboxTask(Task(2, 'Bathroom Floors', 'Clean bathroom floors','Dec 9', 'p2'));
    Storage.addInboxTask(Task(3, 'Kitchen Floors', 'Clean kitchen floors','Wednesday', 'p3'));

    // load DOM elements
    DOMLoader.loadHeader();
    DOMLoader.loadSideBar();
    DOMLoader.loadMain();

})();

render;
