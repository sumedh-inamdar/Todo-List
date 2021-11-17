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


const render = (() => {
    
    Storage.addProject(Project('Cleaning'));
    Storage.addProject(Project('Packing'));
    Storage.addProject(Project('Mopping'));
    DOMLoader.loadSideBar();
    
})();

render;
