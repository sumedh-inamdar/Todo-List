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
import { Task } from './modules/task.js';

const task1 = Task('a', 'b', 'c', 'd', 'e');
const task2 = Task('b', 'c', 'd', 'e', 'f');

console.log(task1.setTitle('cd'));
console.log(task1.getTitle());
console.log(task1.prototype === task2.prototype);