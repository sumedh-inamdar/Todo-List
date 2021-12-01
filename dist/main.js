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

/***/ "./src/modules/appLogic.js":
/*!*********************************!*\
  !*** ./src/modules/appLogic.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadApp": () => (/* binding */ loadApp),
/* harmony export */   "editProject": () => (/* binding */ editProject),
/* harmony export */   "submitProject": () => (/* binding */ submitProject),
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject),
/* harmony export */   "addProject": () => (/* binding */ addProject),
/* harmony export */   "getTasks": () => (/* binding */ getTasks),
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "submitTask": () => (/* binding */ submitTask)
/* harmony export */ });
/* harmony import */ var _updateDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateDOM */ "./src/modules/updateDOM.js");
/* harmony import */ var _createDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createDOM */ "./src/modules/createDOM.js");
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventListeners */ "./src/modules/eventListeners.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");







let currActiveProjID = 'projInbox';

const loadApp = () => {
    (0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createDOM)();
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectList)();
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateTaskList)(currActiveProjID);
}
const editProject = (event) => {
    
    event.preventDefault();
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const currProjID = event.target.id.slice(0,-4);
    const liNode = document.querySelector(`#${currProjID}LI`);
    const projForm = (0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createProjForm)(currProjID);
    liNode.replaceWith(projForm);

    (0,_eventListeners__WEBPACK_IMPORTED_MODULE_2__.setupProjFormListener)(projForm);

}
const submitProject = (event) => {
    
    event.preventDefault();
    const projID = event.target.id.slice(0,-4);
    const newProjName = document.querySelector('#projInput').value;
    const ulElement = document.querySelector('#projList');

    if (_storage__WEBPACK_IMPORTED_MODULE_3__.Storage.checkProjectName(newProjName)) {
        alert('Project name exists');
        return;
    } else if (_storage__WEBPACK_IMPORTED_MODULE_3__.Storage.getProject(projID)) {
        _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.updateProjectName(projID, newProjName);  
    } else {
        _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.addProject((0,_project__WEBPACK_IMPORTED_MODULE_4__.Project)(projID, newProjName));
        event.target.parentNode.remove();
        ulElement.appendChild((0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createAddProj)());
    }
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectList)();
}
const deleteProject = (event) => {
    
    event.preventDefault();
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const projID = event.target.id.slice(0, -3);
    _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.deleteProject(projID);

    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectList)();

}
const addProject = (event) => {
    
    event.preventDefault();
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const addProjLI = event.target;
    const projID = _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.generateProjID();
    const projForm = (0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createProjForm)(projID);

    addProjLI.replaceWith(projForm);
    (0,_eventListeners__WEBPACK_IMPORTED_MODULE_2__.setupProjFormListener)(projForm);
    

}
const getTasks = (projID) => {
    
    currActiveProjID = projID;

    return _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.getProject(projID).getTasks();

    // Later: Setup Today and This week task fetch logic
}
const addTask = (event) => {
    
    event.preventDefault();
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const addTaskDIV = document.querySelector('#addTask');
    const taskID = _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.generateTaskID();
    const taskForm = (0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createAddTaskForm)(taskID);

    addTaskDIV.replaceWith(taskForm);
    (0,_eventListeners__WEBPACK_IMPORTED_MODULE_2__.setupTaskFormListener)(currActiveProjID, taskForm);

}
const submitTask = (event) => {
    event.preventDefault();

    const currProj = _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.getProject(currActiveProjID);
    
    const taskID = event.target.id.slice(0, -4);
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDesc = document.querySelector('#taskDesc').value;
    const taskDate = document.querySelector('#taskDate').value;

    if (currProj.getTask(taskID)) {

        const newTask = currProj.getTask(taskID);
        newTask.update(taskTitle, taskDesc, taskDate);
        currProj.updateTask(taskID, newTask);

    } else {

        const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_5__.Task)(taskID, taskTitle, taskDesc, taskDate);
        currProj.addTask(newTask);
        _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.addTaskID(taskID);

    }

    _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.updateProject(currActiveProjID, currProj);
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateTaskList)(currActiveProjID);

}



/***/ }),

/***/ "./src/modules/createDOM.js":
/*!**********************************!*\
  !*** ./src/modules/createDOM.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOM": () => (/* binding */ createDOM),
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "createAddProj": () => (/* binding */ createAddProj),
/* harmony export */   "createProjForm": () => (/* binding */ createProjForm),
/* harmony export */   "createAddTask": () => (/* binding */ createAddTask),
/* harmony export */   "createTask": () => (/* binding */ createTask),
/* harmony export */   "createHR": () => (/* binding */ createHR),
/* harmony export */   "createAddTaskForm": () => (/* binding */ createAddTaskForm)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");
// Module responsiblibilities:
// - Builds DOM upon initial load
// - Create elements and add to document
// - Loads active projects and tasks



const _createElement = (type, classNameArr, text, id) => {
    const element = document.createElement(type);
    if (classNameArr) element.classList.add(...classNameArr);
    if (text) element.textContent = text;
    if (id) element.id = id;
    return element;
}
const createDOM = () => {
    _createHeader();
    _createSideBar();
    _createMain();
}
const _createHeader = () => {
    
    const headerDiv = _createElement('div', ['headerDiv'], 'To-Do Application');

    document.querySelector('header').append(headerDiv);
}
const _createSideBar = () => {
        
    const sideBar = document.querySelector('#sideBar');
    
    const navCont = _createElement('div', ['flexCol'],'','sideBarNavCont');
    const inbox = _createElement('div', ['sideBarLink'], 'Inbox');
    const today = _createElement('div', ['sideBarLink'], 'Today');
    const thisWeek = _createElement('div', ['sideBarLink'], 'This Week');

    const projCont = _createElement('div', ['flexCol'], '', 'projCont');
    const projHeadingCont = _createElement('div');
    const projHeadingText = _createElement('h4', ['flexCol'], 'Projects');
    const projList = _createElement('ul', ['projList'], '', 'projList');

    projHeadingCont.append(projHeadingText);
    projList.append(createAddProj());

    projCont.append(projHeadingCont, projList);
    
    navCont.append(inbox, today, thisWeek);

    sideBar.append(navCont, projCont);

}
const createAddProj = () => {
    const addProjCont = _createElement('div', '', '', 'addProj');
    const addProjLI = _createElement('li', ['noMarker'], '+ Add Project', 'addProjectLI');
    addProjCont.append(addProjLI);
    return addProjCont;
}
const createProject = (proj) => {
    
    const projName = proj.getName();
    const projID = proj.getID();

    const projectElement = _createElement('div', ['projItem']);
    const liNode = _createElement('li', '', projName, projID + 'LI');
    const editIcon = _createElement('i', ['far','fa-edit'], '', projID + 'EDIT');
    const delIcon = _createElement('i', ['far','fa-trash-alt'], '', projID + 'DEL');

    projectElement.append(liNode, editIcon, delIcon);

    return projectElement;
}
const createProjForm = (projID) => {

    const projForm = _createElement('form', ['projForm'], '', projID + 'FORM');

    const projInput = _createElement('input', ['inputProj'], '', 'projInput');
    projInput.type = 'text';
    projInput.required = true;
    projInput.value = _storage__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjectName(projID);

    const saveButton = _createElement('button', '', '',  projID + 'SAVE');
    saveButton.type = 'submit';
    const saveIcon = _createElement('i', ['far', 'fa-save'], '');
    
    const cancelButton = _createElement('button', '', '', projID + 'CANCEL');
    cancelButton.type = 'button';
    const cancelIcon = _createElement('i', ['far', 'fa-window-close'], '');

    saveButton.append(saveIcon);
    cancelButton.appendChild(cancelIcon);
    projForm.append(projInput, saveButton, cancelButton);

    return projForm;
}
const _createMain = () => {
    const mainContent = document.querySelector('#mainContent');

    const headerContainer = _createElement('div', ['flexRow', 'taskHeader'], '', '');
    const header = _createElement('h2', '', 'Inbox', 'mainHeader');

    const taskList = _createElement('ul', ['taskList'], '', 'taskList');

    taskList.append(createAddTask());

    headerContainer.append(header);
    mainContent.append(headerContainer, taskList);

}
const createAddTask = () => {
    
    const addCont = _createElement('div', ['flexRow', 'task'], '', 'addTask');
    const addItemLeft = _createElement('div', ['taskItemLeft']);
    const addIcon = _createElement('i', ['fas', 'fa-plus-circle']);
    const addText = _createElement('p', '', 'Add Task', 'addText');

    addItemLeft.append(addIcon);
    addCont.append(addItemLeft, addText);

    return addCont;
}
const createTask = (task) => {

        const taskID = task.getID();

        const outerCont = _createElement('div', ['flexRow', 'taskItem']);
        const checkCont = _createElement('div', ['taskItemLeft']);
        const taskCont = _createElement('div', ['flexCol', 'taskCont'], '', '');

        const liCont = _createElement('div', ['flexRow', 'taskLI'], '', '');
        const descPrev = _createElement('div', ['descPrev'], task.getDescription(), '');
        const scheduleCont = _createElement('div', ['flexRow', 'descPrev']);

        const buttonCont = _createElement('button', ['clearButton'], '', taskID + 'CHECK');
        const circleMarker = _createElement('i', ['far', 'fa-circle']);
        const checkMarker = _createElement('i',['far', 'fa-check-circle']);

        // LATER: consider moving to eventListeners module
        buttonCont.onmouseenter = () => { 
            circleMarker.replaceWith(checkMarker);
        };
        buttonCont.onmouseleave = () => { 
            checkMarker.replaceWith(circleMarker);
        };

        const liNode = _createElement('li', ['noMarker'], task.getTitle());
        const editNode = _createElement('i', ['far','fa-edit'], '', taskID + 'EDIT');
        const delIcon = _createElement('i', ['far','fa-trash-alt'], '', taskID + 'DEL');
        
        const calIcon = _createElement('i', ['far', 'fa-calendar-alt']);
        const taskDate = _createElement('div', ['taskDate'], task.getDate());

        buttonCont.append(circleMarker);
        checkCont.append(buttonCont);

        liCont.append(liNode, editNode, delIcon);
        scheduleCont.append(calIcon, taskDate);
        taskCont.append(liCont, descPrev, scheduleCont);

        outerCont.append(checkCont, taskCont);
        
        return outerCont;
}
const createHR = () => {
    return _createElement('hr');
}

const createAddTaskForm = (taskID) => {

    const taskForm = _createElement('form', ['flexCol','taskForm'], '', taskID + 'FORM');

    const taskInputCont = _createElement('div', ['flexCol']);
    
    const titleInput = _createElement('input', '', '', 'taskTitle');
    titleInput.type = 'text';
    titleInput.required = true;
    titleInput.placeholder = 'Title';
    
    const descInput = _createElement('input', '', '', 'taskDesc');
    descInput.type = 'text';
    descInput.required = true;
    descInput.placeholder = 'Description';

    const taskButtonCont = _createElement('div', ['flexRow', 'taskButtonCont']);
    const scheduleCont = _createElement('div', ['flexRow','taskButton']);
    const calIcon = _createElement('i', ['far', 'fa-calendar-alt']);
    const dateInput = _createElement('input', ['dateInput'], 'Schedule', 'taskDate');
    dateInput.type = 'date';
    dateInput.min = (0,_task__WEBPACK_IMPORTED_MODULE_1__.Schedule)().getDateToday();

    const saveButtonCont = _createElement('div', ['flexRow']);
    const saveButton = _createElement('button', ['saveButton'], 'Save Task');
    saveButton.type = 'submit';
    const cancelButton = _createElement('button', ['cancelButton'], 'Cancel', taskID + 'CANCEL');

    scheduleCont.append(calIcon, dateInput);
    taskInputCont.append(titleInput, descInput, taskButtonCont);
    taskButtonCont.append(scheduleCont);
    saveButtonCont.append(saveButton, cancelButton);
    taskForm.append(taskInputCont, saveButtonCont)

    return taskForm;
}




/***/ }),

/***/ "./src/modules/eventListeners.js":
/*!***************************************!*\
  !*** ./src/modules/eventListeners.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupAllEventListeners": () => (/* binding */ setupAllEventListeners),
/* harmony export */   "setupProjEventListeners": () => (/* binding */ setupProjEventListeners),
/* harmony export */   "setupProjFormListener": () => (/* binding */ setupProjFormListener),
/* harmony export */   "setupTaskEventListeners": () => (/* binding */ setupTaskEventListeners),
/* harmony export */   "setupTaskFormListener": () => (/* binding */ setupTaskFormListener)
/* harmony export */ });
/* harmony import */ var _appLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appLogic */ "./src/modules/appLogic.js");
/* harmony import */ var _updateDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateDOM */ "./src/modules/updateDOM.js");
// Module responsiblibilities:
// - Query elements and setup event listeners
// - Calls appLogic functions 



const setupAllEventListeners = () => {
    setupProjEventListeners();
    setupTaskEventListeners();
}
const setupProjEventListeners = () => {

    // later: setup event listeners for project LI elements
    const editNodes = document.querySelectorAll('.projItem .fa-edit');
    const delNodes = document.querySelectorAll('.projItem .fa-trash-alt');
    const addProjLI = document.querySelector('#addProjectLI');

    editNodes.forEach(editNode => editNode.addEventListener('click', _appLogic__WEBPACK_IMPORTED_MODULE_0__.editProject));
    delNodes.forEach(delNode => delNode.addEventListener('click', _appLogic__WEBPACK_IMPORTED_MODULE_0__.deleteProject));
    addProjLI.addEventListener('click', _appLogic__WEBPACK_IMPORTED_MODULE_0__.addProject);
}
const setupProjFormListener = (projForm) => {
    const projID = projForm.id.slice(0, -4);
    const cancelIcon = document.querySelector(`#${projID}CANCEL`);

    cancelIcon.addEventListener('click', () => (0,_updateDOM__WEBPACK_IMPORTED_MODULE_1__.closeProjForms)());

    projForm.addEventListener('submit', _appLogic__WEBPACK_IMPORTED_MODULE_0__.submitProject);

}
const setupTaskEventListeners = () => {
    const addTaskDIV = document.querySelector('#addTask');

    addTaskDIV.addEventListener('click', _appLogic__WEBPACK_IMPORTED_MODULE_0__.addTask);
}
const setupTaskFormListener = (projID, taskForm) => {
    const taskID = taskForm.id.slice(0, -4);
    const cancelButton = document.querySelector(`#${taskID}CANCEL`);

    cancelButton.addEventListener('click', () => (0,_updateDOM__WEBPACK_IMPORTED_MODULE_1__.closeTaskForms)(projID));

    taskForm.addEventListener('submit', _appLogic__WEBPACK_IMPORTED_MODULE_0__.submitTask);
}



/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "Inbox": () => (/* binding */ Inbox)
/* harmony export */ });
/* Project.js 

Module responsible for creating a Project object and supporting functions

*/
// import { Task } from './task.js';
const getIndexByID = (state, taskID) => {
    return state.tasks.findIndex(task => task.getID() === taskID);
}
const proto = (state) => ({
    getID: () => {
        return state.id;
    },
    getName: () => {
        return state.name;
    },
    getTasks: () => {
        return state.tasks;
    },
    getTask: (taskID) => {
        return state.tasks.find(task => task.getID === taskID);
    },
    updateTask: (taskID, newTask) => {
        // need to fix error with getIndexByID (can't access this)
        state.tasks.splice(getIndexByID(state, taskID), 1, newTask);  
    },
    addTask: (task) => {
        state.tasks.push(task);
    },
    removeTask: (taskID) => {
        state.tasks.splice(getIndexByID(state, taskID), 1);
    }

})
const Project = (id, name) => {
    let state = {
        id,
        name,
        tasks: []
    }
    
    const setName = (newName) => {
        state.name = newName;
    }

    return Object.assign({}, proto(state), { setName });
}

const Inbox = () => {
    let state = {
        id: 'projInbox',
        name: 'Inbox',
        tasks: []
    }

    return Object.assign({}, proto(state));
    
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
const PROJ_LIMIT = 1000;
const TASK_LIMIT = 10000;
const activeProjects = [];
const activeTaskIDs = [];
const activeProjIDs = [];

const getIndexByID = (projID) => {
    return activeProjects.findIndex(proj => proj.getID() === projID);
}

const projID_exists = (id) => {
    return activeProjIDs.includes(id);
}
const taskID_exists = (id) => {
    return activeTaskIDs.includes(id);
}

const Storage = {
    addTaskID: (id) => {
        activeTaskIDs.push(id);
    },
    addProject: (proj) => {
        activeProjects.push(proj);
        activeProjIDs.push(proj.getID());
    },
    getProjects: () => {
        return activeProjects;
    },
    getProject: (projID) => {
        return activeProjects[getIndexByID(projID)];
    },
    getProjectName: (projID) => {
        const proj = getProject(projID);
        return proj ? proj.getName() : '';
    },
    checkProjectName: (projName) => {
        return activeProjects.some(project => project.getName() === projName);
    },
    updateProject(projID, newProj) {
        activeProjects.splice(getIndexByID(projID), 1, newProj);
    },
    updateProjectName: (projID, newProjName) => {
        activeProjects[getIndexByID(projID)].setName(newProjName);
    },
    deleteProject: (projID) => {
        activeProjects.splice(activeProjects.findIndex(proj => proj.getID() === projID), 1);
        activeProjIDs.splice(activeProjIDs.indexOf(projID), 1)
    },
    generateTaskID: () => {
        
        if (activeTaskIDs.length >= TASK_LIMIT) return false;
        
        let rand;
        do {
            rand = Math.ceil(Math.random() * TASK_LIMIT);
        } while (taskID_exists(`task${rand}`));
        
        return `task${rand}`;
    },
    generateProjID: () => {
        if (activeProjIDs.length >= PROJ_LIMIT) return false;

        let rand;
        do {
            rand = Math.ceil(Math.random() * PROJ_LIMIT);
        } while (projID_exists(`proj${rand}`));
        
        return `proj${rand}`;

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
        },
        update(newTitle, newDesc, newDate, newPriority) {
            this.setTitle(newTitle);
            this.setDescription(newDesc);
            this.setDate(newDate);
            this.setPriority(newPriority);
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



/***/ }),

/***/ "./src/modules/updateDOM.js":
/*!**********************************!*\
  !*** ./src/modules/updateDOM.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateProjectList": () => (/* binding */ updateProjectList),
/* harmony export */   "updateTaskList": () => (/* binding */ updateTaskList),
/* harmony export */   "closeAllForms": () => (/* binding */ closeAllForms),
/* harmony export */   "closeProjForms": () => (/* binding */ closeProjForms),
/* harmony export */   "closeTaskForms": () => (/* binding */ closeTaskForms)
/* harmony export */ });
/* harmony import */ var _createDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOM */ "./src/modules/createDOM.js");
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventListeners */ "./src/modules/eventListeners.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");
/* harmony import */ var _appLogic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./appLogic */ "./src/modules/appLogic.js");
// Module responsiblibilities:
// - Handles updating DOM elements
// - Updates DOM with current active projects / tasks





const updateProjectList = () => {

    document.querySelectorAll('.projItem').forEach(item => item.remove());

    const refNode = document.querySelector('#addProj');
    const parentNode = refNode.parentNode;

    _storage__WEBPACK_IMPORTED_MODULE_2__.Storage.getProjects().forEach(proj => parentNode.insertBefore((0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createProject)(proj), refNode));

    (0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.setupProjEventListeners)();
}
const updateTaskList = (projID) => {

    closeTaskForms(projID);
    document.querySelectorAll('.taskItem').forEach(task => task.remove());
    document.querySelectorAll('hr').forEach(hr => hr.remove());

    const refNode = document.querySelector('#addTask');
    const parentNode = refNode.parentNode;

    const activeTasks = (0,_appLogic__WEBPACK_IMPORTED_MODULE_3__.getTasks)(projID);

    activeTasks.forEach(task => {
        parentNode.insertBefore((0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createTask)(task), refNode);
        parentNode.insertBefore((0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createHR)(), refNode);
    });

    // Later
    (0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.setupTaskEventListeners)();
}
const closeAllForms = (projID) => {
    closeProjForms();
    closeTaskForms(projID);
}
const closeProjForms = () => {
    
    const projForms = document.querySelectorAll('.projForm');
    
    projForms.forEach(projForm => {
        const projID = projForm.id.slice(0, -4);
        const proj = _storage__WEBPACK_IMPORTED_MODULE_2__.Storage.getProject(projID);
        const liNode = proj ? (0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createProject)(proj).firstChild : (0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createAddProj)().firstChild;
        
        projForm.replaceWith(liNode);
    })

    ;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.setupProjEventListeners)();
}
const closeTaskForms = (projID) => {
    const taskForms = document.querySelectorAll('.taskForm');

    taskForms.forEach(taskForm => {
        const taskID = taskForm.id.slice(0, -4);
        const task = _storage__WEBPACK_IMPORTED_MODULE_2__.Storage.getProject(projID).getTask(taskID);
        const taskDIV = task ? (0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createTask)(task) : (0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createAddTask)();

        taskForm.replaceWith(taskDIV);
    })

    ;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.setupTaskEventListeners)();
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
/* harmony import */ var _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/storage.js */ "./src/modules/storage.js");
/* harmony import */ var _modules_project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/project.js */ "./src/modules/project.js");
/* harmony import */ var _modules_task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/task.js */ "./src/modules/task.js");
/* harmony import */ var _modules_appLogic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/appLogic */ "./src/modules/appLogic.js");
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
    const inbox = (0,_modules_project_js__WEBPACK_IMPORTED_MODULE_1__.Inbox)();
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addProject(inbox);
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_1__.Project)('proj1', 'Cleaning'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_1__.Project)('proj2', 'Packing'));
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addProject((0,_modules_project_js__WEBPACK_IMPORTED_MODULE_1__.Project)('proj3', 'Mopping'));

    // sample inbox tasks
    const task1 = (0,_modules_task_js__WEBPACK_IMPORTED_MODULE_2__.Task)('task1', 'Garbage', 'Take garbage out to street','Dec 8', 'p1');
    const task2 = (0,_modules_task_js__WEBPACK_IMPORTED_MODULE_2__.Task)('task2', 'Bathroom Floors', 'Clean bathroom floors','Dec 9', 'p2');
    const task3 = (0,_modules_task_js__WEBPACK_IMPORTED_MODULE_2__.Task)('task3', 'Kitchen Floors', 'Clean kitchen floors','Wednesday', 'p3');
    
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProject(inbox.getID()).addTask(task1);
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProject(inbox.getID()).addTask(task2);
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProject(inbox.getID()).addTask(task3);
 
    (0,_modules_appLogic__WEBPACK_IMPORTED_MODULE_3__.loadApp)();

})();

render;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSw0QkFBNEIsS0FBSztBQUMzQztBQUNBLHNCQUFzQixLQUFLO0FBQzNCLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsNEJBQTRCLEtBQUs7QUFDM0M7QUFDQSxzQkFBc0IsS0FBSzs7QUFFM0I7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RFQTs7QUFFQTs7QUFFQTtBQUNvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0RBQVMsVUFBVSx1QkFBdUI7QUFDN0QsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDK0Y7QUFDWDtBQUNqRDtBQUNFOztBQUVyQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLElBQUkseURBQW1CLDJDQUEyQyx5REFBYTs7QUFFL0UsSUFBSSx3RUFBdUI7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3QkFBd0IsbURBQVE7O0FBRWhDO0FBQ0EsZ0NBQWdDLHNEQUFVO0FBQzFDLGdDQUFnQyxvREFBUTtBQUN4QyxLQUFLOztBQUVMO0FBQ0EsSUFBSSx3RUFBdUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix3REFBa0I7QUFDdkMsOEJBQThCLHlEQUFhLG9CQUFvQix5REFBYTtBQUM1RTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLHlFQUF1QjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQix3REFBa0I7QUFDdkMsK0JBQStCLHNEQUFVLFNBQVMseURBQWE7O0FBRS9EO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLHlFQUF1QjtBQUMzQjs7Ozs7Ozs7VUNwRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFOEM7QUFDTztBQUNiO0FBQ0k7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwREFBSztBQUN2QixJQUFJLG1FQUFrQjtBQUN0QixJQUFJLG1FQUFrQixDQUFDLDREQUFPO0FBQzlCLElBQUksbUVBQWtCLENBQUMsNERBQU87QUFDOUIsSUFBSSxtRUFBa0IsQ0FBQyw0REFBTzs7QUFFOUI7QUFDQSxrQkFBa0Isc0RBQUk7QUFDdEIsa0JBQWtCLHNEQUFJO0FBQ3RCLGtCQUFrQixzREFBSTtBQUN0QjtBQUNBLElBQUksbUVBQWtCO0FBQ3RCLElBQUksbUVBQWtCO0FBQ3RCLElBQUksbUVBQWtCO0FBQ3RCO0FBQ0EsSUFBSSwwREFBTzs7QUFFWCxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2FkZExlYWRpbmdaZXJvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vZm9ybWF0SVNPL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNEYXRlL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNWYWxpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9hcHBMb2dpYy5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVET00uanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvdXBkYXRlRE9NLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCB0YXJnZXRMZW5ndGgpIHtcbiAgdmFyIHNpZ24gPSBudW1iZXIgPCAwID8gJy0nIDogJyc7XG4gIHZhciBvdXRwdXQgPSBNYXRoLmFicyhudW1iZXIpLnRvU3RyaW5nKCk7XG5cbiAgd2hpbGUgKG91dHB1dC5sZW5ndGggPCB0YXJnZXRMZW5ndGgpIHtcbiAgICBvdXRwdXQgPSAnMCcgKyBvdXRwdXQ7XG4gIH1cblxuICByZXR1cm4gc2lnbiArIG91dHB1dDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBpc1ZhbGlkIGZyb20gXCIuLi9pc1ZhbGlkL2luZGV4LmpzXCI7XG5pbXBvcnQgYWRkTGVhZGluZ1plcm9zIGZyb20gXCIuLi9fbGliL2FkZExlYWRpbmdaZXJvcy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBmb3JtYXRJU09cbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgRm9ybWF0IHRoZSBkYXRlIGFjY29yZGluZyB0byB0aGUgSVNPIDg2MDEgc3RhbmRhcmQgKGh0dHA6Ly9zdXBwb3J0LnNhcy5jb20vZG9jdW1lbnRhdGlvbi9jZGwvZW4vbHJkaWN0LzY0MzE2L0hUTUwvZGVmYXVsdC92aWV3ZXIuaHRtI2EwMDMxNjk4MTQuaHRtKS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIElTTyA4NjAxIGZvcm1hdC4gT3B0aW9ucyBtYXkgYmUgcGFzc2VkIHRvIGNvbnRyb2wgdGhlIHBhcnRzIGFuZCBub3RhdGlvbnMgb2YgdGhlIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7J2V4dGVuZGVkJ3wnYmFzaWMnfSBbb3B0aW9ucy5mb3JtYXQ9J2V4dGVuZGVkJ10gLSBpZiAnYmFzaWMnLCBoaWRlIGRlbGltaXRlcnMgYmV0d2VlbiBkYXRlIGFuZCB0aW1lIHZhbHVlcy5cbiAqIEBwYXJhbSB7J2NvbXBsZXRlJ3wnZGF0ZSd8J3RpbWUnfSBbb3B0aW9ucy5yZXByZXNlbnRhdGlvbj0nY29tcGxldGUnXSAtIGZvcm1hdCBkYXRlLCB0aW1lIHdpdGggdGltZSB6b25lLCBvciBib3RoLlxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgZGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5mb3JtYXRgIG11c3QgYmUgJ2V4dGVuZGVkJyBvciAnYmFzaWMnXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5yZXByZXNlbmF0aW9uYCBtdXN0IGJlICdkYXRlJywgJ3RpbWUnIG9yICdjb21wbGV0ZSdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDE4IFNlcHRlbWJlciAyMDE5IGluIElTTyA4NjAxIGZvcm1hdCAoVVRDKTpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdElTTyhuZXcgRGF0ZSgyMDE5LCA4LCAxOCwgMTksIDAsIDUyKSlcbiAqIC8vPT4gJzIwMTktMDktMThUMTk6MDA6NTJaJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMTggU2VwdGVtYmVyIDIwMTkgaW4gSVNPIDg2MDEsIHNob3J0IGZvcm1hdCAoVVRDKTpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdElTTyhuZXcgRGF0ZSgyMDE5LCA4LCAxOCwgMTksIDAsIDUyKSwgeyBmb3JtYXQ6ICdiYXNpYycgfSlcbiAqIC8vPT4gJzIwMTkwOTE4VDE5MDA1MidcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDE4IFNlcHRlbWJlciAyMDE5IGluIElTTyA4NjAxIGZvcm1hdCwgZGF0ZSBvbmx5OlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0SVNPKG5ldyBEYXRlKDIwMTksIDgsIDE4LCAxOSwgMCwgNTIpLCB7IHJlcHJlc2VudGF0aW9uOiAnZGF0ZScgfSlcbiAqIC8vPT4gJzIwMTktMDktMTgnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxOCBTZXB0ZW1iZXIgMjAxOSBpbiBJU08gODYwMSBmb3JtYXQsIHRpbWUgb25seSAoVVRDKTpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdElTTyhuZXcgRGF0ZSgyMDE5LCA4LCAxOCwgMTksIDAsIDUyKSwgeyByZXByZXNlbnRhdGlvbjogJ3RpbWUnIH0pXG4gKiAvLz0+ICcxOTowMDo1MlonXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0SVNPKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCIxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSBcIi5jb25jYXQoYXJndW1lbnRzLmxlbmd0aCwgXCIgcHJlc2VudFwiKSk7XG4gIH1cblxuICB2YXIgb3JpZ2luYWxEYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG5cbiAgaWYgKCFpc1ZhbGlkKG9yaWdpbmFsRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fTtcbiAgdmFyIGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0ID09IG51bGwgPyAnZXh0ZW5kZWQnIDogU3RyaW5nKG9wdGlvbnMuZm9ybWF0KTtcbiAgdmFyIHJlcHJlc2VudGF0aW9uID0gb3B0aW9ucy5yZXByZXNlbnRhdGlvbiA9PSBudWxsID8gJ2NvbXBsZXRlJyA6IFN0cmluZyhvcHRpb25zLnJlcHJlc2VudGF0aW9uKTtcblxuICBpZiAoZm9ybWF0ICE9PSAnZXh0ZW5kZWQnICYmIGZvcm1hdCAhPT0gJ2Jhc2ljJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiZm9ybWF0IG11c3QgYmUgJ2V4dGVuZGVkJyBvciAnYmFzaWMnXCIpO1xuICB9XG5cbiAgaWYgKHJlcHJlc2VudGF0aW9uICE9PSAnZGF0ZScgJiYgcmVwcmVzZW50YXRpb24gIT09ICd0aW1lJyAmJiByZXByZXNlbnRhdGlvbiAhPT0gJ2NvbXBsZXRlJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwicmVwcmVzZW50YXRpb24gbXVzdCBiZSAnZGF0ZScsICd0aW1lJywgb3IgJ2NvbXBsZXRlJ1wiKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIHR6T2Zmc2V0ID0gJyc7XG4gIHZhciBkYXRlRGVsaW1pdGVyID0gZm9ybWF0ID09PSAnZXh0ZW5kZWQnID8gJy0nIDogJyc7XG4gIHZhciB0aW1lRGVsaW1pdGVyID0gZm9ybWF0ID09PSAnZXh0ZW5kZWQnID8gJzonIDogJyc7IC8vIFJlcHJlc2VudGF0aW9uIGlzIGVpdGhlciAnZGF0ZScgb3IgJ2NvbXBsZXRlJ1xuXG4gIGlmIChyZXByZXNlbnRhdGlvbiAhPT0gJ3RpbWUnKSB7XG4gICAgdmFyIGRheSA9IGFkZExlYWRpbmdaZXJvcyhvcmlnaW5hbERhdGUuZ2V0RGF0ZSgpLCAyKTtcbiAgICB2YXIgbW9udGggPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgICB2YXIgeWVhciA9IGFkZExlYWRpbmdaZXJvcyhvcmlnaW5hbERhdGUuZ2V0RnVsbFllYXIoKSwgNCk7IC8vIHl5eXlNTWRkIG9yIHl5eXktTU0tZGQuXG5cbiAgICByZXN1bHQgPSBcIlwiLmNvbmNhdCh5ZWFyKS5jb25jYXQoZGF0ZURlbGltaXRlcikuY29uY2F0KG1vbnRoKS5jb25jYXQoZGF0ZURlbGltaXRlcikuY29uY2F0KGRheSk7XG4gIH0gLy8gUmVwcmVzZW50YXRpb24gaXMgZWl0aGVyICd0aW1lJyBvciAnY29tcGxldGUnXG5cblxuICBpZiAocmVwcmVzZW50YXRpb24gIT09ICdkYXRlJykge1xuICAgIC8vIEFkZCB0aGUgdGltZXpvbmUuXG4gICAgdmFyIG9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgaWYgKG9mZnNldCAhPT0gMCkge1xuICAgICAgdmFyIGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgIHZhciBob3VyT2Zmc2V0ID0gYWRkTGVhZGluZ1plcm9zKE1hdGguZmxvb3IoYWJzb2x1dGVPZmZzZXQgLyA2MCksIDIpO1xuICAgICAgdmFyIG1pbnV0ZU9mZnNldCA9IGFkZExlYWRpbmdaZXJvcyhhYnNvbHV0ZU9mZnNldCAlIDYwLCAyKTsgLy8gSWYgbGVzcyB0aGFuIDAsIHRoZSBzaWduIGlzICssIGJlY2F1c2UgaXQgaXMgYWhlYWQgb2YgdGltZS5cblxuICAgICAgdmFyIHNpZ24gPSBvZmZzZXQgPCAwID8gJysnIDogJy0nO1xuICAgICAgdHpPZmZzZXQgPSBcIlwiLmNvbmNhdChzaWduKS5jb25jYXQoaG91ck9mZnNldCwgXCI6XCIpLmNvbmNhdChtaW51dGVPZmZzZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ek9mZnNldCA9ICdaJztcbiAgICB9XG5cbiAgICB2YXIgaG91ciA9IGFkZExlYWRpbmdaZXJvcyhvcmlnaW5hbERhdGUuZ2V0SG91cnMoKSwgMik7XG4gICAgdmFyIG1pbnV0ZSA9IGFkZExlYWRpbmdaZXJvcyhvcmlnaW5hbERhdGUuZ2V0TWludXRlcygpLCAyKTtcbiAgICB2YXIgc2Vjb25kID0gYWRkTGVhZGluZ1plcm9zKG9yaWdpbmFsRGF0ZS5nZXRTZWNvbmRzKCksIDIpOyAvLyBJZiB0aGVyZSdzIGFsc28gZGF0ZSwgc2VwYXJhdGUgaXQgd2l0aCB0aW1lIHdpdGggJ1QnXG5cbiAgICB2YXIgc2VwYXJhdG9yID0gcmVzdWx0ID09PSAnJyA/ICcnIDogJ1QnOyAvLyBDcmVhdGVzIGEgdGltZSBzdHJpbmcgY29uc2lzdGluZyBvZiBob3VyLCBtaW51dGUsIGFuZCBzZWNvbmQsIHNlcGFyYXRlZCBieSBkZWxpbWl0ZXJzLCBpZiBkZWZpbmVkLlxuXG4gICAgdmFyIHRpbWUgPSBbaG91ciwgbWludXRlLCBzZWNvbmRdLmpvaW4odGltZURlbGltaXRlcik7IC8vIEhIbW1zcyBvciBISDptbTpzcy5cblxuICAgIHJlc3VsdCA9IFwiXCIuY29uY2F0KHJlc3VsdCkuY29uY2F0KHNlcGFyYXRvcikuY29uY2F0KHRpbWUpLmNvbmNhdCh0ek9mZnNldCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gdmFsdWUgYSBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLiBUaGUgZnVuY3Rpb24gd29ya3MgZm9yIGRhdGVzIHRyYW5zZmVycmVkIGFjcm9zcyBpZnJhbWVzLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZGF0ZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZShOYU4pKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBzb21lIHZhbHVlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIG9iamVjdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSh7fSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0RhdGUodmFsdWUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBEYXRlXSc7XG59IiwiaW1wb3J0IGlzRGF0ZSBmcm9tIFwiLi4vaXNEYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzVmFsaWRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdmFsaWQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGFyZ3VtZW50IGlzIEludmFsaWQgRGF0ZSBhbmQgdHJ1ZSBvdGhlcndpc2UuXG4gKiBBcmd1bWVudCBpcyBjb252ZXJ0ZWQgdG8gRGF0ZSB1c2luZyBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogSW52YWxpZCBEYXRlIGlzIGEgRGF0ZSwgd2hvc2UgdGltZSB2YWx1ZSBpcyBOYU4uXG4gKlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiAtIE5vdyBgaXNWYWxpZGAgZG9lc24ndCB0aHJvdyBhbiBleGNlcHRpb25cbiAqICAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICogICBJbnN0ZWFkLCBhcmd1bWVudCBpcyBjb252ZXJ0ZWQgYmVmb3JlaGFuZCB1c2luZyBgdG9EYXRlYC5cbiAqXG4gKiAgIEV4YW1wbGVzOlxuICpcbiAqICAgfCBgaXNWYWxpZGAgYXJndW1lbnQgICAgICAgIHwgQmVmb3JlIHYyLjAuMCB8IHYyLjAuMCBvbndhcmQgfFxuICogICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS18XG4gKiAgIHwgYG5ldyBEYXRlKClgICAgICAgICAgICAgICB8IGB0cnVlYCAgICAgICAgfCBgdHJ1ZWAgICAgICAgIHxcbiAqICAgfCBgbmV3IERhdGUoJzIwMTYtMDEtMDEnKWAgIHwgYHRydWVgICAgICAgICB8IGB0cnVlYCAgICAgICAgfFxuICogICB8IGBuZXcgRGF0ZSgnJylgICAgICAgICAgICAgfCBgZmFsc2VgICAgICAgIHwgYGZhbHNlYCAgICAgICB8XG4gKiAgIHwgYG5ldyBEYXRlKDE0ODgzNzA4MzUwODEpYCB8IGB0cnVlYCAgICAgICAgfCBgdHJ1ZWAgICAgICAgIHxcbiAqICAgfCBgbmV3IERhdGUoTmFOKWAgICAgICAgICAgIHwgYGZhbHNlYCAgICAgICB8IGBmYWxzZWAgICAgICAgfFxuICogICB8IGAnMjAxNi0wMS0wMSdgICAgICAgICAgICAgfCBgVHlwZUVycm9yYCAgIHwgYGZhbHNlYCAgICAgICB8XG4gKiAgIHwgYCcnYCAgICAgICAgICAgICAgICAgICAgICB8IGBUeXBlRXJyb3JgICAgfCBgZmFsc2VgICAgICAgIHxcbiAqICAgfCBgMTQ4ODM3MDgzNTA4MWAgICAgICAgICAgIHwgYFR5cGVFcnJvcmAgICB8IGB0cnVlYCAgICAgICAgfFxuICogICB8IGBOYU5gICAgICAgICAgICAgICAgICAgICAgfCBgVHlwZUVycm9yYCAgIHwgYGZhbHNlYCAgICAgICB8XG4gKlxuICogICBXZSBpbnRyb2R1Y2UgdGhpcyBjaGFuZ2UgdG8gbWFrZSAqZGF0ZS1mbnMqIGNvbnNpc3RlbnQgd2l0aCBFQ01BU2NyaXB0IGJlaGF2aW9yXG4gKiAgIHRoYXQgdHJ5IHRvIGNvZXJjZSBhcmd1bWVudHMgdG8gdGhlIGV4cGVjdGVkIHR5cGVcbiAqICAgKHdoaWNoIGlzIGFsc28gdGhlIGNhc2Ugd2l0aCBvdGhlciAqZGF0ZS1mbnMqIGZ1bmN0aW9ucykuXG4gKlxuICogQHBhcmFtIHsqfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB2YWxpZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoMjAxNCwgMSwgMzEpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsdWUsIGNvbnZlcnRhYmxlIGludG8gYSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZCgxMzkzODA0ODAwMDAwKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgaW52YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgnJykpXG4gKiAvLz0+IGZhbHNlXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNWYWxpZChkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG5cbiAgaWYgKCFpc0RhdGUoZGlydHlEYXRlKSAmJiB0eXBlb2YgZGlydHlEYXRlICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHJldHVybiAhaXNOYU4oTnVtYmVyKGRhdGUpKTtcbn0iLCJpbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTsgLy8gQ2xvbmUgdGhlIGRhdGVcblxuICBpZiAoYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiBhcmd1bWVudCA9PT0gJ29iamVjdCcgJiYgYXJnU3RyID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnQgPT09ICdudW1iZXInIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGlmICgodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IFN0cmluZ10nKSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXCJTdGFydGluZyB3aXRoIHYyLjAuMC1iZXRhLjEgZGF0ZS1mbnMgZG9lc24ndCBhY2NlcHQgc3RyaW5ncyBhcyBkYXRlIGFyZ3VtZW50cy4gUGxlYXNlIHVzZSBgcGFyc2VJU09gIHRvIHBhcnNlIHN0cmluZ3MuIFNlZTogaHR0cHM6Ly9naXQuaW8vZmp1bGVcIik7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cbiAgICAgIGNvbnNvbGUud2FybihuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn0iLCJpbXBvcnQgeyB1cGRhdGVQcm9qZWN0TGlzdCwgdXBkYXRlVGFza0xpc3QsIGNsb3NlQWxsRm9ybXMgfSBmcm9tICcuL3VwZGF0ZURPTSdcbmltcG9ydCB7IGNyZWF0ZURPTSwgY3JlYXRlQWRkUHJvaiwgY3JlYXRlUHJvakZvcm0sIGNyZWF0ZUFkZFRhc2tGb3JtIH0gZnJvbSAnLi9jcmVhdGVET00nXG5pbXBvcnQgeyBzZXR1cEFsbEV2ZW50TGlzdGVuZXJzLCBzZXR1cFByb2pFdmVudExpc3RlbmVycywgc2V0dXBQcm9qRm9ybUxpc3RlbmVyLCBzZXR1cFRhc2tGb3JtTGlzdGVuZXIgfSBmcm9tICcuL2V2ZW50TGlzdGVuZXJzJ1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrJ1xuXG5sZXQgY3VyckFjdGl2ZVByb2pJRCA9ICdwcm9qSW5ib3gnO1xuXG5jb25zdCBsb2FkQXBwID0gKCkgPT4ge1xuICAgIGNyZWF0ZURPTSgpO1xuICAgIHVwZGF0ZVByb2plY3RMaXN0KCk7XG4gICAgdXBkYXRlVGFza0xpc3QoY3VyckFjdGl2ZVByb2pJRCk7XG59XG5jb25zdCBlZGl0UHJvamVjdCA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IGN1cnJQcm9qSUQgPSBldmVudC50YXJnZXQuaWQuc2xpY2UoMCwtNCk7XG4gICAgY29uc3QgbGlOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y3VyclByb2pJRH1MSWApO1xuICAgIGNvbnN0IHByb2pGb3JtID0gY3JlYXRlUHJvakZvcm0oY3VyclByb2pJRCk7XG4gICAgbGlOb2RlLnJlcGxhY2VXaXRoKHByb2pGb3JtKTtcblxuICAgIHNldHVwUHJvakZvcm1MaXN0ZW5lcihwcm9qRm9ybSk7XG5cbn1cbmNvbnN0IHN1Ym1pdFByb2plY3QgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByb2pJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLC00KTtcbiAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qSW5wdXQnKS52YWx1ZTtcbiAgICBjb25zdCB1bEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvakxpc3QnKTtcblxuICAgIGlmIChTdG9yYWdlLmNoZWNrUHJvamVjdE5hbWUobmV3UHJvak5hbWUpKSB7XG4gICAgICAgIGFsZXJ0KCdQcm9qZWN0IG5hbWUgZXhpc3RzJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpKSB7XG4gICAgICAgIFN0b3JhZ2UudXBkYXRlUHJvamVjdE5hbWUocHJvaklELCBuZXdQcm9qTmFtZSk7ICBcbiAgICB9IGVsc2Uge1xuICAgICAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdChwcm9qSUQsIG5ld1Byb2pOYW1lKSk7XG4gICAgICAgIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICB1bEVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlQWRkUHJvaigpKTtcbiAgICB9XG4gICAgdXBkYXRlUHJvamVjdExpc3QoKTtcbn1cbmNvbnN0IGRlbGV0ZVByb2plY3QgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNsb3NlQWxsRm9ybXMoY3VyckFjdGl2ZVByb2pJRCk7XG5cbiAgICBjb25zdCBwcm9qSUQgPSBldmVudC50YXJnZXQuaWQuc2xpY2UoMCwgLTMpO1xuICAgIFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qSUQpO1xuXG4gICAgdXBkYXRlUHJvamVjdExpc3QoKTtcblxufVxuY29uc3QgYWRkUHJvamVjdCA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IGFkZFByb2pMSSA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBwcm9qSUQgPSBTdG9yYWdlLmdlbmVyYXRlUHJvaklEKCk7XG4gICAgY29uc3QgcHJvakZvcm0gPSBjcmVhdGVQcm9qRm9ybShwcm9qSUQpO1xuXG4gICAgYWRkUHJvakxJLnJlcGxhY2VXaXRoKHByb2pGb3JtKTtcbiAgICBzZXR1cFByb2pGb3JtTGlzdGVuZXIocHJvakZvcm0pO1xuICAgIFxuXG59XG5jb25zdCBnZXRUYXNrcyA9IChwcm9qSUQpID0+IHtcbiAgICBcbiAgICBjdXJyQWN0aXZlUHJvaklEID0gcHJvaklEO1xuXG4gICAgcmV0dXJuIFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpLmdldFRhc2tzKCk7XG5cbiAgICAvLyBMYXRlcjogU2V0dXAgVG9kYXkgYW5kIFRoaXMgd2VlayB0YXNrIGZldGNoIGxvZ2ljXG59XG5jb25zdCBhZGRUYXNrID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjbG9zZUFsbEZvcm1zKGN1cnJBY3RpdmVQcm9qSUQpO1xuXG4gICAgY29uc3QgYWRkVGFza0RJViA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRUYXNrJyk7XG4gICAgY29uc3QgdGFza0lEID0gU3RvcmFnZS5nZW5lcmF0ZVRhc2tJRCgpO1xuICAgIGNvbnN0IHRhc2tGb3JtID0gY3JlYXRlQWRkVGFza0Zvcm0odGFza0lEKTtcblxuICAgIGFkZFRhc2tESVYucmVwbGFjZVdpdGgodGFza0Zvcm0pO1xuICAgIHNldHVwVGFza0Zvcm1MaXN0ZW5lcihjdXJyQWN0aXZlUHJvaklELCB0YXNrRm9ybSk7XG5cbn1cbmNvbnN0IHN1Ym1pdFRhc2sgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgY3VyclByb2ogPSBTdG9yYWdlLmdldFByb2plY3QoY3VyckFjdGl2ZVByb2pJRCk7XG4gICAgXG4gICAgY29uc3QgdGFza0lEID0gZXZlbnQudGFyZ2V0LmlkLnNsaWNlKDAsIC00KTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza1RpdGxlJykudmFsdWU7XG4gICAgY29uc3QgdGFza0Rlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0Rlc2MnKS52YWx1ZTtcbiAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRGF0ZScpLnZhbHVlO1xuXG4gICAgaWYgKGN1cnJQcm9qLmdldFRhc2sodGFza0lEKSkge1xuXG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBjdXJyUHJvai5nZXRUYXNrKHRhc2tJRCk7XG4gICAgICAgIG5ld1Rhc2sudXBkYXRlKHRhc2tUaXRsZSwgdGFza0Rlc2MsIHRhc2tEYXRlKTtcbiAgICAgICAgY3VyclByb2oudXBkYXRlVGFzayh0YXNrSUQsIG5ld1Rhc2spO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBuZXdUYXNrID0gVGFzayh0YXNrSUQsIHRhc2tUaXRsZSwgdGFza0Rlc2MsIHRhc2tEYXRlKTtcbiAgICAgICAgY3VyclByb2ouYWRkVGFzayhuZXdUYXNrKTtcbiAgICAgICAgU3RvcmFnZS5hZGRUYXNrSUQodGFza0lEKTtcblxuICAgIH1cblxuICAgIFN0b3JhZ2UudXBkYXRlUHJvamVjdChjdXJyQWN0aXZlUHJvaklELCBjdXJyUHJvaik7XG4gICAgdXBkYXRlVGFza0xpc3QoY3VyckFjdGl2ZVByb2pJRCk7XG5cbn1cblxuZXhwb3J0IHsgbG9hZEFwcCwgZWRpdFByb2plY3QsIHN1Ym1pdFByb2plY3QsIGRlbGV0ZVByb2plY3QsIGFkZFByb2plY3QsIGdldFRhc2tzLCBhZGRUYXNrLCBzdWJtaXRUYXNrIH0iLCIvLyBNb2R1bGUgcmVzcG9uc2libGliaWxpdGllczpcbi8vIC0gQnVpbGRzIERPTSB1cG9uIGluaXRpYWwgbG9hZFxuLy8gLSBDcmVhdGUgZWxlbWVudHMgYW5kIGFkZCB0byBkb2N1bWVudFxuLy8gLSBMb2FkcyBhY3RpdmUgcHJvamVjdHMgYW5kIHRhc2tzXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHsgU2NoZWR1bGUgfSBmcm9tICcuL3Rhc2snXG5cbmNvbnN0IF9jcmVhdGVFbGVtZW50ID0gKHR5cGUsIGNsYXNzTmFtZUFyciwgdGV4dCwgaWQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBpZiAoY2xhc3NOYW1lQXJyKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lQXJyKTtcbiAgICBpZiAodGV4dCkgZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgaWYgKGlkKSBlbGVtZW50LmlkID0gaWQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5jb25zdCBjcmVhdGVET00gPSAoKSA9PiB7XG4gICAgX2NyZWF0ZUhlYWRlcigpO1xuICAgIF9jcmVhdGVTaWRlQmFyKCk7XG4gICAgX2NyZWF0ZU1haW4oKTtcbn1cbmNvbnN0IF9jcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3QgaGVhZGVyRGl2ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnaGVhZGVyRGl2J10sICdUby1EbyBBcHBsaWNhdGlvbicpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykuYXBwZW5kKGhlYWRlckRpdik7XG59XG5jb25zdCBfY3JlYXRlU2lkZUJhciA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlQmFyJyk7XG4gICAgXG4gICAgY29uc3QgbmF2Q29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwnJywnc2lkZUJhck5hdkNvbnQnKTtcbiAgICBjb25zdCBpbmJveCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdJbmJveCcpO1xuICAgIGNvbnN0IHRvZGF5ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ1RvZGF5Jyk7XG4gICAgY29uc3QgdGhpc1dlZWsgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVGhpcyBXZWVrJyk7XG5cbiAgICBjb25zdCBwcm9qQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwgJycsICdwcm9qQ29udCcpO1xuICAgIGNvbnN0IHByb2pIZWFkaW5nQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwcm9qSGVhZGluZ1RleHQgPSBfY3JlYXRlRWxlbWVudCgnaDQnLCBbJ2ZsZXhDb2wnXSwgJ1Byb2plY3RzJyk7XG4gICAgY29uc3QgcHJvakxpc3QgPSBfY3JlYXRlRWxlbWVudCgndWwnLCBbJ3Byb2pMaXN0J10sICcnLCAncHJvakxpc3QnKTtcblxuICAgIHByb2pIZWFkaW5nQ29udC5hcHBlbmQocHJvakhlYWRpbmdUZXh0KTtcbiAgICBwcm9qTGlzdC5hcHBlbmQoY3JlYXRlQWRkUHJvaigpKTtcblxuICAgIHByb2pDb250LmFwcGVuZChwcm9qSGVhZGluZ0NvbnQsIHByb2pMaXN0KTtcbiAgICBcbiAgICBuYXZDb250LmFwcGVuZChpbmJveCwgdG9kYXksIHRoaXNXZWVrKTtcblxuICAgIHNpZGVCYXIuYXBwZW5kKG5hdkNvbnQsIHByb2pDb250KTtcblxufVxuY29uc3QgY3JlYXRlQWRkUHJvaiA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRQcm9qQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCAnJywgJycsICdhZGRQcm9qJyk7XG4gICAgY29uc3QgYWRkUHJvakxJID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgWydub01hcmtlciddLCAnKyBBZGQgUHJvamVjdCcsICdhZGRQcm9qZWN0TEknKTtcbiAgICBhZGRQcm9qQ29udC5hcHBlbmQoYWRkUHJvakxJKTtcbiAgICByZXR1cm4gYWRkUHJvakNvbnQ7XG59XG5jb25zdCBjcmVhdGVQcm9qZWN0ID0gKHByb2opID0+IHtcbiAgICBcbiAgICBjb25zdCBwcm9qTmFtZSA9IHByb2ouZ2V0TmFtZSgpO1xuICAgIGNvbnN0IHByb2pJRCA9IHByb2ouZ2V0SUQoKTtcblxuICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncHJvakl0ZW0nXSk7XG4gICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIHByb2pOYW1lLCBwcm9qSUQgKyAnTEknKTtcbiAgICBjb25zdCBlZGl0SWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS1lZGl0J10sICcnLCBwcm9qSUQgKyAnRURJVCcpO1xuICAgIGNvbnN0IGRlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtdHJhc2gtYWx0J10sICcnLCBwcm9qSUQgKyAnREVMJyk7XG5cbiAgICBwcm9qZWN0RWxlbWVudC5hcHBlbmQobGlOb2RlLCBlZGl0SWNvbiwgZGVsSWNvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdEVsZW1lbnQ7XG59XG5jb25zdCBjcmVhdGVQcm9qRm9ybSA9IChwcm9qSUQpID0+IHtcblxuICAgIGNvbnN0IHByb2pGb3JtID0gX2NyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCBbJ3Byb2pGb3JtJ10sICcnLCBwcm9qSUQgKyAnRk9STScpO1xuXG4gICAgY29uc3QgcHJvaklucHV0ID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydpbnB1dFByb2onXSwgJycsICdwcm9qSW5wdXQnKTtcbiAgICBwcm9qSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBwcm9qSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIHByb2pJbnB1dC52YWx1ZSA9IFN0b3JhZ2UuZ2V0UHJvamVjdE5hbWUocHJvaklEKTtcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBfY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJycsICcnLCAgcHJvaklEICsgJ1NBVkUnKTtcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICBjb25zdCBzYXZlSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtc2F2ZSddLCAnJyk7XG4gICAgXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICcnLCAnJywgcHJvaklEICsgJ0NBTkNFTCcpO1xuICAgIGNhbmNlbEJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtd2luZG93LWNsb3NlJ10sICcnKTtcblxuICAgIHNhdmVCdXR0b24uYXBwZW5kKHNhdmVJY29uKTtcbiAgICBjYW5jZWxCdXR0b24uYXBwZW5kQ2hpbGQoY2FuY2VsSWNvbik7XG4gICAgcHJvakZvcm0uYXBwZW5kKHByb2pJbnB1dCwgc2F2ZUJ1dHRvbiwgY2FuY2VsQnV0dG9uKTtcblxuICAgIHJldHVybiBwcm9qRm9ybTtcbn1cbmNvbnN0IF9jcmVhdGVNYWluID0gKCkgPT4ge1xuICAgIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW5Db250ZW50Jyk7XG5cbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2tIZWFkZXInXSwgJycsICcnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBfY3JlYXRlRWxlbWVudCgnaDInLCAnJywgJ0luYm94JywgJ21haW5IZWFkZXInKTtcblxuICAgIGNvbnN0IHRhc2tMaXN0ID0gX2NyZWF0ZUVsZW1lbnQoJ3VsJywgWyd0YXNrTGlzdCddLCAnJywgJ3Rhc2tMaXN0Jyk7XG5cbiAgICB0YXNrTGlzdC5hcHBlbmQoY3JlYXRlQWRkVGFzaygpKTtcblxuICAgIGhlYWRlckNvbnRhaW5lci5hcHBlbmQoaGVhZGVyKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmQoaGVhZGVyQ29udGFpbmVyLCB0YXNrTGlzdCk7XG5cbn1cbmNvbnN0IGNyZWF0ZUFkZFRhc2sgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3QgYWRkQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFzayddLCAnJywgJ2FkZFRhc2snKTtcbiAgICBjb25zdCBhZGRJdGVtTGVmdCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Rhc2tJdGVtTGVmdCddKTtcbiAgICBjb25zdCBhZGRJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcycsICdmYS1wbHVzLWNpcmNsZSddKTtcbiAgICBjb25zdCBhZGRUZXh0ID0gX2NyZWF0ZUVsZW1lbnQoJ3AnLCAnJywgJ0FkZCBUYXNrJywgJ2FkZFRleHQnKTtcblxuICAgIGFkZEl0ZW1MZWZ0LmFwcGVuZChhZGRJY29uKTtcbiAgICBhZGRDb250LmFwcGVuZChhZGRJdGVtTGVmdCwgYWRkVGV4dCk7XG5cbiAgICByZXR1cm4gYWRkQ29udDtcbn1cbmNvbnN0IGNyZWF0ZVRhc2sgPSAodGFzaykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tJRCA9IHRhc2suZ2V0SUQoKTtcblxuICAgICAgICBjb25zdCBvdXRlckNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2tJdGVtJ10pO1xuICAgICAgICBjb25zdCBjaGVja0NvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWyd0YXNrSXRlbUxlZnQnXSk7XG4gICAgICAgIGNvbnN0IHRhc2tDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCcsICd0YXNrQ29udCddLCAnJywgJycpO1xuXG4gICAgICAgIGNvbnN0IGxpQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFza0xJJ10sICcnLCAnJyk7XG4gICAgICAgIGNvbnN0IGRlc2NQcmV2ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZGVzY1ByZXYnXSwgdGFzay5nZXREZXNjcmlwdGlvbigpLCAnJyk7XG4gICAgICAgIGNvbnN0IHNjaGVkdWxlQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAnZGVzY1ByZXYnXSk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uQ29udCA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2NsZWFyQnV0dG9uJ10sICcnLCB0YXNrSUQgKyAnQ0hFQ0snKTtcbiAgICAgICAgY29uc3QgY2lyY2xlTWFya2VyID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1jaXJjbGUnXSk7XG4gICAgICAgIGNvbnN0IGNoZWNrTWFya2VyID0gX2NyZWF0ZUVsZW1lbnQoJ2knLFsnZmFyJywgJ2ZhLWNoZWNrLWNpcmNsZSddKTtcblxuICAgICAgICAvLyBMQVRFUjogY29uc2lkZXIgbW92aW5nIHRvIGV2ZW50TGlzdGVuZXJzIG1vZHVsZVxuICAgICAgICBidXR0b25Db250Lm9ubW91c2VlbnRlciA9ICgpID0+IHsgXG4gICAgICAgICAgICBjaXJjbGVNYXJrZXIucmVwbGFjZVdpdGgoY2hlY2tNYXJrZXIpO1xuICAgICAgICB9O1xuICAgICAgICBidXR0b25Db250Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHsgXG4gICAgICAgICAgICBjaGVja01hcmtlci5yZXBsYWNlV2l0aChjaXJjbGVNYXJrZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxpTm9kZSA9IF9jcmVhdGVFbGVtZW50KCdsaScsIFsnbm9NYXJrZXInXSwgdGFzay5nZXRUaXRsZSgpKTtcbiAgICAgICAgY29uc3QgZWRpdE5vZGUgPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtZWRpdCddLCAnJywgdGFza0lEICsgJ0VESVQnKTtcbiAgICAgICAgY29uc3QgZGVsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS10cmFzaC1hbHQnXSwgJycsIHRhc2tJRCArICdERUwnKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNhbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLWNhbGVuZGFyLWFsdCddKTtcbiAgICAgICAgY29uc3QgdGFza0RhdGUgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWyd0YXNrRGF0ZSddLCB0YXNrLmdldERhdGUoKSk7XG5cbiAgICAgICAgYnV0dG9uQ29udC5hcHBlbmQoY2lyY2xlTWFya2VyKTtcbiAgICAgICAgY2hlY2tDb250LmFwcGVuZChidXR0b25Db250KTtcblxuICAgICAgICBsaUNvbnQuYXBwZW5kKGxpTm9kZSwgZWRpdE5vZGUsIGRlbEljb24pO1xuICAgICAgICBzY2hlZHVsZUNvbnQuYXBwZW5kKGNhbEljb24sIHRhc2tEYXRlKTtcbiAgICAgICAgdGFza0NvbnQuYXBwZW5kKGxpQ29udCwgZGVzY1ByZXYsIHNjaGVkdWxlQ29udCk7XG5cbiAgICAgICAgb3V0ZXJDb250LmFwcGVuZChjaGVja0NvbnQsIHRhc2tDb250KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBvdXRlckNvbnQ7XG59XG5jb25zdCBjcmVhdGVIUiA9ICgpID0+IHtcbiAgICByZXR1cm4gX2NyZWF0ZUVsZW1lbnQoJ2hyJyk7XG59XG5cbmNvbnN0IGNyZWF0ZUFkZFRhc2tGb3JtID0gKHRhc2tJRCkgPT4ge1xuXG4gICAgY29uc3QgdGFza0Zvcm0gPSBfY3JlYXRlRWxlbWVudCgnZm9ybScsIFsnZmxleENvbCcsJ3Rhc2tGb3JtJ10sICcnLCB0YXNrSUQgKyAnRk9STScpO1xuXG4gICAgY29uc3QgdGFza0lucHV0Q29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSk7XG4gICAgXG4gICAgY29uc3QgdGl0bGVJbnB1dCA9IF9jcmVhdGVFbGVtZW50KCdpbnB1dCcsICcnLCAnJywgJ3Rhc2tUaXRsZScpO1xuICAgIHRpdGxlSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0aXRsZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICB0aXRsZUlucHV0LnBsYWNlaG9sZGVyID0gJ1RpdGxlJztcbiAgICBcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBfY3JlYXRlRWxlbWVudCgnaW5wdXQnLCAnJywgJycsICd0YXNrRGVzYycpO1xuICAgIGRlc2NJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGRlc2NJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgZGVzY0lucHV0LnBsYWNlaG9sZGVyID0gJ0Rlc2NyaXB0aW9uJztcblxuICAgIGNvbnN0IHRhc2tCdXR0b25Db250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICd0YXNrQnV0dG9uQ29udCddKTtcbiAgICBjb25zdCBzY2hlZHVsZUNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywndGFza0J1dHRvbiddKTtcbiAgICBjb25zdCBjYWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1jYWxlbmRhci1hbHQnXSk7XG4gICAgY29uc3QgZGF0ZUlucHV0ID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydkYXRlSW5wdXQnXSwgJ1NjaGVkdWxlJywgJ3Rhc2tEYXRlJyk7XG4gICAgZGF0ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XG4gICAgZGF0ZUlucHV0Lm1pbiA9IFNjaGVkdWxlKCkuZ2V0RGF0ZVRvZGF5KCk7XG5cbiAgICBjb25zdCBzYXZlQnV0dG9uQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnXSk7XG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ3NhdmVCdXR0b24nXSwgJ1NhdmUgVGFzaycpO1xuICAgIHNhdmVCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2NhbmNlbEJ1dHRvbiddLCAnQ2FuY2VsJywgdGFza0lEICsgJ0NBTkNFTCcpO1xuXG4gICAgc2NoZWR1bGVDb250LmFwcGVuZChjYWxJY29uLCBkYXRlSW5wdXQpO1xuICAgIHRhc2tJbnB1dENvbnQuYXBwZW5kKHRpdGxlSW5wdXQsIGRlc2NJbnB1dCwgdGFza0J1dHRvbkNvbnQpO1xuICAgIHRhc2tCdXR0b25Db250LmFwcGVuZChzY2hlZHVsZUNvbnQpO1xuICAgIHNhdmVCdXR0b25Db250LmFwcGVuZChzYXZlQnV0dG9uLCBjYW5jZWxCdXR0b24pO1xuICAgIHRhc2tGb3JtLmFwcGVuZCh0YXNrSW5wdXRDb250LCBzYXZlQnV0dG9uQ29udClcblxuICAgIHJldHVybiB0YXNrRm9ybTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlRE9NLCBjcmVhdGVQcm9qZWN0LCBjcmVhdGVBZGRQcm9qLCBjcmVhdGVQcm9qRm9ybSwgY3JlYXRlQWRkVGFzaywgY3JlYXRlVGFzaywgY3JlYXRlSFIsIGNyZWF0ZUFkZFRhc2tGb3JtIH07XG4iLCIvLyBNb2R1bGUgcmVzcG9uc2libGliaWxpdGllczpcbi8vIC0gUXVlcnkgZWxlbWVudHMgYW5kIHNldHVwIGV2ZW50IGxpc3RlbmVyc1xuLy8gLSBDYWxscyBhcHBMb2dpYyBmdW5jdGlvbnMgXG5pbXBvcnQgeyBlZGl0UHJvamVjdCwgc3VibWl0UHJvamVjdCwgZGVsZXRlUHJvamVjdCwgYWRkUHJvamVjdCwgYWRkVGFzaywgc3VibWl0VGFzayB9IGZyb20gJy4vYXBwTG9naWMnXG5pbXBvcnQgeyBjbG9zZVByb2pGb3JtcywgY2xvc2VUYXNrRm9ybXMgfSBmcm9tICcuL3VwZGF0ZURPTSdcblxuY29uc3Qgc2V0dXBBbGxFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBzZXR1cFByb2pFdmVudExpc3RlbmVycygpO1xuICAgIHNldHVwVGFza0V2ZW50TGlzdGVuZXJzKCk7XG59XG5jb25zdCBzZXR1cFByb2pFdmVudExpc3RlbmVycyA9ICgpID0+IHtcblxuICAgIC8vIGxhdGVyOiBzZXR1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHByb2plY3QgTEkgZWxlbWVudHNcbiAgICBjb25zdCBlZGl0Tm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvakl0ZW0gLmZhLWVkaXQnKTtcbiAgICBjb25zdCBkZWxOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qSXRlbSAuZmEtdHJhc2gtYWx0Jyk7XG4gICAgY29uc3QgYWRkUHJvakxJID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZFByb2plY3RMSScpO1xuXG4gICAgZWRpdE5vZGVzLmZvckVhY2goZWRpdE5vZGUgPT4gZWRpdE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0UHJvamVjdCkpO1xuICAgIGRlbE5vZGVzLmZvckVhY2goZGVsTm9kZSA9PiBkZWxOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlUHJvamVjdCkpO1xuICAgIGFkZFByb2pMSS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFByb2plY3QpO1xufVxuY29uc3Qgc2V0dXBQcm9qRm9ybUxpc3RlbmVyID0gKHByb2pGb3JtKSA9PiB7XG4gICAgY29uc3QgcHJvaklEID0gcHJvakZvcm0uaWQuc2xpY2UoMCwgLTQpO1xuICAgIGNvbnN0IGNhbmNlbEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwcm9qSUR9Q0FOQ0VMYCk7XG5cbiAgICBjYW5jZWxJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQcm9qRm9ybXMoKSk7XG5cbiAgICBwcm9qRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdWJtaXRQcm9qZWN0KTtcblxufVxuY29uc3Qgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkVGFza0RJViA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRUYXNrJyk7XG5cbiAgICBhZGRUYXNrRElWLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVGFzayk7XG59XG5jb25zdCBzZXR1cFRhc2tGb3JtTGlzdGVuZXIgPSAocHJvaklELCB0YXNrRm9ybSkgPT4ge1xuICAgIGNvbnN0IHRhc2tJRCA9IHRhc2tGb3JtLmlkLnNsaWNlKDAsIC00KTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YXNrSUR9Q0FOQ0VMYCk7XG5cbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVRhc2tGb3Jtcyhwcm9qSUQpKTtcblxuICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHN1Ym1pdFRhc2spO1xufVxuXG5leHBvcnQgeyBzZXR1cEFsbEV2ZW50TGlzdGVuZXJzLCBzZXR1cFByb2pFdmVudExpc3RlbmVycywgc2V0dXBQcm9qRm9ybUxpc3RlbmVyLCBzZXR1cFRhc2tFdmVudExpc3RlbmVycywgc2V0dXBUYXNrRm9ybUxpc3RlbmVyIH07IiwiLyogUHJvamVjdC5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIFByb2plY3Qgb2JqZWN0IGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9uc1xuXG4qL1xuLy8gaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5qcyc7XG5jb25zdCBnZXRJbmRleEJ5SUQgPSAoc3RhdGUsIHRhc2tJRCkgPT4ge1xuICAgIHJldHVybiBzdGF0ZS50YXNrcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLmdldElEKCkgPT09IHRhc2tJRCk7XG59XG5jb25zdCBwcm90byA9IChzdGF0ZSkgPT4gKHtcbiAgICBnZXRJRDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3RhdGUuaWQ7XG4gICAgfSxcbiAgICBnZXROYW1lOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uYW1lO1xuICAgIH0sXG4gICAgZ2V0VGFza3M6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnRhc2tzO1xuICAgIH0sXG4gICAgZ2V0VGFzazogKHRhc2tJRCkgPT4ge1xuICAgICAgICByZXR1cm4gc3RhdGUudGFza3MuZmluZCh0YXNrID0+IHRhc2suZ2V0SUQgPT09IHRhc2tJRCk7XG4gICAgfSxcbiAgICB1cGRhdGVUYXNrOiAodGFza0lELCBuZXdUYXNrKSA9PiB7XG4gICAgICAgIC8vIG5lZWQgdG8gZml4IGVycm9yIHdpdGggZ2V0SW5kZXhCeUlEIChjYW4ndCBhY2Nlc3MgdGhpcylcbiAgICAgICAgc3RhdGUudGFza3Muc3BsaWNlKGdldEluZGV4QnlJRChzdGF0ZSwgdGFza0lEKSwgMSwgbmV3VGFzayk7ICBcbiAgICB9LFxuICAgIGFkZFRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICAgIHN0YXRlLnRhc2tzLnB1c2godGFzayk7XG4gICAgfSxcbiAgICByZW1vdmVUYXNrOiAodGFza0lEKSA9PiB7XG4gICAgICAgIHN0YXRlLnRhc2tzLnNwbGljZShnZXRJbmRleEJ5SUQoc3RhdGUsIHRhc2tJRCksIDEpO1xuICAgIH1cblxufSlcbmNvbnN0IFByb2plY3QgPSAoaWQsIG5hbWUpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICB0YXNrczogW11cbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiB7XG4gICAgICAgIHN0YXRlLm5hbWUgPSBuZXdOYW1lO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm90byhzdGF0ZSksIHsgc2V0TmFtZSB9KTtcbn1cblxuY29uc3QgSW5ib3ggPSAoKSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBpZDogJ3Byb2pJbmJveCcsXG4gICAgICAgIG5hbWU6ICdJbmJveCcsXG4gICAgICAgIHRhc2tzOiBbXVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm90byhzdGF0ZSkpO1xuICAgIFxufVxuXG5leHBvcnQgeyBQcm9qZWN0LCBJbmJveCB9OyIsImNvbnN0IFBST0pfTElNSVQgPSAxMDAwO1xuY29uc3QgVEFTS19MSU1JVCA9IDEwMDAwO1xuY29uc3QgYWN0aXZlUHJvamVjdHMgPSBbXTtcbmNvbnN0IGFjdGl2ZVRhc2tJRHMgPSBbXTtcbmNvbnN0IGFjdGl2ZVByb2pJRHMgPSBbXTtcblxuY29uc3QgZ2V0SW5kZXhCeUlEID0gKHByb2pJRCkgPT4ge1xuICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBwcm9qLmdldElEKCkgPT09IHByb2pJRCk7XG59XG5cbmNvbnN0IHByb2pJRF9leGlzdHMgPSAoaWQpID0+IHtcbiAgICByZXR1cm4gYWN0aXZlUHJvaklEcy5pbmNsdWRlcyhpZCk7XG59XG5jb25zdCB0YXNrSURfZXhpc3RzID0gKGlkKSA9PiB7XG4gICAgcmV0dXJuIGFjdGl2ZVRhc2tJRHMuaW5jbHVkZXMoaWQpO1xufVxuXG5jb25zdCBTdG9yYWdlID0ge1xuICAgIGFkZFRhc2tJRDogKGlkKSA9PiB7XG4gICAgICAgIGFjdGl2ZVRhc2tJRHMucHVzaChpZCk7XG4gICAgfSxcbiAgICBhZGRQcm9qZWN0OiAocHJvaikgPT4ge1xuICAgICAgICBhY3RpdmVQcm9qZWN0cy5wdXNoKHByb2opO1xuICAgICAgICBhY3RpdmVQcm9qSURzLnB1c2gocHJvai5nZXRJRCgpKTtcbiAgICB9LFxuICAgIGdldFByb2plY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cztcbiAgICB9LFxuICAgIGdldFByb2plY3Q6IChwcm9qSUQpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2plY3RzW2dldEluZGV4QnlJRChwcm9qSUQpXTtcbiAgICB9LFxuICAgIGdldFByb2plY3ROYW1lOiAocHJvaklEKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ogPSBnZXRQcm9qZWN0KHByb2pJRCk7XG4gICAgICAgIHJldHVybiBwcm9qID8gcHJvai5nZXROYW1lKCkgOiAnJztcbiAgICB9LFxuICAgIGNoZWNrUHJvamVjdE5hbWU6IChwcm9qTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHMuc29tZShwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qTmFtZSk7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9qZWN0KHByb2pJRCwgbmV3UHJvaikge1xuICAgICAgICBhY3RpdmVQcm9qZWN0cy5zcGxpY2UoZ2V0SW5kZXhCeUlEKHByb2pJRCksIDEsIG5ld1Byb2opO1xuICAgIH0sXG4gICAgdXBkYXRlUHJvamVjdE5hbWU6IChwcm9qSUQsIG5ld1Byb2pOYW1lKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzW2dldEluZGV4QnlJRChwcm9qSUQpXS5zZXROYW1lKG5ld1Byb2pOYW1lKTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb2plY3Q6IChwcm9qSUQpID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGFjdGl2ZVByb2plY3RzLmZpbmRJbmRleChwcm9qID0+IHByb2ouZ2V0SUQoKSA9PT0gcHJvaklEKSwgMSk7XG4gICAgICAgIGFjdGl2ZVByb2pJRHMuc3BsaWNlKGFjdGl2ZVByb2pJRHMuaW5kZXhPZihwcm9qSUQpLCAxKVxuICAgIH0sXG4gICAgZ2VuZXJhdGVUYXNrSUQ6ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGlmIChhY3RpdmVUYXNrSURzLmxlbmd0aCA+PSBUQVNLX0xJTUlUKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBsZXQgcmFuZDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcmFuZCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogVEFTS19MSU1JVCk7XG4gICAgICAgIH0gd2hpbGUgKHRhc2tJRF9leGlzdHMoYHRhc2ske3JhbmR9YCkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGB0YXNrJHtyYW5kfWA7XG4gICAgfSxcbiAgICBnZW5lcmF0ZVByb2pJRDogKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlUHJvaklEcy5sZW5ndGggPj0gUFJPSl9MSU1JVCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCByYW5kO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICByYW5kID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBQUk9KX0xJTUlUKTtcbiAgICAgICAgfSB3aGlsZSAocHJvaklEX2V4aXN0cyhgcHJvaiR7cmFuZH1gKSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYHByb2oke3JhbmR9YDtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgeyBTdG9yYWdlIH0iLCIvKiBUYXNrLmpzIFxuXG5Nb2R1bGUgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgdGFzayBvYmplY3QgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zXG5cbiovXG5pbXBvcnQgeyBmb3JtYXRJU08gfSBmcm9tICdkYXRlLWZucydcblxuY29uc3QgVGFzayA9IChpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgIC8vIEFsbCB0YXNrcyBkZWZhdWx0IHRvIGluYm94IHVwb24gY3JlYXRpb25cbiAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgZ2V0SUQoKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRpdGxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRUaXRsZShuZXdUaXRsZSkge1xuICAgICAgICAgICAgdGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgIH0sXG4gICAgICAgIHNldERlc2NyaXB0aW9uKGRlc2MpIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gZGVzYztcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9LFxuICAgICAgICBzZXREYXRlKG5ld0RhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSBuZXdEYXRlO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFByaW9yaXR5KCkge1xuICAgICAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xuICAgICAgICB9LFxuICAgICAgICBzZXRQcmlvcml0eShwcmkpIHtcbiAgICAgICAgICAgIHByaW9yaXR5ID0gcHJpO1xuICAgICAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGUobmV3VGl0bGUsIG5ld0Rlc2MsIG5ld0RhdGUsIG5ld1ByaW9yaXR5KSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpdGxlKG5ld1RpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGVzY3JpcHRpb24obmV3RGVzYyk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGUobmV3RGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFByaW9yaXR5KG5ld1ByaW9yaXR5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmNvbnN0IFNjaGVkdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGdldERhdGVUb2RheSgpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRJU08odG9kYXksIHsgcmVwcmVzZW50YXRpb246ICdkYXRlJ30pO1xuICAgICAgICB9LFxuXG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHByb3RvKTtcbn1cblxuZXhwb3J0IHsgVGFzaywgU2NoZWR1bGUgfTsiLCIvLyBNb2R1bGUgcmVzcG9uc2libGliaWxpdGllczpcbi8vIC0gSGFuZGxlcyB1cGRhdGluZyBET00gZWxlbWVudHNcbi8vIC0gVXBkYXRlcyBET00gd2l0aCBjdXJyZW50IGFjdGl2ZSBwcm9qZWN0cyAvIHRhc2tzXG5pbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBjcmVhdGVBZGRQcm9qLCBjcmVhdGVUYXNrLCBjcmVhdGVIUiwgY3JlYXRlQWRkVGFzayB9IGZyb20gJy4vY3JlYXRlRE9NJ1xuaW1wb3J0IHsgc2V0dXBQcm9qRXZlbnRMaXN0ZW5lcnMsIHNldHVwVGFza0V2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9ldmVudExpc3RlbmVycyc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHsgZ2V0VGFza3MgfSBmcm9tICcuL2FwcExvZ2ljJ1xuXG5jb25zdCB1cGRhdGVQcm9qZWN0TGlzdCA9ICgpID0+IHtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qSXRlbScpLmZvckVhY2goaXRlbSA9PiBpdGVtLnJlbW92ZSgpKTtcblxuICAgIGNvbnN0IHJlZk5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkUHJvaicpO1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSByZWZOb2RlLnBhcmVudE5vZGU7XG5cbiAgICBTdG9yYWdlLmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qID0+IHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNyZWF0ZVByb2plY3QocHJvaiksIHJlZk5vZGUpKTtcblxuICAgIHNldHVwUHJvakV2ZW50TGlzdGVuZXJzKCk7XG59XG5jb25zdCB1cGRhdGVUYXNrTGlzdCA9IChwcm9qSUQpID0+IHtcblxuICAgIGNsb3NlVGFza0Zvcm1zKHByb2pJRCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tJdGVtJykuZm9yRWFjaCh0YXNrID0+IHRhc2sucmVtb3ZlKCkpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hyJykuZm9yRWFjaChociA9PiBoci5yZW1vdmUoKSk7XG5cbiAgICBjb25zdCByZWZOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZFRhc2snKTtcbiAgICBjb25zdCBwYXJlbnROb2RlID0gcmVmTm9kZS5wYXJlbnROb2RlO1xuXG4gICAgY29uc3QgYWN0aXZlVGFza3MgPSBnZXRUYXNrcyhwcm9qSUQpO1xuXG4gICAgYWN0aXZlVGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY3JlYXRlVGFzayh0YXNrKSwgcmVmTm9kZSk7XG4gICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNyZWF0ZUhSKCksIHJlZk5vZGUpO1xuICAgIH0pO1xuXG4gICAgLy8gTGF0ZXJcbiAgICBzZXR1cFRhc2tFdmVudExpc3RlbmVycygpO1xufVxuY29uc3QgY2xvc2VBbGxGb3JtcyA9IChwcm9qSUQpID0+IHtcbiAgICBjbG9zZVByb2pGb3JtcygpO1xuICAgIGNsb3NlVGFza0Zvcm1zKHByb2pJRCk7XG59XG5jb25zdCBjbG9zZVByb2pGb3JtcyA9ICgpID0+IHtcbiAgICBcbiAgICBjb25zdCBwcm9qRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvakZvcm0nKTtcbiAgICBcbiAgICBwcm9qRm9ybXMuZm9yRWFjaChwcm9qRm9ybSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2pJRCA9IHByb2pGb3JtLmlkLnNsaWNlKDAsIC00KTtcbiAgICAgICAgY29uc3QgcHJvaiA9IFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpO1xuICAgICAgICBjb25zdCBsaU5vZGUgPSBwcm9qID8gY3JlYXRlUHJvamVjdChwcm9qKS5maXJzdENoaWxkIDogY3JlYXRlQWRkUHJvaigpLmZpcnN0Q2hpbGQ7XG4gICAgICAgIFxuICAgICAgICBwcm9qRm9ybS5yZXBsYWNlV2l0aChsaU5vZGUpO1xuICAgIH0pXG5cbiAgICBzZXR1cFByb2pFdmVudExpc3RlbmVycygpO1xufVxuY29uc3QgY2xvc2VUYXNrRm9ybXMgPSAocHJvaklEKSA9PiB7XG4gICAgY29uc3QgdGFza0Zvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tGb3JtJyk7XG5cbiAgICB0YXNrRm9ybXMuZm9yRWFjaCh0YXNrRm9ybSA9PiB7XG4gICAgICAgIGNvbnN0IHRhc2tJRCA9IHRhc2tGb3JtLmlkLnNsaWNlKDAsIC00KTtcbiAgICAgICAgY29uc3QgdGFzayA9IFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpLmdldFRhc2sodGFza0lEKTtcbiAgICAgICAgY29uc3QgdGFza0RJViA9IHRhc2sgPyBjcmVhdGVUYXNrKHRhc2spIDogY3JlYXRlQWRkVGFzaygpO1xuXG4gICAgICAgIHRhc2tGb3JtLnJlcGxhY2VXaXRoKHRhc2tESVYpO1xuICAgIH0pXG5cbiAgICBzZXR1cFRhc2tFdmVudExpc3RlbmVycygpO1xufVxuXG5leHBvcnQgeyB1cGRhdGVQcm9qZWN0TGlzdCwgdXBkYXRlVGFza0xpc3QsIGNsb3NlQWxsRm9ybXMsIGNsb3NlUHJvakZvcm1zLCBjbG9zZVRhc2tGb3JtcyB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcblxuLSBUYXNrc1xuICAgIC0gU2VwZXJhdGUgbW9kdWxlXG4gICAgLSBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRhc2tcbiAgICAtIFByb3BlcnRpZXM6IFxuICAgICAgICAtIHRpdGxlXG4gICAgICAgIC0gZGVzY3JpcHRpb25cbiAgICAgICAgLSBkdWUgZGF0ZVxuICAgICAgICAtIHByaW9yaXR5XG4gICAgICAgIC0gaXNDb21wbGV0ZVxuICAgIC0gZnVuY3Rpb25zXG4gICAgICAgIC0gY2hhbmdlIHByb3BlcnRpZXNcbi0gUHJvamVjdHNcbiAgICAtIGNvbnRhaW5zIG1hbnkgdGFza3NcbiAgICAtIHByb3BlcnRpZXM6XG4gICAgICAgIC0gXG4tIERPTVxuXG5cbiovXG5cbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL21vZHVsZXMvc3RvcmFnZS5qcydcbmltcG9ydCB7IFByb2plY3QsIEluYm94IH0gZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9tb2R1bGVzL3Rhc2suanMnXG5pbXBvcnQgeyBsb2FkQXBwIH0gZnJvbSAnLi9tb2R1bGVzL2FwcExvZ2ljJ1xuXG5jb25zdCByZW5kZXIgPSAoKCkgPT4ge1xuICAgIFxuICAgIC8vIHNhbXBsZSBwcm9qZWN0c1xuICAgIGNvbnN0IGluYm94ID0gSW5ib3goKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoaW5ib3gpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdwcm9qMScsICdDbGVhbmluZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgncHJvajInLCAnUGFja2luZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgncHJvajMnLCAnTW9wcGluZycpKTtcblxuICAgIC8vIHNhbXBsZSBpbmJveCB0YXNrc1xuICAgIGNvbnN0IHRhc2sxID0gVGFzaygndGFzazEnLCAnR2FyYmFnZScsICdUYWtlIGdhcmJhZ2Ugb3V0IHRvIHN0cmVldCcsJ0RlYyA4JywgJ3AxJyk7XG4gICAgY29uc3QgdGFzazIgPSBUYXNrKCd0YXNrMicsICdCYXRocm9vbSBGbG9vcnMnLCAnQ2xlYW4gYmF0aHJvb20gZmxvb3JzJywnRGVjIDknLCAncDInKTtcbiAgICBjb25zdCB0YXNrMyA9IFRhc2soJ3Rhc2szJywgJ0tpdGNoZW4gRmxvb3JzJywgJ0NsZWFuIGtpdGNoZW4gZmxvb3JzJywnV2VkbmVzZGF5JywgJ3AzJyk7XG4gICAgXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0KGluYm94LmdldElEKCkpLmFkZFRhc2sodGFzazEpO1xuICAgIFN0b3JhZ2UuZ2V0UHJvamVjdChpbmJveC5nZXRJRCgpKS5hZGRUYXNrKHRhc2syKTtcbiAgICBTdG9yYWdlLmdldFByb2plY3QoaW5ib3guZ2V0SUQoKSkuYWRkVGFzayh0YXNrMyk7XG4gXG4gICAgbG9hZEFwcCgpO1xuXG59KSgpO1xuXG5yZW5kZXI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=