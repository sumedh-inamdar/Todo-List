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
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjects().forEach(proj =>
        projList.appendChild(addProjectDOM(proj.getName())));

    return projCont;

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
    const liNode = _createElement('li', '', projName);
    projItem.appendChild(liNode);

    // Add edit project icon and setup event listener
    const editNode = _createElement('i', ['far','fa-edit']);
    projItem.appendChild(editNode)
    editNode.addEventListener('click', () =>  editProject(liNode));

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

// Changes project list item to editable field and updates project name
const editProject = (listItemNode) => {
    
    // store project name in temp var
    const projName = listItemNode.textContent;

    // create input element with placeholder value as project name
    const inputProj = _createElement('input', ['inputProj'], '', 'inputProj');
    inputProj.type = 'text';
    inputProj.required = true;
    inputProj.value = projName;

    // create form element and append inputProj to it
    const formProj = _createElement('form');
    const buttonProj = _createElement('button');
    const saveProj = _createElement('i', ['far', 'fa-save']);
    buttonProj.appendChild(saveProj);
    buttonProj.type = 'submit';
    formProj.append(inputProj, buttonProj);

    // Setup event listener upon form element
    formProj.addEventListener('submit', (event) => {

        const newProjName = inputProj.value;
        
        if (_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.checkProject(newProjName)) {
            alert('Project name exists.');
            return;
        }

        _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.updateProject(projName, newProjName);

        const liNode = _createElement('li', '', newProjName);

        formProj.replaceWith(liNode);

        event.preventDefault();
    });

    // replace list item with input element
    listItemNode.replaceWith(formProj);
    
}
const deleteProject = (projectName, projectNode) => {
    // delete from Storage
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.deleteProject(projectName);
    projectNode.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7OztBQUdBOztBQUU2QztBQUNFO0FBQ0E7OztBQUcvQztBQUNBO0FBQ0EsSUFBSSxtRUFBa0IsQ0FBQyw0REFBTztBQUM5QixJQUFJLG1FQUFrQixDQUFDLDREQUFPO0FBQzlCLElBQUksbUVBQWtCLENBQUMsNERBQU87QUFDOUIsSUFBSSxrRUFBcUI7QUFDekI7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBET00uanMgXG5cbk1vZHVsZSByZXNwb25zaWJsZSBmb3IgRE9NIGxvYWRpbmcgYW5kIG1hbmlwdWxhdGlvblxuXG4qL1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrLmpzJztcblxuY29uc3QgX2NyZWF0ZUVsZW1lbnQgPSAodHlwZSwgY2xhc3NOYW1lQXJyLCB0ZXh0LCBpZCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGlmIChjbGFzc05hbWVBcnIpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVBcnIpO1xuICAgIGlmICh0ZXh0KSBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBpZiAoaWQpIGVsZW1lbnQuaWQgPSBpZDtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuLy8gSGFuZGxlcyBsb2FkaW5nIGFuZCBzZXR1cCBvZiBzaWRlYmFyXG5jb25zdCBET01Mb2FkZXIgPSB7XG4gICAgbG9hZFNpZGVCYXI6ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZUJhcicpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHNlY3Rpb24gZm9yIE5hdiBsaW5rcyAoSW5ib3gsIFRvZGF5Li4pXG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2xvYWRTaWRlQmFyTmF2TGlua3MoKSk7XG5cbiAgICAgICAgLy8gQWRkIHNlY3Rpb24gZm9yIFByb2plY3RzXG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2xvYWRTaWRlQmFyUHJvakxpbmtzKCkpO1xuICAgICAgICBcbiAgICB9XG5cbn1cblxuLy8gU2V0dXAgb2YgSW5ib3gsIFRvZGF5IGFuZCBUaGlzIHdlZWsgbGlua3NcbmNvbnN0IF9sb2FkU2lkZUJhck5hdkxpbmtzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJ10sJycsJ3NpZGVCYXJOYXZDb250Jyk7XG4gICAgXG4gICAgLy8gQWRkIGluYm94IGJ1dHRvblxuICAgIGNvbnN0IGluYm94ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ0luYm94Jyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZChpbmJveCk7XG4gICAgaW5ib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbmJveEhhbmRsZXIpO1xuXG4gICAgLy8gQWRkIHRvZGF5XG4gICAgY29uc3QgdG9kYXkgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVG9kYXknKTtcbiAgICBuYXZDb250LmFwcGVuZENoaWxkKHRvZGF5KTtcbiAgICB0b2RheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZGF5SGFuZGxlcik7XG5cbiAgICAvLyBBZGQgdGhpcyB3ZWVrXG4gICAgY29uc3QgdGhpc1dlZWsgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVGhpcyBXZWVrJyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZCh0aGlzV2Vlayk7XG4gICAgdGhpc1dlZWsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzV2Vla0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBuYXZDb250O1xufVxuLy8gU2lkZWJhciBuYXZsaW5rIGhhbmRsZXJzXG5jb25zdCBpbmJveEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGluIGluYm94XG59XG5jb25zdCB0b2RheUhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGR1ZSB0b2RheVxufVxuY29uc3QgdGhpc1dlZWtIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBzaG93IGFsbCB0YXNrcyBkdWUgdG9kYXlcbn1cblxuY29uc3QgX2xvYWRTaWRlQmFyUHJvakxpbmtzID0gKCkgPT4ge1xuXG4gICAgY29uc3QgcHJvakNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJ10sICcnLCAncHJvakNvbnQnKTtcblxuICAgIC8vIENyZWF0ZSBQcm9qZWN0cyBoZWFkaW5nIGFuZCBhZGQgYnV0dG9uXG4gICAgY29uc3QgcHJvakhlYWRpbmcgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKTtcbiAgICBwcm9qSGVhZGluZy5hcHBlbmRDaGlsZChfY3JlYXRlRWxlbWVudCgnaDQnLCBbJ2ZsZXhDb2wnXSwgJ1Byb2plY3RzJykpO1xuXG4gICAgY29uc3QgYWRkQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcycsJ2ZhLXBsdXMnXSk7XG4gICAgcHJvakhlYWRpbmcuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQcm9qTGlzdGVuZXIpO1xuICAgIHByb2pDb250LmFwcGVuZENoaWxkKHByb2pIZWFkaW5nKTtcblxuICAgIC8vIENyZWF0ZSB1bCBsaXN0IGVsZW1lbnQgdG8gYXBwZW5kIGFsbCBwcm9qZWN0cyBhcyBjaGlsZHJlbiB0b1xuICAgIGNvbnN0IHByb2pMaXN0ID0gX2NyZWF0ZUVsZW1lbnQoJ3VsJywgWydwcm9qTGlzdCddLCAnJywgJ3Byb2pMaXN0Jyk7XG4gICAgcHJvakNvbnQuYXBwZW5kQ2hpbGQocHJvakxpc3QpO1xuICAgIFxuICAgIC8vIEFkZCBhbGwgYWN0aXZlIHByb2plY3RzXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvaiA9PlxuICAgICAgICBwcm9qTGlzdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0RE9NKHByb2ouZ2V0TmFtZSgpKSkpO1xuXG4gICAgcmV0dXJuIHByb2pDb250O1xuXG59XG5cbmNvbnN0IGFkZFByb2pMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gQnJpbmcgdXAgYWRkIHByb2plY3QgbW9kYWxcbiAgICBcbiAgICAvLyBTZXR1cCBsaXN0ZW5lciBmb3IgJ2NsaWNrJyBvZiBhZGQgcHJvamVjdCBidXR0b25cbiAgICAvLyBjYWxsIGFkZFByb2plY3RET01cbiAgICAvLyBhZGQgcHJvamVjdCB0byBhY3RpdmVQcm9qZWN0cyAoY2hlY2sgZm9yIGR1cGxpY2F0ZSlcbn1cblxuLy8gQWRkcyBwcm9qTmFtZSB0byBwcm9qZWN0IExpc3QgaW4gRE9NXG5jb25zdCBhZGRQcm9qZWN0RE9NID0gKHByb2pOYW1lKSA9PiB7XG5cbiAgICBjb25zdCBwcm9qSXRlbSA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Byb2pJdGVtJ10pXG5cbiAgICAvLyBBZGQgcHJvamVjdCBuYW1lIGFzIGxpc3RJdGVtXG4gICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIHByb2pOYW1lKTtcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChsaU5vZGUpO1xuXG4gICAgLy8gQWRkIGVkaXQgcHJvamVjdCBpY29uIGFuZCBzZXR1cCBldmVudCBsaXN0ZW5lclxuICAgIGNvbnN0IGVkaXROb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLWVkaXQnXSk7XG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQoZWRpdE5vZGUpXG4gICAgZWRpdE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAgZWRpdFByb2plY3QobGlOb2RlKSk7XG5cbiAgICAvLyBBZGQgZGVsZXRlIGljb24gYW5kIHNldHVwIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgZGVsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS10cmFzaC1hbHQnXSk7XG4gICAgZGVsSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZGVsZXRlUHJvamVjdChwcm9qTmFtZSwgcHJvakl0ZW0pO1xuICAgIH0pXG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQoZGVsSWNvbik7XG5cbiAgICByZXR1cm4gcHJvakl0ZW07XG5cbn1cblxuY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgIC8vIGNoZWNrIGZvciBkdXBsaWNhdGVzIGluIHN0b3JhZ2VcbiAgICBcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TmFtZSk7XG59XG5cbi8vIENoYW5nZXMgcHJvamVjdCBsaXN0IGl0ZW0gdG8gZWRpdGFibGUgZmllbGQgYW5kIHVwZGF0ZXMgcHJvamVjdCBuYW1lXG5jb25zdCBlZGl0UHJvamVjdCA9IChsaXN0SXRlbU5vZGUpID0+IHtcbiAgICBcbiAgICAvLyBzdG9yZSBwcm9qZWN0IG5hbWUgaW4gdGVtcCB2YXJcbiAgICBjb25zdCBwcm9qTmFtZSA9IGxpc3RJdGVtTm9kZS50ZXh0Q29udGVudDtcblxuICAgIC8vIGNyZWF0ZSBpbnB1dCBlbGVtZW50IHdpdGggcGxhY2Vob2xkZXIgdmFsdWUgYXMgcHJvamVjdCBuYW1lXG4gICAgY29uc3QgaW5wdXRQcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydpbnB1dFByb2onXSwgJycsICdpbnB1dFByb2onKTtcbiAgICBpbnB1dFByb2oudHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dFByb2oucmVxdWlyZWQgPSB0cnVlO1xuICAgIGlucHV0UHJvai52YWx1ZSA9IHByb2pOYW1lO1xuXG4gICAgLy8gY3JlYXRlIGZvcm0gZWxlbWVudCBhbmQgYXBwZW5kIGlucHV0UHJvaiB0byBpdFxuICAgIGNvbnN0IGZvcm1Qcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCBidXR0b25Qcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHNhdmVQcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1zYXZlJ10pO1xuICAgIGJ1dHRvblByb2ouYXBwZW5kQ2hpbGQoc2F2ZVByb2opO1xuICAgIGJ1dHRvblByb2oudHlwZSA9ICdzdWJtaXQnO1xuICAgIGZvcm1Qcm9qLmFwcGVuZChpbnB1dFByb2osIGJ1dHRvblByb2opO1xuXG4gICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXIgdXBvbiBmb3JtIGVsZW1lbnRcbiAgICBmb3JtUHJvai5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcblxuICAgICAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGlucHV0UHJvai52YWx1ZTtcbiAgICAgICAgXG4gICAgICAgIGlmIChTdG9yYWdlLmNoZWNrUHJvamVjdChuZXdQcm9qTmFtZSkpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9qZWN0IG5hbWUgZXhpc3RzLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgU3RvcmFnZS51cGRhdGVQcm9qZWN0KHByb2pOYW1lLCBuZXdQcm9qTmFtZSk7XG5cbiAgICAgICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIG5ld1Byb2pOYW1lKTtcblxuICAgICAgICBmb3JtUHJvai5yZXBsYWNlV2l0aChsaU5vZGUpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyByZXBsYWNlIGxpc3QgaXRlbSB3aXRoIGlucHV0IGVsZW1lbnRcbiAgICBsaXN0SXRlbU5vZGUucmVwbGFjZVdpdGgoZm9ybVByb2opO1xuICAgIFxufVxuY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0TmFtZSwgcHJvamVjdE5vZGUpID0+IHtcbiAgICAvLyBkZWxldGUgZnJvbSBTdG9yYWdlXG4gICAgU3RvcmFnZS5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0Tm9kZS5yZW1vdmUoKTtcbn1cblxuXG5cbmV4cG9ydCB7IERPTUxvYWRlciB9OyIsIi8qIFByb2plY3QuanMgXG5cbk1vZHVsZSByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0IG9iamVjdCBhbmQgc3VwcG9ydGluZyBmdW5jdGlvbnNcblxuKi9cbi8vIGltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2suanMnO1xuXG5jb25zdCBQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IFtdO1xuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXROYW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldE5hbWUobmV3TmFtZSkge1xuICAgICAgICAgICAgbmFtZSA9IG5ld05hbWU7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGFza3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGFza3M7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICAgICAgdGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlVGFzayh0YXNrSUQpIHtcbiAgICAgICAgICAgIHRhc2tzLnNwbGljZSh0YXNrcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLmdldElEKCkgPT09IHRhc2tJRCksIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHByb3RvKTtcbn1cblxuZXhwb3J0IHsgUHJvamVjdCB9OyIsIlxuY29uc3QgYWN0aXZlVGFza3MgPSBbXTtcbmNvbnN0IGFjdGl2ZVByb2plY3RzID0gW107XG5cbmNvbnN0IFN0b3JhZ2UgPSB7XG4gICAgYWRkUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9LFxuICAgIGdldFByb2plY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cztcbiAgICB9LFxuICAgIGNoZWNrUHJvamVjdDogKHByb2pOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cy5zb21lKHByb2plY3QgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2pOYW1lKTtcbiAgICB9LFxuICAgIHVwZGF0ZVByb2plY3Q6IChvbGRQcm9qTmFtZSwgbmV3UHJvak5hbWUpID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHNbYWN0aXZlUHJvamVjdHMuZmluZEluZGV4KHByb2ogPT4gU3RvcmFnZS5jaGVja1Byb2plY3Qob2xkUHJvak5hbWUpKV0uc2V0TmFtZShuZXdQcm9qTmFtZSk7XG4gICAgfSxcbiAgICBkZWxldGVQcm9qZWN0OiAocHJvak5hbWUpID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGFjdGl2ZVByb2plY3RzLmZpbmRJbmRleChwcm9qID0+IFN0b3JhZ2UuY2hlY2tQcm9qZWN0KHByb2pOYW1lKSksIDEpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgeyBTdG9yYWdlIH0iLCIvKiBUYXNrLmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgdGFzayBvYmplY3QgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zXG5cbiovXG5cbmNvbnN0IFRhc2sgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAvLyBBbGwgdGFza3MgZGVmYXVsdCB0byBpbmJveCB1cG9uIGNyZWF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGdldElEKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9LFxuICAgICAgICBnZXRUaXRsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXREZXNjcmlwdGlvbihkZXNjKSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgIH0sXG4gICAgICAgIGdldERhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGF0ZShuZXdEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0UHJpb3JpdHkocHJpKSB7XG4gICAgICAgICAgICBwcmlvcml0eSA9IHByaTtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFRhc2sgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG5cbi0gVGFza3NcbiAgICAtIFNlcGVyYXRlIG1vZHVsZVxuICAgIC0gRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSB0YXNrXG4gICAgLSBQcm9wZXJ0aWVzOiBcbiAgICAgICAgLSB0aXRsZVxuICAgICAgICAtIGRlc2NyaXB0aW9uXG4gICAgICAgIC0gZHVlIGRhdGVcbiAgICAgICAgLSBwcmlvcml0eVxuICAgICAgICAtIGlzQ29tcGxldGVcbiAgICAtIGZ1bmN0aW9uc1xuICAgICAgICAtIGNoYW5nZSBwcm9wZXJ0aWVzXG4tIFByb2plY3RzXG4gICAgLSBjb250YWlucyBtYW55IHRhc2tzXG4gICAgLSBwcm9wZXJ0aWVzOlxuICAgICAgICAtIFxuLSBET01cblxuXG4qL1xuXG5pbXBvcnQgeyBET01Mb2FkZXIgfSBmcm9tICcuL21vZHVsZXMvRE9NLmpzJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL21vZHVsZXMvc3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnO1xuXG5cbmNvbnN0IHJlbmRlciA9ICgoKSA9PiB7XG4gICAgXG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KFByb2plY3QoJ0NsZWFuaW5nJykpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdQYWNraW5nJykpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdNb3BwaW5nJykpO1xuICAgIERPTUxvYWRlci5sb2FkU2lkZUJhcigpO1xuICAgIFxufSkoKTtcblxucmVuZGVyO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9