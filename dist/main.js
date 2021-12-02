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
/* harmony export */   "submitTask": () => (/* binding */ submitTask),
/* harmony export */   "editTask": () => (/* binding */ editTask),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask)
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
    
    ;(0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

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
        
        // move below two lines of code to updateDOM
        event.target.parentNode.remove();
        ulElement.appendChild((0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createAddProj)());
    }
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectList)();
}
const deleteProject = (event) => {
    
    ;(0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const projID = event.target.id.slice(0, -3);
    _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.deleteProject(projID);

    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectList)();

}
const addProject = (event) => {
    
    ;(0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

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
    
    ;(0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const addTaskDIV = document.querySelector('#addTask');
    const taskID = _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.generateTaskID();
    const taskForm = (0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createAddTaskForm)(taskID, currActiveProjID);

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
        (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.removeTaskForm)(event.target);
    }

    _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.updateProject(currActiveProjID, currProj);
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateTaskList)(currActiveProjID);

}
const editTask = (event) => {
    
    ;(0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const currTaskID = event.target.id.slice(0, -4);
    const currTaskItem = document.querySelector(`#${currTaskID}ITEM`);
    const taskForm = (0,_createDOM__WEBPACK_IMPORTED_MODULE_1__.createAddTaskForm)(currTaskID, currActiveProjID);
    currTaskItem.replaceWith(taskForm);

    (0,_eventListeners__WEBPACK_IMPORTED_MODULE_2__.setupTaskFormListener)(currActiveProjID, taskForm);

}
const deleteTask = (event) => {
    
    ;(0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const taskID = event.target.id.slice(0, -3);
    // delete task from project
    const activeProj = _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.getProject(currActiveProjID);
    activeProj.removeTask(taskID);
    _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.updateProject(currActiveProjID, activeProj);
    // remove taskID from storage
    _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.removeTaskID(taskID);
    
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
    projInput.placeholder = 'Project Name';
    projInput.value = _storage__WEBPACK_IMPORTED_MODULE_0__.Storage.projID_exists(projID) ? _storage__WEBPACK_IMPORTED_MODULE_0__.Storage.getProject(projID).getName() : '';

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

        const outerCont = _createElement('div', ['flexRow', 'taskItem'], '', taskID + 'ITEM');
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

const createAddTaskForm = (taskID, projID) => {

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

    if (_storage__WEBPACK_IMPORTED_MODULE_0__.Storage.taskID_exists(taskID)) {
        const currTask = _storage__WEBPACK_IMPORTED_MODULE_0__.Storage.getProject(projID).getTask(taskID);
        titleInput.value = currTask.getTitle();
        descInput.value = currTask.getDescription();
        dateInput.value = currTask.getDate();
    }

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
    const editNodes = document.querySelectorAll('.taskItem .fa-edit');
    const delNodes = document.querySelectorAll('.taskItem .fa-trash-alt');
    const addTaskDIV = document.querySelector('#addTask');

    editNodes.forEach(editNode => editNode.addEventListener('click', _appLogic__WEBPACK_IMPORTED_MODULE_0__.editTask));
    delNodes.forEach(delNode => delNode.addEventListener('click', _appLogic__WEBPACK_IMPORTED_MODULE_0__.deleteTask));
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
const proto = (state) => {
    return {
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
            return state.tasks.find(task => task.getID() === taskID);
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
    }
}
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

const Storage = {
    addTaskID: (id) => {
        activeTaskIDs.push(id);
    },
    removeTaskID: (id) => {
        activeTaskIDs.splice(activeTaskIDs.indexOf(id), 1);
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
        } while (Storage.taskID_exists(`task${rand}`));
        
        return `task${rand}`;
    },
    generateProjID: () => {
        if (activeProjIDs.length >= PROJ_LIMIT) return false;

        let rand;
        do {
            rand = Math.ceil(Math.random() * PROJ_LIMIT);
        } while (Storage.projID_exists(`proj${rand}`));
        
        return `proj${rand}`;

    },
    projID_exists: (id) => {
        return activeProjIDs.includes(id);
    },
    taskID_exists: (id) => {
        return activeTaskIDs.includes(id);
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
/* harmony export */   "closeTaskForms": () => (/* binding */ closeTaskForms),
/* harmony export */   "removeTaskForm": () => (/* binding */ removeTaskForm)
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
const removeTaskForm = (taskForm) => {
    taskForm.replaceWith((0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createAddTask)());
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

    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addTaskID('task1');
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addTaskID('task2');
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.addTaskID('task3');
 
    (0,_modules_appLogic__WEBPACK_IMPORTED_MODULE_3__.loadApp)();

})();

render;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLHlCQUF5Qix5REFBYTtBQUN0Qzs7Ozs7Ozs7VUN2RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFOEM7QUFDTztBQUNiO0FBQ0k7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwREFBSztBQUN2QixJQUFJLG1FQUFrQjtBQUN0QixJQUFJLG1FQUFrQixDQUFDLDREQUFPO0FBQzlCLElBQUksbUVBQWtCLENBQUMsNERBQU87QUFDOUIsSUFBSSxtRUFBa0IsQ0FBQyw0REFBTzs7QUFFOUI7QUFDQSxrQkFBa0Isc0RBQUk7QUFDdEIsa0JBQWtCLHNEQUFJO0FBQ3RCLGtCQUFrQixzREFBSTtBQUN0QjtBQUNBLElBQUksbUVBQWtCO0FBQ3RCLElBQUksbUVBQWtCO0FBQ3RCLElBQUksbUVBQWtCOztBQUV0QixJQUFJLGtFQUFpQjtBQUNyQixJQUFJLGtFQUFpQjtBQUNyQixJQUFJLGtFQUFpQjtBQUNyQjtBQUNBLElBQUksMERBQU87O0FBRVgsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2Zvcm1hdElTTy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzVmFsaWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvYXBwTG9naWMuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlRE9NLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3VwZGF0ZURPTS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIHZhciBzaWduID0gbnVtYmVyIDwgMCA/ICctJyA6ICcnO1xuICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpO1xuXG4gIHdoaWxlIChvdXRwdXQubGVuZ3RoIDwgdGFyZ2V0TGVuZ3RoKSB7XG4gICAgb3V0cHV0ID0gJzAnICsgb3V0cHV0O1xuICB9XG5cbiAgcmV0dXJuIHNpZ24gKyBvdXRwdXQ7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgaXNWYWxpZCBmcm9tIFwiLi4vaXNWYWxpZC9pbmRleC5qc1wiO1xuaW1wb3J0IGFkZExlYWRpbmdaZXJvcyBmcm9tIFwiLi4vX2xpYi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgZm9ybWF0SVNPXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZSBhY2NvcmRpbmcgdG8gdGhlIElTTyA4NjAxIHN0YW5kYXJkIChodHRwOi8vc3VwcG9ydC5zYXMuY29tL2RvY3VtZW50YXRpb24vY2RsL2VuL2xyZGljdC82NDMxNi9IVE1ML2RlZmF1bHQvdmlld2VyLmh0bSNhMDAzMTY5ODE0Lmh0bSkuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiBJU08gODYwMSBmb3JtYXQuIE9wdGlvbnMgbWF5IGJlIHBhc3NlZCB0byBjb250cm9sIHRoZSBwYXJ0cyBhbmQgbm90YXRpb25zIG9mIHRoZSBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0geydleHRlbmRlZCd8J2Jhc2ljJ30gW29wdGlvbnMuZm9ybWF0PSdleHRlbmRlZCddIC0gaWYgJ2Jhc2ljJywgaGlkZSBkZWxpbWl0ZXJzIGJldHdlZW4gZGF0ZSBhbmQgdGltZSB2YWx1ZXMuXG4gKiBAcGFyYW0geydjb21wbGV0ZSd8J2RhdGUnfCd0aW1lJ30gW29wdGlvbnMucmVwcmVzZW50YXRpb249J2NvbXBsZXRlJ10gLSBmb3JtYXQgZGF0ZSwgdGltZSB3aXRoIHRpbWUgem9uZSwgb3IgYm90aC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuZm9ybWF0YCBtdXN0IGJlICdleHRlbmRlZCcgb3IgJ2Jhc2ljJ1xuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMucmVwcmVzZW5hdGlvbmAgbXVzdCBiZSAnZGF0ZScsICd0aW1lJyBvciAnY29tcGxldGUnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxOCBTZXB0ZW1iZXIgMjAxOSBpbiBJU08gODYwMSBmb3JtYXQgKFVUQyk6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXRJU08obmV3IERhdGUoMjAxOSwgOCwgMTgsIDE5LCAwLCA1MikpXG4gKiAvLz0+ICcyMDE5LTA5LTE4VDE5OjAwOjUyWidcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDE4IFNlcHRlbWJlciAyMDE5IGluIElTTyA4NjAxLCBzaG9ydCBmb3JtYXQgKFVUQyk6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXRJU08obmV3IERhdGUoMjAxOSwgOCwgMTgsIDE5LCAwLCA1MiksIHsgZm9ybWF0OiAnYmFzaWMnIH0pXG4gKiAvLz0+ICcyMDE5MDkxOFQxOTAwNTInXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxOCBTZXB0ZW1iZXIgMjAxOSBpbiBJU08gODYwMSBmb3JtYXQsIGRhdGUgb25seTpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdElTTyhuZXcgRGF0ZSgyMDE5LCA4LCAxOCwgMTksIDAsIDUyKSwgeyByZXByZXNlbnRhdGlvbjogJ2RhdGUnIH0pXG4gKiAvLz0+ICcyMDE5LTA5LTE4J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMTggU2VwdGVtYmVyIDIwMTkgaW4gSVNPIDg2MDEgZm9ybWF0LCB0aW1lIG9ubHkgKFVUQyk6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXRJU08obmV3IERhdGUoMjAxOSwgOCwgMTgsIDE5LCAwLCA1MiksIHsgcmVwcmVzZW50YXRpb246ICd0aW1lJyB9KVxuICogLy89PiAnMTk6MDA6NTJaJ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdElTTyhkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgXCIuY29uY2F0KGFyZ3VtZW50cy5sZW5ndGgsIFwiIHByZXNlbnRcIikpO1xuICB9XG5cbiAgdmFyIG9yaWdpbmFsRGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuXG4gIGlmICghaXNWYWxpZChvcmlnaW5hbERhdGUpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdGltZSB2YWx1ZScpO1xuICB9XG5cbiAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gIHZhciBmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCA9PSBudWxsID8gJ2V4dGVuZGVkJyA6IFN0cmluZyhvcHRpb25zLmZvcm1hdCk7XG4gIHZhciByZXByZXNlbnRhdGlvbiA9IG9wdGlvbnMucmVwcmVzZW50YXRpb24gPT0gbnVsbCA/ICdjb21wbGV0ZScgOiBTdHJpbmcob3B0aW9ucy5yZXByZXNlbnRhdGlvbik7XG5cbiAgaWYgKGZvcm1hdCAhPT0gJ2V4dGVuZGVkJyAmJiBmb3JtYXQgIT09ICdiYXNpYycpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcImZvcm1hdCBtdXN0IGJlICdleHRlbmRlZCcgb3IgJ2Jhc2ljJ1wiKTtcbiAgfVxuXG4gIGlmIChyZXByZXNlbnRhdGlvbiAhPT0gJ2RhdGUnICYmIHJlcHJlc2VudGF0aW9uICE9PSAndGltZScgJiYgcmVwcmVzZW50YXRpb24gIT09ICdjb21wbGV0ZScpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInJlcHJlc2VudGF0aW9uIG11c3QgYmUgJ2RhdGUnLCAndGltZScsIG9yICdjb21wbGV0ZSdcIik7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciB0ek9mZnNldCA9ICcnO1xuICB2YXIgZGF0ZURlbGltaXRlciA9IGZvcm1hdCA9PT0gJ2V4dGVuZGVkJyA/ICctJyA6ICcnO1xuICB2YXIgdGltZURlbGltaXRlciA9IGZvcm1hdCA9PT0gJ2V4dGVuZGVkJyA/ICc6JyA6ICcnOyAvLyBSZXByZXNlbnRhdGlvbiBpcyBlaXRoZXIgJ2RhdGUnIG9yICdjb21wbGV0ZSdcblxuICBpZiAocmVwcmVzZW50YXRpb24gIT09ICd0aW1lJykge1xuICAgIHZhciBkYXkgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldERhdGUoKSwgMik7XG4gICAgdmFyIG1vbnRoID0gYWRkTGVhZGluZ1plcm9zKG9yaWdpbmFsRGF0ZS5nZXRNb250aCgpICsgMSwgMik7XG4gICAgdmFyIHllYXIgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldEZ1bGxZZWFyKCksIDQpOyAvLyB5eXl5TU1kZCBvciB5eXl5LU1NLWRkLlxuXG4gICAgcmVzdWx0ID0gXCJcIi5jb25jYXQoeWVhcikuY29uY2F0KGRhdGVEZWxpbWl0ZXIpLmNvbmNhdChtb250aCkuY29uY2F0KGRhdGVEZWxpbWl0ZXIpLmNvbmNhdChkYXkpO1xuICB9IC8vIFJlcHJlc2VudGF0aW9uIGlzIGVpdGhlciAndGltZScgb3IgJ2NvbXBsZXRlJ1xuXG5cbiAgaWYgKHJlcHJlc2VudGF0aW9uICE9PSAnZGF0ZScpIHtcbiAgICAvLyBBZGQgdGhlIHRpbWV6b25lLlxuICAgIHZhciBvZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgIHZhciBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICB2YXIgaG91ck9mZnNldCA9IGFkZExlYWRpbmdaZXJvcyhNYXRoLmZsb29yKGFic29sdXRlT2Zmc2V0IC8gNjApLCAyKTtcbiAgICAgIHZhciBtaW51dGVPZmZzZXQgPSBhZGRMZWFkaW5nWmVyb3MoYWJzb2x1dGVPZmZzZXQgJSA2MCwgMik7IC8vIElmIGxlc3MgdGhhbiAwLCB0aGUgc2lnbiBpcyArLCBiZWNhdXNlIGl0IGlzIGFoZWFkIG9mIHRpbWUuXG5cbiAgICAgIHZhciBzaWduID0gb2Zmc2V0IDwgMCA/ICcrJyA6ICctJztcbiAgICAgIHR6T2Zmc2V0ID0gXCJcIi5jb25jYXQoc2lnbikuY29uY2F0KGhvdXJPZmZzZXQsIFwiOlwiKS5jb25jYXQobWludXRlT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHpPZmZzZXQgPSAnWic7XG4gICAgfVxuXG4gICAgdmFyIGhvdXIgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldEhvdXJzKCksIDIpO1xuICAgIHZhciBtaW51dGUgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldE1pbnV0ZXMoKSwgMik7XG4gICAgdmFyIHNlY29uZCA9IGFkZExlYWRpbmdaZXJvcyhvcmlnaW5hbERhdGUuZ2V0U2Vjb25kcygpLCAyKTsgLy8gSWYgdGhlcmUncyBhbHNvIGRhdGUsIHNlcGFyYXRlIGl0IHdpdGggdGltZSB3aXRoICdUJ1xuXG4gICAgdmFyIHNlcGFyYXRvciA9IHJlc3VsdCA9PT0gJycgPyAnJyA6ICdUJzsgLy8gQ3JlYXRlcyBhIHRpbWUgc3RyaW5nIGNvbnNpc3Rpbmcgb2YgaG91ciwgbWludXRlLCBhbmQgc2Vjb25kLCBzZXBhcmF0ZWQgYnkgZGVsaW1pdGVycywgaWYgZGVmaW5lZC5cblxuICAgIHZhciB0aW1lID0gW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5qb2luKHRpbWVEZWxpbWl0ZXIpOyAvLyBISG1tc3Mgb3IgSEg6bW06c3MuXG5cbiAgICByZXN1bHQgPSBcIlwiLmNvbmNhdChyZXN1bHQpLmNvbmNhdChzZXBhcmF0b3IpLmNvbmNhdCh0aW1lKS5jb25jYXQodHpPZmZzZXQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCJpbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIHZhbHVlIGEgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS4gVGhlIGZ1bmN0aW9uIHdvcmtzIGZvciBkYXRlcyB0cmFuc2ZlcnJlZCBhY3Jvc3MgaWZyYW1lcy5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGEgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZSgpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoTmFOKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igc29tZSB2YWx1ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSgnMjAxNC0wMi0zMScpXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBvYmplY3Q6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoe30pXG4gKiAvLz0+IGZhbHNlXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNEYXRlKHZhbHVlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufSIsImltcG9ydCBpc0RhdGUgZnJvbSBcIi4uL2lzRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc1ZhbGlkXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogQXJndW1lbnQgaXMgY29udmVydGVkIHRvIERhdGUgdXNpbmcgYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogLSBOb3cgYGlzVmFsaWRgIGRvZXNuJ3QgdGhyb3cgYW4gZXhjZXB0aW9uXG4gKiAgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqICAgSW5zdGVhZCwgYXJndW1lbnQgaXMgY29udmVydGVkIGJlZm9yZWhhbmQgdXNpbmcgYHRvRGF0ZWAuXG4gKlxuICogICBFeGFtcGxlczpcbiAqXG4gKiAgIHwgYGlzVmFsaWRgIGFyZ3VtZW50ICAgICAgICB8IEJlZm9yZSB2Mi4wLjAgfCB2Mi4wLjAgb253YXJkIHxcbiAqICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tfFxuICogICB8IGBuZXcgRGF0ZSgpYCAgICAgICAgICAgICAgfCBgdHJ1ZWAgICAgICAgIHwgYHRydWVgICAgICAgICB8XG4gKiAgIHwgYG5ldyBEYXRlKCcyMDE2LTAxLTAxJylgICB8IGB0cnVlYCAgICAgICAgfCBgdHJ1ZWAgICAgICAgIHxcbiAqICAgfCBgbmV3IERhdGUoJycpYCAgICAgICAgICAgIHwgYGZhbHNlYCAgICAgICB8IGBmYWxzZWAgICAgICAgfFxuICogICB8IGBuZXcgRGF0ZSgxNDg4MzcwODM1MDgxKWAgfCBgdHJ1ZWAgICAgICAgIHwgYHRydWVgICAgICAgICB8XG4gKiAgIHwgYG5ldyBEYXRlKE5hTilgICAgICAgICAgICB8IGBmYWxzZWAgICAgICAgfCBgZmFsc2VgICAgICAgIHxcbiAqICAgfCBgJzIwMTYtMDEtMDEnYCAgICAgICAgICAgIHwgYFR5cGVFcnJvcmAgICB8IGBmYWxzZWAgICAgICAgfFxuICogICB8IGAnJ2AgICAgICAgICAgICAgICAgICAgICAgfCBgVHlwZUVycm9yYCAgIHwgYGZhbHNlYCAgICAgICB8XG4gKiAgIHwgYDE0ODgzNzA4MzUwODFgICAgICAgICAgICB8IGBUeXBlRXJyb3JgICAgfCBgdHJ1ZWAgICAgICAgIHxcbiAqICAgfCBgTmFOYCAgICAgICAgICAgICAgICAgICAgIHwgYFR5cGVFcnJvcmAgICB8IGBmYWxzZWAgICAgICAgfFxuICpcbiAqICAgV2UgaW50cm9kdWNlIHRoaXMgY2hhbmdlIHRvIG1ha2UgKmRhdGUtZm5zKiBjb25zaXN0ZW50IHdpdGggRUNNQVNjcmlwdCBiZWhhdmlvclxuICogICB0aGF0IHRyeSB0byBjb2VyY2UgYXJndW1lbnRzIHRvIHRoZSBleHBlY3RlZCB0eXBlXG4gKiAgICh3aGljaCBpcyBhbHNvIHRoZSBjYXNlIHdpdGggb3RoZXIgKmRhdGUtZm5zKiBmdW5jdGlvbnMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdmFsaWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQoMTM5MzgwNDgwMDAwMClcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVmFsaWQoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuXG4gIGlmICghaXNEYXRlKGRpcnR5RGF0ZSkgJiYgdHlwZW9mIGRpcnR5RGF0ZSAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICByZXR1cm4gIWlzTmFOKE51bWJlcihkYXRlKSk7XG59IiwiaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgYXJndW1lbnQgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0LmlvL2ZqdWxlXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiaW1wb3J0IHsgdXBkYXRlUHJvamVjdExpc3QsIHVwZGF0ZVRhc2tMaXN0LCBjbG9zZUFsbEZvcm1zLCByZW1vdmVUYXNrRm9ybSB9IGZyb20gJy4vdXBkYXRlRE9NJ1xuaW1wb3J0IHsgY3JlYXRlRE9NLCBjcmVhdGVBZGRQcm9qLCBjcmVhdGVQcm9qRm9ybSwgY3JlYXRlQWRkVGFza0Zvcm0gfSBmcm9tICcuL2NyZWF0ZURPTSdcbmltcG9ydCB7IHNldHVwQWxsRXZlbnRMaXN0ZW5lcnMsIHNldHVwUHJvakV2ZW50TGlzdGVuZXJzLCBzZXR1cFByb2pGb3JtTGlzdGVuZXIsIHNldHVwVGFza0Zvcm1MaXN0ZW5lciB9IGZyb20gJy4vZXZlbnRMaXN0ZW5lcnMnXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCdcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2snXG5cbmxldCBjdXJyQWN0aXZlUHJvaklEID0gJ3Byb2pJbmJveCc7XG5cbmNvbnN0IGxvYWRBcHAgPSAoKSA9PiB7XG4gICAgY3JlYXRlRE9NKCk7XG4gICAgdXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICB1cGRhdGVUYXNrTGlzdChjdXJyQWN0aXZlUHJvaklEKTtcbn1cbmNvbnN0IGVkaXRQcm9qZWN0ID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IGN1cnJQcm9qSUQgPSBldmVudC50YXJnZXQuaWQuc2xpY2UoMCwtNCk7XG4gICAgY29uc3QgbGlOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y3VyclByb2pJRH1MSWApO1xuICAgIGNvbnN0IHByb2pGb3JtID0gY3JlYXRlUHJvakZvcm0oY3VyclByb2pJRCk7XG4gICAgbGlOb2RlLnJlcGxhY2VXaXRoKHByb2pGb3JtKTtcblxuICAgIHNldHVwUHJvakZvcm1MaXN0ZW5lcihwcm9qRm9ybSk7XG5cbn1cbmNvbnN0IHN1Ym1pdFByb2plY3QgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByb2pJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLC00KTtcbiAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qSW5wdXQnKS52YWx1ZTtcbiAgICBjb25zdCB1bEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvakxpc3QnKTtcblxuICAgIGlmIChTdG9yYWdlLmNoZWNrUHJvamVjdE5hbWUobmV3UHJvak5hbWUpKSB7XG4gICAgICAgIGFsZXJ0KCdQcm9qZWN0IG5hbWUgZXhpc3RzJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpKSB7XG4gICAgICAgIFN0b3JhZ2UudXBkYXRlUHJvamVjdE5hbWUocHJvaklELCBuZXdQcm9qTmFtZSk7ICBcbiAgICB9IGVsc2Uge1xuICAgICAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdChwcm9qSUQsIG5ld1Byb2pOYW1lKSk7XG4gICAgICAgIFxuICAgICAgICAvLyBtb3ZlIGJlbG93IHR3byBsaW5lcyBvZiBjb2RlIHRvIHVwZGF0ZURPTVxuICAgICAgICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgdWxFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUFkZFByb2ooKSk7XG4gICAgfVxuICAgIHVwZGF0ZVByb2plY3RMaXN0KCk7XG59XG5jb25zdCBkZWxldGVQcm9qZWN0ID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IHByb2pJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLCAtMyk7XG4gICAgU3RvcmFnZS5kZWxldGVQcm9qZWN0KHByb2pJRCk7XG5cbiAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuXG59XG5jb25zdCBhZGRQcm9qZWN0ID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IGFkZFByb2pMSSA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBwcm9qSUQgPSBTdG9yYWdlLmdlbmVyYXRlUHJvaklEKCk7XG4gICAgY29uc3QgcHJvakZvcm0gPSBjcmVhdGVQcm9qRm9ybShwcm9qSUQpO1xuXG4gICAgYWRkUHJvakxJLnJlcGxhY2VXaXRoKHByb2pGb3JtKTtcbiAgICBzZXR1cFByb2pGb3JtTGlzdGVuZXIocHJvakZvcm0pO1xuICAgIFxuXG59XG5jb25zdCBnZXRUYXNrcyA9IChwcm9qSUQpID0+IHtcbiAgICBcbiAgICBjdXJyQWN0aXZlUHJvaklEID0gcHJvaklEO1xuXG4gICAgcmV0dXJuIFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpLmdldFRhc2tzKCk7XG5cbiAgICAvLyBMYXRlcjogU2V0dXAgVG9kYXkgYW5kIFRoaXMgd2VlayB0YXNrIGZldGNoIGxvZ2ljXG59XG5jb25zdCBhZGRUYXNrID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IGFkZFRhc2tESVYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkVGFzaycpO1xuICAgIGNvbnN0IHRhc2tJRCA9IFN0b3JhZ2UuZ2VuZXJhdGVUYXNrSUQoKTtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGNyZWF0ZUFkZFRhc2tGb3JtKHRhc2tJRCwgY3VyckFjdGl2ZVByb2pJRCk7XG5cbiAgICBhZGRUYXNrRElWLnJlcGxhY2VXaXRoKHRhc2tGb3JtKTtcbiAgICBzZXR1cFRhc2tGb3JtTGlzdGVuZXIoY3VyckFjdGl2ZVByb2pJRCwgdGFza0Zvcm0pO1xuXG59XG5jb25zdCBzdWJtaXRUYXNrID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGN1cnJQcm9qID0gU3RvcmFnZS5nZXRQcm9qZWN0KGN1cnJBY3RpdmVQcm9qSUQpO1xuXG4gICAgY29uc3QgdGFza0lEID0gZXZlbnQudGFyZ2V0LmlkLnNsaWNlKDAsIC00KTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza1RpdGxlJykudmFsdWU7XG4gICAgY29uc3QgdGFza0Rlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0Rlc2MnKS52YWx1ZTtcbiAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRGF0ZScpLnZhbHVlO1xuXG4gICAgaWYgKGN1cnJQcm9qLmdldFRhc2sodGFza0lEKSkge1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gY3VyclByb2ouZ2V0VGFzayh0YXNrSUQpO1xuICAgICAgICBuZXdUYXNrLnVwZGF0ZSh0YXNrVGl0bGUsIHRhc2tEZXNjLCB0YXNrRGF0ZSk7XG4gICAgICAgIGN1cnJQcm9qLnVwZGF0ZVRhc2sodGFza0lELCBuZXdUYXNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gVGFzayh0YXNrSUQsIHRhc2tUaXRsZSwgdGFza0Rlc2MsIHRhc2tEYXRlKTtcbiAgICAgICAgY3VyclByb2ouYWRkVGFzayhuZXdUYXNrKTtcbiAgICAgICAgU3RvcmFnZS5hZGRUYXNrSUQodGFza0lEKTtcbiAgICAgICAgcmVtb3ZlVGFza0Zvcm0oZXZlbnQudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBTdG9yYWdlLnVwZGF0ZVByb2plY3QoY3VyckFjdGl2ZVByb2pJRCwgY3VyclByb2opO1xuICAgIHVwZGF0ZVRhc2tMaXN0KGN1cnJBY3RpdmVQcm9qSUQpO1xuXG59XG5jb25zdCBlZGl0VGFzayA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIGNsb3NlQWxsRm9ybXMoY3VyckFjdGl2ZVByb2pJRCk7XG5cbiAgICBjb25zdCBjdXJyVGFza0lEID0gZXZlbnQudGFyZ2V0LmlkLnNsaWNlKDAsIC00KTtcbiAgICBjb25zdCBjdXJyVGFza0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjdXJyVGFza0lEfUlURU1gKTtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGNyZWF0ZUFkZFRhc2tGb3JtKGN1cnJUYXNrSUQsIGN1cnJBY3RpdmVQcm9qSUQpO1xuICAgIGN1cnJUYXNrSXRlbS5yZXBsYWNlV2l0aCh0YXNrRm9ybSk7XG5cbiAgICBzZXR1cFRhc2tGb3JtTGlzdGVuZXIoY3VyckFjdGl2ZVByb2pJRCwgdGFza0Zvcm0pO1xuXG59XG5jb25zdCBkZWxldGVUYXNrID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IHRhc2tJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLCAtMyk7XG4gICAgLy8gZGVsZXRlIHRhc2sgZnJvbSBwcm9qZWN0XG4gICAgY29uc3QgYWN0aXZlUHJvaiA9IFN0b3JhZ2UuZ2V0UHJvamVjdChjdXJyQWN0aXZlUHJvaklEKTtcbiAgICBhY3RpdmVQcm9qLnJlbW92ZVRhc2sodGFza0lEKTtcbiAgICBTdG9yYWdlLnVwZGF0ZVByb2plY3QoY3VyckFjdGl2ZVByb2pJRCwgYWN0aXZlUHJvaik7XG4gICAgLy8gcmVtb3ZlIHRhc2tJRCBmcm9tIHN0b3JhZ2VcbiAgICBTdG9yYWdlLnJlbW92ZVRhc2tJRCh0YXNrSUQpO1xuICAgIFxuICAgIHVwZGF0ZVRhc2tMaXN0KGN1cnJBY3RpdmVQcm9qSUQpO1xufVxuXG5leHBvcnQgeyBsb2FkQXBwLCBlZGl0UHJvamVjdCwgc3VibWl0UHJvamVjdCwgZGVsZXRlUHJvamVjdCwgYWRkUHJvamVjdCwgZ2V0VGFza3MsIGFkZFRhc2ssIHN1Ym1pdFRhc2ssIGVkaXRUYXNrLCBkZWxldGVUYXNrIH0iLCIvLyBNb2R1bGUgcmVzcG9uc2libGliaWxpdGllczpcbi8vIC0gQnVpbGRzIERPTSB1cG9uIGluaXRpYWwgbG9hZFxuLy8gLSBDcmVhdGUgZWxlbWVudHMgYW5kIGFkZCB0byBkb2N1bWVudFxuLy8gLSBMb2FkcyBhY3RpdmUgcHJvamVjdHMgYW5kIHRhc2tzXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHsgU2NoZWR1bGUgfSBmcm9tICcuL3Rhc2snXG5cbmNvbnN0IF9jcmVhdGVFbGVtZW50ID0gKHR5cGUsIGNsYXNzTmFtZUFyciwgdGV4dCwgaWQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBpZiAoY2xhc3NOYW1lQXJyKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lQXJyKTtcbiAgICBpZiAodGV4dCkgZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgaWYgKGlkKSBlbGVtZW50LmlkID0gaWQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5jb25zdCBjcmVhdGVET00gPSAoKSA9PiB7XG4gICAgX2NyZWF0ZUhlYWRlcigpO1xuICAgIF9jcmVhdGVTaWRlQmFyKCk7XG4gICAgX2NyZWF0ZU1haW4oKTtcbn1cbmNvbnN0IF9jcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3QgaGVhZGVyRGl2ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnaGVhZGVyRGl2J10sICdUby1EbyBBcHBsaWNhdGlvbicpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykuYXBwZW5kKGhlYWRlckRpdik7XG59XG5jb25zdCBfY3JlYXRlU2lkZUJhciA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlQmFyJyk7XG4gICAgXG4gICAgY29uc3QgbmF2Q29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwnJywnc2lkZUJhck5hdkNvbnQnKTtcbiAgICBjb25zdCBpbmJveCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdJbmJveCcpO1xuICAgIGNvbnN0IHRvZGF5ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ1RvZGF5Jyk7XG4gICAgY29uc3QgdGhpc1dlZWsgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVGhpcyBXZWVrJyk7XG5cbiAgICBjb25zdCBwcm9qQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSwgJycsICdwcm9qQ29udCcpO1xuICAgIGNvbnN0IHByb2pIZWFkaW5nQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwcm9qSGVhZGluZ1RleHQgPSBfY3JlYXRlRWxlbWVudCgnaDQnLCBbJ2ZsZXhDb2wnXSwgJ1Byb2plY3RzJyk7XG4gICAgY29uc3QgcHJvakxpc3QgPSBfY3JlYXRlRWxlbWVudCgndWwnLCBbJ3Byb2pMaXN0J10sICcnLCAncHJvakxpc3QnKTtcblxuICAgIHByb2pIZWFkaW5nQ29udC5hcHBlbmQocHJvakhlYWRpbmdUZXh0KTtcbiAgICBwcm9qTGlzdC5hcHBlbmQoY3JlYXRlQWRkUHJvaigpKTtcblxuICAgIHByb2pDb250LmFwcGVuZChwcm9qSGVhZGluZ0NvbnQsIHByb2pMaXN0KTtcbiAgICBcbiAgICBuYXZDb250LmFwcGVuZChpbmJveCwgdG9kYXksIHRoaXNXZWVrKTtcblxuICAgIHNpZGVCYXIuYXBwZW5kKG5hdkNvbnQsIHByb2pDb250KTtcblxufVxuY29uc3QgY3JlYXRlQWRkUHJvaiA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRQcm9qQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCAnJywgJycsICdhZGRQcm9qJyk7XG4gICAgY29uc3QgYWRkUHJvakxJID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgWydub01hcmtlciddLCAnKyBBZGQgUHJvamVjdCcsICdhZGRQcm9qZWN0TEknKTtcbiAgICBhZGRQcm9qQ29udC5hcHBlbmQoYWRkUHJvakxJKTtcbiAgICByZXR1cm4gYWRkUHJvakNvbnQ7XG59XG5jb25zdCBjcmVhdGVQcm9qZWN0ID0gKHByb2opID0+IHtcbiAgICBcbiAgICBjb25zdCBwcm9qTmFtZSA9IHByb2ouZ2V0TmFtZSgpO1xuICAgIGNvbnN0IHByb2pJRCA9IHByb2ouZ2V0SUQoKTtcblxuICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncHJvakl0ZW0nXSk7XG4gICAgY29uc3QgbGlOb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2xpJywgJycsIHByb2pOYW1lLCBwcm9qSUQgKyAnTEknKTtcbiAgICBjb25zdCBlZGl0SWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS1lZGl0J10sICcnLCBwcm9qSUQgKyAnRURJVCcpO1xuICAgIGNvbnN0IGRlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtdHJhc2gtYWx0J10sICcnLCBwcm9qSUQgKyAnREVMJyk7XG5cbiAgICBwcm9qZWN0RWxlbWVudC5hcHBlbmQobGlOb2RlLCBlZGl0SWNvbiwgZGVsSWNvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdEVsZW1lbnQ7XG59XG5jb25zdCBjcmVhdGVQcm9qRm9ybSA9IChwcm9qSUQpID0+IHtcblxuICAgIGNvbnN0IHByb2pGb3JtID0gX2NyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCBbJ3Byb2pGb3JtJ10sICcnLCBwcm9qSUQgKyAnRk9STScpO1xuXG4gICAgY29uc3QgcHJvaklucHV0ID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydpbnB1dFByb2onXSwgJycsICdwcm9qSW5wdXQnKTtcbiAgICBwcm9qSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBwcm9qSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIHByb2pJbnB1dC5wbGFjZWhvbGRlciA9ICdQcm9qZWN0IE5hbWUnO1xuICAgIHByb2pJbnB1dC52YWx1ZSA9IFN0b3JhZ2UucHJvaklEX2V4aXN0cyhwcm9qSUQpID8gU3RvcmFnZS5nZXRQcm9qZWN0KHByb2pJRCkuZ2V0TmFtZSgpIDogJyc7XG5cbiAgICBjb25zdCBzYXZlQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICcnLCAnJywgIHByb2pJRCArICdTQVZFJyk7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLXNhdmUnXSwgJycpO1xuICAgIFxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCAnJywgJycsIHByb2pJRCArICdDQU5DRUwnKTtcbiAgICBjYW5jZWxCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgIGNvbnN0IGNhbmNlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLXdpbmRvdy1jbG9zZSddLCAnJyk7XG5cbiAgICBzYXZlQnV0dG9uLmFwcGVuZChzYXZlSWNvbik7XG4gICAgY2FuY2VsQnV0dG9uLmFwcGVuZENoaWxkKGNhbmNlbEljb24pO1xuICAgIHByb2pGb3JtLmFwcGVuZChwcm9qSW5wdXQsIHNhdmVCdXR0b24sIGNhbmNlbEJ1dHRvbik7XG5cbiAgICByZXR1cm4gcHJvakZvcm07XG59XG5jb25zdCBfY3JlYXRlTWFpbiA9ICgpID0+IHtcbiAgICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluQ29udGVudCcpO1xuXG4gICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICd0YXNrSGVhZGVyJ10sICcnLCAnJyk7XG4gICAgY29uc3QgaGVhZGVyID0gX2NyZWF0ZUVsZW1lbnQoJ2gyJywgJycsICdJbmJveCcsICdtYWluSGVhZGVyJyk7XG5cbiAgICBjb25zdCB0YXNrTGlzdCA9IF9jcmVhdGVFbGVtZW50KCd1bCcsIFsndGFza0xpc3QnXSwgJycsICd0YXNrTGlzdCcpO1xuXG4gICAgdGFza0xpc3QuYXBwZW5kKGNyZWF0ZUFkZFRhc2soKSk7XG5cbiAgICBoZWFkZXJDb250YWluZXIuYXBwZW5kKGhlYWRlcik7XG4gICAgbWFpbkNvbnRlbnQuYXBwZW5kKGhlYWRlckNvbnRhaW5lciwgdGFza0xpc3QpO1xuXG59XG5jb25zdCBjcmVhdGVBZGRUYXNrID0gKCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGFkZENvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2snXSwgJycsICdhZGRUYXNrJyk7XG4gICAgY29uc3QgYWRkSXRlbUxlZnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWyd0YXNrSXRlbUxlZnQnXSk7XG4gICAgY29uc3QgYWRkSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXMnLCAnZmEtcGx1cy1jaXJjbGUnXSk7XG4gICAgY29uc3QgYWRkVGV4dCA9IF9jcmVhdGVFbGVtZW50KCdwJywgJycsICdBZGQgVGFzaycsICdhZGRUZXh0Jyk7XG5cbiAgICBhZGRJdGVtTGVmdC5hcHBlbmQoYWRkSWNvbik7XG4gICAgYWRkQ29udC5hcHBlbmQoYWRkSXRlbUxlZnQsIGFkZFRleHQpO1xuXG4gICAgcmV0dXJuIGFkZENvbnQ7XG59XG5jb25zdCBjcmVhdGVUYXNrID0gKHRhc2spID0+IHtcblxuICAgICAgICBjb25zdCB0YXNrSUQgPSB0YXNrLmdldElEKCk7XG5cbiAgICAgICAgY29uc3Qgb3V0ZXJDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICd0YXNrSXRlbSddLCAnJywgdGFza0lEICsgJ0lURU0nKTtcbiAgICAgICAgY29uc3QgY2hlY2tDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsndGFza0l0ZW1MZWZ0J10pO1xuICAgICAgICBjb25zdCB0YXNrQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnLCAndGFza0NvbnQnXSwgJycsICcnKTtcblxuICAgICAgICBjb25zdCBsaUNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2tMSSddLCAnJywgJycpO1xuICAgICAgICBjb25zdCBkZXNjUHJldiA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2Rlc2NQcmV2J10sIHRhc2suZ2V0RGVzY3JpcHRpb24oKSwgJycpO1xuICAgICAgICBjb25zdCBzY2hlZHVsZUNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ2Rlc2NQcmV2J10pO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbkNvbnQgPSBfY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydjbGVhckJ1dHRvbiddLCAnJywgdGFza0lEICsgJ0NIRUNLJyk7XG4gICAgICAgIGNvbnN0IGNpcmNsZU1hcmtlciA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtY2lyY2xlJ10pO1xuICAgICAgICBjb25zdCBjaGVja01hcmtlciA9IF9jcmVhdGVFbGVtZW50KCdpJyxbJ2ZhcicsICdmYS1jaGVjay1jaXJjbGUnXSk7XG5cbiAgICAgICAgLy8gTEFURVI6IGNvbnNpZGVyIG1vdmluZyB0byBldmVudExpc3RlbmVycyBtb2R1bGVcbiAgICAgICAgYnV0dG9uQ29udC5vbm1vdXNlZW50ZXIgPSAoKSA9PiB7IFxuICAgICAgICAgICAgY2lyY2xlTWFya2VyLnJlcGxhY2VXaXRoKGNoZWNrTWFya2VyKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnV0dG9uQ29udC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7IFxuICAgICAgICAgICAgY2hlY2tNYXJrZXIucmVwbGFjZVdpdGgoY2lyY2xlTWFya2VyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsaU5vZGUgPSBfY3JlYXRlRWxlbWVudCgnbGknLCBbJ25vTWFya2VyJ10sIHRhc2suZ2V0VGl0bGUoKSk7XG4gICAgICAgIGNvbnN0IGVkaXROb2RlID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLWVkaXQnXSwgJycsIHRhc2tJRCArICdFRElUJyk7XG4gICAgICAgIGNvbnN0IGRlbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtdHJhc2gtYWx0J10sICcnLCB0YXNrSUQgKyAnREVMJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1jYWxlbmRhci1hbHQnXSk7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRlID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsndGFza0RhdGUnXSwgdGFzay5nZXREYXRlKCkpO1xuXG4gICAgICAgIGJ1dHRvbkNvbnQuYXBwZW5kKGNpcmNsZU1hcmtlcik7XG4gICAgICAgIGNoZWNrQ29udC5hcHBlbmQoYnV0dG9uQ29udCk7XG5cbiAgICAgICAgbGlDb250LmFwcGVuZChsaU5vZGUsIGVkaXROb2RlLCBkZWxJY29uKTtcbiAgICAgICAgc2NoZWR1bGVDb250LmFwcGVuZChjYWxJY29uLCB0YXNrRGF0ZSk7XG4gICAgICAgIHRhc2tDb250LmFwcGVuZChsaUNvbnQsIGRlc2NQcmV2LCBzY2hlZHVsZUNvbnQpO1xuXG4gICAgICAgIG91dGVyQ29udC5hcHBlbmQoY2hlY2tDb250LCB0YXNrQ29udCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gb3V0ZXJDb250O1xufVxuY29uc3QgY3JlYXRlSFIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIF9jcmVhdGVFbGVtZW50KCdocicpO1xufVxuXG5jb25zdCBjcmVhdGVBZGRUYXNrRm9ybSA9ICh0YXNrSUQsIHByb2pJRCkgPT4ge1xuXG4gICAgY29uc3QgdGFza0Zvcm0gPSBfY3JlYXRlRWxlbWVudCgnZm9ybScsIFsnZmxleENvbCcsJ3Rhc2tGb3JtJ10sICcnLCB0YXNrSUQgKyAnRk9STScpO1xuXG4gICAgY29uc3QgdGFza0lucHV0Q29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhDb2wnXSk7XG4gICAgXG4gICAgY29uc3QgdGl0bGVJbnB1dCA9IF9jcmVhdGVFbGVtZW50KCdpbnB1dCcsICcnLCAnJywgJ3Rhc2tUaXRsZScpO1xuICAgIHRpdGxlSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0aXRsZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICB0aXRsZUlucHV0LnBsYWNlaG9sZGVyID0gJ1RpdGxlJztcbiAgICBcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBfY3JlYXRlRWxlbWVudCgnaW5wdXQnLCAnJywgJycsICd0YXNrRGVzYycpO1xuICAgIGRlc2NJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGRlc2NJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgZGVzY0lucHV0LnBsYWNlaG9sZGVyID0gJ0Rlc2NyaXB0aW9uJztcblxuICAgIGNvbnN0IHRhc2tCdXR0b25Db250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdycsICd0YXNrQnV0dG9uQ29udCddKTtcbiAgICBjb25zdCBzY2hlZHVsZUNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywndGFza0J1dHRvbiddKTtcbiAgICBjb25zdCBjYWxJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1jYWxlbmRhci1hbHQnXSk7XG4gICAgY29uc3QgZGF0ZUlucHV0ID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydkYXRlSW5wdXQnXSwgJ1NjaGVkdWxlJywgJ3Rhc2tEYXRlJyk7XG4gICAgZGF0ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XG4gICAgZGF0ZUlucHV0Lm1pbiA9IFNjaGVkdWxlKCkuZ2V0RGF0ZVRvZGF5KCk7XG5cbiAgICBjb25zdCBzYXZlQnV0dG9uQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnXSk7XG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ3NhdmVCdXR0b24nXSwgJ1NhdmUgVGFzaycpO1xuICAgIHNhdmVCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2NhbmNlbEJ1dHRvbiddLCAnQ2FuY2VsJywgdGFza0lEICsgJ0NBTkNFTCcpO1xuXG4gICAgc2NoZWR1bGVDb250LmFwcGVuZChjYWxJY29uLCBkYXRlSW5wdXQpO1xuICAgIHRhc2tJbnB1dENvbnQuYXBwZW5kKHRpdGxlSW5wdXQsIGRlc2NJbnB1dCwgdGFza0J1dHRvbkNvbnQpO1xuICAgIHRhc2tCdXR0b25Db250LmFwcGVuZChzY2hlZHVsZUNvbnQpO1xuICAgIHNhdmVCdXR0b25Db250LmFwcGVuZChzYXZlQnV0dG9uLCBjYW5jZWxCdXR0b24pO1xuICAgIHRhc2tGb3JtLmFwcGVuZCh0YXNrSW5wdXRDb250LCBzYXZlQnV0dG9uQ29udClcblxuICAgIGlmIChTdG9yYWdlLnRhc2tJRF9leGlzdHModGFza0lEKSkge1xuICAgICAgICBjb25zdCBjdXJyVGFzayA9IFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpLmdldFRhc2sodGFza0lEKTtcbiAgICAgICAgdGl0bGVJbnB1dC52YWx1ZSA9IGN1cnJUYXNrLmdldFRpdGxlKCk7XG4gICAgICAgIGRlc2NJbnB1dC52YWx1ZSA9IGN1cnJUYXNrLmdldERlc2NyaXB0aW9uKCk7XG4gICAgICAgIGRhdGVJbnB1dC52YWx1ZSA9IGN1cnJUYXNrLmdldERhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFza0Zvcm07XG59XG5cbmV4cG9ydCB7IGNyZWF0ZURPTSwgY3JlYXRlUHJvamVjdCwgY3JlYXRlQWRkUHJvaiwgY3JlYXRlUHJvakZvcm0sIGNyZWF0ZUFkZFRhc2ssIGNyZWF0ZVRhc2ssIGNyZWF0ZUhSLCBjcmVhdGVBZGRUYXNrRm9ybSB9O1xuIiwiLy8gTW9kdWxlIHJlc3BvbnNpYmxpYmlsaXRpZXM6XG4vLyAtIFF1ZXJ5IGVsZW1lbnRzIGFuZCBzZXR1cCBldmVudCBsaXN0ZW5lcnNcbi8vIC0gQ2FsbHMgYXBwTG9naWMgZnVuY3Rpb25zIFxuaW1wb3J0IHsgZWRpdFByb2plY3QsIHN1Ym1pdFByb2plY3QsIGRlbGV0ZVByb2plY3QsIGFkZFByb2plY3QsIGFkZFRhc2ssIHN1Ym1pdFRhc2ssIGVkaXRUYXNrLCBkZWxldGVUYXNrIH0gZnJvbSAnLi9hcHBMb2dpYydcbmltcG9ydCB7IGNsb3NlUHJvakZvcm1zLCBjbG9zZVRhc2tGb3JtcyB9IGZyb20gJy4vdXBkYXRlRE9NJ1xuXG5jb25zdCBzZXR1cEFsbEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIHNldHVwUHJvakV2ZW50TGlzdGVuZXJzKCk7XG4gICAgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMoKTtcbn1cbmNvbnN0IHNldHVwUHJvakV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgLy8gbGF0ZXI6IHNldHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJvamVjdCBMSSBlbGVtZW50c1xuICAgIGNvbnN0IGVkaXROb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qSXRlbSAuZmEtZWRpdCcpO1xuICAgIGNvbnN0IGRlbE5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2pJdGVtIC5mYS10cmFzaC1hbHQnKTtcbiAgICBjb25zdCBhZGRQcm9qTEkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkUHJvamVjdExJJyk7XG5cbiAgICBlZGl0Tm9kZXMuZm9yRWFjaChlZGl0Tm9kZSA9PiBlZGl0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRQcm9qZWN0KSk7XG4gICAgZGVsTm9kZXMuZm9yRWFjaChkZWxOb2RlID0+IGRlbE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVQcm9qZWN0KSk7XG4gICAgYWRkUHJvakxJLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkUHJvamVjdCk7XG59XG5jb25zdCBzZXR1cFByb2pGb3JtTGlzdGVuZXIgPSAocHJvakZvcm0pID0+IHtcbiAgICBjb25zdCBwcm9qSUQgPSBwcm9qRm9ybS5pZC5zbGljZSgwLCAtNCk7XG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3Byb2pJRH1DQU5DRUxgKTtcblxuICAgIGNhbmNlbEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVByb2pGb3JtcygpKTtcblxuICAgIHByb2pGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHN1Ym1pdFByb2plY3QpO1xuXG59XG5jb25zdCBzZXR1cFRhc2tFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBlZGl0Tm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza0l0ZW0gLmZhLWVkaXQnKTtcbiAgICBjb25zdCBkZWxOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrSXRlbSAuZmEtdHJhc2gtYWx0Jyk7XG4gICAgY29uc3QgYWRkVGFza0RJViA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRUYXNrJyk7XG5cbiAgICBlZGl0Tm9kZXMuZm9yRWFjaChlZGl0Tm9kZSA9PiBlZGl0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRUYXNrKSk7XG4gICAgZGVsTm9kZXMuZm9yRWFjaChkZWxOb2RlID0+IGRlbE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVUYXNrKSk7XG4gICAgYWRkVGFza0RJVi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFRhc2spO1xufVxuY29uc3Qgc2V0dXBUYXNrRm9ybUxpc3RlbmVyID0gKHByb2pJRCwgdGFza0Zvcm0pID0+IHtcbiAgICBjb25zdCB0YXNrSUQgPSB0YXNrRm9ybS5pZC5zbGljZSgwLCAtNCk7XG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFza0lEfUNBTkNFTGApO1xuXG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VUYXNrRm9ybXMocHJvaklEKSk7XG5cbiAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdWJtaXRUYXNrKTtcbn1cblxuZXhwb3J0IHsgc2V0dXBBbGxFdmVudExpc3RlbmVycywgc2V0dXBQcm9qRXZlbnRMaXN0ZW5lcnMsIHNldHVwUHJvakZvcm1MaXN0ZW5lciwgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMsIHNldHVwVGFza0Zvcm1MaXN0ZW5lciB9OyIsIi8qIFByb2plY3QuanMgXG5cbk1vZHVsZSByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0IG9iamVjdCBhbmQgc3VwcG9ydGluZyBmdW5jdGlvbnNcblxuKi9cbi8vIGltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2suanMnO1xuY29uc3QgZ2V0SW5kZXhCeUlEID0gKHN0YXRlLCB0YXNrSUQpID0+IHtcbiAgICByZXR1cm4gc3RhdGUudGFza3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJRCgpID09PSB0YXNrSUQpO1xufVxuY29uc3QgcHJvdG8gPSAoc3RhdGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJRDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmlkO1xuICAgICAgICB9LFxuICAgICAgICBnZXROYW1lOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUubmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGFza3M6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS50YXNrcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGFzazogKHRhc2tJRCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnRhc2tzLmZpbmQodGFzayA9PiB0YXNrLmdldElEKCkgPT09IHRhc2tJRCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVRhc2s6ICh0YXNrSUQsIG5ld1Rhc2spID0+IHtcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gZml4IGVycm9yIHdpdGggZ2V0SW5kZXhCeUlEIChjYW4ndCBhY2Nlc3MgdGhpcylcbiAgICAgICAgICAgIHN0YXRlLnRhc2tzLnNwbGljZShnZXRJbmRleEJ5SUQoc3RhdGUsIHRhc2tJRCksIDEsIG5ld1Rhc2spOyAgXG4gICAgICAgIH0sXG4gICAgICAgIGFkZFRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVUYXNrOiAodGFza0lEKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS50YXNrcy5zcGxpY2UoZ2V0SW5kZXhCeUlEKHN0YXRlLCB0YXNrSUQpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IFByb2plY3QgPSAoaWQsIG5hbWUpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICB0YXNrczogW11cbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiB7XG4gICAgICAgIHN0YXRlLm5hbWUgPSBuZXdOYW1lO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm90byhzdGF0ZSksIHsgc2V0TmFtZSB9KTtcbn1cblxuY29uc3QgSW5ib3ggPSAoKSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBpZDogJ3Byb2pJbmJveCcsXG4gICAgICAgIG5hbWU6ICdJbmJveCcsXG4gICAgICAgIHRhc2tzOiBbXVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm90byhzdGF0ZSkpO1xuICAgIFxufVxuXG5leHBvcnQgeyBQcm9qZWN0LCBJbmJveCB9OyIsImNvbnN0IFBST0pfTElNSVQgPSAxMDAwO1xuY29uc3QgVEFTS19MSU1JVCA9IDEwMDAwO1xuY29uc3QgYWN0aXZlUHJvamVjdHMgPSBbXTtcbmNvbnN0IGFjdGl2ZVRhc2tJRHMgPSBbXTtcbmNvbnN0IGFjdGl2ZVByb2pJRHMgPSBbXTtcblxuY29uc3QgZ2V0SW5kZXhCeUlEID0gKHByb2pJRCkgPT4ge1xuICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBwcm9qLmdldElEKCkgPT09IHByb2pJRCk7XG59XG5cbmNvbnN0IFN0b3JhZ2UgPSB7XG4gICAgYWRkVGFza0lEOiAoaWQpID0+IHtcbiAgICAgICAgYWN0aXZlVGFza0lEcy5wdXNoKGlkKTtcbiAgICB9LFxuICAgIHJlbW92ZVRhc2tJRDogKGlkKSA9PiB7XG4gICAgICAgIGFjdGl2ZVRhc2tJRHMuc3BsaWNlKGFjdGl2ZVRhc2tJRHMuaW5kZXhPZihpZCksIDEpO1xuICAgIH0sXG4gICAgYWRkUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMucHVzaChwcm9qKTtcbiAgICAgICAgYWN0aXZlUHJvaklEcy5wdXNoKHByb2ouZ2V0SUQoKSk7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHM7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0OiAocHJvaklEKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0c1tnZXRJbmRleEJ5SUQocHJvaklEKV07XG4gICAgfSxcbiAgICBjaGVja1Byb2plY3ROYW1lOiAocHJvak5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2plY3RzLnNvbWUocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvak5hbWUpO1xuICAgIH0sXG4gICAgdXBkYXRlUHJvamVjdChwcm9qSUQsIG5ld1Byb2opIHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGdldEluZGV4QnlJRChwcm9qSUQpLCAxLCBuZXdQcm9qKTtcbiAgICB9LFxuICAgIHVwZGF0ZVByb2plY3ROYW1lOiAocHJvaklELCBuZXdQcm9qTmFtZSkgPT4ge1xuICAgICAgICBhY3RpdmVQcm9qZWN0c1tnZXRJbmRleEJ5SUQocHJvaklEKV0uc2V0TmFtZShuZXdQcm9qTmFtZSk7XG4gICAgfSxcbiAgICBkZWxldGVQcm9qZWN0OiAocHJvaklEKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnNwbGljZShhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBwcm9qLmdldElEKCkgPT09IHByb2pJRCksIDEpO1xuICAgICAgICBhY3RpdmVQcm9qSURzLnNwbGljZShhY3RpdmVQcm9qSURzLmluZGV4T2YocHJvaklEKSwgMSlcbiAgICB9LFxuICAgIGdlbmVyYXRlVGFza0lEOiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpZiAoYWN0aXZlVGFza0lEcy5sZW5ndGggPj0gVEFTS19MSU1JVCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgbGV0IHJhbmQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHJhbmQgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIFRBU0tfTElNSVQpO1xuICAgICAgICB9IHdoaWxlIChTdG9yYWdlLnRhc2tJRF9leGlzdHMoYHRhc2ske3JhbmR9YCkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGB0YXNrJHtyYW5kfWA7XG4gICAgfSxcbiAgICBnZW5lcmF0ZVByb2pJRDogKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlUHJvaklEcy5sZW5ndGggPj0gUFJPSl9MSU1JVCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCByYW5kO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICByYW5kID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBQUk9KX0xJTUlUKTtcbiAgICAgICAgfSB3aGlsZSAoU3RvcmFnZS5wcm9qSURfZXhpc3RzKGBwcm9qJHtyYW5kfWApKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgcHJvaiR7cmFuZH1gO1xuXG4gICAgfSxcbiAgICBwcm9qSURfZXhpc3RzOiAoaWQpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2pJRHMuaW5jbHVkZXMoaWQpO1xuICAgIH0sXG4gICAgdGFza0lEX2V4aXN0czogKGlkKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVUYXNrSURzLmluY2x1ZGVzKGlkKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHsgU3RvcmFnZSB9IiwiLyogVGFzay5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIHRhc2sgb2JqZWN0IGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9uc1xuXG4qL1xuaW1wb3J0IHsgZm9ybWF0SVNPIH0gZnJvbSAnZGF0ZS1mbnMnXG5cbmNvbnN0IFRhc2sgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAvLyBBbGwgdGFza3MgZGVmYXVsdCB0byBpbmJveCB1cG9uIGNyZWF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGdldElEKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9LFxuICAgICAgICBnZXRUaXRsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXREZXNjcmlwdGlvbihkZXNjKSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgIH0sXG4gICAgICAgIGdldERhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGF0ZShuZXdEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0UHJpb3JpdHkocHJpKSB7XG4gICAgICAgICAgICBwcmlvcml0eSA9IHByaTtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlKG5ld1RpdGxlLCBuZXdEZXNjLCBuZXdEYXRlLCBuZXdQcmlvcml0eSkge1xuICAgICAgICAgICAgdGhpcy5zZXRUaXRsZShuZXdUaXRsZSk7XG4gICAgICAgICAgICB0aGlzLnNldERlc2NyaXB0aW9uKG5ld0Rlc2MpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRlKG5ld0RhdGUpO1xuICAgICAgICAgICAgdGhpcy5zZXRQcmlvcml0eShuZXdQcmlvcml0eSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG8pO1xufVxuXG5jb25zdCBTY2hlZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXREYXRlVG9kYXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0SVNPKHRvZGF5LCB7IHJlcHJlc2VudGF0aW9uOiAnZGF0ZSd9KTtcbiAgICAgICAgfSxcblxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFRhc2ssIFNjaGVkdWxlIH07IiwiLy8gTW9kdWxlIHJlc3BvbnNpYmxpYmlsaXRpZXM6XG4vLyAtIEhhbmRsZXMgdXBkYXRpbmcgRE9NIGVsZW1lbnRzXG4vLyAtIFVwZGF0ZXMgRE9NIHdpdGggY3VycmVudCBhY3RpdmUgcHJvamVjdHMgLyB0YXNrc1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlQWRkUHJvaiwgY3JlYXRlVGFzaywgY3JlYXRlSFIsIGNyZWF0ZUFkZFRhc2ssIGNyZWF0ZUFkZFRhc2tGb3JtIH0gZnJvbSAnLi9jcmVhdGVET00nXG5pbXBvcnQgeyBzZXR1cFByb2pFdmVudExpc3RlbmVycywgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2V2ZW50TGlzdGVuZXJzJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgeyBnZXRUYXNrcyB9IGZyb20gJy4vYXBwTG9naWMnXG5cbmNvbnN0IHVwZGF0ZVByb2plY3RMaXN0ID0gKCkgPT4ge1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2pJdGVtJykuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVtb3ZlKCkpO1xuXG4gICAgY29uc3QgcmVmTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRQcm9qJyk7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IHJlZk5vZGUucGFyZW50Tm9kZTtcblxuICAgIFN0b3JhZ2UuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2ogPT4gcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY3JlYXRlUHJvamVjdChwcm9qKSwgcmVmTm9kZSkpO1xuXG4gICAgc2V0dXBQcm9qRXZlbnRMaXN0ZW5lcnMoKTtcbn1cbmNvbnN0IHVwZGF0ZVRhc2tMaXN0ID0gKHByb2pJRCkgPT4ge1xuXG4gICAgY2xvc2VUYXNrRm9ybXMocHJvaklEKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza0l0ZW0nKS5mb3JFYWNoKHRhc2sgPT4gdGFzay5yZW1vdmUoKSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaHInKS5mb3JFYWNoKGhyID0+IGhyLnJlbW92ZSgpKTtcblxuICAgIGNvbnN0IHJlZk5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkVGFzaycpO1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSByZWZOb2RlLnBhcmVudE5vZGU7XG5cbiAgICBjb25zdCBhY3RpdmVUYXNrcyA9IGdldFRhc2tzKHByb2pJRCk7XG5cbiAgICBhY3RpdmVUYXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjcmVhdGVUYXNrKHRhc2spLCByZWZOb2RlKTtcbiAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY3JlYXRlSFIoKSwgcmVmTm9kZSk7XG4gICAgfSk7XG5cbiAgICAvLyBMYXRlclxuICAgIHNldHVwVGFza0V2ZW50TGlzdGVuZXJzKCk7XG59XG5jb25zdCBjbG9zZUFsbEZvcm1zID0gKHByb2pJRCkgPT4ge1xuICAgIGNsb3NlUHJvakZvcm1zKCk7XG4gICAgY2xvc2VUYXNrRm9ybXMocHJvaklEKTtcbn1cbmNvbnN0IGNsb3NlUHJvakZvcm1zID0gKCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IHByb2pGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qRm9ybScpO1xuICAgIFxuICAgIHByb2pGb3Jtcy5mb3JFYWNoKHByb2pGb3JtID0+IHtcbiAgICAgICAgY29uc3QgcHJvaklEID0gcHJvakZvcm0uaWQuc2xpY2UoMCwgLTQpO1xuICAgICAgICBjb25zdCBwcm9qID0gU3RvcmFnZS5nZXRQcm9qZWN0KHByb2pJRCk7XG4gICAgICAgIGNvbnN0IGxpTm9kZSA9IHByb2ogPyBjcmVhdGVQcm9qZWN0KHByb2opLmZpcnN0Q2hpbGQgOiBjcmVhdGVBZGRQcm9qKCkuZmlyc3RDaGlsZDtcbiAgICAgICAgXG4gICAgICAgIHByb2pGb3JtLnJlcGxhY2VXaXRoKGxpTm9kZSk7XG4gICAgfSlcblxuICAgIHNldHVwUHJvakV2ZW50TGlzdGVuZXJzKCk7XG59XG5jb25zdCBjbG9zZVRhc2tGb3JtcyA9IChwcm9qSUQpID0+IHtcbiAgICBjb25zdCB0YXNrRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza0Zvcm0nKTtcblxuICAgIHRhc2tGb3Jtcy5mb3JFYWNoKHRhc2tGb3JtID0+IHtcbiAgICAgICAgY29uc3QgdGFza0lEID0gdGFza0Zvcm0uaWQuc2xpY2UoMCwgLTQpO1xuICAgICAgICBjb25zdCB0YXNrID0gU3RvcmFnZS5nZXRQcm9qZWN0KHByb2pJRCkuZ2V0VGFzayh0YXNrSUQpO1xuICAgICAgICBjb25zdCB0YXNrRElWID0gdGFzayA/IGNyZWF0ZVRhc2sodGFzaykgOiBjcmVhdGVBZGRUYXNrKCk7XG5cbiAgICAgICAgdGFza0Zvcm0ucmVwbGFjZVdpdGgodGFza0RJVik7XG4gICAgfSlcblxuICAgIHNldHVwVGFza0V2ZW50TGlzdGVuZXJzKCk7XG59XG5jb25zdCByZW1vdmVUYXNrRm9ybSA9ICh0YXNrRm9ybSkgPT4ge1xuICAgIHRhc2tGb3JtLnJlcGxhY2VXaXRoKGNyZWF0ZUFkZFRhc2soKSk7XG59XG5cbmV4cG9ydCB7IHVwZGF0ZVByb2plY3RMaXN0LCB1cGRhdGVUYXNrTGlzdCwgY2xvc2VBbGxGb3JtcywgY2xvc2VQcm9qRm9ybXMsIGNsb3NlVGFza0Zvcm1zLCByZW1vdmVUYXNrRm9ybSB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcblxuLSBUYXNrc1xuICAgIC0gU2VwZXJhdGUgbW9kdWxlXG4gICAgLSBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRhc2tcbiAgICAtIFByb3BlcnRpZXM6IFxuICAgICAgICAtIHRpdGxlXG4gICAgICAgIC0gZGVzY3JpcHRpb25cbiAgICAgICAgLSBkdWUgZGF0ZVxuICAgICAgICAtIHByaW9yaXR5XG4gICAgICAgIC0gaXNDb21wbGV0ZVxuICAgIC0gZnVuY3Rpb25zXG4gICAgICAgIC0gY2hhbmdlIHByb3BlcnRpZXNcbi0gUHJvamVjdHNcbiAgICAtIGNvbnRhaW5zIG1hbnkgdGFza3NcbiAgICAtIHByb3BlcnRpZXM6XG4gICAgICAgIC0gXG4tIERPTVxuXG5cbiovXG5cbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL21vZHVsZXMvc3RvcmFnZS5qcydcbmltcG9ydCB7IFByb2plY3QsIEluYm94IH0gZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9tb2R1bGVzL3Rhc2suanMnXG5pbXBvcnQgeyBsb2FkQXBwIH0gZnJvbSAnLi9tb2R1bGVzL2FwcExvZ2ljJ1xuXG5jb25zdCByZW5kZXIgPSAoKCkgPT4ge1xuICAgIFxuICAgIC8vIHNhbXBsZSBwcm9qZWN0c1xuICAgIGNvbnN0IGluYm94ID0gSW5ib3goKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoaW5ib3gpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdwcm9qMScsICdDbGVhbmluZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgncHJvajInLCAnUGFja2luZycpKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdCgncHJvajMnLCAnTW9wcGluZycpKTtcblxuICAgIC8vIHNhbXBsZSBpbmJveCB0YXNrc1xuICAgIGNvbnN0IHRhc2sxID0gVGFzaygndGFzazEnLCAnR2FyYmFnZScsICdUYWtlIGdhcmJhZ2Ugb3V0IHRvIHN0cmVldCcsJ0RlYyA4JywgJ3AxJyk7XG4gICAgY29uc3QgdGFzazIgPSBUYXNrKCd0YXNrMicsICdCYXRocm9vbSBGbG9vcnMnLCAnQ2xlYW4gYmF0aHJvb20gZmxvb3JzJywnRGVjIDknLCAncDInKTtcbiAgICBjb25zdCB0YXNrMyA9IFRhc2soJ3Rhc2szJywgJ0tpdGNoZW4gRmxvb3JzJywgJ0NsZWFuIGtpdGNoZW4gZmxvb3JzJywnV2VkbmVzZGF5JywgJ3AzJyk7XG4gICAgXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0KGluYm94LmdldElEKCkpLmFkZFRhc2sodGFzazEpO1xuICAgIFN0b3JhZ2UuZ2V0UHJvamVjdChpbmJveC5nZXRJRCgpKS5hZGRUYXNrKHRhc2syKTtcbiAgICBTdG9yYWdlLmdldFByb2plY3QoaW5ib3guZ2V0SUQoKSkuYWRkVGFzayh0YXNrMyk7XG5cbiAgICBTdG9yYWdlLmFkZFRhc2tJRCgndGFzazEnKTtcbiAgICBTdG9yYWdlLmFkZFRhc2tJRCgndGFzazInKTtcbiAgICBTdG9yYWdlLmFkZFRhc2tJRCgndGFzazMnKTtcbiBcbiAgICBsb2FkQXBwKCk7XG5cbn0pKCk7XG5cbnJlbmRlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==