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
    loadSideBar: () => {
        
        const sideBar = document.querySelector('#sideBar');
        
        // Add section for Nav links (Inbox, Today..)
        sideBar.appendChild(_loadSideBarNavLinks());

        // Add section for Projects
        sideBar.appendChild(_loadSideBarProjLinks());
        
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

    // Create Projects heading and add button
    const projHeading = _createElement('div', ['projItem']);
    projHeading.appendChild(_createElement('h4', ['flexCol'], 'Projects'));

    const addButton = _createElement('i', ['fas','fa-plus']);
    projHeading.appendChild(addButton);
    addButton.addEventListener('click', addProjListener);
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

// Adds "+ Add project" and setup
const createAddProj = () => {
    const addCont = _createElement('div', ['projItem']);

    addCont.appendChild(_createElement('li', ['addProjLI'], '+ Add Project'));

    addCont.addEventListener('click', () => {
        const formProj = createProjForm();
        
        formProj.addEventListener('submit', (event) => {
            
            const parentNode = event.target.parentNode;
            // parentNode.insertBefore(addProjectDOM())
            // add projectDOM
            event.preventDefault();

        });
        addCont.replaceWith(formProj);
        console.log(inputProj);
    });

    return addCont;

}

const addProjListener = (event) => {
    console.log(event.target);
    // Bring up add project modal

    // Setup listener for 'click' of add project button
    // call addProjectDOM
    // add project to activeProjects (check for duplicate)
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

const addProject = (projectName) => {
    // check for duplicates in storage
    
    console.log(projectName);
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

            const liNode = _createElement('li', '', newProjName, newProjName);
    
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

            console.log(indexLINode);

            // replace form with li
            div.firstChild.replaceWith(openLINodes[indexLINode]);

            //remove li from memory
            openLINodes.splice(indexLINode, 1);

        }
    })

    

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
    
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_2__.Project)('Cleaning'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_2__.Project)('Packing'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_2__.Project)('Mopping'));
    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadSideBar();
    
})();

render;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7QUFDdUM7QUFDTjs7QUFFakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDREQUFtQjs7QUFFdkI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQW9CO0FBQ2hDO0FBQ0EsVUFBVTtBQUNWLFlBQVksOERBQXFCOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSw4REFBcUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hSQTs7QUFFQTs7QUFFQTtBQUNBLFlBQVksT0FBTzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUMxQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUU2QztBQUNFO0FBQ0E7OztBQUcvQztBQUNBO0FBQ0EsSUFBSSxtRUFBa0IsQ0FBQyw0REFBTztBQUM5QixJQUFJLG1FQUFrQixDQUFDLDREQUFPO0FBQzlCLElBQUksbUVBQWtCLENBQUMsNERBQU87QUFDOUIsSUFBSSxrRUFBcUI7QUFDekI7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBET00uanMgXG5cbk1vZHVsZSByZXNwb25zaWJsZSBmb3IgRE9NIGxvYWRpbmcgYW5kIG1hbmlwdWxhdGlvblxuXG4qL1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrLmpzJztcblxuY29uc3Qgb3BlbkxJTm9kZXMgPSBbXTtcblxuY29uc3QgX2NyZWF0ZUVsZW1lbnQgPSAodHlwZSwgY2xhc3NOYW1lQXJyLCB0ZXh0LCBpZCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGlmIChjbGFzc05hbWVBcnIpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVBcnIpO1xuICAgIGlmICh0ZXh0KSBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBpZiAoaWQpIGVsZW1lbnQuaWQgPSBpZDtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuLy8gSGFuZGxlcyBsb2FkaW5nIGFuZCBzZXR1cCBvZiBzaWRlYmFyXG5jb25zdCBET01Mb2FkZXIgPSB7XG4gICAgbG9hZFNpZGVCYXI6ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZUJhcicpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHNlY3Rpb24gZm9yIE5hdiBsaW5rcyAoSW5ib3gsIFRvZGF5Li4pXG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2xvYWRTaWRlQmFyTmF2TGlua3MoKSk7XG5cbiAgICAgICAgLy8gQWRkIHNlY3Rpb24gZm9yIFByb2plY3RzXG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2xvYWRTaWRlQmFyUHJvakxpbmtzKCkpO1xuICAgICAgICBcbiAgICB9XG5cbn1cblxuLy8gU2V0dXAgb2YgSW5ib3gsIFRvZGF5IGFuZCBUaGlzIHdlZWsgbGlua3NcbmNvbnN0IF9sb2FkU2lkZUJhck5hdkxpbmtzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJ10sJycsJ3NpZGVCYXJOYXZDb250Jyk7XG4gICAgXG4gICAgLy8gQWRkIGluYm94IGJ1dHRvblxuICAgIGNvbnN0IGluYm94ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ0luYm94Jyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZChpbmJveCk7XG4gICAgaW5ib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbmJveEhhbmRsZXIpO1xuXG4gICAgLy8gQWRkIHRvZGF5XG4gICAgY29uc3QgdG9kYXkgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVG9kYXknKTtcbiAgICBuYXZDb250LmFwcGVuZENoaWxkKHRvZGF5KTtcbiAgICB0b2RheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZGF5SGFuZGxlcik7XG5cbiAgICAvLyBBZGQgdGhpcyB3ZWVrXG4gICAgY29uc3QgdGhpc1dlZWsgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVGhpcyBXZWVrJyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZCh0aGlzV2Vlayk7XG4gICAgdGhpc1dlZWsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzV2Vla0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBuYXZDb250O1xufVxuLy8gU2lkZWJhciBuYXZsaW5rIGhhbmRsZXJzXG5jb25zdCBpbmJveEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGluIGluYm94XG59XG5jb25zdCB0b2RheUhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGR1ZSB0b2RheVxufVxuY29uc3QgdGhpc1dlZWtIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBzaG93IGFsbCB0YXNrcyBkdWUgdG9kYXlcbn1cblxuY29uc3QgX2xvYWRTaWRlQmFyUHJvakxpbmtzID0gKCkgPT4ge1xuXG4gICAgY29uc3QgcHJvakNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJ10sICcnLCAncHJvakNvbnQnKTtcblxuICAgIC8vIENyZWF0ZSBQcm9qZWN0cyBoZWFkaW5nIGFuZCBhZGQgYnV0dG9uXG4gICAgY29uc3QgcHJvakhlYWRpbmcgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKTtcbiAgICBwcm9qSGVhZGluZy5hcHBlbmRDaGlsZChfY3JlYXRlRWxlbWVudCgnaDQnLCBbJ2ZsZXhDb2wnXSwgJ1Byb2plY3RzJykpO1xuXG4gICAgY29uc3QgYWRkQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcycsJ2ZhLXBsdXMnXSk7XG4gICAgcHJvakhlYWRpbmcuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQcm9qTGlzdGVuZXIpO1xuICAgIHByb2pDb250LmFwcGVuZENoaWxkKHByb2pIZWFkaW5nKTtcblxuICAgIC8vIENyZWF0ZSB1bCBsaXN0IGVsZW1lbnQgdG8gYXBwZW5kIGFsbCBwcm9qZWN0cyBhcyBjaGlsZHJlbiB0b1xuICAgIGNvbnN0IHByb2pMaXN0ID0gX2NyZWF0ZUVsZW1lbnQoJ3VsJywgWydwcm9qTGlzdCddLCAnJywgJ3Byb2pMaXN0Jyk7XG4gICAgcHJvakNvbnQuYXBwZW5kQ2hpbGQocHJvakxpc3QpO1xuICAgIFxuICAgIC8vIEFkZCBhbGwgYWN0aXZlIHByb2plY3RzXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvaiA9PiBwcm9qTGlzdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0RE9NKHByb2ouZ2V0TmFtZSgpKSkpO1xuXG4gICAgLy8gQWRkIFwiQWRkIHByb2plY3RcIiBsaXN0IGl0ZW1cbiAgICBwcm9qTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVBZGRQcm9qKCkpO1xuXG4gICAgcmV0dXJuIHByb2pDb250O1xuXG59XG5cbi8vIEFkZHMgXCIrIEFkZCBwcm9qZWN0XCIgYW5kIHNldHVwXG5jb25zdCBjcmVhdGVBZGRQcm9qID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZENvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKTtcblxuICAgIGFkZENvbnQuYXBwZW5kQ2hpbGQoX2NyZWF0ZUVsZW1lbnQoJ2xpJywgWydhZGRQcm9qTEknXSwgJysgQWRkIFByb2plY3QnKSk7XG5cbiAgICBhZGRDb250LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtUHJvaiA9IGNyZWF0ZVByb2pGb3JtKCk7XG4gICAgICAgIFxuICAgICAgICBmb3JtUHJvai5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgLy8gcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRkUHJvamVjdERPTSgpKVxuICAgICAgICAgICAgLy8gYWRkIHByb2plY3RET01cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZENvbnQucmVwbGFjZVdpdGgoZm9ybVByb2opO1xuICAgICAgICBjb25zb2xlLmxvZyhpbnB1dFByb2opO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFkZENvbnQ7XG5cbn1cblxuY29uc3QgYWRkUHJvakxpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBCcmluZyB1cCBhZGQgcHJvamVjdCBtb2RhbFxuXG4gICAgLy8gU2V0dXAgbGlzdGVuZXIgZm9yICdjbGljaycgb2YgYWRkIHByb2plY3QgYnV0dG9uXG4gICAgLy8gY2FsbCBhZGRQcm9qZWN0RE9NXG4gICAgLy8gYWRkIHByb2plY3QgdG8gYWN0aXZlUHJvamVjdHMgKGNoZWNrIGZvciBkdXBsaWNhdGUpXG59XG5cbi8vIEFkZHMgcHJvak5hbWUgdG8gcHJvamVjdCBMaXN0IGluIERPTVxuY29uc3QgYWRkUHJvamVjdERPTSA9IChwcm9qTmFtZSkgPT4ge1xuXG4gICAgY29uc3QgcHJvakl0ZW0gPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKVxuXG4gICAgLy8gQWRkIHByb2plY3QgbmFtZSBhcyBsaXN0SXRlbVxuICAgIGNvbnN0IGxpTm9kZSA9IF9jcmVhdGVFbGVtZW50KCdsaScsICcnLCBwcm9qTmFtZSwgcHJvak5hbWUgKyAnTEknKTtcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChsaU5vZGUpO1xuXG4gICAgLy8gQWRkIGVkaXQgcHJvamVjdCBpY29uIGFuZCBzZXR1cCBldmVudCBsaXN0ZW5lclxuICAgIGNvbnN0IGVkaXROb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLWVkaXQnXSk7XG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQoZWRpdE5vZGUpXG4gICAgZWRpdE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbGlOb2RlVXBkYXRlZCA9IGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIGlmIChsaU5vZGVVcGRhdGVkLmxvY2FsTmFtZSA9PT0gJ2xpJykgZWRpdFByb2plY3QobGlOb2RlVXBkYXRlZCk7XG4gICAgfSkgXG5cbiAgICAvLyBBZGQgZGVsZXRlIGljb24gYW5kIHNldHVwIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgZGVsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS10cmFzaC1hbHQnXSk7XG4gICAgZGVsSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZGVsZXRlUHJvamVjdChwcm9qTmFtZSwgcHJvakl0ZW0pO1xuICAgIH0pXG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQoZGVsSWNvbik7XG5cbiAgICByZXR1cm4gcHJvakl0ZW07XG5cbn1cblxuY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgIC8vIGNoZWNrIGZvciBkdXBsaWNhdGVzIGluIHN0b3JhZ2VcbiAgICBcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TmFtZSk7XG59XG5cbi8vIGNyZWF0ZSBwcm9qZWN0IGZvcm0gZWxlbWVudCB3aXRoIHN1cHBsaWVkIG5hbWUgYXMgdmFsdWVcbmNvbnN0IGNyZWF0ZVByb2pGb3JtID0gKHByb2pOYW1lRGVmYXVsdCkgPT4ge1xuXG4gICAgLy8gY3JlYXRlIGZvcm0gZWxlbWVudFxuICAgIGNvbnN0IGZvcm1Qcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCAnJywgJycsIHByb2pOYW1lRGVmYXVsdCArICdGT1JNJyk7XG5cbiAgICAvLyBjcmVhdGUgaW5wdXQgZWxlbWVudCB3aXRoIHBsYWNlaG9sZGVyIHZhbHVlIGFzIHByb2plY3QgbmFtZVxuICAgIGNvbnN0IGlucHV0UHJvaiA9IF9jcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnaW5wdXRQcm9qJ10sICcnLCAnaW5wdXRQcm9qJyk7XG4gICAgaW5wdXRQcm9qLnR5cGUgPSAndGV4dCc7XG4gICAgaW5wdXRQcm9qLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBpbnB1dFByb2oudmFsdWUgPSBwcm9qTmFtZURlZmF1bHQ7XG5cbiAgICAvLyBjcmVhdGUgc2F2ZSBidXR0b25cbiAgICBjb25zdCBzYXZlQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHNhdmVJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1zYXZlJ10pO1xuICAgIHNhdmVCdXR0b24uYXBwZW5kQ2hpbGQoc2F2ZUljb24pO1xuICAgIHNhdmVCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuXG4gICAgLy8gY3JlYXRlIGNhbmNlbCBidXR0b25cbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBfY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtd2luZG93LWNsb3NlJ10pO1xuICAgIGNhbmNlbEJ1dHRvbi5hcHBlbmRDaGlsZChjYW5jZWxJY29uKTtcbiAgICBjYW5jZWxCdXR0b24udHlwZSA9ICdidXR0b24nO1xuXG4gICAgLy8gc2V0dXAgZXZlbnQgbGlzdGVuZXIgZm9yIGNhbmNlbCBidXR0b25cbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY2xvc2VBbGxGb3JtcygpO1xuICAgIH0pXG5cbiAgICBmb3JtUHJvai5hcHBlbmQoaW5wdXRQcm9qLCBzYXZlQnV0dG9uLCBjYW5jZWxCdXR0b24pO1xuXG4gICAgcmV0dXJuIGZvcm1Qcm9qO1xufVxuXG4vLyBDaGFuZ2VzIHByb2plY3QgbGlzdCBpdGVtIHRvIGVkaXRhYmxlIGZpZWxkIGFuZCB1cGRhdGVzIHByb2plY3QgbmFtZVxuY29uc3QgZWRpdFByb2plY3QgPSAobGlzdEl0ZW1Ob2RlKSA9PiB7XG4gICAgXG4gICAgLy8gY2xvc2UgYWxsIGZvcm1zIGluIHVsXG4gICAgY2xvc2VBbGxGb3JtcygpO1xuXG4gICAgLy8gc3RvcmUgcHJvamVjdCBuYW1lIGluIHRlbXAgdmFyXG4gICAgY29uc3QgcHJvak5hbWUgPSBsaXN0SXRlbU5vZGUudGV4dENvbnRlbnQ7XG5cbiAgICAvLyBzdG9yZSBsaSBpbiBwcml2YXRlIGFycmF5IChvcGVuTElOb2RlcylcbiAgICBvcGVuTElOb2Rlcy5wdXNoKGxpc3RJdGVtTm9kZSk7XG5cbiAgICAvLyBjcmVhdGUgZm9ybSBlbGVtZW50XG4gICAgY29uc3QgZm9ybVByb2ogPSBjcmVhdGVQcm9qRm9ybShwcm9qTmFtZSk7XG4gICAgXG4gICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXIgdXBvbiBmb3JtIGVsZW1lbnRcbiAgICBmb3JtUHJvai5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5ld1Byb2pOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0UHJvaicpLnZhbHVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKFN0b3JhZ2UuY2hlY2tQcm9qZWN0KG5ld1Byb2pOYW1lKSkge1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2plY3QgbmFtZSBleGlzdHMuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBTdG9yYWdlLnVwZGF0ZVByb2plY3QocHJvak5hbWUsIG5ld1Byb2pOYW1lKTtcblxuICAgICAgICAgICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIG5ld1Byb2pOYW1lLCBuZXdQcm9qTmFtZSk7XG4gICAgXG4gICAgICAgICAgICBmb3JtUHJvai5yZXBsYWNlV2l0aChsaU5vZGUpO1xuICAgICAgICAgICAgb3BlbkxJTm9kZXMuc3BsaWNlKG9wZW5MSU5vZGVzLmZpbmRJbmRleChub2RlID0+IG5vZGUuaWQgPT09IHByb2pOYW1lICsgJ0xJJyksIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vIHJlcGxhY2UgbGlzdCBpdGVtIHdpdGggaW5wdXQgZWxlbWVudFxuICAgIGxpc3RJdGVtTm9kZS5yZXBsYWNlV2l0aChmb3JtUHJvaik7XG4gICAgXG59XG5jb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3ROYW1lLCBwcm9qZWN0Tm9kZSkgPT4ge1xuXG4gICAgY2xvc2VBbGxGb3JtcygpO1xuXG4gICAgLy8gZGVsZXRlIGZyb20gU3RvcmFnZVxuICAgIFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdE5vZGUucmVtb3ZlKCk7XG59XG5cbi8vIGNsb3NlcyBhbGwgb3BlbiBmb3JtcyBpbiBwcm9qZWN0IGxpc3QgKHVsKVxuY29uc3QgY2xvc2VBbGxGb3JtcyA9ICgpID0+IHtcbiAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qTGlzdCcpO1xuICAgIGNvbnN0IGFyclByb2plY3REaXZzID0gdWwuY2hpbGROb2RlcztcblxuICAgIC8vIGNoZWNrIGVhY2ggZGl2IGlmIGNoaWxkIGZvcm0gaXMgcHJlc2VudFxuICAgIGFyclByb2plY3REaXZzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgXG4gICAgICAgIC8vIGlmIHllcywgc3dhcCBsaSBmb3IgZm9ybVxuICAgICAgICBpZiAoZGl2LmZpcnN0Q2hpbGQubm9kZU5hbWUgPT09ICdGT1JNJykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBncmFiIGluZGV4IG9mIExJbm9kZVxuICAgICAgICAgICAgY29uc3QgaW5kZXhMSU5vZGUgPSBvcGVuTElOb2Rlcy5maW5kSW5kZXgobm9kZSA9PiBub2RlLmlkLnNsaWNlKDAsLTIpID09PSBkaXYuZmlyc3RDaGlsZC5pZC5zbGljZSgwLCAtNCkpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleExJTm9kZSk7XG5cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgZm9ybSB3aXRoIGxpXG4gICAgICAgICAgICBkaXYuZmlyc3RDaGlsZC5yZXBsYWNlV2l0aChvcGVuTElOb2Rlc1tpbmRleExJTm9kZV0pO1xuXG4gICAgICAgICAgICAvL3JlbW92ZSBsaSBmcm9tIG1lbW9yeVxuICAgICAgICAgICAgb3BlbkxJTm9kZXMuc3BsaWNlKGluZGV4TElOb2RlLCAxKTtcblxuICAgICAgICB9XG4gICAgfSlcblxuICAgIFxuXG59XG5cblxuXG5leHBvcnQgeyBET01Mb2FkZXIgfTsiLCIvKiBQcm9qZWN0LmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgUHJvamVjdCBvYmplY3QgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zXG5cbiovXG4vLyBpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrLmpzJztcblxuY29uc3QgUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBbXTtcbiAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXROYW1lKG5ld05hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRhc2tzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRhc2tzO1xuICAgICAgICB9LFxuICAgICAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZVRhc2sodGFza0lEKSB7XG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UodGFza3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJRCgpID09PSB0YXNrSUQpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFByb2plY3QgfTsiLCJcbmNvbnN0IGFjdGl2ZVRhc2tzID0gW107XG5jb25zdCBhY3RpdmVQcm9qZWN0cyA9IFtdO1xuXG5jb25zdCBTdG9yYWdlID0ge1xuICAgIGFkZFByb2plY3Q6IChwcm9qKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnB1c2gocHJvaik7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHM7XG4gICAgfSxcbiAgICBjaGVja1Byb2plY3Q6IChwcm9qTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHMuc29tZShwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qTmFtZSk7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9qZWN0OiAob2xkUHJvak5hbWUsIG5ld1Byb2pOYW1lKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzW2FjdGl2ZVByb2plY3RzLmZpbmRJbmRleChwcm9qID0+IFN0b3JhZ2UuY2hlY2tQcm9qZWN0KG9sZFByb2pOYW1lKSldLnNldE5hbWUobmV3UHJvak5hbWUpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvamVjdDogKHByb2pOYW1lKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnNwbGljZShhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBTdG9yYWdlLmNoZWNrUHJvamVjdChwcm9qTmFtZSkpLCAxKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHsgU3RvcmFnZSB9IiwiLyogVGFzay5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIHRhc2sgb2JqZWN0IGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9uc1xuXG4qL1xuXG5jb25zdCBUYXNrID0gKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgLy8gQWxsIHRhc2tzIGRlZmF1bHQgdG8gaW5ib3ggdXBvbiBjcmVhdGlvblxuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXRJRCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGl0bGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgICAgICB0aXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGVzY3JpcHRpb24oZGVzYykge1xuICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBnZXREYXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldERhdGUobmV3RGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IG5ld0RhdGU7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFByaW9yaXR5KHByaSkge1xuICAgICAgICAgICAgcHJpb3JpdHkgPSBwcmk7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG8pO1xufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuXG4tIFRhc2tzXG4gICAgLSBTZXBlcmF0ZSBtb2R1bGVcbiAgICAtIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGFza1xuICAgIC0gUHJvcGVydGllczogXG4gICAgICAgIC0gdGl0bGVcbiAgICAgICAgLSBkZXNjcmlwdGlvblxuICAgICAgICAtIGR1ZSBkYXRlXG4gICAgICAgIC0gcHJpb3JpdHlcbiAgICAgICAgLSBpc0NvbXBsZXRlXG4gICAgLSBmdW5jdGlvbnNcbiAgICAgICAgLSBjaGFuZ2UgcHJvcGVydGllc1xuLSBQcm9qZWN0c1xuICAgIC0gY29udGFpbnMgbWFueSB0YXNrc1xuICAgIC0gcHJvcGVydGllczpcbiAgICAgICAgLSBcbi0gRE9NXG5cblxuKi9cblxuaW1wb3J0IHsgRE9NTG9hZGVyIH0gZnJvbSAnLi9tb2R1bGVzL0RPTS5qcyc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9tb2R1bGVzL3N0b3JhZ2UuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LmpzJztcblxuXG5jb25zdCByZW5kZXIgPSAoKCkgPT4ge1xuICAgIFxuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdDbGVhbmluZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgnUGFja2luZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgnTW9wcGluZycpKTtcbiAgICBET01Mb2FkZXIubG9hZFNpZGVCYXIoKTtcbiAgICBcbn0pKCk7XG5cbnJlbmRlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==