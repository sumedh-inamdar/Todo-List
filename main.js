/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMLoader": () => (/* binding */ DOMLoader)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task.js */ "./src/modules/task.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");
/* DOM.js 

Module responsible for DOM loading and manipulation

*/




const openLINodes = [];

const _createElement = (type, classNameArr, text, id) => {
    const element = document.createElement(type);
    if (classNameArr) element.classList.add(...classNameArr);
    if (text) element.textContent = text;
    if (id) element.id = id;
    return element;
}

// Handles loading and setup of sidebar
const DOMLoader = {
    loadHeader: () => {
        // Create div container and append to header element
        const headerDiv = _createElement('div', ['headerDiv'], 'To-Do Application');

        document.querySelector('header').appendChild(headerDiv);
    },
    loadSideBar: () => {
        
        const sideBar = document.querySelector('#sideBar');
        
        // Add section for Nav links (Inbox, Today..)
        sideBar.appendChild(_loadSideBarNavLinks());

        // Add section for Projects
        sideBar.appendChild(_loadSideBarProjLinks());
        
    },
    loadMain: () => {
        const mainContent = document.querySelector('#mainContent');

        // load task header
        mainContent.appendChild(_loadTaskHeader('Inbox'));

        // load task list for inbox
        mainContent.appendChild(_loadTaskList('Inbox'));
            // add edit and delete button upon hover

    }
}

// Setup of Inbox, Today and This week links
const _loadSideBarNavLinks = () => {
    const navCont = _createElement('div', ['flexCol'],'','sideBarNavCont');
    
    // Add inbox button
    const inbox = _createElement('div', ['sideBarLink'], 'Inbox');
    navCont.appendChild(inbox);
    inbox.addEventListener('click', inboxHandler);

    // Add today
    const today = _createElement('div', ['sideBarLink'], 'Today');
    navCont.appendChild(today);
    today.addEventListener('click', todayHandler);

    // Add this week
    const thisWeek = _createElement('div', ['sideBarLink'], 'This Week');
    navCont.appendChild(thisWeek);
    thisWeek.addEventListener('click', thisWeekHandler);
    
    return navCont;
}
// Sidebar navlink handlers
const inboxHandler = (event) => {
    console.log(event.target);
    // show all tasks in inbox
}
const todayHandler = (event) => {
    console.log(event.target);
    // show all tasks due today
}
const thisWeekHandler = (event) => {
    console.log(event.target);
    // show all tasks due today
}

const _loadSideBarProjLinks = () => {
    const projCont = _createElement('div', ['flexCol'], '', 'projCont');

    // Create Projects heading
    const projHeading = _createElement('div', ['projItem']);
    projHeading.appendChild(_createElement('h4', ['flexCol'], 'Projects'));
    projCont.appendChild(projHeading);

    // Create ul list element to append all projects as children to
    const projList = _createElement('ul', ['projList'], '', 'projList');
    projCont.appendChild(projList);
    
    // Add all active projects
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjects().forEach(proj => projList.appendChild(addProjectDOM(proj.getName())));

    // Add "Add project" list item
    projList.appendChild(createAddProj());

    return projCont;

}

// Adds projName to project List in DOM
const addProjectDOM = (projName) => {

    const projItem = _createElement('div', ['projItem'])

    // Add project name as listItem
    const liNode = _createElement('li', '', projName, projName + 'LI');
    projItem.appendChild(liNode);

    // Add edit project icon and setup event listener
    const editNode = _createElement('i', ['far','fa-edit']);
    projItem.appendChild(editNode)
    editNode.addEventListener('click', (event) => {
        const liNodeUpdated = event.target.previousSibling;
        if (liNodeUpdated.localName === 'li') editProject(liNodeUpdated);
    })

    // Add delete icon and setup event listener
    const delIcon = _createElement('i', ['far','fa-trash-alt']);
    delIcon.addEventListener('click', () => {
        deleteProject(projName, projItem);
    })
    projItem.appendChild(delIcon);

    return projItem;

}
// Adds "+ Add project" and setup
const createAddProj = () => {
    const addCont = _createElement('div', ['projItem']);

    addCont.appendChild(_createElement('li', ['noMarker'], '+ Add Project', '+ Add ProjectLI'));

    // store li in private array (openLINodes)
    openLINodes.push(addCont.firstChild);

    addCont.firstChild.addEventListener('click', (event) => {
        closeAllForms();
        
        const formProj = createProjForm('+ Add Project');
        formProj.firstChild.value = '';

        formProj.addEventListener('submit', (event) => {
            
            const newProjName = document.querySelector('#inputProj').value;
            console.log('project name being input is: ' + newProjName);
            if (_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.checkProject(newProjName)) {
                alert('Project name exists.');
            } else {
                _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addProject((0,_project_js__WEBPACK_IMPORTED_MODULE_2__.Project)(newProjName));

                event.target.parentNode.parentNode.insertBefore(addProjectDOM(newProjName), addCont);

                formProj.replaceWith(openLINodes.find(node => node.id === '+ Add ProjectLI'));
            }

            event.preventDefault();

        });
        addCont.firstChild.replaceWith(formProj);
        event.preventDefault();
    });

    return addCont;

}
// create project form element with supplied name as value
const createProjForm = (projNameDefault) => {

    // create form element
    const formProj = _createElement('form', '', '', projNameDefault + 'FORM');

    // create input element with placeholder value as project name
    const inputProj = _createElement('input', ['inputProj'], '', 'inputProj');
    inputProj.type = 'text';
    inputProj.required = true;
    inputProj.value = projNameDefault;

    // create save button
    const saveButton = _createElement('button');
    const saveIcon = _createElement('i', ['far', 'fa-save']);
    saveButton.appendChild(saveIcon);
    saveButton.type = 'submit';

    // create cancel button
    const cancelButton = _createElement('button');
    const cancelIcon = _createElement('i', ['far', 'fa-window-close']);
    cancelButton.appendChild(cancelIcon);
    cancelButton.type = 'button';

    // setup event listener for cancel button
    cancelButton.addEventListener('click', (event) => {
        closeAllForms();
    })

    formProj.append(inputProj, saveButton, cancelButton);

    return formProj;
}
// Changes project list item to editable field and updates project name
const editProject = (listItemNode) => {
    
    // close all forms in ul
    closeAllForms();

    // store project name in temp var
    const projName = listItemNode.textContent;

    // store li in private array (openLINodes)
    openLINodes.push(listItemNode);

    // create form element
    const formProj = createProjForm(projName);
    
    // Setup event listener upon form element
    formProj.addEventListener('submit', (event) => {
        
        const newProjName = document.querySelector('#inputProj').value;
        
        if (_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.checkProject(newProjName)) {
            alert('Project name exists.');
        } else {
            _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.updateProject(projName, newProjName);

            const liNode = _createElement('li', '', newProjName, newProjName + 'LI');
    
            formProj.replaceWith(liNode);
            openLINodes.splice(openLINodes.findIndex(node => node.id === projName + 'LI'), 1);
        }

        event.preventDefault();
    });

    // replace list item with input element
    listItemNode.replaceWith(formProj);
    
}
const deleteProject = (projectName, projectNode) => {

    closeAllForms();

    // delete from Storage
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.deleteProject(projectName);
    projectNode.remove();
}
// closes all open forms in project list (ul)
const closeAllForms = () => {
    const ul = document.querySelector('#projList');
    const arrProjectDivs = ul.childNodes;

    // check each div if child form is present
    arrProjectDivs.forEach(div => {
        
        // if yes, swap li for form
        if (div.firstChild.nodeName === 'FORM') {
            
            // grab index of LInode
            const indexLINode = openLINodes.findIndex(node => node.id.slice(0,-2) === div.firstChild.id.slice(0, -4));

            console.log(openLINodes);
            console.log(indexLINode);

            // replace form with li
            div.firstChild.replaceWith(openLINodes[indexLINode]);

            //remove li from memory (except for '+ Add Project')
            if (div.firstChild.id != '+ Add ProjectLI') openLINodes.splice(indexLINode, 1);

        }
    })

    

}

// add task list
const _loadTaskHeader = (title) => {
    const headerContainer = _createElement('div', ['flexRow', 'task'], '', '');

    const header = _createElement('h2', '', title, '');

    headerContainer.appendChild(header);

    return headerContainer;
}

const _loadTaskList = (projectName) => {
    const activeTasks = projectName === 'Inbox' ? _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getInboxTasks() : _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProject(projectName).getTasks();

    const taskListCont = _createElement('div', ['flexCol', 'task'], '', '');

    // for each task, create list item 
    activeTasks.forEach(task => {
        // create elements for each task 
        const outerCont = _createElement('div', ['flexRow', 'outerCont']);
        const checkCont = _createElement('div', ['taskItemLeft']);
        const taskCont = _createElement('div', ['flexCol', 'taskCont'], '', '');
        const liCont = _createElement('div', ['flexRow', 'taskItem'], '', '');
        const descPrev = _createElement('div', ['descPrev'], task.getDescription(), '');
        outerCont.append(checkCont, taskCont);
        taskCont.append(liCont, descPrev);

        // setup checkCont
        const buttonCont = _createElement('button', ['clearButton']);
        const circleMarker = _createElement('i', ['far', 'fa-circle']);
        const checkMarker = _createElement('i',['far', 'fa-check-circle']);
        buttonCont.onmouseenter = () => { 
            circleMarker.replaceWith(checkMarker);
        };
        buttonCont.onmouseleave = () => { 
            checkMarker.replaceWith(circleMarker);
        };
        buttonCont.append(circleMarker);
        checkCont.append(buttonCont);

        // setup liCont
        const liNode = _createElement('li', ['noMarker'], task.getTitle());
        const editNode = _createElement('i', ['far','fa-edit']);
        const delIcon = _createElement('i', ['far','fa-trash-alt']);
        liCont.append(liNode, editNode, delIcon);

        // setup event listeners
            // taskCont hover shows edit and del button
        //task complete click listener
        buttonCont.addEventListener('click', () => {
            console.log('Task complete button clicked');
        });
        // edit click listener
        editNode.addEventListener('click', () => {
            console.log('Task edit button clicked');
        });
        // delete click listener
        delIcon.addEventListener('click', () => {
            console.log('Delete task button clicked');
        });

        taskListCont.appendChild(outerCont);

        // add hr
        taskListCont.appendChild(_createElement('hr'));

    })
    taskListCont.appendChild(_loadAddTaskButton(projectName));

    return taskListCont;
}


const _loadAddTaskButton = (projectName) => {
    
    //create elements
    const addCont = _createElement('div', ['flexRow', 'task'], '', 'addCont');
    const addItemLeft = _createElement('div', ['taskItemLeft']);
    const addIcon = _createElement('i', ['fas', 'fa-plus-circle']);
    const addText = _createElement('p', '', 'Add Task', 'addText');
    addItemLeft.append(addIcon);
    addCont.append(addItemLeft, addText);

    addCont.addEventListener('click', () => {
        console.log('add task clicked');

        const addPopup = _createEditTaskPopup(projectName, _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.generateTaskID());

    })
    
    return addCont;

}

const _createEditTaskPopup = (projectName, taskID) => {
    //create elements
    const outerCont = _createElement('div', ['flexCol', 'outerCont']);
    
    //top cont
    const taskInputCont = _createElement('div', ['flexCol']);
    const titleInput = _createElement('input', '');

    //bottom cont
    const buttonCont = _createElement('div', ['flexRow']);


}




/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
/* Project.js 

Module responsible for creating a Project object and supporting functions

*/
// import { Task } from './task.js';

const Project = (name) => {
    const tasks = [];
    const proto = {
        getName() {
            return name;
        },
        setName(newName) {
            name = newName;
            return name;
        },
        getTasks() {
            return tasks;
        },
        addTask(task) {
            tasks.push(task);
        },
        removeTask(taskID) {
            tasks.splice(tasks.findIndex(task => task.getID() === taskID), 1);
        }
    }
    return Object.create(proto);
}



/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Storage": () => (/* binding */ Storage)
/* harmony export */ });
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




/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
/* Task.js 

Module responsible for creating a task object and supporting functions

*/

const Task = (id, title, description, date, priority) => {
    // All tasks default to inbox upon creation
    const proto = {
        getID() {
            return id;
        },
        getTitle() {
            return title;
        },
        setTitle(newTitle) {
            title = newTitle;
            return title;
        },
        getDescription() {
            return description;
        },
        setDescription(desc) {
            description = desc;
            return description;
        },
        getDate() {
            return date;
        },
        setDate(newDate) {
            date = newDate;
            return date;
        },
        getPriority() {
            return priority;
        },
        setPriority(pri) {
            priority = pri;
            return priority;
        }
    }
    return Object.create(proto);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DOM.js */ "./src/modules/DOM.js");
/* harmony import */ var _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/storage.js */ "./src/modules/storage.js");
/* harmony import */ var _modules_project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/project.js */ "./src/modules/project.js");
/* harmony import */ var _modules_task_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/task.js */ "./src/modules/task.js");
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







const render = (() => {
    
    // sample projects
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_2__.Project)('Cleaning'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_2__.Project)('Packing'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_2__.Project)('Mopping'));

    // sample inbox tasks
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addInboxTask((0,_modules_task_js__WEBPACK_IMPORTED_MODULE_3__.Task)(1, 'Garbage', 'Take garbage out to street','', 'p1'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addInboxTask((0,_modules_task_js__WEBPACK_IMPORTED_MODULE_3__.Task)(2, 'Bathroom Floors', 'Clean bathroom floors','', 'p2'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addInboxTask((0,_modules_task_js__WEBPACK_IMPORTED_MODULE_3__.Task)(3, 'Kitchen Floors', 'Clean kitchen floors','', 'p3'));

    // load DOM elements
    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadHeader();
    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadSideBar();
    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadMain();

})();

render;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSwyREFBMkQsK0RBQXNCOztBQUVqRixLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyWUE7O0FBRUE7O0FBRUE7QUFDQSxZQUFZLE9BQU87O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQzFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUU2QztBQUNFO0FBQ0E7QUFDTjs7O0FBR3pDO0FBQ0E7QUFDQTtBQUNBLElBQUksbUVBQWtCLENBQUMsNERBQU87QUFDOUIsSUFBSSxtRUFBa0IsQ0FBQyw0REFBTztBQUM5QixJQUFJLG1FQUFrQixDQUFDLDREQUFPOztBQUU5QjtBQUNBLElBQUkscUVBQW9CLENBQUMsc0RBQUk7QUFDN0IsSUFBSSxxRUFBb0IsQ0FBQyxzREFBSTtBQUM3QixJQUFJLHFFQUFvQixDQUFDLHNEQUFJOztBQUU3QjtBQUNBLElBQUksaUVBQW9CO0FBQ3hCLElBQUksa0VBQXFCO0FBQ3pCLElBQUksK0RBQWtCOztBQUV0QixDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBET00uanMgXG5cbk1vZHVsZSByZXNwb25zaWJsZSBmb3IgRE9NIGxvYWRpbmcgYW5kIG1hbmlwdWxhdGlvblxuXG4qL1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QuanMnO1xuXG5jb25zdCBvcGVuTElOb2RlcyA9IFtdO1xuXG5jb25zdCBfY3JlYXRlRWxlbWVudCA9ICh0eXBlLCBjbGFzc05hbWVBcnIsIHRleHQsIGlkKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgaWYgKGNsYXNzTmFtZUFycikgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZUFycik7XG4gICAgaWYgKHRleHQpIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGlmIChpZCkgZWxlbWVudC5pZCA9IGlkO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG4vLyBIYW5kbGVzIGxvYWRpbmcgYW5kIHNldHVwIG9mIHNpZGViYXJcbmNvbnN0IERPTUxvYWRlciA9IHtcbiAgICBsb2FkSGVhZGVyOiAoKSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSBkaXYgY29udGFpbmVyIGFuZCBhcHBlbmQgdG8gaGVhZGVyIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnaGVhZGVyRGl2J10sICdUby1EbyBBcHBsaWNhdGlvbicpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XG4gICAgfSxcbiAgICBsb2FkU2lkZUJhcjogKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlQmFyJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgc2VjdGlvbiBmb3IgTmF2IGxpbmtzIChJbmJveCwgVG9kYXkuLilcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChfbG9hZFNpZGVCYXJOYXZMaW5rcygpKTtcblxuICAgICAgICAvLyBBZGQgc2VjdGlvbiBmb3IgUHJvamVjdHNcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChfbG9hZFNpZGVCYXJQcm9qTGlua3MoKSk7XG4gICAgICAgIFxuICAgIH0sXG4gICAgbG9hZE1haW46ICgpID0+IHtcbiAgICAgICAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbkNvbnRlbnQnKTtcblxuICAgICAgICAvLyBsb2FkIHRhc2sgaGVhZGVyXG4gICAgICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKF9sb2FkVGFza0hlYWRlcignSW5ib3gnKSk7XG5cbiAgICAgICAgLy8gbG9hZCB0YXNrIGxpc3QgZm9yIGluYm94XG4gICAgICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKF9sb2FkVGFza0xpc3QoJ0luYm94JykpO1xuICAgICAgICAgICAgLy8gYWRkIGVkaXQgYW5kIGRlbGV0ZSBidXR0b24gdXBvbiBob3ZlclxuXG4gICAgfVxufVxuXG4vLyBTZXR1cCBvZiBJbmJveCwgVG9kYXkgYW5kIFRoaXMgd2VlayBsaW5rc1xuY29uc3QgX2xvYWRTaWRlQmFyTmF2TGlua3MgPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2Q29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwnJywnc2lkZUJhck5hdkNvbnQnKTtcbiAgICBcbiAgICAvLyBBZGQgaW5ib3ggYnV0dG9uXG4gICAgY29uc3QgaW5ib3ggPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnSW5ib3gnKTtcbiAgICBuYXZDb250LmFwcGVuZENoaWxkKGluYm94KTtcbiAgICBpbmJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluYm94SGFuZGxlcik7XG5cbiAgICAvLyBBZGQgdG9kYXlcbiAgICBjb25zdCB0b2RheSA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdUb2RheScpO1xuICAgIG5hdkNvbnQuYXBwZW5kQ2hpbGQodG9kYXkpO1xuICAgIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9kYXlIYW5kbGVyKTtcblxuICAgIC8vIEFkZCB0aGlzIHdlZWtcbiAgICBjb25zdCB0aGlzV2VlayA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdUaGlzIFdlZWsnKTtcbiAgICBuYXZDb250LmFwcGVuZENoaWxkKHRoaXNXZWVrKTtcbiAgICB0aGlzV2Vlay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXNXZWVrSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIG5hdkNvbnQ7XG59XG4vLyBTaWRlYmFyIG5hdmxpbmsgaGFuZGxlcnNcbmNvbnN0IGluYm94SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gc2hvdyBhbGwgdGFza3MgaW4gaW5ib3hcbn1cbmNvbnN0IHRvZGF5SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gc2hvdyBhbGwgdGFza3MgZHVlIHRvZGF5XG59XG5jb25zdCB0aGlzV2Vla0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGR1ZSB0b2RheVxufVxuXG5jb25zdCBfbG9hZFNpZGVCYXJQcm9qTGlua3MgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvakNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJ10sICcnLCAncHJvakNvbnQnKTtcblxuICAgIC8vIENyZWF0ZSBQcm9qZWN0cyBoZWFkaW5nXG4gICAgY29uc3QgcHJvakhlYWRpbmcgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKTtcbiAgICBwcm9qSGVhZGluZy5hcHBlbmRDaGlsZChfY3JlYXRlRWxlbWVudCgnaDQnLCBbJ2ZsZXhDb2wnXSwgJ1Byb2plY3RzJykpO1xuICAgIHByb2pDb250LmFwcGVuZENoaWxkKHByb2pIZWFkaW5nKTtcblxuICAgIC8vIENyZWF0ZSB1bCBsaXN0IGVsZW1lbnQgdG8gYXBwZW5kIGFsbCBwcm9qZWN0cyBhcyBjaGlsZHJlbiB0b1xuICAgIGNvbnN0IHByb2pMaXN0ID0gX2NyZWF0ZUVsZW1lbnQoJ3VsJywgWydwcm9qTGlzdCddLCAnJywgJ3Byb2pMaXN0Jyk7XG4gICAgcHJvakNvbnQuYXBwZW5kQ2hpbGQocHJvakxpc3QpO1xuICAgIFxuICAgIC8vIEFkZCBhbGwgYWN0aXZlIHByb2plY3RzXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvaiA9PiBwcm9qTGlzdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0RE9NKHByb2ouZ2V0TmFtZSgpKSkpO1xuXG4gICAgLy8gQWRkIFwiQWRkIHByb2plY3RcIiBsaXN0IGl0ZW1cbiAgICBwcm9qTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVBZGRQcm9qKCkpO1xuXG4gICAgcmV0dXJuIHByb2pDb250O1xuXG59XG5cbi8vIEFkZHMgcHJvak5hbWUgdG8gcHJvamVjdCBMaXN0IGluIERPTVxuY29uc3QgYWRkUHJvamVjdERPTSA9IChwcm9qTmFtZSkgPT4ge1xuXG4gICAgY29uc3QgcHJvakl0ZW0gPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKVxuXG4gICAgLy8gQWRkIHByb2plY3QgbmFtZSBhcyBsaXN0SXRlbVxuICAgIGNvbnN0IGxpTm9kZSA9IF9jcmVhdGVFbGVtZW50KCdsaScsICcnLCBwcm9qTmFtZSwgcHJvak5hbWUgKyAnTEknKTtcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChsaU5vZGUpO1xuXG4gICAgLy8gQWRkIGVkaXQgcHJvamVjdCBpY29uIGFuZCBzZXR1cCBldmVudCBsaXN0ZW5lclxuICAgIGNvbnN0IGVkaXROb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLWVkaXQnXSk7XG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQoZWRpdE5vZGUpXG4gICAgZWRpdE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbGlOb2RlVXBkYXRlZCA9IGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIGlmIChsaU5vZGVVcGRhdGVkLmxvY2FsTmFtZSA9PT0gJ2xpJykgZWRpdFByb2plY3QobGlOb2RlVXBkYXRlZCk7XG4gICAgfSlcblxuICAgIC8vIEFkZCBkZWxldGUgaWNvbiBhbmQgc2V0dXAgZXZlbnQgbGlzdGVuZXJcbiAgICBjb25zdCBkZWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLXRyYXNoLWFsdCddKTtcbiAgICBkZWxJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkZWxldGVQcm9qZWN0KHByb2pOYW1lLCBwcm9qSXRlbSk7XG4gICAgfSlcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChkZWxJY29uKTtcblxuICAgIHJldHVybiBwcm9qSXRlbTtcblxufVxuLy8gQWRkcyBcIisgQWRkIHByb2plY3RcIiBhbmQgc2V0dXBcbmNvbnN0IGNyZWF0ZUFkZFByb2ogPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Byb2pJdGVtJ10pO1xuXG4gICAgYWRkQ29udC5hcHBlbmRDaGlsZChfY3JlYXRlRWxlbWVudCgnbGknLCBbJ25vTWFya2VyJ10sICcrIEFkZCBQcm9qZWN0JywgJysgQWRkIFByb2plY3RMSScpKTtcblxuICAgIC8vIHN0b3JlIGxpIGluIHByaXZhdGUgYXJyYXkgKG9wZW5MSU5vZGVzKVxuICAgIG9wZW5MSU5vZGVzLnB1c2goYWRkQ29udC5maXJzdENoaWxkKTtcblxuICAgIGFkZENvbnQuZmlyc3RDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjbG9zZUFsbEZvcm1zKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmb3JtUHJvaiA9IGNyZWF0ZVByb2pGb3JtKCcrIEFkZCBQcm9qZWN0Jyk7XG4gICAgICAgIGZvcm1Qcm9qLmZpcnN0Q2hpbGQudmFsdWUgPSAnJztcblxuICAgICAgICBmb3JtUHJvai5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgbmV3UHJvak5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXRQcm9qJykudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdCBuYW1lIGJlaW5nIGlucHV0IGlzOiAnICsgbmV3UHJvak5hbWUpO1xuICAgICAgICAgICAgaWYgKFN0b3JhZ2UuY2hlY2tQcm9qZWN0KG5ld1Byb2pOYW1lKSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9qZWN0IG5hbWUgZXhpc3RzLicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdChuZXdQcm9qTmFtZSkpO1xuXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRkUHJvamVjdERPTShuZXdQcm9qTmFtZSksIGFkZENvbnQpO1xuXG4gICAgICAgICAgICAgICAgZm9ybVByb2oucmVwbGFjZVdpdGgob3BlbkxJTm9kZXMuZmluZChub2RlID0+IG5vZGUuaWQgPT09ICcrIEFkZCBQcm9qZWN0TEknKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZENvbnQuZmlyc3RDaGlsZC5yZXBsYWNlV2l0aChmb3JtUHJvaik7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYWRkQ29udDtcblxufVxuLy8gY3JlYXRlIHByb2plY3QgZm9ybSBlbGVtZW50IHdpdGggc3VwcGxpZWQgbmFtZSBhcyB2YWx1ZVxuY29uc3QgY3JlYXRlUHJvakZvcm0gPSAocHJvak5hbWVEZWZhdWx0KSA9PiB7XG5cbiAgICAvLyBjcmVhdGUgZm9ybSBlbGVtZW50XG4gICAgY29uc3QgZm9ybVByb2ogPSBfY3JlYXRlRWxlbWVudCgnZm9ybScsICcnLCAnJywgcHJvak5hbWVEZWZhdWx0ICsgJ0ZPUk0nKTtcblxuICAgIC8vIGNyZWF0ZSBpbnB1dCBlbGVtZW50IHdpdGggcGxhY2Vob2xkZXIgdmFsdWUgYXMgcHJvamVjdCBuYW1lXG4gICAgY29uc3QgaW5wdXRQcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydpbnB1dFByb2onXSwgJycsICdpbnB1dFByb2onKTtcbiAgICBpbnB1dFByb2oudHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dFByb2oucmVxdWlyZWQgPSB0cnVlO1xuICAgIGlucHV0UHJvai52YWx1ZSA9IHByb2pOYW1lRGVmYXVsdDtcblxuICAgIC8vIGNyZWF0ZSBzYXZlIGJ1dHRvblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBfY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLXNhdmUnXSk7XG4gICAgc2F2ZUJ1dHRvbi5hcHBlbmRDaGlsZChzYXZlSWNvbik7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG5cbiAgICAvLyBjcmVhdGUgY2FuY2VsIGJ1dHRvblxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCBjYW5jZWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS13aW5kb3ctY2xvc2UnXSk7XG4gICAgY2FuY2VsQnV0dG9uLmFwcGVuZENoaWxkKGNhbmNlbEljb24pO1xuICAgIGNhbmNlbEJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG5cbiAgICAvLyBzZXR1cCBldmVudCBsaXN0ZW5lciBmb3IgY2FuY2VsIGJ1dHRvblxuICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjbG9zZUFsbEZvcm1zKCk7XG4gICAgfSlcblxuICAgIGZvcm1Qcm9qLmFwcGVuZChpbnB1dFByb2osIHNhdmVCdXR0b24sIGNhbmNlbEJ1dHRvbik7XG5cbiAgICByZXR1cm4gZm9ybVByb2o7XG59XG4vLyBDaGFuZ2VzIHByb2plY3QgbGlzdCBpdGVtIHRvIGVkaXRhYmxlIGZpZWxkIGFuZCB1cGRhdGVzIHByb2plY3QgbmFtZVxuY29uc3QgZWRpdFByb2plY3QgPSAobGlzdEl0ZW1Ob2RlKSA9PiB7XG4gICAgXG4gICAgLy8gY2xvc2UgYWxsIGZvcm1zIGluIHVsXG4gICAgY2xvc2VBbGxGb3JtcygpO1xuXG4gICAgLy8gc3RvcmUgcHJvamVjdCBuYW1lIGluIHRlbXAgdmFyXG4gICAgY29uc3QgcHJvak5hbWUgPSBsaXN0SXRlbU5vZGUudGV4dENvbnRlbnQ7XG5cbiAgICAvLyBzdG9yZSBsaSBpbiBwcml2YXRlIGFycmF5IChvcGVuTElOb2RlcylcbiAgICBvcGVuTElOb2Rlcy5wdXNoKGxpc3RJdGVtTm9kZSk7XG5cbiAgICAvLyBjcmVhdGUgZm9ybSBlbGVtZW50XG4gICAgY29uc3QgZm9ybVByb2ogPSBjcmVhdGVQcm9qRm9ybShwcm9qTmFtZSk7XG4gICAgXG4gICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXIgdXBvbiBmb3JtIGVsZW1lbnRcbiAgICBmb3JtUHJvai5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5ld1Byb2pOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0UHJvaicpLnZhbHVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKFN0b3JhZ2UuY2hlY2tQcm9qZWN0KG5ld1Byb2pOYW1lKSkge1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2plY3QgbmFtZSBleGlzdHMuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBTdG9yYWdlLnVwZGF0ZVByb2plY3QocHJvak5hbWUsIG5ld1Byb2pOYW1lKTtcblxuICAgICAgICAgICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIG5ld1Byb2pOYW1lLCBuZXdQcm9qTmFtZSArICdMSScpO1xuICAgIFxuICAgICAgICAgICAgZm9ybVByb2oucmVwbGFjZVdpdGgobGlOb2RlKTtcbiAgICAgICAgICAgIG9wZW5MSU5vZGVzLnNwbGljZShvcGVuTElOb2Rlcy5maW5kSW5kZXgobm9kZSA9PiBub2RlLmlkID09PSBwcm9qTmFtZSArICdMSScpLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyByZXBsYWNlIGxpc3QgaXRlbSB3aXRoIGlucHV0IGVsZW1lbnRcbiAgICBsaXN0SXRlbU5vZGUucmVwbGFjZVdpdGgoZm9ybVByb2opO1xuICAgIFxufVxuY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0TmFtZSwgcHJvamVjdE5vZGUpID0+IHtcblxuICAgIGNsb3NlQWxsRm9ybXMoKTtcblxuICAgIC8vIGRlbGV0ZSBmcm9tIFN0b3JhZ2VcbiAgICBTdG9yYWdlLmRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3ROb2RlLnJlbW92ZSgpO1xufVxuLy8gY2xvc2VzIGFsbCBvcGVuIGZvcm1zIGluIHByb2plY3QgbGlzdCAodWwpXG5jb25zdCBjbG9zZUFsbEZvcm1zID0gKCkgPT4ge1xuICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2pMaXN0Jyk7XG4gICAgY29uc3QgYXJyUHJvamVjdERpdnMgPSB1bC5jaGlsZE5vZGVzO1xuXG4gICAgLy8gY2hlY2sgZWFjaCBkaXYgaWYgY2hpbGQgZm9ybSBpcyBwcmVzZW50XG4gICAgYXJyUHJvamVjdERpdnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gaWYgeWVzLCBzd2FwIGxpIGZvciBmb3JtXG4gICAgICAgIGlmIChkaXYuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0ZPUk0nKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGdyYWIgaW5kZXggb2YgTElub2RlXG4gICAgICAgICAgICBjb25zdCBpbmRleExJTm9kZSA9IG9wZW5MSU5vZGVzLmZpbmRJbmRleChub2RlID0+IG5vZGUuaWQuc2xpY2UoMCwtMikgPT09IGRpdi5maXJzdENoaWxkLmlkLnNsaWNlKDAsIC00KSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wZW5MSU5vZGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4TElOb2RlKTtcblxuICAgICAgICAgICAgLy8gcmVwbGFjZSBmb3JtIHdpdGggbGlcbiAgICAgICAgICAgIGRpdi5maXJzdENoaWxkLnJlcGxhY2VXaXRoKG9wZW5MSU5vZGVzW2luZGV4TElOb2RlXSk7XG5cbiAgICAgICAgICAgIC8vcmVtb3ZlIGxpIGZyb20gbWVtb3J5IChleGNlcHQgZm9yICcrIEFkZCBQcm9qZWN0JylcbiAgICAgICAgICAgIGlmIChkaXYuZmlyc3RDaGlsZC5pZCAhPSAnKyBBZGQgUHJvamVjdExJJykgb3BlbkxJTm9kZXMuc3BsaWNlKGluZGV4TElOb2RlLCAxKTtcblxuICAgICAgICB9XG4gICAgfSlcblxuICAgIFxuXG59XG5cbi8vIGFkZCB0YXNrIGxpc3RcbmNvbnN0IF9sb2FkVGFza0hlYWRlciA9ICh0aXRsZSkgPT4ge1xuICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFzayddLCAnJywgJycpO1xuXG4gICAgY29uc3QgaGVhZGVyID0gX2NyZWF0ZUVsZW1lbnQoJ2gyJywgJycsIHRpdGxlLCAnJyk7XG5cbiAgICBoZWFkZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIHJldHVybiBoZWFkZXJDb250YWluZXI7XG59XG5cbmNvbnN0IF9sb2FkVGFza0xpc3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICBjb25zdCBhY3RpdmVUYXNrcyA9IHByb2plY3ROYW1lID09PSAnSW5ib3gnID8gU3RvcmFnZS5nZXRJbmJveFRhc2tzKCkgOiBTdG9yYWdlLmdldFByb2plY3QocHJvamVjdE5hbWUpLmdldFRhc2tzKCk7XG5cbiAgICBjb25zdCB0YXNrTGlzdENvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJywgJ3Rhc2snXSwgJycsICcnKTtcblxuICAgIC8vIGZvciBlYWNoIHRhc2ssIGNyZWF0ZSBsaXN0IGl0ZW0gXG4gICAgYWN0aXZlVGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIGVsZW1lbnRzIGZvciBlYWNoIHRhc2sgXG4gICAgICAgIGNvbnN0IG91dGVyQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAnb3V0ZXJDb250J10pO1xuICAgICAgICBjb25zdCBjaGVja0NvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWyd0YXNrSXRlbUxlZnQnXSk7XG4gICAgICAgIGNvbnN0IHRhc2tDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCcsICd0YXNrQ29udCddLCAnJywgJycpO1xuICAgICAgICBjb25zdCBsaUNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2tJdGVtJ10sICcnLCAnJyk7XG4gICAgICAgIGNvbnN0IGRlc2NQcmV2ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZGVzY1ByZXYnXSwgdGFzay5nZXREZXNjcmlwdGlvbigpLCAnJyk7XG4gICAgICAgIG91dGVyQ29udC5hcHBlbmQoY2hlY2tDb250LCB0YXNrQ29udCk7XG4gICAgICAgIHRhc2tDb250LmFwcGVuZChsaUNvbnQsIGRlc2NQcmV2KTtcblxuICAgICAgICAvLyBzZXR1cCBjaGVja0NvbnRcbiAgICAgICAgY29uc3QgYnV0dG9uQ29udCA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2NsZWFyQnV0dG9uJ10pO1xuICAgICAgICBjb25zdCBjaXJjbGVNYXJrZXIgPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLWNpcmNsZSddKTtcbiAgICAgICAgY29uc3QgY2hlY2tNYXJrZXIgPSBfY3JlYXRlRWxlbWVudCgnaScsWydmYXInLCAnZmEtY2hlY2stY2lyY2xlJ10pO1xuICAgICAgICBidXR0b25Db250Lm9ubW91c2VlbnRlciA9ICgpID0+IHsgXG4gICAgICAgICAgICBjaXJjbGVNYXJrZXIucmVwbGFjZVdpdGgoY2hlY2tNYXJrZXIpO1xuICAgICAgICB9O1xuICAgICAgICBidXR0b25Db250Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHsgXG4gICAgICAgICAgICBjaGVja01hcmtlci5yZXBsYWNlV2l0aChjaXJjbGVNYXJrZXIpO1xuICAgICAgICB9O1xuICAgICAgICBidXR0b25Db250LmFwcGVuZChjaXJjbGVNYXJrZXIpO1xuICAgICAgICBjaGVja0NvbnQuYXBwZW5kKGJ1dHRvbkNvbnQpO1xuXG4gICAgICAgIC8vIHNldHVwIGxpQ29udFxuICAgICAgICBjb25zdCBsaU5vZGUgPSBfY3JlYXRlRWxlbWVudCgnbGknLCBbJ25vTWFya2VyJ10sIHRhc2suZ2V0VGl0bGUoKSk7XG4gICAgICAgIGNvbnN0IGVkaXROb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLWVkaXQnXSk7XG4gICAgICAgIGNvbnN0IGRlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtdHJhc2gtYWx0J10pO1xuICAgICAgICBsaUNvbnQuYXBwZW5kKGxpTm9kZSwgZWRpdE5vZGUsIGRlbEljb24pO1xuXG4gICAgICAgIC8vIHNldHVwIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gdGFza0NvbnQgaG92ZXIgc2hvd3MgZWRpdCBhbmQgZGVsIGJ1dHRvblxuICAgICAgICAvL3Rhc2sgY29tcGxldGUgY2xpY2sgbGlzdGVuZXJcbiAgICAgICAgYnV0dG9uQ29udC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUYXNrIGNvbXBsZXRlIGJ1dHRvbiBjbGlja2VkJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBlZGl0IGNsaWNrIGxpc3RlbmVyXG4gICAgICAgIGVkaXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2sgZWRpdCBidXR0b24gY2xpY2tlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gZGVsZXRlIGNsaWNrIGxpc3RlbmVyXG4gICAgICAgIGRlbEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGVsZXRlIHRhc2sgYnV0dG9uIGNsaWNrZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFza0xpc3RDb250LmFwcGVuZENoaWxkKG91dGVyQ29udCk7XG5cbiAgICAgICAgLy8gYWRkIGhyXG4gICAgICAgIHRhc2tMaXN0Q29udC5hcHBlbmRDaGlsZChfY3JlYXRlRWxlbWVudCgnaHInKSk7XG5cbiAgICB9KVxuICAgIHRhc2tMaXN0Q29udC5hcHBlbmRDaGlsZChfbG9hZEFkZFRhc2tCdXR0b24ocHJvamVjdE5hbWUpKTtcblxuICAgIHJldHVybiB0YXNrTGlzdENvbnQ7XG59XG5cblxuY29uc3QgX2xvYWRBZGRUYXNrQnV0dG9uID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgXG4gICAgLy9jcmVhdGUgZWxlbWVudHNcbiAgICBjb25zdCBhZGRDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICd0YXNrJ10sICcnLCAnYWRkQ29udCcpO1xuICAgIGNvbnN0IGFkZEl0ZW1MZWZ0ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsndGFza0l0ZW1MZWZ0J10pO1xuICAgIGNvbnN0IGFkZEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFzJywgJ2ZhLXBsdXMtY2lyY2xlJ10pO1xuICAgIGNvbnN0IGFkZFRleHQgPSBfY3JlYXRlRWxlbWVudCgncCcsICcnLCAnQWRkIFRhc2snLCAnYWRkVGV4dCcpO1xuICAgIGFkZEl0ZW1MZWZ0LmFwcGVuZChhZGRJY29uKTtcbiAgICBhZGRDb250LmFwcGVuZChhZGRJdGVtTGVmdCwgYWRkVGV4dCk7XG5cbiAgICBhZGRDb250LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnYWRkIHRhc2sgY2xpY2tlZCcpO1xuXG4gICAgICAgIGNvbnN0IGFkZFBvcHVwID0gX2NyZWF0ZUVkaXRUYXNrUG9wdXAocHJvamVjdE5hbWUsIFN0b3JhZ2UuZ2VuZXJhdGVUYXNrSUQoKSk7XG5cbiAgICB9KVxuICAgIFxuICAgIHJldHVybiBhZGRDb250O1xuXG59XG5cbmNvbnN0IF9jcmVhdGVFZGl0VGFza1BvcHVwID0gKHByb2plY3ROYW1lLCB0YXNrSUQpID0+IHtcbiAgICAvL2NyZWF0ZSBlbGVtZW50c1xuICAgIGNvbnN0IG91dGVyQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnLCAnb3V0ZXJDb250J10pO1xuICAgIFxuICAgIC8vdG9wIGNvbnRcbiAgICBjb25zdCB0YXNrSW5wdXRDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddKTtcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgJycpO1xuXG4gICAgLy9ib3R0b20gY29udFxuICAgIGNvbnN0IGJ1dHRvbkNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93J10pO1xuXG5cbn1cblxuXG5leHBvcnQgeyBET01Mb2FkZXIgfTsiLCIvKiBQcm9qZWN0LmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgUHJvamVjdCBvYmplY3QgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zXG5cbiovXG4vLyBpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrLmpzJztcblxuY29uc3QgUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBbXTtcbiAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXROYW1lKG5ld05hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRhc2tzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRhc2tzO1xuICAgICAgICB9LFxuICAgICAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZVRhc2sodGFza0lEKSB7XG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UodGFza3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJRCgpID09PSB0YXNrSUQpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFByb2plY3QgfTsiLCJjb25zdCBUQVNLX0xJTUlUID0gMTAwMDA7XG5jb25zdCBpbmJveFRhc2tzID0gW107XG5jb25zdCBhY3RpdmVQcm9qZWN0cyA9IFtdO1xuY29uc3QgYWN0aXZlSURzID0gW107XG5cbmNvbnN0IFN0b3JhZ2UgPSB7XG4gICAgYWRkUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9LFxuICAgIGdldFByb2plY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cztcbiAgICB9LFxuICAgIGdldFByb2plY3Q6IChwcm9qTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHMuZmluZChwcm9qID0+IHByb2ouZ2V0TmFtZSgpID09PSBwcm9qbmFtZSk7XG4gICAgfSxcbiAgICBjaGVja1Byb2plY3Q6IChwcm9qTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHMuc29tZShwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qTmFtZSk7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9qZWN0OiAob2xkUHJvak5hbWUsIG5ld1Byb2pOYW1lKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzW2FjdGl2ZVByb2plY3RzLmZpbmRJbmRleChwcm9qID0+IFN0b3JhZ2UuY2hlY2tQcm9qZWN0KG9sZFByb2pOYW1lKSldLnNldE5hbWUobmV3UHJvak5hbWUpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvamVjdDogKHByb2pOYW1lKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnNwbGljZShhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBTdG9yYWdlLmNoZWNrUHJvamVjdChwcm9qTmFtZSkpLCAxKTtcbiAgICB9LFxuICAgIGFkZEluYm94VGFzazogKHRhc2spID0+IHtcbiAgICAgICAgaW5ib3hUYXNrcy5wdXNoKHRhc2spO1xuICAgICAgICBhY3RpdmVJRHMucHVzaCh0YXNrLmdldElEKCkpO1xuICAgIH0sXG4gICAgZ2V0SW5ib3hUYXNrczogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaW5ib3hUYXNrcztcbiAgICB9LFxuICAgIGdlbmVyYXRlVGFza0lEOiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpZiAoYWN0aXZlSURzLmxlbmd0aCA+PSBUQVNLX0xJTUlUKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBsZXQgcmFuZDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcmFuZCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogVEFTS19MSU1JVCk7XG4gICAgICAgIH0gd2hpbGUgKGFjdGl2ZUlEcy5pbmNsdWRlcyhyYW5kKSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmFuZDtcbiAgICB9XG59XG5cblxuZXhwb3J0IHsgU3RvcmFnZSB9IiwiLyogVGFzay5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIHRhc2sgb2JqZWN0IGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9uc1xuXG4qL1xuXG5jb25zdCBUYXNrID0gKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgLy8gQWxsIHRhc2tzIGRlZmF1bHQgdG8gaW5ib3ggdXBvbiBjcmVhdGlvblxuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXRJRCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGl0bGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgICAgICB0aXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGVzY3JpcHRpb24oZGVzYykge1xuICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBnZXREYXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldERhdGUobmV3RGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IG5ld0RhdGU7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFByaW9yaXR5KHByaSkge1xuICAgICAgICAgICAgcHJpb3JpdHkgPSBwcmk7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG8pO1xufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuXG4tIFRhc2tzXG4gICAgLSBTZXBlcmF0ZSBtb2R1bGVcbiAgICAtIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGFza1xuICAgIC0gUHJvcGVydGllczogXG4gICAgICAgIC0gdGl0bGVcbiAgICAgICAgLSBkZXNjcmlwdGlvblxuICAgICAgICAtIGR1ZSBkYXRlXG4gICAgICAgIC0gcHJpb3JpdHlcbiAgICAgICAgLSBpc0NvbXBsZXRlXG4gICAgLSBmdW5jdGlvbnNcbiAgICAgICAgLSBjaGFuZ2UgcHJvcGVydGllc1xuLSBQcm9qZWN0c1xuICAgIC0gY29udGFpbnMgbWFueSB0YXNrc1xuICAgIC0gcHJvcGVydGllczpcbiAgICAgICAgLSBcbi0gRE9NXG5cblxuKi9cblxuaW1wb3J0IHsgRE9NTG9hZGVyIH0gZnJvbSAnLi9tb2R1bGVzL0RPTS5qcyc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9tb2R1bGVzL3N0b3JhZ2UuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LmpzJztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL21vZHVsZXMvdGFzay5qcyc7XG5cblxuY29uc3QgcmVuZGVyID0gKCgpID0+IHtcbiAgICBcbiAgICAvLyBzYW1wbGUgcHJvamVjdHNcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgnQ2xlYW5pbmcnKSk7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KFByb2plY3QoJ1BhY2tpbmcnKSk7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KFByb2plY3QoJ01vcHBpbmcnKSk7XG5cbiAgICAvLyBzYW1wbGUgaW5ib3ggdGFza3NcbiAgICBTdG9yYWdlLmFkZEluYm94VGFzayhUYXNrKDEsICdHYXJiYWdlJywgJ1Rha2UgZ2FyYmFnZSBvdXQgdG8gc3RyZWV0JywnJywgJ3AxJykpO1xuICAgIFN0b3JhZ2UuYWRkSW5ib3hUYXNrKFRhc2soMiwgJ0JhdGhyb29tIEZsb29ycycsICdDbGVhbiBiYXRocm9vbSBmbG9vcnMnLCcnLCAncDInKSk7XG4gICAgU3RvcmFnZS5hZGRJbmJveFRhc2soVGFzaygzLCAnS2l0Y2hlbiBGbG9vcnMnLCAnQ2xlYW4ga2l0Y2hlbiBmbG9vcnMnLCcnLCAncDMnKSk7XG5cbiAgICAvLyBsb2FkIERPTSBlbGVtZW50c1xuICAgIERPTUxvYWRlci5sb2FkSGVhZGVyKCk7XG4gICAgRE9NTG9hZGVyLmxvYWRTaWRlQmFyKCk7XG4gICAgRE9NTG9hZGVyLmxvYWRNYWluKCk7XG5cbn0pKCk7XG5cbnJlbmRlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==