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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7QUFDdUM7QUFDTjs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksNERBQW1CO0FBQ3ZCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLDZEQUFvQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUEsUUFBUSw4REFBcUI7O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6S0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUMxQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFNkM7OztBQUc3Qzs7QUFFQSxJQUFJLGtFQUFxQjs7QUFFekIsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIERPTS5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBET00gbG9hZGluZyBhbmQgbWFuaXB1bGF0aW9uXG5cbiovXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlLmpzJztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2suanMnO1xuXG5jb25zdCBfY3JlYXRlRWxlbWVudCA9ICh0eXBlLCBjbGFzc05hbWVBcnIsIHRleHQsIGlkKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgaWYgKGNsYXNzTmFtZUFycikgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZUFycik7XG4gICAgaWYgKHRleHQpIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGlmIChpZCkgZWxlbWVudC5pZCA9IGlkO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG4vLyBIYW5kbGVzIGxvYWRpbmcgYW5kIHNldHVwIG9mIHNpZGViYXJcbmNvbnN0IERPTUxvYWRlciA9IHtcbiAgICBsb2FkU2lkZUJhcjogKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlQmFyJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgc2VjdGlvbiBmb3IgTmF2IGxpbmtzIChJbmJveCwgVG9kYXkuLilcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChfbG9hZFNpZGVCYXJOYXZMaW5rcygpKTtcblxuICAgICAgICAvLyBBZGQgc2VjdGlvbiBmb3IgUHJvamVjdHNcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChfbG9hZFNpZGVCYXJQcm9qTGlua3MoKSk7XG4gICAgICAgIFxuICAgIH1cblxufVxuXG4vLyBTZXR1cCBvZiBJbmJveCwgVG9kYXkgYW5kIFRoaXMgd2VlayBsaW5rc1xuY29uc3QgX2xvYWRTaWRlQmFyTmF2TGlua3MgPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2Q29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwnJywnc2lkZUJhck5hdkNvbnQnKTtcbiAgICBcbiAgICAvLyBBZGQgaW5ib3ggYnV0dG9uXG4gICAgY29uc3QgaW5ib3ggPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnSW5ib3gnKTtcbiAgICBuYXZDb250LmFwcGVuZENoaWxkKGluYm94KTtcbiAgICBpbmJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluYm94SGFuZGxlcik7XG5cbiAgICAvLyBBZGQgdG9kYXlcbiAgICBjb25zdCB0b2RheSA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdUb2RheScpO1xuICAgIG5hdkNvbnQuYXBwZW5kQ2hpbGQodG9kYXkpO1xuICAgIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9kYXlIYW5kbGVyKTtcblxuICAgIC8vIEFkZCB0aGlzIHdlZWtcbiAgICBjb25zdCB0aGlzV2VlayA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdUaGlzIFdlZWsnKTtcbiAgICBuYXZDb250LmFwcGVuZENoaWxkKHRoaXNXZWVrKTtcbiAgICB0aGlzV2Vlay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXNXZWVrSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIG5hdkNvbnQ7XG59XG4vLyBTaWRlYmFyIG5hdmxpbmsgaGFuZGxlcnNcbmNvbnN0IGluYm94SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gc2hvdyBhbGwgdGFza3MgaW4gaW5ib3hcbn1cbmNvbnN0IHRvZGF5SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gc2hvdyBhbGwgdGFza3MgZHVlIHRvZGF5XG59XG5jb25zdCB0aGlzV2Vla0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIC8vIHNob3cgYWxsIHRhc2tzIGR1ZSB0b2RheVxufVxuXG5jb25zdCBfbG9hZFNpZGVCYXJQcm9qTGlua3MgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBwcm9qQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwgJycsICdwcm9qQ29udCcpO1xuXG4gICAgLy8gQ3JlYXRlIFByb2plY3RzIGhlYWRpbmcgYW5kIGFkZCBidXR0b25cbiAgICBjb25zdCBwcm9qSGVhZGluZyA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Byb2pJdGVtJ10pO1xuICAgIHByb2pIZWFkaW5nLmFwcGVuZENoaWxkKF9jcmVhdGVFbGVtZW50KCdoNCcsIFsnZmxleENvbCddLCAnUHJvamVjdHMnKSk7XG5cbiAgICBjb25zdCBhZGRCdXR0b24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFzJywnZmEtcGx1cyddKTtcbiAgICBwcm9qSGVhZGluZy5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuICAgIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFByb2pMaXN0ZW5lcik7XG4gICAgcHJvakNvbnQuYXBwZW5kQ2hpbGQocHJvakhlYWRpbmcpO1xuXG4gICAgLy8gQ3JlYXRlIHVsIGxpc3QgZWxlbWVudCB0byBhcHBlbmQgYWxsIHByb2plY3RzIGFzIGNoaWxkcmVuIHRvXG4gICAgY29uc3QgcHJvakxpc3QgPSBfY3JlYXRlRWxlbWVudCgndWwnLCBbJ3Byb2pMaXN0J10sICcnLCAncHJvakxpc3QnKTtcbiAgICBwcm9qQ29udC5hcHBlbmRDaGlsZChwcm9qTGlzdCk7XG5cbiAgICAvLyBBZGQgYWxsIGFjdGl2ZSBwcm9qZWN0c1xuICAgIFN0b3JhZ2UuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2ogPT5cbiAgICAgICAgcHJvakxpc3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdERPTShwcm9qKSkpO1xuXG4gICAgcmV0dXJuIHByb2pDb250O1xuXG59XG5cbmNvbnN0IGFkZFByb2pMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gQnJpbmcgdXAgYWRkIHByb2plY3QgbW9kYWxcbiAgICAvLyBTZXR1cCBsaXN0ZW5lciBmb3IgJ2NsaWNrJyBvZiBhZGQgcHJvamVjdCBidXR0b25cbiAgICAvLyBjYWxsIGFkZFByb2plY3RET01cbiAgICAvLyBhZGQgcHJvamVjdCB0byBhY3RpdmVQcm9qZWN0cyAoY2hlY2sgZm9yIGR1cGxpY2F0ZSlcbn1cblxuLy8gQWRkcyBwcm9qTmFtZSB0byBwcm9qZWN0IExpc3QgaW4gRE9NXG5jb25zdCBhZGRQcm9qZWN0RE9NID0gKHByb2pOYW1lKSA9PiB7XG5cbiAgICBjb25zdCBwcm9qSXRlbSA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Byb2pJdGVtJ10pXG5cbiAgICAvLyBBZGQgcHJvamVjdCBuYW1lIGFzIGxpc3RJdGVtXG4gICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIHByb2pOYW1lKTtcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChsaU5vZGUpO1xuXG4gICAgLy8gQWRkIGVkaXQgcHJvamVjdCBpY29uIGFuZCBzZXR1cCBldmVudCBsaXN0ZW5lclxuICAgIGNvbnN0IGVkaXROb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLWVkaXQnXSk7XG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQoZWRpdE5vZGUpXG4gICAgZWRpdE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAgZWRpdFByb2plY3QobGlOb2RlKSk7XG5cbiAgICAvLyBBZGQgZGVsZXRlIGljb24gYW5kIHNldHVwIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgZGVsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS10cmFzaC1hbHQnXSk7XG4gICAgcHJvakl0ZW0uYXBwZW5kQ2hpbGQoZGVsSWNvbik7XG5cbiAgICByZXR1cm4gcHJvakl0ZW07XG5cbn1cblxuY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgIC8vIGNoZWNrIGZvciBkdXBsaWNhdGVzIGluIHN0b3JhZ2VcbiAgICBcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TmFtZSk7XG59XG5cbi8vIENoYW5nZXMgcHJvamVjdCBsaXN0IGl0ZW0gdG8gZWRpdGFibGUgZmllbGQgYW5kIHVwZGF0ZXMgcHJvamVjdCBuYW1lXG5jb25zdCBlZGl0UHJvamVjdCA9IChsaXN0SXRlbU5vZGUpID0+IHtcbiAgICBcbiAgICAvLyBzdG9yZSBwcm9qZWN0IG5hbWUgaW4gdGVtcCB2YXJcbiAgICBjb25zdCBwcm9qTmFtZSA9IGxpc3RJdGVtTm9kZS50ZXh0Q29udGVudDtcblxuICAgIC8vIGNyZWF0ZSBpbnB1dCBlbGVtZW50IHdpdGggcGxhY2Vob2xkZXIgdmFsdWUgYXMgcHJvamVjdCBuYW1lXG4gICAgY29uc3QgaW5wdXRQcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydpbnB1dFByb2onXSwgJycsICdpbnB1dFByb2onKTtcbiAgICBpbnB1dFByb2oudHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dFByb2oucmVxdWlyZWQgPSB0cnVlO1xuICAgIGlucHV0UHJvai52YWx1ZSA9IHByb2pOYW1lO1xuXG4gICAgLy8gY3JlYXRlIGZvcm0gZWxlbWVudCBhbmQgYXBwZW5kIGlucHV0UHJvaiB0byBpdFxuICAgIGNvbnN0IGZvcm1Qcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCBidXR0b25Qcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHNhdmVQcm9qID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1zYXZlJ10pO1xuICAgIGJ1dHRvblByb2ouYXBwZW5kQ2hpbGQoc2F2ZVByb2opO1xuICAgIGJ1dHRvblByb2oudHlwZSA9ICdzdWJtaXQnO1xuICAgIGZvcm1Qcm9qLmFwcGVuZChpbnB1dFByb2osIGJ1dHRvblByb2opO1xuXG4gICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXIgdXBvbiBmb3JtIGVsZW1lbnRcbiAgICBmb3JtUHJvai5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcblxuICAgICAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGlucHV0UHJvai52YWx1ZTtcbiAgICAgICAgXG4gICAgICAgIGlmIChTdG9yYWdlLmNoZWNrUHJvamVjdChuZXdQcm9qTmFtZSkpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9qZWN0IG5hbWUgZXhpc3RzLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgU3RvcmFnZS51cGRhdGVQcm9qZWN0KHByb2pOYW1lLCBuZXdQcm9qTmFtZSk7XG5cbiAgICAgICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIG5ld1Byb2pOYW1lKTtcblxuICAgICAgICBmb3JtUHJvai5yZXBsYWNlV2l0aChsaU5vZGUpO1xuICAgICAgICBcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vIHJlcGxhY2UgbGlzdCBpdGVtIHdpdGggaW5wdXQgZWxlbWVudFxuICAgIGxpc3RJdGVtTm9kZS5yZXBsYWNlV2l0aChmb3JtUHJvaik7XG4gICAgXG59XG5cblxuXG5leHBvcnQgeyBET01Mb2FkZXIgfTsiLCJcbmNvbnN0IGFjdGl2ZVRhc2tzID0gW107XG5jb25zdCBhY3RpdmVQcm9qZWN0cyA9IFsnQ2xlYW5pbmcnLCAnUGFja2luZycsICdNb3BwaW5nJ107XG5cbmNvbnN0IFN0b3JhZ2UgPSB7XG4gICAgYWRkUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9LFxuICAgIGdldFByb2plY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cztcbiAgICB9LFxuICAgIGNoZWNrUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2plY3RzLmluY2x1ZGVzKHByb2opO1xuICAgIH0sXG4gICAgdXBkYXRlUHJvamVjdDogKG9sZFByb2osIG5ld1Byb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGFjdGl2ZVByb2plY3RzLmluZGV4T2Yob2xkUHJvaiksIDEsIG5ld1Byb2opO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGFjdGl2ZVByb2plY3RzLmluZGV4T2YocHJvaiksIDEpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgeyBTdG9yYWdlIH0iLCIvKiBUYXNrLmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgdGFzayBvYmplY3QgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zXG5cbiovXG5cbmNvbnN0IFRhc2sgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAvLyBBbGwgdGFza3MgZGVmYXVsdCB0byBpbmJveCB1cG9uIGNyZWF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGdldElEKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9LFxuICAgICAgICBnZXRUaXRsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXREZXNjcmlwdGlvbihkZXNjKSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgIH0sXG4gICAgICAgIGdldERhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGF0ZShuZXdEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0UHJpb3JpdHkocHJpKSB7XG4gICAgICAgICAgICBwcmlvcml0eSA9IHByaTtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFRhc2sgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG5cbi0gVGFza3NcbiAgICAtIFNlcGVyYXRlIG1vZHVsZVxuICAgIC0gRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSB0YXNrXG4gICAgLSBQcm9wZXJ0aWVzOiBcbiAgICAgICAgLSB0aXRsZVxuICAgICAgICAtIGRlc2NyaXB0aW9uXG4gICAgICAgIC0gZHVlIGRhdGVcbiAgICAgICAgLSBwcmlvcml0eVxuICAgICAgICAtIGlzQ29tcGxldGVcbiAgICAtIGZ1bmN0aW9uc1xuICAgICAgICAtIGNoYW5nZSBwcm9wZXJ0aWVzXG4tIFByb2plY3RzXG4gICAgLSBjb250YWlucyBtYW55IHRhc2tzXG4gICAgLSBwcm9wZXJ0aWVzOlxuICAgICAgICAtIFxuLSBET01cblxuXG4qL1xuXG5pbXBvcnQgeyBET01Mb2FkZXIgfSBmcm9tICcuL21vZHVsZXMvRE9NLmpzJztcblxuXG5jb25zdCByZW5kZXIgPSAoKCkgPT4ge1xuXG4gICAgRE9NTG9hZGVyLmxvYWRTaWRlQmFyKCk7XG5cbn0pKCk7XG5cbnJlbmRlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==