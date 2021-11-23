/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addLeadingZeros)
/* harmony export */ });
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();

  while (output.length < targetLength) {
    output = '0' + output;
  }

  return sign + output;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/formatISO/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/formatISO/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatISO)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _isValid_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isValid/index.js */ "./node_modules/date-fns/esm/isValid/index.js");
/* harmony import */ var _lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");



/**
 * @name formatISO
 * @category Common Helpers
 * @summary Format the date according to the ISO 8601 standard (http://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {'extended'|'basic'} [options.format='extended'] - if 'basic', hide delimiters between date and time values.
 * @param {'complete'|'date'|'time'} [options.representation='complete'] - format date, time with time zone, or both.
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.format` must be 'extended' or 'basic'
 * @throws {RangeError} `options.represenation` must be 'date', 'time' or 'complete'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */

function formatISO(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }

  var originalDate = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate);

  if (!(0,_isValid_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  var options = dirtyOptions || {};
  var format = options.format == null ? 'extended' : String(options.format);
  var representation = options.representation == null ? 'complete' : String(options.representation);

  if (format !== 'extended' && format !== 'basic') {
    throw new RangeError("format must be 'extended' or 'basic'");
  }

  if (representation !== 'date' && representation !== 'time' && representation !== 'complete') {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }

  var result = '';
  var tzOffset = '';
  var dateDelimiter = format === 'extended' ? '-' : '';
  var timeDelimiter = format === 'extended' ? ':' : ''; // Representation is either 'date' or 'complete'

  if (representation !== 'time') {
    var day = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(originalDate.getDate(), 2);
    var month = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(originalDate.getMonth() + 1, 2);
    var year = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(originalDate.getFullYear(), 4); // yyyyMMdd or yyyy-MM-dd.

    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  } // Representation is either 'time' or 'complete'


  if (representation !== 'date') {
    // Add the timezone.
    var offset = originalDate.getTimezoneOffset();

    if (offset !== 0) {
      var absoluteOffset = Math.abs(offset);
      var hourOffset = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.floor(absoluteOffset / 60), 2);
      var minuteOffset = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(absoluteOffset % 60, 2); // If less than 0, the sign is +, because it is ahead of time.

      var sign = offset < 0 ? '+' : '-';
      tzOffset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
    } else {
      tzOffset = 'Z';
    }

    var hour = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(originalDate.getHours(), 2);
    var minute = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(originalDate.getMinutes(), 2);
    var second = (0,_lib_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(originalDate.getSeconds(), 2); // If there's also date, separate it with time with 'T'

    var separator = result === '' ? '' : 'T'; // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.

    var time = [hour, minute, second].join(timeDelimiter); // HHmmss or HH:mm:ss.

    result = "".concat(result).concat(separator).concat(time).concat(tzOffset);
  }

  return result;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/isDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */

function isDate(value) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return value instanceof Date || typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isValid/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isValid/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isValid)
/* harmony export */ });
/* harmony import */ var _isDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isDate/index.js */ "./node_modules/date-fns/esm/isDate/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now `isValid` doesn't throw an exception
 *   if the first argument is not an instance of Date.
 *   Instead, argument is converted beforehand using `toDate`.
 *
 *   Examples:
 *
 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
 *   |---------------------------|---------------|---------------|
 *   | `new Date()`              | `true`        | `true`        |
 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
 *   | `new Date('')`            | `false`       | `false`       |
 *   | `new Date(1488370835081)` | `true`        | `true`        |
 *   | `new Date(NaN)`           | `false`       | `false`       |
 *   | `'2016-01-01'`            | `TypeError`   | `false`       |
 *   | `''`                      | `TypeError`   | `false`       |
 *   | `1488370835081`           | `TypeError`   | `true`        |
 *   | `NaN`                     | `TypeError`   | `false`       |
 *
 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
 *   that try to coerce arguments to the expected type
 *   (which is also the case with other *date-fns* functions).
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */

function isValid(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);

  if (!(0,_isDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate) && typeof dirtyDate !== 'number') {
    return false;
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate);
  return !isNaN(Number(date));
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

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
        const scheduleCont = _createElement('div', ['flexRow', 'descPrev']);
        outerCont.append(checkCont, taskCont);
        taskCont.append(liCont, descPrev, scheduleCont);

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

        //setup scheduleCont
        const calIcon = _createElement('i', ['far', 'fa-calendar-alt']);
        const taskDate = _createElement('div', ['taskDate'], task.getDate());
        scheduleCont.append(calIcon, taskDate);

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

        
        addCont.replaceWith(addPopup);

    })
    
    return addCont;

}

const _createEditTaskPopup = (projectName, taskID) => {  
    // create and setup element structures
    const taskInputCont = _createElement('div', ['flexCol']);
    const titleInput = _createElement('input', '');
    const descInput = _createElement('input', '');
    const taskButtonCont = _createElement('div', ['flexRow', 'taskButtonCont']);
    const scheduleCont = _createElement('div', ['flexRow','taskButton']);
    const calIcon = _createElement('i', ['far', 'fa-calendar-alt']);
    const dateInput = _createElement('input', ['dateInput'], 'Schedule');
    dateInput.type = 'date';
    dateInput.min = (0,_task_js__WEBPACK_IMPORTED_MODULE_1__.Schedule)().getDateToday();
    // FUTURE: add project button here
    scheduleCont.append(calIcon, dateInput);
    taskInputCont.append(titleInput, descInput, taskButtonCont);
    taskButtonCont.append(scheduleCont);

    const saveButtonCont = _createElement('div', ['flexRow']);
    const saveButton = _createElement('button', ['saveButton'], 'Save Task');
    const cancelButton = _createElement('button', ['cancelButton'], 'Cancel');
    saveButtonCont.append(saveButton, cancelButton);

    const outerCont = _createElement('div', ['flexCol', 'outerCont']);
    outerCont.append(taskInputCont, saveButtonCont);

    // add event listeners
    saveButton.addEventListener('click', (event) => {
        
        // create new task

        // add to project

        // update project in storage

        // update DOM
        
        outerCont.replaceWith(_loadAddTaskButton(projectName));
    });
    cancelButton.addEventListener('click', (event) => {
        
        outerCont.replaceWith(_loadAddTaskButton(projectName));
    });

    return outerCont;

}

const _appendTaskDOM = (task) => {
    // find last task in list and add after

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
/* harmony export */   "Task": () => (/* binding */ Task),
/* harmony export */   "Schedule": () => (/* binding */ Schedule)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/formatISO/index.js");
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

const Schedule = () => {
    const today = new Date(Date.now());
    const proto = {
        getDateToday() {
            return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(today, { representation: 'date'});
        },

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
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addInboxTask((0,_modules_task_js__WEBPACK_IMPORTED_MODULE_3__.Task)(1, 'Garbage', 'Take garbage out to street','Dec 8', 'p1'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addInboxTask((0,_modules_task_js__WEBPACK_IMPORTED_MODULE_3__.Task)(2, 'Bathroom Floors', 'Clean bathroom floors','Dec 9', 'p2'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage.addInboxTask((0,_modules_task_js__WEBPACK_IMPORTED_MODULE_3__.Task)(3, 'Kitchen Floors', 'Clean kitchen floors','Wednesday', 'p3'));

    // load DOM elements
    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadHeader();
    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadSideBar();
    _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.DOMLoader.loadMain();

})();

render;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkRBQTJELCtEQUFzQjs7QUFFakY7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrREFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdxQjs7Ozs7Ozs7Ozs7Ozs7O0FDdGJyQjs7QUFFQTs7QUFFQTtBQUNBLFlBQVksT0FBTzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNBOztBQUVBOztBQUVBO0FBQ29DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0RBQVMsVUFBVSx1QkFBdUI7QUFDN0QsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7Ozs7Ozs7O1VDdERBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRTZDO0FBQ0U7QUFDQTtBQUNOOzs7QUFHekM7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtRUFBa0IsQ0FBQyw0REFBTztBQUM5QixJQUFJLG1FQUFrQixDQUFDLDREQUFPO0FBQzlCLElBQUksbUVBQWtCLENBQUMsNERBQU87O0FBRTlCO0FBQ0EsSUFBSSxxRUFBb0IsQ0FBQyxzREFBSTtBQUM3QixJQUFJLHFFQUFvQixDQUFDLHNEQUFJO0FBQzdCLElBQUkscUVBQW9CLENBQUMsc0RBQUk7O0FBRTdCO0FBQ0EsSUFBSSxpRUFBb0I7QUFDeEIsSUFBSSxrRUFBcUI7QUFDekIsSUFBSSwrREFBa0I7O0FBRXRCLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXRJU08vaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1ZhbGlkL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vdG9EYXRlL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIHZhciBzaWduID0gbnVtYmVyIDwgMCA/ICctJyA6ICcnO1xuICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpO1xuXG4gIHdoaWxlIChvdXRwdXQubGVuZ3RoIDwgdGFyZ2V0TGVuZ3RoKSB7XG4gICAgb3V0cHV0ID0gJzAnICsgb3V0cHV0O1xuICB9XG5cbiAgcmV0dXJuIHNpZ24gKyBvdXRwdXQ7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgaXNWYWxpZCBmcm9tIFwiLi4vaXNWYWxpZC9pbmRleC5qc1wiO1xuaW1wb3J0IGFkZExlYWRpbmdaZXJvcyBmcm9tIFwiLi4vX2xpYi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgZm9ybWF0SVNPXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZSBhY2NvcmRpbmcgdG8gdGhlIElTTyA4NjAxIHN0YW5kYXJkIChodHRwOi8vc3VwcG9ydC5zYXMuY29tL2RvY3VtZW50YXRpb24vY2RsL2VuL2xyZGljdC82NDMxNi9IVE1ML2RlZmF1bHQvdmlld2VyLmh0bSNhMDAzMTY5ODE0Lmh0bSkuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiBJU08gODYwMSBmb3JtYXQuIE9wdGlvbnMgbWF5IGJlIHBhc3NlZCB0byBjb250cm9sIHRoZSBwYXJ0cyBhbmQgbm90YXRpb25zIG9mIHRoZSBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0geydleHRlbmRlZCd8J2Jhc2ljJ30gW29wdGlvbnMuZm9ybWF0PSdleHRlbmRlZCddIC0gaWYgJ2Jhc2ljJywgaGlkZSBkZWxpbWl0ZXJzIGJldHdlZW4gZGF0ZSBhbmQgdGltZSB2YWx1ZXMuXG4gKiBAcGFyYW0geydjb21wbGV0ZSd8J2RhdGUnfCd0aW1lJ30gW29wdGlvbnMucmVwcmVzZW50YXRpb249J2NvbXBsZXRlJ10gLSBmb3JtYXQgZGF0ZSwgdGltZSB3aXRoIHRpbWUgem9uZSwgb3IgYm90aC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuZm9ybWF0YCBtdXN0IGJlICdleHRlbmRlZCcgb3IgJ2Jhc2ljJ1xuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMucmVwcmVzZW5hdGlvbmAgbXVzdCBiZSAnZGF0ZScsICd0aW1lJyBvciAnY29tcGxldGUnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxOCBTZXB0ZW1iZXIgMjAxOSBpbiBJU08gODYwMSBmb3JtYXQgKFVUQyk6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXRJU08obmV3IERhdGUoMjAxOSwgOCwgMTgsIDE5LCAwLCA1MikpXG4gKiAvLz0+ICcyMDE5LTA5LTE4VDE5OjAwOjUyWidcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDE4IFNlcHRlbWJlciAyMDE5IGluIElTTyA4NjAxLCBzaG9ydCBmb3JtYXQgKFVUQyk6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXRJU08obmV3IERhdGUoMjAxOSwgOCwgMTgsIDE5LCAwLCA1MiksIHsgZm9ybWF0OiAnYmFzaWMnIH0pXG4gKiAvLz0+ICcyMDE5MDkxOFQxOTAwNTInXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxOCBTZXB0ZW1iZXIgMjAxOSBpbiBJU08gODYwMSBmb3JtYXQsIGRhdGUgb25seTpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdElTTyhuZXcgRGF0ZSgyMDE5LCA4LCAxOCwgMTksIDAsIDUyKSwgeyByZXByZXNlbnRhdGlvbjogJ2RhdGUnIH0pXG4gKiAvLz0+ICcyMDE5LTA5LTE4J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMTggU2VwdGVtYmVyIDIwMTkgaW4gSVNPIDg2MDEgZm9ybWF0LCB0aW1lIG9ubHkgKFVUQyk6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXRJU08obmV3IERhdGUoMjAxOSwgOCwgMTgsIDE5LCAwLCA1MiksIHsgcmVwcmVzZW50YXRpb246ICd0aW1lJyB9KVxuICogLy89PiAnMTk6MDA6NTJaJ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdElTTyhkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgXCIuY29uY2F0KGFyZ3VtZW50cy5sZW5ndGgsIFwiIHByZXNlbnRcIikpO1xuICB9XG5cbiAgdmFyIG9yaWdpbmFsRGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuXG4gIGlmICghaXNWYWxpZChvcmlnaW5hbERhdGUpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdGltZSB2YWx1ZScpO1xuICB9XG5cbiAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gIHZhciBmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCA9PSBudWxsID8gJ2V4dGVuZGVkJyA6IFN0cmluZyhvcHRpb25zLmZvcm1hdCk7XG4gIHZhciByZXByZXNlbnRhdGlvbiA9IG9wdGlvbnMucmVwcmVzZW50YXRpb24gPT0gbnVsbCA/ICdjb21wbGV0ZScgOiBTdHJpbmcob3B0aW9ucy5yZXByZXNlbnRhdGlvbik7XG5cbiAgaWYgKGZvcm1hdCAhPT0gJ2V4dGVuZGVkJyAmJiBmb3JtYXQgIT09ICdiYXNpYycpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcImZvcm1hdCBtdXN0IGJlICdleHRlbmRlZCcgb3IgJ2Jhc2ljJ1wiKTtcbiAgfVxuXG4gIGlmIChyZXByZXNlbnRhdGlvbiAhPT0gJ2RhdGUnICYmIHJlcHJlc2VudGF0aW9uICE9PSAndGltZScgJiYgcmVwcmVzZW50YXRpb24gIT09ICdjb21wbGV0ZScpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInJlcHJlc2VudGF0aW9uIG11c3QgYmUgJ2RhdGUnLCAndGltZScsIG9yICdjb21wbGV0ZSdcIik7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciB0ek9mZnNldCA9ICcnO1xuICB2YXIgZGF0ZURlbGltaXRlciA9IGZvcm1hdCA9PT0gJ2V4dGVuZGVkJyA/ICctJyA6ICcnO1xuICB2YXIgdGltZURlbGltaXRlciA9IGZvcm1hdCA9PT0gJ2V4dGVuZGVkJyA/ICc6JyA6ICcnOyAvLyBSZXByZXNlbnRhdGlvbiBpcyBlaXRoZXIgJ2RhdGUnIG9yICdjb21wbGV0ZSdcblxuICBpZiAocmVwcmVzZW50YXRpb24gIT09ICd0aW1lJykge1xuICAgIHZhciBkYXkgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldERhdGUoKSwgMik7XG4gICAgdmFyIG1vbnRoID0gYWRkTGVhZGluZ1plcm9zKG9yaWdpbmFsRGF0ZS5nZXRNb250aCgpICsgMSwgMik7XG4gICAgdmFyIHllYXIgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldEZ1bGxZZWFyKCksIDQpOyAvLyB5eXl5TU1kZCBvciB5eXl5LU1NLWRkLlxuXG4gICAgcmVzdWx0ID0gXCJcIi5jb25jYXQoeWVhcikuY29uY2F0KGRhdGVEZWxpbWl0ZXIpLmNvbmNhdChtb250aCkuY29uY2F0KGRhdGVEZWxpbWl0ZXIpLmNvbmNhdChkYXkpO1xuICB9IC8vIFJlcHJlc2VudGF0aW9uIGlzIGVpdGhlciAndGltZScgb3IgJ2NvbXBsZXRlJ1xuXG5cbiAgaWYgKHJlcHJlc2VudGF0aW9uICE9PSAnZGF0ZScpIHtcbiAgICAvLyBBZGQgdGhlIHRpbWV6b25lLlxuICAgIHZhciBvZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgIHZhciBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICB2YXIgaG91ck9mZnNldCA9IGFkZExlYWRpbmdaZXJvcyhNYXRoLmZsb29yKGFic29sdXRlT2Zmc2V0IC8gNjApLCAyKTtcbiAgICAgIHZhciBtaW51dGVPZmZzZXQgPSBhZGRMZWFkaW5nWmVyb3MoYWJzb2x1dGVPZmZzZXQgJSA2MCwgMik7IC8vIElmIGxlc3MgdGhhbiAwLCB0aGUgc2lnbiBpcyArLCBiZWNhdXNlIGl0IGlzIGFoZWFkIG9mIHRpbWUuXG5cbiAgICAgIHZhciBzaWduID0gb2Zmc2V0IDwgMCA/ICcrJyA6ICctJztcbiAgICAgIHR6T2Zmc2V0ID0gXCJcIi5jb25jYXQoc2lnbikuY29uY2F0KGhvdXJPZmZzZXQsIFwiOlwiKS5jb25jYXQobWludXRlT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHpPZmZzZXQgPSAnWic7XG4gICAgfVxuXG4gICAgdmFyIGhvdXIgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldEhvdXJzKCksIDIpO1xuICAgIHZhciBtaW51dGUgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldE1pbnV0ZXMoKSwgMik7XG4gICAgdmFyIHNlY29uZCA9IGFkZExlYWRpbmdaZXJvcyhvcmlnaW5hbERhdGUuZ2V0U2Vjb25kcygpLCAyKTsgLy8gSWYgdGhlcmUncyBhbHNvIGRhdGUsIHNlcGFyYXRlIGl0IHdpdGggdGltZSB3aXRoICdUJ1xuXG4gICAgdmFyIHNlcGFyYXRvciA9IHJlc3VsdCA9PT0gJycgPyAnJyA6ICdUJzsgLy8gQ3JlYXRlcyBhIHRpbWUgc3RyaW5nIGNvbnNpc3Rpbmcgb2YgaG91ciwgbWludXRlLCBhbmQgc2Vjb25kLCBzZXBhcmF0ZWQgYnkgZGVsaW1pdGVycywgaWYgZGVmaW5lZC5cblxuICAgIHZhciB0aW1lID0gW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5qb2luKHRpbWVEZWxpbWl0ZXIpOyAvLyBISG1tc3Mgb3IgSEg6bW06c3MuXG5cbiAgICByZXN1bHQgPSBcIlwiLmNvbmNhdChyZXN1bHQpLmNvbmNhdChzZXBhcmF0b3IpLmNvbmNhdCh0aW1lKS5jb25jYXQodHpPZmZzZXQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCJpbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIHZhbHVlIGEgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS4gVGhlIGZ1bmN0aW9uIHdvcmtzIGZvciBkYXRlcyB0cmFuc2ZlcnJlZCBhY3Jvc3MgaWZyYW1lcy5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGEgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZSgpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoTmFOKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igc29tZSB2YWx1ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSgnMjAxNC0wMi0zMScpXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBvYmplY3Q6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoe30pXG4gKiAvLz0+IGZhbHNlXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNEYXRlKHZhbHVlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufSIsImltcG9ydCBpc0RhdGUgZnJvbSBcIi4uL2lzRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc1ZhbGlkXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogQXJndW1lbnQgaXMgY29udmVydGVkIHRvIERhdGUgdXNpbmcgYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogLSBOb3cgYGlzVmFsaWRgIGRvZXNuJ3QgdGhyb3cgYW4gZXhjZXB0aW9uXG4gKiAgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqICAgSW5zdGVhZCwgYXJndW1lbnQgaXMgY29udmVydGVkIGJlZm9yZWhhbmQgdXNpbmcgYHRvRGF0ZWAuXG4gKlxuICogICBFeGFtcGxlczpcbiAqXG4gKiAgIHwgYGlzVmFsaWRgIGFyZ3VtZW50ICAgICAgICB8IEJlZm9yZSB2Mi4wLjAgfCB2Mi4wLjAgb253YXJkIHxcbiAqICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tfFxuICogICB8IGBuZXcgRGF0ZSgpYCAgICAgICAgICAgICAgfCBgdHJ1ZWAgICAgICAgIHwgYHRydWVgICAgICAgICB8XG4gKiAgIHwgYG5ldyBEYXRlKCcyMDE2LTAxLTAxJylgICB8IGB0cnVlYCAgICAgICAgfCBgdHJ1ZWAgICAgICAgIHxcbiAqICAgfCBgbmV3IERhdGUoJycpYCAgICAgICAgICAgIHwgYGZhbHNlYCAgICAgICB8IGBmYWxzZWAgICAgICAgfFxuICogICB8IGBuZXcgRGF0ZSgxNDg4MzcwODM1MDgxKWAgfCBgdHJ1ZWAgICAgICAgIHwgYHRydWVgICAgICAgICB8XG4gKiAgIHwgYG5ldyBEYXRlKE5hTilgICAgICAgICAgICB8IGBmYWxzZWAgICAgICAgfCBgZmFsc2VgICAgICAgIHxcbiAqICAgfCBgJzIwMTYtMDEtMDEnYCAgICAgICAgICAgIHwgYFR5cGVFcnJvcmAgICB8IGBmYWxzZWAgICAgICAgfFxuICogICB8IGAnJ2AgICAgICAgICAgICAgICAgICAgICAgfCBgVHlwZUVycm9yYCAgIHwgYGZhbHNlYCAgICAgICB8XG4gKiAgIHwgYDE0ODgzNzA4MzUwODFgICAgICAgICAgICB8IGBUeXBlRXJyb3JgICAgfCBgdHJ1ZWAgICAgICAgIHxcbiAqICAgfCBgTmFOYCAgICAgICAgICAgICAgICAgICAgIHwgYFR5cGVFcnJvcmAgICB8IGBmYWxzZWAgICAgICAgfFxuICpcbiAqICAgV2UgaW50cm9kdWNlIHRoaXMgY2hhbmdlIHRvIG1ha2UgKmRhdGUtZm5zKiBjb25zaXN0ZW50IHdpdGggRUNNQVNjcmlwdCBiZWhhdmlvclxuICogICB0aGF0IHRyeSB0byBjb2VyY2UgYXJndW1lbnRzIHRvIHRoZSBleHBlY3RlZCB0eXBlXG4gKiAgICh3aGljaCBpcyBhbHNvIHRoZSBjYXNlIHdpdGggb3RoZXIgKmRhdGUtZm5zKiBmdW5jdGlvbnMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdmFsaWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQoMTM5MzgwNDgwMDAwMClcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVmFsaWQoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuXG4gIGlmICghaXNEYXRlKGRpcnR5RGF0ZSkgJiYgdHlwZW9mIGRpcnR5RGF0ZSAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICByZXR1cm4gIWlzTmFOKE51bWJlcihkYXRlKSk7XG59IiwiaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgYXJndW1lbnQgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0LmlvL2ZqdWxlXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiLyogRE9NLmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIERPTSBsb2FkaW5nIGFuZCBtYW5pcHVsYXRpb25cblxuKi9cbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuaW1wb3J0IHsgVGFzaywgU2NoZWR1bGUgfSBmcm9tICcuL3Rhc2suanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbmNvbnN0IG9wZW5MSU5vZGVzID0gW107XG5cbmNvbnN0IF9jcmVhdGVFbGVtZW50ID0gKHR5cGUsIGNsYXNzTmFtZUFyciwgdGV4dCwgaWQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBpZiAoY2xhc3NOYW1lQXJyKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lQXJyKTtcbiAgICBpZiAodGV4dCkgZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgaWYgKGlkKSBlbGVtZW50LmlkID0gaWQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbi8vIEhhbmRsZXMgbG9hZGluZyBhbmQgc2V0dXAgb2Ygc2lkZWJhclxuY29uc3QgRE9NTG9hZGVyID0ge1xuICAgIGxvYWRIZWFkZXI6ICgpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIGRpdiBjb250YWluZXIgYW5kIGFwcGVuZCB0byBoZWFkZXIgZWxlbWVudFxuICAgICAgICBjb25zdCBoZWFkZXJEaXYgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydoZWFkZXJEaXYnXSwgJ1RvLURvIEFwcGxpY2F0aW9uJyk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykuYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcbiAgICB9LFxuICAgIGxvYWRTaWRlQmFyOiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGVCYXInKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBzZWN0aW9uIGZvciBOYXYgbGlua3MgKEluYm94LCBUb2RheS4uKVxuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKF9sb2FkU2lkZUJhck5hdkxpbmtzKCkpO1xuXG4gICAgICAgIC8vIEFkZCBzZWN0aW9uIGZvciBQcm9qZWN0c1xuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKF9sb2FkU2lkZUJhclByb2pMaW5rcygpKTtcbiAgICAgICAgXG4gICAgfSxcbiAgICBsb2FkTWFpbjogKCkgPT4ge1xuICAgICAgICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluQ29udGVudCcpO1xuXG4gICAgICAgIC8vIGxvYWQgdGFzayBoZWFkZXJcbiAgICAgICAgbWFpbkNvbnRlbnQuYXBwZW5kQ2hpbGQoX2xvYWRUYXNrSGVhZGVyKCdJbmJveCcpKTtcblxuICAgICAgICAvLyBsb2FkIHRhc2sgbGlzdCBmb3IgaW5ib3hcbiAgICAgICAgbWFpbkNvbnRlbnQuYXBwZW5kQ2hpbGQoX2xvYWRUYXNrTGlzdCgnSW5ib3gnKSk7XG4gICAgICAgICAgICAvLyBhZGQgZWRpdCBhbmQgZGVsZXRlIGJ1dHRvbiB1cG9uIGhvdmVyXG5cbiAgICB9XG59XG5cbi8vIFNldHVwIG9mIEluYm94LCBUb2RheSBhbmQgVGhpcyB3ZWVrIGxpbmtzXG5jb25zdCBfbG9hZFNpZGVCYXJOYXZMaW5rcyA9ICgpID0+IHtcbiAgICBjb25zdCBuYXZDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddLCcnLCdzaWRlQmFyTmF2Q29udCcpO1xuICAgIFxuICAgIC8vIEFkZCBpbmJveCBidXR0b25cbiAgICBjb25zdCBpbmJveCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdJbmJveCcpO1xuICAgIG5hdkNvbnQuYXBwZW5kQ2hpbGQoaW5ib3gpO1xuICAgIGluYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5ib3hIYW5kbGVyKTtcblxuICAgIC8vIEFkZCB0b2RheVxuICAgIGNvbnN0IHRvZGF5ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ1RvZGF5Jyk7XG4gICAgbmF2Q29udC5hcHBlbmRDaGlsZCh0b2RheSk7XG4gICAgdG9kYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2RheUhhbmRsZXIpO1xuXG4gICAgLy8gQWRkIHRoaXMgd2Vla1xuICAgIGNvbnN0IHRoaXNXZWVrID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ1RoaXMgV2VlaycpO1xuICAgIG5hdkNvbnQuYXBwZW5kQ2hpbGQodGhpc1dlZWspO1xuICAgIHRoaXNXZWVrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpc1dlZWtIYW5kbGVyKTtcbiAgICBcbiAgICByZXR1cm4gbmF2Q29udDtcbn1cbi8vIFNpZGViYXIgbmF2bGluayBoYW5kbGVyc1xuY29uc3QgaW5ib3hIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBzaG93IGFsbCB0YXNrcyBpbiBpbmJveFxufVxuY29uc3QgdG9kYXlIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBzaG93IGFsbCB0YXNrcyBkdWUgdG9kYXlcbn1cbmNvbnN0IHRoaXNXZWVrSGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gc2hvdyBhbGwgdGFza3MgZHVlIHRvZGF5XG59XG5cbmNvbnN0IF9sb2FkU2lkZUJhclByb2pMaW5rcyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwgJycsICdwcm9qQ29udCcpO1xuXG4gICAgLy8gQ3JlYXRlIFByb2plY3RzIGhlYWRpbmdcbiAgICBjb25zdCBwcm9qSGVhZGluZyA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Byb2pJdGVtJ10pO1xuICAgIHByb2pIZWFkaW5nLmFwcGVuZENoaWxkKF9jcmVhdGVFbGVtZW50KCdoNCcsIFsnZmxleENvbCddLCAnUHJvamVjdHMnKSk7XG4gICAgcHJvakNvbnQuYXBwZW5kQ2hpbGQocHJvakhlYWRpbmcpO1xuXG4gICAgLy8gQ3JlYXRlIHVsIGxpc3QgZWxlbWVudCB0byBhcHBlbmQgYWxsIHByb2plY3RzIGFzIGNoaWxkcmVuIHRvXG4gICAgY29uc3QgcHJvakxpc3QgPSBfY3JlYXRlRWxlbWVudCgndWwnLCBbJ3Byb2pMaXN0J10sICcnLCAncHJvakxpc3QnKTtcbiAgICBwcm9qQ29udC5hcHBlbmRDaGlsZChwcm9qTGlzdCk7XG4gICAgXG4gICAgLy8gQWRkIGFsbCBhY3RpdmUgcHJvamVjdHNcbiAgICBTdG9yYWdlLmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qID0+IHByb2pMaXN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RET00ocHJvai5nZXROYW1lKCkpKSk7XG5cbiAgICAvLyBBZGQgXCJBZGQgcHJvamVjdFwiIGxpc3QgaXRlbVxuICAgIHByb2pMaXN0LmFwcGVuZENoaWxkKGNyZWF0ZUFkZFByb2ooKSk7XG5cbiAgICByZXR1cm4gcHJvakNvbnQ7XG5cbn1cblxuLy8gQWRkcyBwcm9qTmFtZSB0byBwcm9qZWN0IExpc3QgaW4gRE9NXG5jb25zdCBhZGRQcm9qZWN0RE9NID0gKHByb2pOYW1lKSA9PiB7XG5cbiAgICBjb25zdCBwcm9qSXRlbSA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Byb2pJdGVtJ10pXG5cbiAgICAvLyBBZGQgcHJvamVjdCBuYW1lIGFzIGxpc3RJdGVtXG4gICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIHByb2pOYW1lLCBwcm9qTmFtZSArICdMSScpO1xuICAgIHByb2pJdGVtLmFwcGVuZENoaWxkKGxpTm9kZSk7XG5cbiAgICAvLyBBZGQgZWRpdCBwcm9qZWN0IGljb24gYW5kIHNldHVwIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgZWRpdE5vZGUgPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtZWRpdCddKTtcbiAgICBwcm9qSXRlbS5hcHBlbmRDaGlsZChlZGl0Tm9kZSlcbiAgICBlZGl0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBsaU5vZGVVcGRhdGVkID0gZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZztcbiAgICAgICAgaWYgKGxpTm9kZVVwZGF0ZWQubG9jYWxOYW1lID09PSAnbGknKSBlZGl0UHJvamVjdChsaU5vZGVVcGRhdGVkKTtcbiAgICB9KVxuXG4gICAgLy8gQWRkIGRlbGV0ZSBpY29uIGFuZCBzZXR1cCBldmVudCBsaXN0ZW5lclxuICAgIGNvbnN0IGRlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtdHJhc2gtYWx0J10pO1xuICAgIGRlbEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVByb2plY3QocHJvak5hbWUsIHByb2pJdGVtKTtcbiAgICB9KVxuICAgIHByb2pJdGVtLmFwcGVuZENoaWxkKGRlbEljb24pO1xuXG4gICAgcmV0dXJuIHByb2pJdGVtO1xuXG59XG4vLyBBZGRzIFwiKyBBZGQgcHJvamVjdFwiIGFuZCBzZXR1cFxuY29uc3QgY3JlYXRlQWRkUHJvaiA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncHJvakl0ZW0nXSk7XG5cbiAgICBhZGRDb250LmFwcGVuZENoaWxkKF9jcmVhdGVFbGVtZW50KCdsaScsIFsnbm9NYXJrZXInXSwgJysgQWRkIFByb2plY3QnLCAnKyBBZGQgUHJvamVjdExJJykpO1xuXG4gICAgLy8gc3RvcmUgbGkgaW4gcHJpdmF0ZSBhcnJheSAob3BlbkxJTm9kZXMpXG4gICAgb3BlbkxJTm9kZXMucHVzaChhZGRDb250LmZpcnN0Q2hpbGQpO1xuXG4gICAgYWRkQ29udC5maXJzdENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNsb3NlQWxsRm9ybXMoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZvcm1Qcm9qID0gY3JlYXRlUHJvakZvcm0oJysgQWRkIFByb2plY3QnKTtcbiAgICAgICAgZm9ybVByb2ouZmlyc3RDaGlsZC52YWx1ZSA9ICcnO1xuXG4gICAgICAgIGZvcm1Qcm9qLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dFByb2onKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0IG5hbWUgYmVpbmcgaW5wdXQgaXM6ICcgKyBuZXdQcm9qTmFtZSk7XG4gICAgICAgICAgICBpZiAoU3RvcmFnZS5jaGVja1Byb2plY3QobmV3UHJvak5hbWUpKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2plY3QgbmFtZSBleGlzdHMuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KG5ld1Byb2pOYW1lKSk7XG5cbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhZGRQcm9qZWN0RE9NKG5ld1Byb2pOYW1lKSwgYWRkQ29udCk7XG5cbiAgICAgICAgICAgICAgICBmb3JtUHJvai5yZXBsYWNlV2l0aChvcGVuTElOb2Rlcy5maW5kKG5vZGUgPT4gbm9kZS5pZCA9PT0gJysgQWRkIFByb2plY3RMSScpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB9KTtcbiAgICAgICAgYWRkQ29udC5maXJzdENoaWxkLnJlcGxhY2VXaXRoKGZvcm1Qcm9qKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhZGRDb250O1xuXG59XG4vLyBjcmVhdGUgcHJvamVjdCBmb3JtIGVsZW1lbnQgd2l0aCBzdXBwbGllZCBuYW1lIGFzIHZhbHVlXG5jb25zdCBjcmVhdGVQcm9qRm9ybSA9IChwcm9qTmFtZURlZmF1bHQpID0+IHtcblxuICAgIC8vIGNyZWF0ZSBmb3JtIGVsZW1lbnRcbiAgICBjb25zdCBmb3JtUHJvaiA9IF9jcmVhdGVFbGVtZW50KCdmb3JtJywgJycsICcnLCBwcm9qTmFtZURlZmF1bHQgKyAnRk9STScpO1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IGVsZW1lbnQgd2l0aCBwbGFjZWhvbGRlciB2YWx1ZSBhcyBwcm9qZWN0IG5hbWVcbiAgICBjb25zdCBpbnB1dFByb2ogPSBfY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2lucHV0UHJvaiddLCAnJywgJ2lucHV0UHJvaicpO1xuICAgIGlucHV0UHJvai50eXBlID0gJ3RleHQnO1xuICAgIGlucHV0UHJvai5yZXF1aXJlZCA9IHRydWU7XG4gICAgaW5wdXRQcm9qLnZhbHVlID0gcHJvak5hbWVEZWZhdWx0O1xuXG4gICAgLy8gY3JlYXRlIHNhdmUgYnV0dG9uXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCBzYXZlSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtc2F2ZSddKTtcbiAgICBzYXZlQnV0dG9uLmFwcGVuZENoaWxkKHNhdmVJY29uKTtcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcblxuICAgIC8vIGNyZWF0ZSBjYW5jZWwgYnV0dG9uXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLXdpbmRvdy1jbG9zZSddKTtcbiAgICBjYW5jZWxCdXR0b24uYXBwZW5kQ2hpbGQoY2FuY2VsSWNvbik7XG4gICAgY2FuY2VsQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcblxuICAgIC8vIHNldHVwIGV2ZW50IGxpc3RlbmVyIGZvciBjYW5jZWwgYnV0dG9uXG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNsb3NlQWxsRm9ybXMoKTtcbiAgICB9KVxuXG4gICAgZm9ybVByb2ouYXBwZW5kKGlucHV0UHJvaiwgc2F2ZUJ1dHRvbiwgY2FuY2VsQnV0dG9uKTtcblxuICAgIHJldHVybiBmb3JtUHJvajtcbn1cbi8vIENoYW5nZXMgcHJvamVjdCBsaXN0IGl0ZW0gdG8gZWRpdGFibGUgZmllbGQgYW5kIHVwZGF0ZXMgcHJvamVjdCBuYW1lXG5jb25zdCBlZGl0UHJvamVjdCA9IChsaXN0SXRlbU5vZGUpID0+IHtcbiAgICBcbiAgICAvLyBjbG9zZSBhbGwgZm9ybXMgaW4gdWxcbiAgICBjbG9zZUFsbEZvcm1zKCk7XG5cbiAgICAvLyBzdG9yZSBwcm9qZWN0IG5hbWUgaW4gdGVtcCB2YXJcbiAgICBjb25zdCBwcm9qTmFtZSA9IGxpc3RJdGVtTm9kZS50ZXh0Q29udGVudDtcblxuICAgIC8vIHN0b3JlIGxpIGluIHByaXZhdGUgYXJyYXkgKG9wZW5MSU5vZGVzKVxuICAgIG9wZW5MSU5vZGVzLnB1c2gobGlzdEl0ZW1Ob2RlKTtcblxuICAgIC8vIGNyZWF0ZSBmb3JtIGVsZW1lbnRcbiAgICBjb25zdCBmb3JtUHJvaiA9IGNyZWF0ZVByb2pGb3JtKHByb2pOYW1lKTtcbiAgICBcbiAgICAvLyBTZXR1cCBldmVudCBsaXN0ZW5lciB1cG9uIGZvcm0gZWxlbWVudFxuICAgIGZvcm1Qcm9qLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmV3UHJvak5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXRQcm9qJykudmFsdWU7XG4gICAgICAgIFxuICAgICAgICBpZiAoU3RvcmFnZS5jaGVja1Byb2plY3QobmV3UHJvak5hbWUpKSB7XG4gICAgICAgICAgICBhbGVydCgnUHJvamVjdCBuYW1lIGV4aXN0cy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFN0b3JhZ2UudXBkYXRlUHJvamVjdChwcm9qTmFtZSwgbmV3UHJvak5hbWUpO1xuXG4gICAgICAgICAgICBjb25zdCBsaU5vZGUgPSBfY3JlYXRlRWxlbWVudCgnbGknLCAnJywgbmV3UHJvak5hbWUsIG5ld1Byb2pOYW1lICsgJ0xJJyk7XG4gICAgXG4gICAgICAgICAgICBmb3JtUHJvai5yZXBsYWNlV2l0aChsaU5vZGUpO1xuICAgICAgICAgICAgb3BlbkxJTm9kZXMuc3BsaWNlKG9wZW5MSU5vZGVzLmZpbmRJbmRleChub2RlID0+IG5vZGUuaWQgPT09IHByb2pOYW1lICsgJ0xJJyksIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vIHJlcGxhY2UgbGlzdCBpdGVtIHdpdGggaW5wdXQgZWxlbWVudFxuICAgIGxpc3RJdGVtTm9kZS5yZXBsYWNlV2l0aChmb3JtUHJvaik7XG4gICAgXG59XG5jb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3ROYW1lLCBwcm9qZWN0Tm9kZSkgPT4ge1xuXG4gICAgY2xvc2VBbGxGb3JtcygpO1xuXG4gICAgLy8gZGVsZXRlIGZyb20gU3RvcmFnZVxuICAgIFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdE5vZGUucmVtb3ZlKCk7XG59XG4vLyBjbG9zZXMgYWxsIG9wZW4gZm9ybXMgaW4gcHJvamVjdCBsaXN0ICh1bClcbmNvbnN0IGNsb3NlQWxsRm9ybXMgPSAoKSA9PiB7XG4gICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvakxpc3QnKTtcbiAgICBjb25zdCBhcnJQcm9qZWN0RGl2cyA9IHVsLmNoaWxkTm9kZXM7XG5cbiAgICAvLyBjaGVjayBlYWNoIGRpdiBpZiBjaGlsZCBmb3JtIGlzIHByZXNlbnRcbiAgICBhcnJQcm9qZWN0RGl2cy5mb3JFYWNoKGRpdiA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBpZiB5ZXMsIHN3YXAgbGkgZm9yIGZvcm1cbiAgICAgICAgaWYgKGRpdi5maXJzdENoaWxkLm5vZGVOYW1lID09PSAnRk9STScpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZ3JhYiBpbmRleCBvZiBMSW5vZGVcbiAgICAgICAgICAgIGNvbnN0IGluZGV4TElOb2RlID0gb3BlbkxJTm9kZXMuZmluZEluZGV4KG5vZGUgPT4gbm9kZS5pZC5zbGljZSgwLC0yKSA9PT0gZGl2LmZpcnN0Q2hpbGQuaWQuc2xpY2UoMCwgLTQpKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2cob3BlbkxJTm9kZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXhMSU5vZGUpO1xuXG4gICAgICAgICAgICAvLyByZXBsYWNlIGZvcm0gd2l0aCBsaVxuICAgICAgICAgICAgZGl2LmZpcnN0Q2hpbGQucmVwbGFjZVdpdGgob3BlbkxJTm9kZXNbaW5kZXhMSU5vZGVdKTtcblxuICAgICAgICAgICAgLy9yZW1vdmUgbGkgZnJvbSBtZW1vcnkgKGV4Y2VwdCBmb3IgJysgQWRkIFByb2plY3QnKVxuICAgICAgICAgICAgaWYgKGRpdi5maXJzdENoaWxkLmlkICE9ICcrIEFkZCBQcm9qZWN0TEknKSBvcGVuTElOb2Rlcy5zcGxpY2UoaW5kZXhMSU5vZGUsIDEpO1xuXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgXG5cbn1cblxuLy8gYWRkIHRhc2sgbGlzdFxuY29uc3QgX2xvYWRUYXNrSGVhZGVyID0gKHRpdGxlKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICd0YXNrJ10sICcnLCAnJyk7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBfY3JlYXRlRWxlbWVudCgnaDInLCAnJywgdGl0bGUsICcnKTtcblxuICAgIGhlYWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgcmV0dXJuIGhlYWRlckNvbnRhaW5lcjtcbn1cblxuY29uc3QgX2xvYWRUYXNrTGlzdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgIGNvbnN0IGFjdGl2ZVRhc2tzID0gcHJvamVjdE5hbWUgPT09ICdJbmJveCcgPyBTdG9yYWdlLmdldEluYm94VGFza3MoKSA6IFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuZ2V0VGFza3MoKTtcblxuICAgIGNvbnN0IHRhc2tMaXN0Q29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnLCAndGFzayddLCAnJywgJycpO1xuXG4gICAgLy8gZm9yIGVhY2ggdGFzaywgY3JlYXRlIGxpc3QgaXRlbSBcbiAgICBhY3RpdmVUYXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgZWxlbWVudHMgZm9yIGVhY2ggdGFzayBcbiAgICAgICAgY29uc3Qgb3V0ZXJDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICdvdXRlckNvbnQnXSk7XG4gICAgICAgIGNvbnN0IGNoZWNrQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Rhc2tJdGVtTGVmdCddKTtcbiAgICAgICAgY29uc3QgdGFza0NvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJywgJ3Rhc2tDb250J10sICcnLCAnJyk7XG4gICAgICAgIGNvbnN0IGxpQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFza0l0ZW0nXSwgJycsICcnKTtcbiAgICAgICAgY29uc3QgZGVzY1ByZXYgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydkZXNjUHJldiddLCB0YXNrLmdldERlc2NyaXB0aW9uKCksICcnKTtcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICdkZXNjUHJldiddKTtcbiAgICAgICAgb3V0ZXJDb250LmFwcGVuZChjaGVja0NvbnQsIHRhc2tDb250KTtcbiAgICAgICAgdGFza0NvbnQuYXBwZW5kKGxpQ29udCwgZGVzY1ByZXYsIHNjaGVkdWxlQ29udCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2hlY2tDb250XG4gICAgICAgIGNvbnN0IGJ1dHRvbkNvbnQgPSBfY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydjbGVhckJ1dHRvbiddKTtcbiAgICAgICAgY29uc3QgY2lyY2xlTWFya2VyID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1jaXJjbGUnXSk7XG4gICAgICAgIGNvbnN0IGNoZWNrTWFya2VyID0gX2NyZWF0ZUVsZW1lbnQoJ2knLFsnZmFyJywgJ2ZhLWNoZWNrLWNpcmNsZSddKTtcbiAgICAgICAgYnV0dG9uQ29udC5vbm1vdXNlZW50ZXIgPSAoKSA9PiB7IFxuICAgICAgICAgICAgY2lyY2xlTWFya2VyLnJlcGxhY2VXaXRoKGNoZWNrTWFya2VyKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnV0dG9uQ29udC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7IFxuICAgICAgICAgICAgY2hlY2tNYXJrZXIucmVwbGFjZVdpdGgoY2lyY2xlTWFya2VyKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnV0dG9uQ29udC5hcHBlbmQoY2lyY2xlTWFya2VyKTtcbiAgICAgICAgY2hlY2tDb250LmFwcGVuZChidXR0b25Db250KTtcblxuICAgICAgICAvLyBzZXR1cCBsaUNvbnRcbiAgICAgICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgWydub01hcmtlciddLCB0YXNrLmdldFRpdGxlKCkpO1xuICAgICAgICBjb25zdCBlZGl0Tm9kZSA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS1lZGl0J10pO1xuICAgICAgICBjb25zdCBkZWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLXRyYXNoLWFsdCddKTtcbiAgICAgICAgbGlDb250LmFwcGVuZChsaU5vZGUsIGVkaXROb2RlLCBkZWxJY29uKTtcblxuICAgICAgICAvL3NldHVwIHNjaGVkdWxlQ29udFxuICAgICAgICBjb25zdCBjYWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1jYWxlbmRhci1hbHQnXSk7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRlID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsndGFza0RhdGUnXSwgdGFzay5nZXREYXRlKCkpO1xuICAgICAgICBzY2hlZHVsZUNvbnQuYXBwZW5kKGNhbEljb24sIHRhc2tEYXRlKTtcblxuICAgICAgICAvLyBzZXR1cCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICAgIC8vIHRhc2tDb250IGhvdmVyIHNob3dzIGVkaXQgYW5kIGRlbCBidXR0b25cbiAgICAgICAgLy90YXNrIGNvbXBsZXRlIGNsaWNrIGxpc3RlbmVyXG4gICAgICAgIGJ1dHRvbkNvbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVGFzayBjb21wbGV0ZSBidXR0b24gY2xpY2tlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gZWRpdCBjbGljayBsaXN0ZW5lclxuICAgICAgICBlZGl0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUYXNrIGVkaXQgYnV0dG9uIGNsaWNrZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGRlbGV0ZSBjbGljayBsaXN0ZW5lclxuICAgICAgICBkZWxJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RlbGV0ZSB0YXNrIGJ1dHRvbiBjbGlja2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRhc2tMaXN0Q29udC5hcHBlbmRDaGlsZChvdXRlckNvbnQpO1xuXG4gICAgICAgIC8vIGFkZCBoclxuICAgICAgICB0YXNrTGlzdENvbnQuYXBwZW5kQ2hpbGQoX2NyZWF0ZUVsZW1lbnQoJ2hyJykpO1xuXG4gICAgfSlcbiAgICB0YXNrTGlzdENvbnQuYXBwZW5kQ2hpbGQoX2xvYWRBZGRUYXNrQnV0dG9uKHByb2plY3ROYW1lKSk7XG5cbiAgICByZXR1cm4gdGFza0xpc3RDb250O1xufVxuXG5cbmNvbnN0IF9sb2FkQWRkVGFza0J1dHRvbiA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgIFxuICAgIC8vY3JlYXRlIGVsZW1lbnRzXG4gICAgY29uc3QgYWRkQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFzayddLCAnJywgJ2FkZENvbnQnKTtcbiAgICBjb25zdCBhZGRJdGVtTGVmdCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Rhc2tJdGVtTGVmdCddKTtcbiAgICBjb25zdCBhZGRJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcycsICdmYS1wbHVzLWNpcmNsZSddKTtcbiAgICBjb25zdCBhZGRUZXh0ID0gX2NyZWF0ZUVsZW1lbnQoJ3AnLCAnJywgJ0FkZCBUYXNrJywgJ2FkZFRleHQnKTtcbiAgICBhZGRJdGVtTGVmdC5hcHBlbmQoYWRkSWNvbik7XG4gICAgYWRkQ29udC5hcHBlbmQoYWRkSXRlbUxlZnQsIGFkZFRleHQpO1xuXG4gICAgYWRkQ29udC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZCB0YXNrIGNsaWNrZWQnKTtcblxuICAgICAgICBjb25zdCBhZGRQb3B1cCA9IF9jcmVhdGVFZGl0VGFza1BvcHVwKHByb2plY3ROYW1lLCBTdG9yYWdlLmdlbmVyYXRlVGFza0lEKCkpO1xuXG4gICAgICAgIFxuICAgICAgICBhZGRDb250LnJlcGxhY2VXaXRoKGFkZFBvcHVwKTtcblxuICAgIH0pXG4gICAgXG4gICAgcmV0dXJuIGFkZENvbnQ7XG5cbn1cblxuY29uc3QgX2NyZWF0ZUVkaXRUYXNrUG9wdXAgPSAocHJvamVjdE5hbWUsIHRhc2tJRCkgPT4geyAgXG4gICAgLy8gY3JlYXRlIGFuZCBzZXR1cCBlbGVtZW50IHN0cnVjdHVyZXNcbiAgICBjb25zdCB0YXNrSW5wdXRDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddKTtcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgJycpO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IF9jcmVhdGVFbGVtZW50KCdpbnB1dCcsICcnKTtcbiAgICBjb25zdCB0YXNrQnV0dG9uQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFza0J1dHRvbkNvbnQnXSk7XG4gICAgY29uc3Qgc2NoZWR1bGVDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsJ3Rhc2tCdXR0b24nXSk7XG4gICAgY29uc3QgY2FsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtY2FsZW5kYXItYWx0J10pO1xuICAgIGNvbnN0IGRhdGVJbnB1dCA9IF9jcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZGF0ZUlucHV0J10sICdTY2hlZHVsZScpO1xuICAgIGRhdGVJbnB1dC50eXBlID0gJ2RhdGUnO1xuICAgIGRhdGVJbnB1dC5taW4gPSBTY2hlZHVsZSgpLmdldERhdGVUb2RheSgpO1xuICAgIC8vIEZVVFVSRTogYWRkIHByb2plY3QgYnV0dG9uIGhlcmVcbiAgICBzY2hlZHVsZUNvbnQuYXBwZW5kKGNhbEljb24sIGRhdGVJbnB1dCk7XG4gICAgdGFza0lucHV0Q29udC5hcHBlbmQodGl0bGVJbnB1dCwgZGVzY0lucHV0LCB0YXNrQnV0dG9uQ29udCk7XG4gICAgdGFza0J1dHRvbkNvbnQuYXBwZW5kKHNjaGVkdWxlQ29udCk7XG5cbiAgICBjb25zdCBzYXZlQnV0dG9uQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnXSk7XG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ3NhdmVCdXR0b24nXSwgJ1NhdmUgVGFzaycpO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2NhbmNlbEJ1dHRvbiddLCAnQ2FuY2VsJyk7XG4gICAgc2F2ZUJ1dHRvbkNvbnQuYXBwZW5kKHNhdmVCdXR0b24sIGNhbmNlbEJ1dHRvbik7XG5cbiAgICBjb25zdCBvdXRlckNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Q29sJywgJ291dGVyQ29udCddKTtcbiAgICBvdXRlckNvbnQuYXBwZW5kKHRhc2tJbnB1dENvbnQsIHNhdmVCdXR0b25Db250KTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBjcmVhdGUgbmV3IHRhc2tcblxuICAgICAgICAvLyBhZGQgdG8gcHJvamVjdFxuXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9qZWN0IGluIHN0b3JhZ2VcblxuICAgICAgICAvLyB1cGRhdGUgRE9NXG4gICAgICAgIFxuICAgICAgICBvdXRlckNvbnQucmVwbGFjZVdpdGgoX2xvYWRBZGRUYXNrQnV0dG9uKHByb2plY3ROYW1lKSk7XG4gICAgfSk7XG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIFxuICAgICAgICBvdXRlckNvbnQucmVwbGFjZVdpdGgoX2xvYWRBZGRUYXNrQnV0dG9uKHByb2plY3ROYW1lKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3V0ZXJDb250O1xuXG59XG5cbmNvbnN0IF9hcHBlbmRUYXNrRE9NID0gKHRhc2spID0+IHtcbiAgICAvLyBmaW5kIGxhc3QgdGFzayBpbiBsaXN0IGFuZCBhZGQgYWZ0ZXJcblxufVxuXG5cbmV4cG9ydCB7IERPTUxvYWRlciB9O1xuIiwiLyogUHJvamVjdC5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIFByb2plY3Qgb2JqZWN0IGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9uc1xuXG4qL1xuLy8gaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5qcyc7XG5cbmNvbnN0IFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gW107XG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGdldE5hbWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TmFtZShuZXdOYW1lKSB7XG4gICAgICAgICAgICBuYW1lID0gbmV3TmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBnZXRUYXNrcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0YXNrcztcbiAgICAgICAgfSxcbiAgICAgICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgICAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVUYXNrKHRhc2tJRCkge1xuICAgICAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tzLmZpbmRJbmRleCh0YXNrID0+IHRhc2suZ2V0SUQoKSA9PT0gdGFza0lEKSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG8pO1xufVxuXG5leHBvcnQgeyBQcm9qZWN0IH07IiwiY29uc3QgVEFTS19MSU1JVCA9IDEwMDAwO1xuY29uc3QgaW5ib3hUYXNrcyA9IFtdO1xuY29uc3QgYWN0aXZlUHJvamVjdHMgPSBbXTtcbmNvbnN0IGFjdGl2ZUlEcyA9IFtdO1xuXG5jb25zdCBTdG9yYWdlID0ge1xuICAgIGFkZFByb2plY3Q6IChwcm9qKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnB1c2gocHJvaik7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHM7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0OiAocHJvak5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2plY3RzLmZpbmQocHJvaiA9PiBwcm9qLmdldE5hbWUoKSA9PT0gcHJvam5hbWUpO1xuICAgIH0sXG4gICAgY2hlY2tQcm9qZWN0OiAocHJvak5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2plY3RzLnNvbWUocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvak5hbWUpO1xuICAgIH0sXG4gICAgdXBkYXRlUHJvamVjdDogKG9sZFByb2pOYW1lLCBuZXdQcm9qTmFtZSkgPT4ge1xuICAgICAgICBhY3RpdmVQcm9qZWN0c1thY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBTdG9yYWdlLmNoZWNrUHJvamVjdChvbGRQcm9qTmFtZSkpXS5zZXROYW1lKG5ld1Byb2pOYW1lKTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb2plY3Q6IChwcm9qTmFtZSkgPT4ge1xuICAgICAgICBhY3RpdmVQcm9qZWN0cy5zcGxpY2UoYWN0aXZlUHJvamVjdHMuZmluZEluZGV4KHByb2ogPT4gU3RvcmFnZS5jaGVja1Byb2plY3QocHJvak5hbWUpKSwgMSk7XG4gICAgfSxcbiAgICBhZGRJbmJveFRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICAgIGluYm94VGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgYWN0aXZlSURzLnB1c2godGFzay5nZXRJRCgpKTtcbiAgICB9LFxuICAgIGdldEluYm94VGFza3M6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGluYm94VGFza3M7XG4gICAgfSxcbiAgICBnZW5lcmF0ZVRhc2tJRDogKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgaWYgKGFjdGl2ZUlEcy5sZW5ndGggPj0gVEFTS19MSU1JVCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgbGV0IHJhbmQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHJhbmQgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIFRBU0tfTElNSVQpO1xuICAgICAgICB9IHdoaWxlIChhY3RpdmVJRHMuaW5jbHVkZXMocmFuZCkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJhbmQ7XG4gICAgfVxufVxuXG5cbmV4cG9ydCB7IFN0b3JhZ2UgfSIsIi8qIFRhc2suanMgXG5cbk1vZHVsZSByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYSB0YXNrIG9iamVjdCBhbmQgc3VwcG9ydGluZyBmdW5jdGlvbnNcblxuKi9cbmltcG9ydCB7IGZvcm1hdElTTyB9IGZyb20gJ2RhdGUtZm5zJ1xuXG5jb25zdCBUYXNrID0gKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgLy8gQWxsIHRhc2tzIGRlZmF1bHQgdG8gaW5ib3ggdXBvbiBjcmVhdGlvblxuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXRJRCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGl0bGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgICAgICB0aXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGVzY3JpcHRpb24oZGVzYykge1xuICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBnZXREYXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldERhdGUobmV3RGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IG5ld0RhdGU7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFByaW9yaXR5KHByaSkge1xuICAgICAgICAgICAgcHJpb3JpdHkgPSBwcmk7XG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG8pO1xufVxuXG5jb25zdCBTY2hlZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXREYXRlVG9kYXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0SVNPKHRvZGF5LCB7IHJlcHJlc2VudGF0aW9uOiAnZGF0ZSd9KTtcbiAgICAgICAgfSxcblxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFRhc2ssIFNjaGVkdWxlIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuXG4tIFRhc2tzXG4gICAgLSBTZXBlcmF0ZSBtb2R1bGVcbiAgICAtIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGFza1xuICAgIC0gUHJvcGVydGllczogXG4gICAgICAgIC0gdGl0bGVcbiAgICAgICAgLSBkZXNjcmlwdGlvblxuICAgICAgICAtIGR1ZSBkYXRlXG4gICAgICAgIC0gcHJpb3JpdHlcbiAgICAgICAgLSBpc0NvbXBsZXRlXG4gICAgLSBmdW5jdGlvbnNcbiAgICAgICAgLSBjaGFuZ2UgcHJvcGVydGllc1xuLSBQcm9qZWN0c1xuICAgIC0gY29udGFpbnMgbWFueSB0YXNrc1xuICAgIC0gcHJvcGVydGllczpcbiAgICAgICAgLSBcbi0gRE9NXG5cblxuKi9cblxuaW1wb3J0IHsgRE9NTG9hZGVyIH0gZnJvbSAnLi9tb2R1bGVzL0RPTS5qcyc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9tb2R1bGVzL3N0b3JhZ2UuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LmpzJztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL21vZHVsZXMvdGFzay5qcyc7XG5cblxuY29uc3QgcmVuZGVyID0gKCgpID0+IHtcbiAgICBcbiAgICAvLyBzYW1wbGUgcHJvamVjdHNcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgnQ2xlYW5pbmcnKSk7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KFByb2plY3QoJ1BhY2tpbmcnKSk7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KFByb2plY3QoJ01vcHBpbmcnKSk7XG5cbiAgICAvLyBzYW1wbGUgaW5ib3ggdGFza3NcbiAgICBTdG9yYWdlLmFkZEluYm94VGFzayhUYXNrKDEsICdHYXJiYWdlJywgJ1Rha2UgZ2FyYmFnZSBvdXQgdG8gc3RyZWV0JywnRGVjIDgnLCAncDEnKSk7XG4gICAgU3RvcmFnZS5hZGRJbmJveFRhc2soVGFzaygyLCAnQmF0aHJvb20gRmxvb3JzJywgJ0NsZWFuIGJhdGhyb29tIGZsb29ycycsJ0RlYyA5JywgJ3AyJykpO1xuICAgIFN0b3JhZ2UuYWRkSW5ib3hUYXNrKFRhc2soMywgJ0tpdGNoZW4gRmxvb3JzJywgJ0NsZWFuIGtpdGNoZW4gZmxvb3JzJywnV2VkbmVzZGF5JywgJ3AzJykpO1xuXG4gICAgLy8gbG9hZCBET00gZWxlbWVudHNcbiAgICBET01Mb2FkZXIubG9hZEhlYWRlcigpO1xuICAgIERPTUxvYWRlci5sb2FkU2lkZUJhcigpO1xuICAgIERPTUxvYWRlci5sb2FkTWFpbigpO1xuXG59KSgpO1xuXG5yZW5kZXI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=