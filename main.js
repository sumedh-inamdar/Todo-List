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

    addCont.appendChild(_createElement('li', ['addProjLI'], '+ Add Project', '+ Add ProjectLI'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDMUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFNkM7QUFDRTtBQUNBOzs7QUFHL0M7QUFDQTtBQUNBLElBQUksbUVBQWtCLENBQUMsNERBQU87QUFDOUIsSUFBSSxtRUFBa0IsQ0FBQyw0REFBTztBQUM5QixJQUFJLG1FQUFrQixDQUFDLDREQUFPO0FBQzlCLElBQUksa0VBQXFCO0FBQ3pCO0FBQ0EsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogRE9NLmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIERPTSBsb2FkaW5nIGFuZCBtYW5pcHVsYXRpb25cblxuKi9cbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5qcyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0LmpzJztcblxuY29uc3Qgb3BlbkxJTm9kZXMgPSBbXTtcblxuY29uc3QgX2NyZWF0ZUVsZW1lbnQgPSAodHlwZSwgY2xhc3NOYW1lQXJyLCB0ZXh0LCBpZCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGlmIChjbGFzc05hbWVBcnIpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVBcnIpO1xuICAgIGlmICh0ZXh0KSBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBpZiAoaWQpIGVsZW1lbnQuaWQgPSBpZDtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuLy8gSGFuZGxlcyBsb2FkaW5nIGFuZCBzZXR1cCBvZiBzaWRlYmFyXG5jb25zdCBET01Mb2FkZXIgPSB7XG4gICAgbG9hZFNpZGVCYXI6ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZUJhcicpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHNlY3Rpb24gZm9yIE5hdiBsaW5rcyAoSW5ib3gsIFRvZGF5Li4pXG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2xvYWRTaWRlQmFyTmF2TGlua3MoKSk7XG5cbiAgICAgICAgLy8gQWRkIHNlY3Rpb24gZm9yIFByb2plY3RzXG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2xvYWRTaWRlQmFyUHJvakxpbmtzKCkpO1xuICAgICAgICBcbiAgICB9XG5cbn1cblxuLy8gU2V0dXAgb2YgSW5ib3gsIFRvZGF5IGFuZCBUaGlzIHdlZWsgbGlua3NcbmNvbnN0IF9sb2FkU2lkZUJhck5hdkxpbmtzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJ10sJycsJ3NpZGVCYXJOYXZDb250Jyk7XG4gICAgXG4gICAgLy8gQWRkIGluYm94IGJ1dHRvblxuICAgIGNvbnN0IGluYm94ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ0luYm94Jyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZChpbmJveCk7XG4gICAgaW5ib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbmJveEhhbmRsZXIpO1xuXG4gICAgLy8gQWRkIHRvZGF5XG4gICAgY29uc3QgdG9kYXkgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVG9kYXknKTtcbiAgICBuYXZDb250LmFwcGVuZENoaWxkKHRvZGF5KTtcbiAgICB0b2RheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZGF5SGFuZGxlcik7XG5cbiAgICAvLyBBZGQgdGhpcyB3ZWVrXG4gICAgY29uc3QgdGhpc1dlZWsgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVGhpcyBXZWVrJyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZCh0aGlzV2Vlayk7XG4gICAgdGhpc1dlZWsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzV2Vla0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBuYXZDb250O1xufVxuLy8gU2lkZWJhciBuYXZsaW5rIGhhbmRsZXJzXG5jb25zdCBpbmJveEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGluIGluYm94XG59XG5jb25zdCB0b2RheUhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGR1ZSB0b2RheVxufVxuY29uc3QgdGhpc1dlZWtIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBzaG93IGFsbCB0YXNrcyBkdWUgdG9kYXlcbn1cblxuY29uc3QgX2xvYWRTaWRlQmFyUHJvakxpbmtzID0gKCkgPT4ge1xuXG4gICAgY29uc3QgcHJvakNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJ10sICcnLCAncHJvakNvbnQnKTtcblxuICAgIC8vIENyZWF0ZSBQcm9qZWN0cyBoZWFkaW5nIGFuZCBhZGQgYnV0dG9uXG4gICAgY29uc3QgcHJvakhlYWRpbmcgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKTtcbiAgICBwcm9qSGVhZGluZy5hcHBlbmRDaGlsZChfY3JlYXRlRWxlbWVudCgnaDQnLCBbJ2ZsZXhDb2wnXSwgJ1Byb2plY3RzJykpO1xuICAgIHByb2pDb250LmFwcGVuZENoaWxkKHByb2pIZWFkaW5nKTtcblxuICAgIC8vIENyZWF0ZSB1bCBsaXN0IGVsZW1lbnQgdG8gYXBwZW5kIGFsbCBwcm9qZWN0cyBhcyBjaGlsZHJlbiB0b1xuICAgIGNvbnN0IHByb2pMaXN0ID0gX2NyZWF0ZUVsZW1lbnQoJ3VsJywgWydwcm9qTGlzdCddLCAnJywgJ3Byb2pMaXN0Jyk7XG4gICAgcHJvakNvbnQuYXBwZW5kQ2hpbGQocHJvakxpc3QpO1xuICAgIFxuICAgIC8vIEFkZCBhbGwgYWN0aXZlIHByb2plY3RzXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvaiA9PiBwcm9qTGlzdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0RE9NKHByb2ouZ2V0TmFtZSgpKSkpO1xuXG4gICAgLy8gQWRkIFwiQWRkIHByb2plY3RcIiBsaXN0IGl0ZW1cbiAgICBwcm9qTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVBZGRQcm9qKCkpO1xuXG4gICAgcmV0dXJuIHByb2pDb250O1xuXG59XG5cbi8vIEFkZHMgXCIrIEFkZCBwcm9qZWN0XCIgYW5kIHNldHVwXG5jb25zdCBjcmVhdGVBZGRQcm9qID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZENvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKTtcblxuICAgIGFkZENvbnQuYXBwZW5kQ2hpbGQoX2NyZWF0ZUVsZW1lbnQoJ2xpJywgWydhZGRQcm9qTEknXSwgJysgQWRkIFByb2plY3QnLCAnKyBBZGQgUHJvamVjdExJJykpO1xuXG4gICAgLy8gc3RvcmUgbGkgaW4gcHJpdmF0ZSBhcnJheSAob3BlbkxJTm9kZXMpXG4gICAgb3BlbkxJTm9kZXMucHVzaChhZGRDb250LmZpcnN0Q2hpbGQpO1xuXG4gICAgYWRkQ29udC5maXJzdENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNsb3NlQWxsRm9ybXMoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZvcm1Qcm9qID0gY3JlYXRlUHJvakZvcm0oJysgQWRkIFByb2plY3QnKTtcbiAgICAgICAgZm9ybVByb2ouZmlyc3RDaGlsZC52YWx1ZSA9ICcnO1xuXG4gICAgICAgIGZvcm1Qcm9qLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dFByb2onKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0IG5hbWUgYmVpbmcgaW5wdXQgaXM6ICcgKyBuZXdQcm9qTmFtZSk7XG4gICAgICAgICAgICBpZiAoU3RvcmFnZS5jaGVja1Byb2plY3QobmV3UHJvak5hbWUpKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2plY3QgbmFtZSBleGlzdHMuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KG5ld1Byb2pOYW1lKSk7XG5cbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhZGRQcm9qZWN0RE9NKG5ld1Byb2pOYW1lKSwgYWRkQ29udCk7XG5cbiAgICAgICAgICAgICAgICBmb3JtUHJvai5yZXBsYWNlV2l0aChvcGVuTElOb2Rlcy5maW5kKG5vZGUgPT4gbm9kZS5pZCA9PT0gJysgQWRkIFByb2plY3RMSScpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB9KTtcbiAgICAgICAgYWRkQ29udC5maXJzdENoaWxkLnJlcGxhY2VXaXRoKGZvcm1Qcm9qKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhZGRDb250O1xuXG59XG4vLyBBZGRzIHByb2pOYW1lIHRvIHByb2plY3QgTGlzdCBpbiBET01cbmNvbnN0IGFkZFByb2plY3RET00gPSAocHJvak5hbWUpID0+IHtcblxuICAgIGNvbnN0IHByb2pJdGVtID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncHJvakl0ZW0nXSlcblxuICAgIC8vIEFkZCBwcm9qZWN0IG5hbWUgYXMgbGlzdEl0ZW1cbiAgICBjb25zdCBsaU5vZGUgPSBfY3JlYXRlRWxlbWVudCgnbGknLCAnJywgcHJvak5hbWUsIHByb2pOYW1lICsgJ0xJJyk7XG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQobGlOb2RlKTtcblxuICAgIC8vIEFkZCBlZGl0IHByb2plY3QgaWNvbiBhbmQgc2V0dXAgZXZlbnQgbGlzdGVuZXJcbiAgICBjb25zdCBlZGl0Tm9kZSA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS1lZGl0J10pO1xuICAgIHByb2pJdGVtLmFwcGVuZENoaWxkKGVkaXROb2RlKVxuICAgIGVkaXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGxpTm9kZVVwZGF0ZWQgPSBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICBpZiAobGlOb2RlVXBkYXRlZC5sb2NhbE5hbWUgPT09ICdsaScpIGVkaXRQcm9qZWN0KGxpTm9kZVVwZGF0ZWQpO1xuICAgIH0pIFxuXG4gICAgLy8gQWRkIGRlbGV0ZSBpY29uIGFuZCBzZXR1cCBldmVudCBsaXN0ZW5lclxuICAgIGNvbnN0IGRlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtdHJhc2gtYWx0J10pO1xuICAgIGRlbEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVByb2plY3QocHJvak5hbWUsIHByb2pJdGVtKTtcbiAgICB9KVxuICAgIHByb2pJdGVtLmFwcGVuZENoaWxkKGRlbEljb24pO1xuXG4gICAgcmV0dXJuIHByb2pJdGVtO1xuXG59XG5cbmNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAvLyBjaGVjayBmb3IgZHVwbGljYXRlcyBpbiBzdG9yYWdlXG4gICAgXG4gICAgY29uc29sZS5sb2cocHJvamVjdE5hbWUpO1xufVxuXG4vLyBjcmVhdGUgcHJvamVjdCBmb3JtIGVsZW1lbnQgd2l0aCBzdXBwbGllZCBuYW1lIGFzIHZhbHVlXG5jb25zdCBjcmVhdGVQcm9qRm9ybSA9IChwcm9qTmFtZURlZmF1bHQpID0+IHtcblxuICAgIC8vIGNyZWF0ZSBmb3JtIGVsZW1lbnRcbiAgICBjb25zdCBmb3JtUHJvaiA9IF9jcmVhdGVFbGVtZW50KCdmb3JtJywgJycsICcnLCBwcm9qTmFtZURlZmF1bHQgKyAnRk9STScpO1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IGVsZW1lbnQgd2l0aCBwbGFjZWhvbGRlciB2YWx1ZSBhcyBwcm9qZWN0IG5hbWVcbiAgICBjb25zdCBpbnB1dFByb2ogPSBfY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2lucHV0UHJvaiddLCAnJywgJ2lucHV0UHJvaicpO1xuICAgIGlucHV0UHJvai50eXBlID0gJ3RleHQnO1xuICAgIGlucHV0UHJvai5yZXF1aXJlZCA9IHRydWU7XG4gICAgaW5wdXRQcm9qLnZhbHVlID0gcHJvak5hbWVEZWZhdWx0O1xuXG4gICAgLy8gY3JlYXRlIHNhdmUgYnV0dG9uXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCBzYXZlSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtc2F2ZSddKTtcbiAgICBzYXZlQnV0dG9uLmFwcGVuZENoaWxkKHNhdmVJY29uKTtcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcblxuICAgIC8vIGNyZWF0ZSBjYW5jZWwgYnV0dG9uXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLXdpbmRvdy1jbG9zZSddKTtcbiAgICBjYW5jZWxCdXR0b24uYXBwZW5kQ2hpbGQoY2FuY2VsSWNvbik7XG4gICAgY2FuY2VsQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcblxuICAgIC8vIHNldHVwIGV2ZW50IGxpc3RlbmVyIGZvciBjYW5jZWwgYnV0dG9uXG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNsb3NlQWxsRm9ybXMoKTtcbiAgICB9KVxuXG4gICAgZm9ybVByb2ouYXBwZW5kKGlucHV0UHJvaiwgc2F2ZUJ1dHRvbiwgY2FuY2VsQnV0dG9uKTtcblxuICAgIHJldHVybiBmb3JtUHJvajtcbn1cblxuLy8gQ2hhbmdlcyBwcm9qZWN0IGxpc3QgaXRlbSB0byBlZGl0YWJsZSBmaWVsZCBhbmQgdXBkYXRlcyBwcm9qZWN0IG5hbWVcbmNvbnN0IGVkaXRQcm9qZWN0ID0gKGxpc3RJdGVtTm9kZSkgPT4ge1xuICAgIFxuICAgIC8vIGNsb3NlIGFsbCBmb3JtcyBpbiB1bFxuICAgIGNsb3NlQWxsRm9ybXMoKTtcblxuICAgIC8vIHN0b3JlIHByb2plY3QgbmFtZSBpbiB0ZW1wIHZhclxuICAgIGNvbnN0IHByb2pOYW1lID0gbGlzdEl0ZW1Ob2RlLnRleHRDb250ZW50O1xuXG4gICAgLy8gc3RvcmUgbGkgaW4gcHJpdmF0ZSBhcnJheSAob3BlbkxJTm9kZXMpXG4gICAgb3BlbkxJTm9kZXMucHVzaChsaXN0SXRlbU5vZGUpO1xuXG4gICAgLy8gY3JlYXRlIGZvcm0gZWxlbWVudFxuICAgIGNvbnN0IGZvcm1Qcm9qID0gY3JlYXRlUHJvakZvcm0ocHJvak5hbWUpO1xuICAgIFxuICAgIC8vIFNldHVwIGV2ZW50IGxpc3RlbmVyIHVwb24gZm9ybSBlbGVtZW50XG4gICAgZm9ybVByb2ouYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dFByb2onKS52YWx1ZTtcbiAgICAgICAgXG4gICAgICAgIGlmIChTdG9yYWdlLmNoZWNrUHJvamVjdChuZXdQcm9qTmFtZSkpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9qZWN0IG5hbWUgZXhpc3RzLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU3RvcmFnZS51cGRhdGVQcm9qZWN0KHByb2pOYW1lLCBuZXdQcm9qTmFtZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpTm9kZSA9IF9jcmVhdGVFbGVtZW50KCdsaScsICcnLCBuZXdQcm9qTmFtZSwgbmV3UHJvak5hbWUgKyAnTEknKTtcbiAgICBcbiAgICAgICAgICAgIGZvcm1Qcm9qLnJlcGxhY2VXaXRoKGxpTm9kZSk7XG4gICAgICAgICAgICBvcGVuTElOb2Rlcy5zcGxpY2Uob3BlbkxJTm9kZXMuZmluZEluZGV4KG5vZGUgPT4gbm9kZS5pZCA9PT0gcHJvak5hbWUgKyAnTEknKSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVwbGFjZSBsaXN0IGl0ZW0gd2l0aCBpbnB1dCBlbGVtZW50XG4gICAgbGlzdEl0ZW1Ob2RlLnJlcGxhY2VXaXRoKGZvcm1Qcm9qKTtcbiAgICBcbn1cbmNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdE5hbWUsIHByb2plY3ROb2RlKSA9PiB7XG5cbiAgICBjbG9zZUFsbEZvcm1zKCk7XG5cbiAgICAvLyBkZWxldGUgZnJvbSBTdG9yYWdlXG4gICAgU3RvcmFnZS5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0Tm9kZS5yZW1vdmUoKTtcbn1cblxuLy8gY2xvc2VzIGFsbCBvcGVuIGZvcm1zIGluIHByb2plY3QgbGlzdCAodWwpXG5jb25zdCBjbG9zZUFsbEZvcm1zID0gKCkgPT4ge1xuICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2pMaXN0Jyk7XG4gICAgY29uc3QgYXJyUHJvamVjdERpdnMgPSB1bC5jaGlsZE5vZGVzO1xuXG4gICAgLy8gY2hlY2sgZWFjaCBkaXYgaWYgY2hpbGQgZm9ybSBpcyBwcmVzZW50XG4gICAgYXJyUHJvamVjdERpdnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gaWYgeWVzLCBzd2FwIGxpIGZvciBmb3JtXG4gICAgICAgIGlmIChkaXYuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0ZPUk0nKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGdyYWIgaW5kZXggb2YgTElub2RlXG4gICAgICAgICAgICBjb25zdCBpbmRleExJTm9kZSA9IG9wZW5MSU5vZGVzLmZpbmRJbmRleChub2RlID0+IG5vZGUuaWQuc2xpY2UoMCwtMikgPT09IGRpdi5maXJzdENoaWxkLmlkLnNsaWNlKDAsIC00KSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wZW5MSU5vZGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4TElOb2RlKTtcblxuICAgICAgICAgICAgLy8gcmVwbGFjZSBmb3JtIHdpdGggbGlcbiAgICAgICAgICAgIGRpdi5maXJzdENoaWxkLnJlcGxhY2VXaXRoKG9wZW5MSU5vZGVzW2luZGV4TElOb2RlXSk7XG5cbiAgICAgICAgICAgIC8vcmVtb3ZlIGxpIGZyb20gbWVtb3J5IChleGNlcHQgZm9yICcrIEFkZCBQcm9qZWN0JylcbiAgICAgICAgICAgIGlmIChkaXYuZmlyc3RDaGlsZC5pZCAhPSAnKyBBZGQgUHJvamVjdExJJykgb3BlbkxJTm9kZXMuc3BsaWNlKGluZGV4TElOb2RlLCAxKTtcblxuICAgICAgICB9XG4gICAgfSlcblxuICAgIFxuXG59XG5cblxuXG5leHBvcnQgeyBET01Mb2FkZXIgfTsiLCIvKiBQcm9qZWN0LmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgUHJvamVjdCBvYmplY3QgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zXG5cbiovXG4vLyBpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrLmpzJztcblxuY29uc3QgUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBbXTtcbiAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXROYW1lKG5ld05hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRhc2tzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRhc2tzO1xuICAgICAgICB9LFxuICAgICAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZVRhc2sodGFza0lEKSB7XG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UodGFza3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJRCgpID09PSB0YXNrSUQpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFByb2plY3QgfTsiLCJcbmNvbnN0IGFjdGl2ZVRhc2tzID0gW107XG5jb25zdCBhY3RpdmVQcm9qZWN0cyA9IFtdO1xuXG5jb25zdCBTdG9yYWdlID0ge1xuICAgIGFkZFByb2plY3Q6IChwcm9qKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnB1c2gocHJvaik7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHM7XG4gICAgfSxcbiAgICBjaGVja1Byb2plY3Q6IChwcm9qTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHMuc29tZShwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qTmFtZSk7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9qZWN0OiAob2xkUHJvak5hbWUsIG5ld1Byb2pOYW1lKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzW2FjdGl2ZVByb2plY3RzLmZpbmRJbmRleChwcm9qID0+IFN0b3JhZ2UuY2hlY2tQcm9qZWN0KG9sZFByb2pOYW1lKSldLnNldE5hbWUobmV3UHJvak5hbWUpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvamVjdDogKHByb2pOYW1lKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnNwbGljZShhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBTdG9yYWdlLmNoZWNrUHJvamVjdChwcm9qTmFtZSkpLCAxKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHsgU3RvcmFnZSB9IiwiLyogVGFzay5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIHRhc2sgb2JqZWN0IGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9uc1xuXG4qL1xuXG5jb25zdCBUYXNrID0gKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgLy8gQWxsIHRhc2tzIGRlZmF1bHQgdG8gaW5ib3ggdXBvbiBjcmVhdGlvblxuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXRJRCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGl0bGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgICAgICB0aXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGVzY3JpcHRpb24oZGVzYykge1xuICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBnZXREYXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldERhdGUobmV3RGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IG5ld0RhdGU7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFByaW9yaXR5KHByaSkge1xuICAgICAgICAgICAgcHJpb3JpdHkgPSBwcmk7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG8pO1xufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuXG4tIFRhc2tzXG4gICAgLSBTZXBlcmF0ZSBtb2R1bGVcbiAgICAtIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGFza1xuICAgIC0gUHJvcGVydGllczogXG4gICAgICAgIC0gdGl0bGVcbiAgICAgICAgLSBkZXNjcmlwdGlvblxuICAgICAgICAtIGR1ZSBkYXRlXG4gICAgICAgIC0gcHJpb3JpdHlcbiAgICAgICAgLSBpc0NvbXBsZXRlXG4gICAgLSBmdW5jdGlvbnNcbiAgICAgICAgLSBjaGFuZ2UgcHJvcGVydGllc1xuLSBQcm9qZWN0c1xuICAgIC0gY29udGFpbnMgbWFueSB0YXNrc1xuICAgIC0gcHJvcGVydGllczpcbiAgICAgICAgLSBcbi0gRE9NXG5cblxuKi9cblxuaW1wb3J0IHsgRE9NTG9hZGVyIH0gZnJvbSAnLi9tb2R1bGVzL0RPTS5qcyc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9tb2R1bGVzL3N0b3JhZ2UuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LmpzJztcblxuXG5jb25zdCByZW5kZXIgPSAoKCkgPT4ge1xuICAgIFxuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdDbGVhbmluZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgnUGFja2luZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgnTW9wcGluZycpKTtcbiAgICBET01Mb2FkZXIubG9hZFNpZGVCYXIoKTtcbiAgICBcbn0pKCk7XG5cbnJlbmRlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==