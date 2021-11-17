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
        projList.appendChild(addProjectDOM(proj)));

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
    console.log(_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjects());
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

    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadSideBar();

})();

render;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7QUFDdUM7QUFDTjs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksNERBQW1CO0FBQ3ZCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksNkRBQW9CO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLDhEQUFxQjs7QUFFN0I7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQXFCO0FBQ3pCO0FBQ0EsZ0JBQWdCLDREQUFtQjtBQUNuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xMQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQzFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUU2Qzs7O0FBRzdDOztBQUVBLElBQUksa0VBQXFCOztBQUV6QixDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogRE9NLmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIERPTSBsb2FkaW5nIGFuZCBtYW5pcHVsYXRpb25cblxuKi9cbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5qcyc7XG5cbmNvbnN0IF9jcmVhdGVFbGVtZW50ID0gKHR5cGUsIGNsYXNzTmFtZUFyciwgdGV4dCwgaWQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBpZiAoY2xhc3NOYW1lQXJyKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lQXJyKTtcbiAgICBpZiAodGV4dCkgZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgaWYgKGlkKSBlbGVtZW50LmlkID0gaWQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbi8vIEhhbmRsZXMgbG9hZGluZyBhbmQgc2V0dXAgb2Ygc2lkZWJhclxuY29uc3QgRE9NTG9hZGVyID0ge1xuICAgIGxvYWRTaWRlQmFyOiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGVCYXInKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBzZWN0aW9uIGZvciBOYXYgbGlua3MgKEluYm94LCBUb2RheS4uKVxuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKF9sb2FkU2lkZUJhck5hdkxpbmtzKCkpO1xuXG4gICAgICAgIC8vIEFkZCBzZWN0aW9uIGZvciBQcm9qZWN0c1xuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKF9sb2FkU2lkZUJhclByb2pMaW5rcygpKTtcbiAgICAgICAgXG4gICAgfVxuXG59XG5cbi8vIFNldHVwIG9mIEluYm94LCBUb2RheSBhbmQgVGhpcyB3ZWVrIGxpbmtzXG5jb25zdCBfbG9hZFNpZGVCYXJOYXZMaW5rcyA9ICgpID0+IHtcbiAgICBjb25zdCBuYXZDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddLCcnLCdzaWRlQmFyTmF2Q29udCcpO1xuICAgIFxuICAgIC8vIEFkZCBpbmJveCBidXR0b25cbiAgICBjb25zdCBpbmJveCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdJbmJveCcpO1xuICAgIG5hdkNvbnQuYXBwZW5kQ2hpbGQoaW5ib3gpO1xuICAgIGluYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5ib3hIYW5kbGVyKTtcblxuICAgIC8vIEFkZCB0b2RheVxuICAgIGNvbnN0IHRvZGF5ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ1RvZGF5Jyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZCh0b2RheSk7XG4gICAgdG9kYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2RheUhhbmRsZXIpO1xuXG4gICAgLy8gQWRkIHRoaXMgd2Vla1xuICAgIGNvbnN0IHRoaXNXZWVrID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ1RoaXMgV2VlaycpO1xuICAgIG5hdkNvbnQuYXBwZW5kQ2hpbGQodGhpc1dlZWspO1xuICAgIHRoaXNXZWVrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpc1dlZWtIYW5kbGVyKTtcbiAgICBcbiAgICByZXR1cm4gbmF2Q29udDtcbn1cbi8vIFNpZGViYXIgbmF2bGluayBoYW5kbGVyc1xuY29uc3QgaW5ib3hIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBzaG93IGFsbCB0YXNrcyBpbiBpbmJveFxufVxuY29uc3QgdG9kYXlIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBzaG93IGFsbCB0YXNrcyBkdWUgdG9kYXlcbn1cbmNvbnN0IHRoaXNXZWVrSGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gc2hvdyBhbGwgdGFza3MgZHVlIHRvZGF5XG59XG5cbmNvbnN0IF9sb2FkU2lkZUJhclByb2pMaW5rcyA9ICgpID0+IHtcblxuICAgIGNvbnN0IHByb2pDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddLCAnJywgJ3Byb2pDb250Jyk7XG5cbiAgICAvLyBDcmVhdGUgUHJvamVjdHMgaGVhZGluZyBhbmQgYWRkIGJ1dHRvblxuICAgIGNvbnN0IHByb2pIZWFkaW5nID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncHJvakl0ZW0nXSk7XG4gICAgcHJvakhlYWRpbmcuYXBwZW5kQ2hpbGQoX2NyZWF0ZUVsZW1lbnQoJ2g0JywgWydmbGV4Q29sJ10sICdQcm9qZWN0cycpKTtcblxuICAgIGNvbnN0IGFkZEJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXMnLCdmYS1wbHVzJ10pO1xuICAgIHByb2pIZWFkaW5nLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG4gICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkUHJvakxpc3RlbmVyKTtcbiAgICBwcm9qQ29udC5hcHBlbmRDaGlsZChwcm9qSGVhZGluZyk7XG5cbiAgICAvLyBDcmVhdGUgdWwgbGlzdCBlbGVtZW50IHRvIGFwcGVuZCBhbGwgcHJvamVjdHMgYXMgY2hpbGRyZW4gdG9cbiAgICBjb25zdCBwcm9qTGlzdCA9IF9jcmVhdGVFbGVtZW50KCd1bCcsIFsncHJvakxpc3QnXSwgJycsICdwcm9qTGlzdCcpO1xuICAgIHByb2pDb250LmFwcGVuZENoaWxkKHByb2pMaXN0KTtcblxuICAgIC8vIEFkZCBhbGwgYWN0aXZlIHByb2plY3RzXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvaiA9PlxuICAgICAgICBwcm9qTGlzdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0RE9NKHByb2opKSk7XG5cbiAgICByZXR1cm4gcHJvakNvbnQ7XG5cbn1cblxuY29uc3QgYWRkUHJvakxpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBCcmluZyB1cCBhZGQgcHJvamVjdCBtb2RhbFxuICAgIC8vIFNldHVwIGxpc3RlbmVyIGZvciAnY2xpY2snIG9mIGFkZCBwcm9qZWN0IGJ1dHRvblxuICAgIC8vIGNhbGwgYWRkUHJvamVjdERPTVxuICAgIC8vIGFkZCBwcm9qZWN0IHRvIGFjdGl2ZVByb2plY3RzIChjaGVjayBmb3IgZHVwbGljYXRlKVxufVxuXG4vLyBBZGRzIHByb2pOYW1lIHRvIHByb2plY3QgTGlzdCBpbiBET01cbmNvbnN0IGFkZFByb2plY3RET00gPSAocHJvak5hbWUpID0+IHtcblxuICAgIGNvbnN0IHByb2pJdGVtID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncHJvakl0ZW0nXSlcblxuICAgIC8vIEFkZCBwcm9qZWN0IG5hbWUgYXMgbGlzdEl0ZW1cbiAgICBjb25zdCBsaU5vZGUgPSBfY3JlYXRlRWxlbWVudCgnbGknLCAnJywgcHJvak5hbWUpO1xuICAgIHByb2pJdGVtLmFwcGVuZENoaWxkKGxpTm9kZSk7XG5cbiAgICAvLyBBZGQgZWRpdCBwcm9qZWN0IGljb24gYW5kIHNldHVwIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgZWRpdE5vZGUgPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtZWRpdCddKTtcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChlZGl0Tm9kZSlcbiAgICBlZGl0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+ICBlZGl0UHJvamVjdChsaU5vZGUpKTtcblxuICAgIC8vIEFkZCBkZWxldGUgaWNvbiBhbmQgc2V0dXAgZXZlbnQgbGlzdGVuZXJcbiAgICBjb25zdCBkZWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLXRyYXNoLWFsdCddKTtcbiAgICBkZWxJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkZWxldGVQcm9qZWN0KHByb2pOYW1lLCBwcm9qSXRlbSk7XG4gICAgfSlcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChkZWxJY29uKTtcblxuICAgIHJldHVybiBwcm9qSXRlbTtcblxufVxuXG5jb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgLy8gY2hlY2sgZm9yIGR1cGxpY2F0ZXMgaW4gc3RvcmFnZVxuICAgIFxuICAgIGNvbnNvbGUubG9nKHByb2plY3ROYW1lKTtcbn1cblxuLy8gQ2hhbmdlcyBwcm9qZWN0IGxpc3QgaXRlbSB0byBlZGl0YWJsZSBmaWVsZCBhbmQgdXBkYXRlcyBwcm9qZWN0IG5hbWVcbmNvbnN0IGVkaXRQcm9qZWN0ID0gKGxpc3RJdGVtTm9kZSkgPT4ge1xuICAgIFxuICAgIC8vIHN0b3JlIHByb2plY3QgbmFtZSBpbiB0ZW1wIHZhclxuICAgIGNvbnN0IHByb2pOYW1lID0gbGlzdEl0ZW1Ob2RlLnRleHRDb250ZW50O1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IGVsZW1lbnQgd2l0aCBwbGFjZWhvbGRlciB2YWx1ZSBhcyBwcm9qZWN0IG5hbWVcbiAgICBjb25zdCBpbnB1dFByb2ogPSBfY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2lucHV0UHJvaiddLCAnJywgJ2lucHV0UHJvaicpO1xuICAgIGlucHV0UHJvai50eXBlID0gJ3RleHQnO1xuICAgIGlucHV0UHJvai5yZXF1aXJlZCA9IHRydWU7XG4gICAgaW5wdXRQcm9qLnZhbHVlID0gcHJvak5hbWU7XG5cbiAgICAvLyBjcmVhdGUgZm9ybSBlbGVtZW50IGFuZCBhcHBlbmQgaW5wdXRQcm9qIHRvIGl0XG4gICAgY29uc3QgZm9ybVByb2ogPSBfY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGNvbnN0IGJ1dHRvblByb2ogPSBfY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3Qgc2F2ZVByb2ogPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLXNhdmUnXSk7XG4gICAgYnV0dG9uUHJvai5hcHBlbmRDaGlsZChzYXZlUHJvaik7XG4gICAgYnV0dG9uUHJvai50eXBlID0gJ3N1Ym1pdCc7XG4gICAgZm9ybVByb2ouYXBwZW5kKGlucHV0UHJvaiwgYnV0dG9uUHJvaik7XG5cbiAgICAvLyBTZXR1cCBldmVudCBsaXN0ZW5lciB1cG9uIGZvcm0gZWxlbWVudFxuICAgIGZvcm1Qcm9qLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG5ld1Byb2pOYW1lID0gaW5wdXRQcm9qLnZhbHVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKFN0b3JhZ2UuY2hlY2tQcm9qZWN0KG5ld1Byb2pOYW1lKSkge1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2plY3QgbmFtZSBleGlzdHMuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBTdG9yYWdlLnVwZGF0ZVByb2plY3QocHJvak5hbWUsIG5ld1Byb2pOYW1lKTtcblxuICAgICAgICBjb25zdCBsaU5vZGUgPSBfY3JlYXRlRWxlbWVudCgnbGknLCAnJywgbmV3UHJvak5hbWUpO1xuXG4gICAgICAgIGZvcm1Qcm9qLnJlcGxhY2VXaXRoKGxpTm9kZSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vIHJlcGxhY2UgbGlzdCBpdGVtIHdpdGggaW5wdXQgZWxlbWVudFxuICAgIGxpc3RJdGVtTm9kZS5yZXBsYWNlV2l0aChmb3JtUHJvaik7XG4gICAgXG59XG5jb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3ROYW1lLCBwcm9qZWN0Tm9kZSkgPT4ge1xuICAgIC8vIGRlbGV0ZSBmcm9tIFN0b3JhZ2VcbiAgICBTdG9yYWdlLmRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3ROb2RlLnJlbW92ZSgpO1xuICAgIGNvbnNvbGUubG9nKFN0b3JhZ2UuZ2V0UHJvamVjdHMoKSk7XG59XG5cblxuXG5leHBvcnQgeyBET01Mb2FkZXIgfTsiLCJcbmNvbnN0IGFjdGl2ZVRhc2tzID0gW107XG5jb25zdCBhY3RpdmVQcm9qZWN0cyA9IFsnQ2xlYW5pbmcnLCAnUGFja2luZycsICdNb3BwaW5nJ107XG5cbmNvbnN0IFN0b3JhZ2UgPSB7XG4gICAgYWRkUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9LFxuICAgIGdldFByb2plY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cztcbiAgICB9LFxuICAgIGNoZWNrUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2plY3RzLmluY2x1ZGVzKHByb2opO1xuICAgIH0sXG4gICAgdXBkYXRlUHJvamVjdDogKG9sZFByb2osIG5ld1Byb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGFjdGl2ZVByb2plY3RzLmluZGV4T2Yob2xkUHJvaiksIDEsIG5ld1Byb2opO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGFjdGl2ZVByb2plY3RzLmluZGV4T2YocHJvaiksIDEpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgeyBTdG9yYWdlIH0iLCIvKiBUYXNrLmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgdGFzayBvYmplY3QgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zXG5cbiovXG5cbmNvbnN0IFRhc2sgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAvLyBBbGwgdGFza3MgZGVmYXVsdCB0byBpbmJveCB1cG9uIGNyZWF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGdldElEKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9LFxuICAgICAgICBnZXRUaXRsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXREZXNjcmlwdGlvbihkZXNjKSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgIH0sXG4gICAgICAgIGdldERhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGF0ZShuZXdEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0UHJpb3JpdHkocHJpKSB7XG4gICAgICAgICAgICBwcmlvcml0eSA9IHByaTtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFRhc2sgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG5cbi0gVGFza3NcbiAgICAtIFNlcGVyYXRlIG1vZHVsZVxuICAgIC0gRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSB0YXNrXG4gICAgLSBQcm9wZXJ0aWVzOiBcbiAgICAgICAgLSB0aXRsZVxuICAgICAgICAtIGRlc2NyaXB0aW9uXG4gICAgICAgIC0gZHVlIGRhdGVcbiAgICAgICAgLSBwcmlvcml0eVxuICAgICAgICAtIGlzQ29tcGxldGVcbiAgICAtIGZ1bmN0aW9uc1xuICAgICAgICAtIGNoYW5nZSBwcm9wZXJ0aWVzXG4tIFByb2plY3RzXG4gICAgLSBjb250YWlucyBtYW55IHRhc2tzXG4gICAgLSBwcm9wZXJ0aWVzOlxuICAgICAgICAtIFxuLSBET01cblxuXG4qL1xuXG5pbXBvcnQgeyBET01Mb2FkZXIgfSBmcm9tICcuL21vZHVsZXMvRE9NLmpzJztcblxuXG5jb25zdCByZW5kZXIgPSAoKCkgPT4ge1xuXG4gICAgRE9NTG9hZGVyLmxvYWRTaWRlQmFyKCk7XG5cbn0pKCk7XG5cbnJlbmRlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==