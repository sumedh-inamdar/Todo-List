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


const render = (() => {

    DOMLoader.loadSideBar();

})();

render;
