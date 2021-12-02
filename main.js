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
/* harmony export */   "displayProject": () => (/* binding */ displayProject),
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
const displayProject = (event) => {

    ;(0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.closeAllForms)(currActiveProjID);

    const projID = event.target.id.slice(0, -2);
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateTaskList)(projID);
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
    (0,_updateDOM__WEBPACK_IMPORTED_MODULE_0__.updateTaskList)('projInbox');

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
    const projNodes = document.querySelectorAll('.projItem li');
    const editNodes = document.querySelectorAll('.projItem .fa-edit');
    const delNodes = document.querySelectorAll('.projItem .fa-trash-alt');
    const addProjLI = document.querySelector('#addProjectLI');

    projNodes.forEach(projNode => projNode.addEventListener('click', _appLogic__WEBPACK_IMPORTED_MODULE_0__.displayProject))
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

    const mainHeader = document.querySelector('#mainHeader');
    const refNode = document.querySelector('#addTask');
    const parentNode = refNode.parentNode;

    const activeTasks = (0,_appLogic__WEBPACK_IMPORTED_MODULE_3__.getTasks)(projID);

    activeTasks.forEach(task => {
        parentNode.insertBefore((0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createTask)(task), refNode);
        parentNode.insertBefore((0,_createDOM__WEBPACK_IMPORTED_MODULE_0__.createHR)(), refNode);
    });
    mainHeader.textContent = _storage__WEBPACK_IMPORTED_MODULE_2__.Storage.getProject(projID).getName();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly9Ub2RvLUxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXRJU08vaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1ZhbGlkL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vdG9EYXRlL2luZGV4LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL2FwcExvZ2ljLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZURPTS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvbW9kdWxlcy91cGRhdGVET00uanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIHRhcmdldExlbmd0aCkge1xuICB2YXIgc2lnbiA9IG51bWJlciA8IDAgPyAnLScgOiAnJztcbiAgdmFyIG91dHB1dCA9IE1hdGguYWJzKG51bWJlcikudG9TdHJpbmcoKTtcblxuICB3aGlsZSAob3V0cHV0Lmxlbmd0aCA8IHRhcmdldExlbmd0aCkge1xuICAgIG91dHB1dCA9ICcwJyArIG91dHB1dDtcbiAgfVxuXG4gIHJldHVybiBzaWduICsgb3V0cHV0O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVpcmVkQXJncyhyZXF1aXJlZCwgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocmVxdWlyZWQgKyAnIGFyZ3VtZW50JyArIChyZXF1aXJlZCA+IDEgPyAncycgOiAnJykgKyAnIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJncy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGlzVmFsaWQgZnJvbSBcIi4uL2lzVmFsaWQvaW5kZXguanNcIjtcbmltcG9ydCBhZGRMZWFkaW5nWmVyb3MgZnJvbSBcIi4uL19saWIvYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGZvcm1hdElTT1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBGb3JtYXQgdGhlIGRhdGUgYWNjb3JkaW5nIHRvIHRoZSBJU08gODYwMSBzdGFuZGFyZCAoaHR0cDovL3N1cHBvcnQuc2FzLmNvbS9kb2N1bWVudGF0aW9uL2NkbC9lbi9scmRpY3QvNjQzMTYvSFRNTC9kZWZhdWx0L3ZpZXdlci5odG0jYTAwMzE2OTgxNC5odG0pLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gSVNPIDg2MDEgZm9ybWF0LiBPcHRpb25zIG1heSBiZSBwYXNzZWQgdG8gY29udHJvbCB0aGUgcGFydHMgYW5kIG5vdGF0aW9ucyBvZiB0aGUgZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHsnZXh0ZW5kZWQnfCdiYXNpYyd9IFtvcHRpb25zLmZvcm1hdD0nZXh0ZW5kZWQnXSAtIGlmICdiYXNpYycsIGhpZGUgZGVsaW1pdGVycyBiZXR3ZWVuIGRhdGUgYW5kIHRpbWUgdmFsdWVzLlxuICogQHBhcmFtIHsnY29tcGxldGUnfCdkYXRlJ3wndGltZSd9IFtvcHRpb25zLnJlcHJlc2VudGF0aW9uPSdjb21wbGV0ZSddIC0gZm9ybWF0IGRhdGUsIHRpbWUgd2l0aCB0aW1lIHpvbmUsIG9yIGJvdGguXG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmZvcm1hdGAgbXVzdCBiZSAnZXh0ZW5kZWQnIG9yICdiYXNpYydcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLnJlcHJlc2VuYXRpb25gIG11c3QgYmUgJ2RhdGUnLCAndGltZScgb3IgJ2NvbXBsZXRlJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMTggU2VwdGVtYmVyIDIwMTkgaW4gSVNPIDg2MDEgZm9ybWF0IChVVEMpOlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0SVNPKG5ldyBEYXRlKDIwMTksIDgsIDE4LCAxOSwgMCwgNTIpKVxuICogLy89PiAnMjAxOS0wOS0xOFQxOTowMDo1MlonXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxOCBTZXB0ZW1iZXIgMjAxOSBpbiBJU08gODYwMSwgc2hvcnQgZm9ybWF0IChVVEMpOlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0SVNPKG5ldyBEYXRlKDIwMTksIDgsIDE4LCAxOSwgMCwgNTIpLCB7IGZvcm1hdDogJ2Jhc2ljJyB9KVxuICogLy89PiAnMjAxOTA5MThUMTkwMDUyJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMTggU2VwdGVtYmVyIDIwMTkgaW4gSVNPIDg2MDEgZm9ybWF0LCBkYXRlIG9ubHk6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXRJU08obmV3IERhdGUoMjAxOSwgOCwgMTgsIDE5LCAwLCA1MiksIHsgcmVwcmVzZW50YXRpb246ICdkYXRlJyB9KVxuICogLy89PiAnMjAxOS0wOS0xOCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDE4IFNlcHRlbWJlciAyMDE5IGluIElTTyA4NjAxIGZvcm1hdCwgdGltZSBvbmx5IChVVEMpOlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0SVNPKG5ldyBEYXRlKDIwMTksIDgsIDE4LCAxOSwgMCwgNTIpLCB7IHJlcHJlc2VudGF0aW9uOiAndGltZScgfSlcbiAqIC8vPT4gJzE5OjAwOjUyWidcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXRJU08oZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIjEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IFwiLmNvbmNhdChhcmd1bWVudHMubGVuZ3RoLCBcIiBwcmVzZW50XCIpKTtcbiAgfVxuXG4gIHZhciBvcmlnaW5hbERhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcblxuICBpZiAoIWlzVmFsaWQob3JpZ2luYWxEYXRlKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICB2YXIgZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgPT0gbnVsbCA/ICdleHRlbmRlZCcgOiBTdHJpbmcob3B0aW9ucy5mb3JtYXQpO1xuICB2YXIgcmVwcmVzZW50YXRpb24gPSBvcHRpb25zLnJlcHJlc2VudGF0aW9uID09IG51bGwgPyAnY29tcGxldGUnIDogU3RyaW5nKG9wdGlvbnMucmVwcmVzZW50YXRpb24pO1xuXG4gIGlmIChmb3JtYXQgIT09ICdleHRlbmRlZCcgJiYgZm9ybWF0ICE9PSAnYmFzaWMnKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSAnZXh0ZW5kZWQnIG9yICdiYXNpYydcIik7XG4gIH1cblxuICBpZiAocmVwcmVzZW50YXRpb24gIT09ICdkYXRlJyAmJiByZXByZXNlbnRhdGlvbiAhPT0gJ3RpbWUnICYmIHJlcHJlc2VudGF0aW9uICE9PSAnY29tcGxldGUnKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJyZXByZXNlbnRhdGlvbiBtdXN0IGJlICdkYXRlJywgJ3RpbWUnLCBvciAnY29tcGxldGUnXCIpO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgdHpPZmZzZXQgPSAnJztcbiAgdmFyIGRhdGVEZWxpbWl0ZXIgPSBmb3JtYXQgPT09ICdleHRlbmRlZCcgPyAnLScgOiAnJztcbiAgdmFyIHRpbWVEZWxpbWl0ZXIgPSBmb3JtYXQgPT09ICdleHRlbmRlZCcgPyAnOicgOiAnJzsgLy8gUmVwcmVzZW50YXRpb24gaXMgZWl0aGVyICdkYXRlJyBvciAnY29tcGxldGUnXG5cbiAgaWYgKHJlcHJlc2VudGF0aW9uICE9PSAndGltZScpIHtcbiAgICB2YXIgZGF5ID0gYWRkTGVhZGluZ1plcm9zKG9yaWdpbmFsRGF0ZS5nZXREYXRlKCksIDIpO1xuICAgIHZhciBtb250aCA9IGFkZExlYWRpbmdaZXJvcyhvcmlnaW5hbERhdGUuZ2V0TW9udGgoKSArIDEsIDIpO1xuICAgIHZhciB5ZWFyID0gYWRkTGVhZGluZ1plcm9zKG9yaWdpbmFsRGF0ZS5nZXRGdWxsWWVhcigpLCA0KTsgLy8geXl5eU1NZGQgb3IgeXl5eS1NTS1kZC5cblxuICAgIHJlc3VsdCA9IFwiXCIuY29uY2F0KHllYXIpLmNvbmNhdChkYXRlRGVsaW1pdGVyKS5jb25jYXQobW9udGgpLmNvbmNhdChkYXRlRGVsaW1pdGVyKS5jb25jYXQoZGF5KTtcbiAgfSAvLyBSZXByZXNlbnRhdGlvbiBpcyBlaXRoZXIgJ3RpbWUnIG9yICdjb21wbGV0ZSdcblxuXG4gIGlmIChyZXByZXNlbnRhdGlvbiAhPT0gJ2RhdGUnKSB7XG4gICAgLy8gQWRkIHRoZSB0aW1lem9uZS5cbiAgICB2YXIgb2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICBpZiAob2Zmc2V0ICE9PSAwKSB7XG4gICAgICB2YXIgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgdmFyIGhvdXJPZmZzZXQgPSBhZGRMZWFkaW5nWmVyb3MoTWF0aC5mbG9vcihhYnNvbHV0ZU9mZnNldCAvIDYwKSwgMik7XG4gICAgICB2YXIgbWludXRlT2Zmc2V0ID0gYWRkTGVhZGluZ1plcm9zKGFic29sdXRlT2Zmc2V0ICUgNjAsIDIpOyAvLyBJZiBsZXNzIHRoYW4gMCwgdGhlIHNpZ24gaXMgKywgYmVjYXVzZSBpdCBpcyBhaGVhZCBvZiB0aW1lLlxuXG4gICAgICB2YXIgc2lnbiA9IG9mZnNldCA8IDAgPyAnKycgOiAnLSc7XG4gICAgICB0ek9mZnNldCA9IFwiXCIuY29uY2F0KHNpZ24pLmNvbmNhdChob3VyT2Zmc2V0LCBcIjpcIikuY29uY2F0KG1pbnV0ZU9mZnNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR6T2Zmc2V0ID0gJ1onO1xuICAgIH1cblxuICAgIHZhciBob3VyID0gYWRkTGVhZGluZ1plcm9zKG9yaWdpbmFsRGF0ZS5nZXRIb3VycygpLCAyKTtcbiAgICB2YXIgbWludXRlID0gYWRkTGVhZGluZ1plcm9zKG9yaWdpbmFsRGF0ZS5nZXRNaW51dGVzKCksIDIpO1xuICAgIHZhciBzZWNvbmQgPSBhZGRMZWFkaW5nWmVyb3Mob3JpZ2luYWxEYXRlLmdldFNlY29uZHMoKSwgMik7IC8vIElmIHRoZXJlJ3MgYWxzbyBkYXRlLCBzZXBhcmF0ZSBpdCB3aXRoIHRpbWUgd2l0aCAnVCdcblxuICAgIHZhciBzZXBhcmF0b3IgPSByZXN1bHQgPT09ICcnID8gJycgOiAnVCc7IC8vIENyZWF0ZXMgYSB0aW1lIHN0cmluZyBjb25zaXN0aW5nIG9mIGhvdXIsIG1pbnV0ZSwgYW5kIHNlY29uZCwgc2VwYXJhdGVkIGJ5IGRlbGltaXRlcnMsIGlmIGRlZmluZWQuXG5cbiAgICB2YXIgdGltZSA9IFtob3VyLCBtaW51dGUsIHNlY29uZF0uam9pbih0aW1lRGVsaW1pdGVyKTsgLy8gSEhtbXNzIG9yIEhIOm1tOnNzLlxuXG4gICAgcmVzdWx0ID0gXCJcIi5jb25jYXQocmVzdWx0KS5jb25jYXQoc2VwYXJhdG9yKS5jb25jYXQodGltZSkuY29uY2F0KHR6T2Zmc2V0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNEYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiB2YWx1ZSBhIGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGUuIFRoZSBmdW5jdGlvbiB3b3JrcyBmb3IgZGF0ZXMgdHJhbnNmZXJyZWQgYWNyb3NzIGlmcmFtZXMuXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBkYXRlXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYW4gaW52YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKE5hTikpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHNvbWUgdmFsdWU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoJzIwMTQtMDItMzEnKVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYW4gb2JqZWN0OlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKHt9KVxuICogLy89PiBmYWxzZVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJztcbn0iLCJpbXBvcnQgaXNEYXRlIGZyb20gXCIuLi9pc0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNWYWxpZFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB2YWxpZD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgZmFsc2UgaWYgYXJndW1lbnQgaXMgSW52YWxpZCBEYXRlIGFuZCB0cnVlIG90aGVyd2lzZS5cbiAqIEFyZ3VtZW50IGlzIGNvbnZlcnRlZCB0byBEYXRlIHVzaW5nIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGV9XG4gKiBJbnZhbGlkIERhdGUgaXMgYSBEYXRlLCB3aG9zZSB0aW1lIHZhbHVlIGlzIE5hTi5cbiAqXG4gKiBUaW1lIHZhbHVlIG9mIERhdGU6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuOS4xLjFcbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIC0gTm93IGBpc1ZhbGlkYCBkb2Vzbid0IHRocm93IGFuIGV4Y2VwdGlvblxuICogICBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbm90IGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKiAgIEluc3RlYWQsIGFyZ3VtZW50IGlzIGNvbnZlcnRlZCBiZWZvcmVoYW5kIHVzaW5nIGB0b0RhdGVgLlxuICpcbiAqICAgRXhhbXBsZXM6XG4gKlxuICogICB8IGBpc1ZhbGlkYCBhcmd1bWVudCAgICAgICAgfCBCZWZvcmUgdjIuMC4wIHwgdjIuMC4wIG9ud2FyZCB8XG4gKiAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLXxcbiAqICAgfCBgbmV3IERhdGUoKWAgICAgICAgICAgICAgIHwgYHRydWVgICAgICAgICB8IGB0cnVlYCAgICAgICAgfFxuICogICB8IGBuZXcgRGF0ZSgnMjAxNi0wMS0wMScpYCAgfCBgdHJ1ZWAgICAgICAgIHwgYHRydWVgICAgICAgICB8XG4gKiAgIHwgYG5ldyBEYXRlKCcnKWAgICAgICAgICAgICB8IGBmYWxzZWAgICAgICAgfCBgZmFsc2VgICAgICAgIHxcbiAqICAgfCBgbmV3IERhdGUoMTQ4ODM3MDgzNTA4MSlgIHwgYHRydWVgICAgICAgICB8IGB0cnVlYCAgICAgICAgfFxuICogICB8IGBuZXcgRGF0ZShOYU4pYCAgICAgICAgICAgfCBgZmFsc2VgICAgICAgIHwgYGZhbHNlYCAgICAgICB8XG4gKiAgIHwgYCcyMDE2LTAxLTAxJ2AgICAgICAgICAgICB8IGBUeXBlRXJyb3JgICAgfCBgZmFsc2VgICAgICAgIHxcbiAqICAgfCBgJydgICAgICAgICAgICAgICAgICAgICAgIHwgYFR5cGVFcnJvcmAgICB8IGBmYWxzZWAgICAgICAgfFxuICogICB8IGAxNDg4MzcwODM1MDgxYCAgICAgICAgICAgfCBgVHlwZUVycm9yYCAgIHwgYHRydWVgICAgICAgICB8XG4gKiAgIHwgYE5hTmAgICAgICAgICAgICAgICAgICAgICB8IGBUeXBlRXJyb3JgICAgfCBgZmFsc2VgICAgICAgIHxcbiAqXG4gKiAgIFdlIGludHJvZHVjZSB0aGlzIGNoYW5nZSB0byBtYWtlICpkYXRlLWZucyogY29uc2lzdGVudCB3aXRoIEVDTUFTY3JpcHQgYmVoYXZpb3JcbiAqICAgdGhhdCB0cnkgdG8gY29lcmNlIGFyZ3VtZW50cyB0byB0aGUgZXhwZWN0ZWQgdHlwZVxuICogICAod2hpY2ggaXMgYWxzbyB0aGUgY2FzZSB3aXRoIG90aGVyICpkYXRlLWZucyogZnVuY3Rpb25zKS5cbiAqXG4gKiBAcGFyYW0geyp9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHZhbGlkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgyMDE0LCAxLCAzMSkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWx1ZSwgY29udmVydGFibGUgaW50byBhIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKDEzOTM4MDQ4MDAwMDApXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKCcnKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1ZhbGlkKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcblxuICBpZiAoIWlzRGF0ZShkaXJ0eURhdGUpICYmIHR5cGVvZiBkaXJ0eURhdGUgIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgcmV0dXJuICFpc05hTihOdW1iZXIoZGF0ZSkpO1xufSIsImltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpOyAvLyBDbG9uZSB0aGUgZGF0ZVxuXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIGFyZ3VtZW50ID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdC5pby9manVsZVwiKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgY29uc29sZS53YXJuKG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RMaXN0LCB1cGRhdGVUYXNrTGlzdCwgY2xvc2VBbGxGb3JtcywgcmVtb3ZlVGFza0Zvcm0gfSBmcm9tICcuL3VwZGF0ZURPTSdcbmltcG9ydCB7IGNyZWF0ZURPTSwgY3JlYXRlQWRkUHJvaiwgY3JlYXRlUHJvakZvcm0sIGNyZWF0ZUFkZFRhc2tGb3JtIH0gZnJvbSAnLi9jcmVhdGVET00nXG5pbXBvcnQgeyBzZXR1cEFsbEV2ZW50TGlzdGVuZXJzLCBzZXR1cFByb2pFdmVudExpc3RlbmVycywgc2V0dXBQcm9qRm9ybUxpc3RlbmVyLCBzZXR1cFRhc2tGb3JtTGlzdGVuZXIgfSBmcm9tICcuL2V2ZW50TGlzdGVuZXJzJ1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrJ1xuXG5sZXQgY3VyckFjdGl2ZVByb2pJRCA9ICdwcm9qSW5ib3gnO1xuXG5jb25zdCBsb2FkQXBwID0gKCkgPT4ge1xuICAgIGNyZWF0ZURPTSgpO1xuICAgIHVwZGF0ZVByb2plY3RMaXN0KCk7XG4gICAgdXBkYXRlVGFza0xpc3QoY3VyckFjdGl2ZVByb2pJRCk7XG59XG5jb25zdCBkaXNwbGF5UHJvamVjdCA9IChldmVudCkgPT4ge1xuXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IHByb2pJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLCAtMik7XG4gICAgdXBkYXRlVGFza0xpc3QocHJvaklEKTtcbn1cbmNvbnN0IGVkaXRQcm9qZWN0ID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IGN1cnJQcm9qSUQgPSBldmVudC50YXJnZXQuaWQuc2xpY2UoMCwtNCk7XG4gICAgY29uc3QgbGlOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y3VyclByb2pJRH1MSWApO1xuICAgIGNvbnN0IHByb2pGb3JtID0gY3JlYXRlUHJvakZvcm0oY3VyclByb2pJRCk7XG4gICAgbGlOb2RlLnJlcGxhY2VXaXRoKHByb2pGb3JtKTtcblxuICAgIHNldHVwUHJvakZvcm1MaXN0ZW5lcihwcm9qRm9ybSk7XG5cbn1cbmNvbnN0IHN1Ym1pdFByb2plY3QgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByb2pJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLC00KTtcbiAgICBjb25zdCBuZXdQcm9qTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qSW5wdXQnKS52YWx1ZTtcbiAgICBjb25zdCB1bEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvakxpc3QnKTtcblxuICAgIGlmIChTdG9yYWdlLmNoZWNrUHJvamVjdE5hbWUobmV3UHJvak5hbWUpKSB7XG4gICAgICAgIGFsZXJ0KCdQcm9qZWN0IG5hbWUgZXhpc3RzJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpKSB7XG4gICAgICAgIFN0b3JhZ2UudXBkYXRlUHJvamVjdE5hbWUocHJvaklELCBuZXdQcm9qTmFtZSk7ICBcbiAgICB9IGVsc2Uge1xuICAgICAgICBTdG9yYWdlLmFkZFByb2plY3QoUHJvamVjdChwcm9qSUQsIG5ld1Byb2pOYW1lKSk7XG4gICAgICAgIFxuICAgICAgICAvLyBtb3ZlIGJlbG93IHR3byBsaW5lcyBvZiBjb2RlIHRvIHVwZGF0ZURPTVxuICAgICAgICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgdWxFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUFkZFByb2ooKSk7XG4gICAgfVxuICAgIHVwZGF0ZVByb2plY3RMaXN0KCk7XG59XG5jb25zdCBkZWxldGVQcm9qZWN0ID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY2xvc2VBbGxGb3JtcyhjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IHByb2pJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLCAtMyk7XG4gICAgU3RvcmFnZS5kZWxldGVQcm9qZWN0KHByb2pJRCk7XG5cbiAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgIHVwZGF0ZVRhc2tMaXN0KCdwcm9qSW5ib3gnKTtcblxufVxuY29uc3QgYWRkUHJvamVjdCA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIGNsb3NlQWxsRm9ybXMoY3VyckFjdGl2ZVByb2pJRCk7XG5cbiAgICBjb25zdCBhZGRQcm9qTEkgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgcHJvaklEID0gU3RvcmFnZS5nZW5lcmF0ZVByb2pJRCgpO1xuICAgIGNvbnN0IHByb2pGb3JtID0gY3JlYXRlUHJvakZvcm0ocHJvaklEKTtcblxuICAgIGFkZFByb2pMSS5yZXBsYWNlV2l0aChwcm9qRm9ybSk7XG4gICAgc2V0dXBQcm9qRm9ybUxpc3RlbmVyKHByb2pGb3JtKTtcbiAgICBcblxufVxuY29uc3QgZ2V0VGFza3MgPSAocHJvaklEKSA9PiB7XG4gICAgXG4gICAgY3VyckFjdGl2ZVByb2pJRCA9IHByb2pJRDtcblxuICAgIHJldHVybiBTdG9yYWdlLmdldFByb2plY3QocHJvaklEKS5nZXRUYXNrcygpO1xuXG4gICAgLy8gTGF0ZXI6IFNldHVwIFRvZGF5IGFuZCBUaGlzIHdlZWsgdGFzayBmZXRjaCBsb2dpY1xufVxuY29uc3QgYWRkVGFzayA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIGNsb3NlQWxsRm9ybXMoY3VyckFjdGl2ZVByb2pJRCk7XG5cbiAgICBjb25zdCBhZGRUYXNrRElWID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZFRhc2snKTtcbiAgICBjb25zdCB0YXNrSUQgPSBTdG9yYWdlLmdlbmVyYXRlVGFza0lEKCk7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBjcmVhdGVBZGRUYXNrRm9ybSh0YXNrSUQsIGN1cnJBY3RpdmVQcm9qSUQpO1xuXG4gICAgYWRkVGFza0RJVi5yZXBsYWNlV2l0aCh0YXNrRm9ybSk7XG4gICAgc2V0dXBUYXNrRm9ybUxpc3RlbmVyKGN1cnJBY3RpdmVQcm9qSUQsIHRhc2tGb3JtKTtcblxufVxuY29uc3Qgc3VibWl0VGFzayA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBjdXJyUHJvaiA9IFN0b3JhZ2UuZ2V0UHJvamVjdChjdXJyQWN0aXZlUHJvaklEKTtcblxuICAgIGNvbnN0IHRhc2tJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLCAtNCk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tUaXRsZScpLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tEZXNjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tEZXNjJykudmFsdWU7XG4gICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0RhdGUnKS52YWx1ZTtcblxuICAgIGlmIChjdXJyUHJvai5nZXRUYXNrKHRhc2tJRCkpIHtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IGN1cnJQcm9qLmdldFRhc2sodGFza0lEKTtcbiAgICAgICAgbmV3VGFzay51cGRhdGUodGFza1RpdGxlLCB0YXNrRGVzYywgdGFza0RhdGUpO1xuICAgICAgICBjdXJyUHJvai51cGRhdGVUYXNrKHRhc2tJRCwgbmV3VGFzayk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IFRhc2sodGFza0lELCB0YXNrVGl0bGUsIHRhc2tEZXNjLCB0YXNrRGF0ZSk7XG4gICAgICAgIGN1cnJQcm9qLmFkZFRhc2sobmV3VGFzayk7XG4gICAgICAgIFN0b3JhZ2UuYWRkVGFza0lEKHRhc2tJRCk7XG4gICAgICAgIHJlbW92ZVRhc2tGb3JtKGV2ZW50LnRhcmdldCk7XG4gICAgfVxuXG4gICAgU3RvcmFnZS51cGRhdGVQcm9qZWN0KGN1cnJBY3RpdmVQcm9qSUQsIGN1cnJQcm9qKTtcbiAgICB1cGRhdGVUYXNrTGlzdChjdXJyQWN0aXZlUHJvaklEKTtcblxufVxuY29uc3QgZWRpdFRhc2sgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBjbG9zZUFsbEZvcm1zKGN1cnJBY3RpdmVQcm9qSUQpO1xuXG4gICAgY29uc3QgY3VyclRhc2tJRCA9IGV2ZW50LnRhcmdldC5pZC5zbGljZSgwLCAtNCk7XG4gICAgY29uc3QgY3VyclRhc2tJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y3VyclRhc2tJRH1JVEVNYCk7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBjcmVhdGVBZGRUYXNrRm9ybShjdXJyVGFza0lELCBjdXJyQWN0aXZlUHJvaklEKTtcbiAgICBjdXJyVGFza0l0ZW0ucmVwbGFjZVdpdGgodGFza0Zvcm0pO1xuXG4gICAgc2V0dXBUYXNrRm9ybUxpc3RlbmVyKGN1cnJBY3RpdmVQcm9qSUQsIHRhc2tGb3JtKTtcblxufVxuY29uc3QgZGVsZXRlVGFzayA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIGNsb3NlQWxsRm9ybXMoY3VyckFjdGl2ZVByb2pJRCk7XG5cbiAgICBjb25zdCB0YXNrSUQgPSBldmVudC50YXJnZXQuaWQuc2xpY2UoMCwgLTMpO1xuICAgIC8vIGRlbGV0ZSB0YXNrIGZyb20gcHJvamVjdFxuICAgIGNvbnN0IGFjdGl2ZVByb2ogPSBTdG9yYWdlLmdldFByb2plY3QoY3VyckFjdGl2ZVByb2pJRCk7XG4gICAgYWN0aXZlUHJvai5yZW1vdmVUYXNrKHRhc2tJRCk7XG4gICAgU3RvcmFnZS51cGRhdGVQcm9qZWN0KGN1cnJBY3RpdmVQcm9qSUQsIGFjdGl2ZVByb2opO1xuICAgIC8vIHJlbW92ZSB0YXNrSUQgZnJvbSBzdG9yYWdlXG4gICAgU3RvcmFnZS5yZW1vdmVUYXNrSUQodGFza0lEKTtcbiAgICBcbiAgICB1cGRhdGVUYXNrTGlzdChjdXJyQWN0aXZlUHJvaklEKTtcbn1cblxuZXhwb3J0IHsgbG9hZEFwcCwgZGlzcGxheVByb2plY3QsIGVkaXRQcm9qZWN0LCBzdWJtaXRQcm9qZWN0LCBkZWxldGVQcm9qZWN0LCBhZGRQcm9qZWN0LCBnZXRUYXNrcywgYWRkVGFzaywgc3VibWl0VGFzaywgZWRpdFRhc2ssIGRlbGV0ZVRhc2sgfSIsIi8vIE1vZHVsZSByZXNwb25zaWJsaWJpbGl0aWVzOlxuLy8gLSBCdWlsZHMgRE9NIHVwb24gaW5pdGlhbCBsb2FkXG4vLyAtIENyZWF0ZSBlbGVtZW50cyBhbmQgYWRkIHRvIGRvY3VtZW50XG4vLyAtIExvYWRzIGFjdGl2ZSBwcm9qZWN0cyBhbmQgdGFza3NcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgeyBTY2hlZHVsZSB9IGZyb20gJy4vdGFzaydcblxuY29uc3QgX2NyZWF0ZUVsZW1lbnQgPSAodHlwZSwgY2xhc3NOYW1lQXJyLCB0ZXh0LCBpZCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGlmIChjbGFzc05hbWVBcnIpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVBcnIpO1xuICAgIGlmICh0ZXh0KSBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBpZiAoaWQpIGVsZW1lbnQuaWQgPSBpZDtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmNvbnN0IGNyZWF0ZURPTSA9ICgpID0+IHtcbiAgICBfY3JlYXRlSGVhZGVyKCk7XG4gICAgX2NyZWF0ZVNpZGVCYXIoKTtcbiAgICBfY3JlYXRlTWFpbigpO1xufVxuY29uc3QgX2NyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBcbiAgICBjb25zdCBoZWFkZXJEaXYgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydoZWFkZXJEaXYnXSwgJ1RvLURvIEFwcGxpY2F0aW9uJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmQoaGVhZGVyRGl2KTtcbn1cbmNvbnN0IF9jcmVhdGVTaWRlQmFyID0gKCkgPT4ge1xuICAgICAgICBcbiAgICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGVCYXInKTtcbiAgICBcbiAgICBjb25zdCBuYXZDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddLCcnLCdzaWRlQmFyTmF2Q29udCcpO1xuICAgIGNvbnN0IGluYm94ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnc2lkZUJhckxpbmsnXSwgJ0luYm94Jyk7XG4gICAgY29uc3QgdG9kYXkgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydzaWRlQmFyTGluayddLCAnVG9kYXknKTtcbiAgICBjb25zdCB0aGlzV2VlayA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3NpZGVCYXJMaW5rJ10sICdUaGlzIFdlZWsnKTtcblxuICAgIGNvbnN0IHByb2pDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddLCAnJywgJ3Byb2pDb250Jyk7XG4gICAgY29uc3QgcHJvakhlYWRpbmdDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHByb2pIZWFkaW5nVGV4dCA9IF9jcmVhdGVFbGVtZW50KCdoNCcsIFsnZmxleENvbCddLCAnUHJvamVjdHMnKTtcbiAgICBjb25zdCBwcm9qTGlzdCA9IF9jcmVhdGVFbGVtZW50KCd1bCcsIFsncHJvakxpc3QnXSwgJycsICdwcm9qTGlzdCcpO1xuXG4gICAgcHJvakhlYWRpbmdDb250LmFwcGVuZChwcm9qSGVhZGluZ1RleHQpO1xuICAgIHByb2pMaXN0LmFwcGVuZChjcmVhdGVBZGRQcm9qKCkpO1xuXG4gICAgcHJvakNvbnQuYXBwZW5kKHByb2pIZWFkaW5nQ29udCwgcHJvakxpc3QpO1xuICAgIFxuICAgIG5hdkNvbnQuYXBwZW5kKGluYm94LCB0b2RheSwgdGhpc1dlZWspO1xuXG4gICAgc2lkZUJhci5hcHBlbmQobmF2Q29udCwgcHJvakNvbnQpO1xuXG59XG5jb25zdCBjcmVhdGVBZGRQcm9qID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFByb2pDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsICcnLCAnJywgJ2FkZFByb2onKTtcbiAgICBjb25zdCBhZGRQcm9qTEkgPSBfY3JlYXRlRWxlbWVudCgnbGknLCBbJ25vTWFya2VyJ10sICcrIEFkZCBQcm9qZWN0JywgJ2FkZFByb2plY3RMSScpO1xuICAgIGFkZFByb2pDb250LmFwcGVuZChhZGRQcm9qTEkpO1xuICAgIHJldHVybiBhZGRQcm9qQ29udDtcbn1cbmNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvaikgPT4ge1xuICAgIFxuICAgIGNvbnN0IHByb2pOYW1lID0gcHJvai5nZXROYW1lKCk7XG4gICAgY29uc3QgcHJvaklEID0gcHJvai5nZXRJRCgpO1xuXG4gICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydwcm9qSXRlbSddKTtcbiAgICBjb25zdCBsaU5vZGUgPSBfY3JlYXRlRWxlbWVudCgnbGknLCAnJywgcHJvak5hbWUsIHByb2pJRCArICdMSScpO1xuICAgIGNvbnN0IGVkaXRJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsJ2ZhLWVkaXQnXSwgJycsIHByb2pJRCArICdFRElUJyk7XG4gICAgY29uc3QgZGVsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS10cmFzaC1hbHQnXSwgJycsIHByb2pJRCArICdERUwnKTtcblxuICAgIHByb2plY3RFbGVtZW50LmFwcGVuZChsaU5vZGUsIGVkaXRJY29uLCBkZWxJY29uKTtcblxuICAgIHJldHVybiBwcm9qZWN0RWxlbWVudDtcbn1cbmNvbnN0IGNyZWF0ZVByb2pGb3JtID0gKHByb2pJRCkgPT4ge1xuXG4gICAgY29uc3QgcHJvakZvcm0gPSBfY3JlYXRlRWxlbWVudCgnZm9ybScsIFsncHJvakZvcm0nXSwgJycsIHByb2pJRCArICdGT1JNJyk7XG5cbiAgICBjb25zdCBwcm9qSW5wdXQgPSBfY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2lucHV0UHJvaiddLCAnJywgJ3Byb2pJbnB1dCcpO1xuICAgIHByb2pJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIHByb2pJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgcHJvaklucHV0LnBsYWNlaG9sZGVyID0gJ1Byb2plY3QgTmFtZSc7XG4gICAgcHJvaklucHV0LnZhbHVlID0gU3RvcmFnZS5wcm9qSURfZXhpc3RzKHByb2pJRCkgPyBTdG9yYWdlLmdldFByb2plY3QocHJvaklEKS5nZXROYW1lKCkgOiAnJztcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBfY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJycsICcnLCAgcHJvaklEICsgJ1NBVkUnKTtcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICBjb25zdCBzYXZlSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtc2F2ZSddLCAnJyk7XG4gICAgXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICcnLCAnJywgcHJvaklEICsgJ0NBTkNFTCcpO1xuICAgIGNhbmNlbEJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCAnZmEtd2luZG93LWNsb3NlJ10sICcnKTtcblxuICAgIHNhdmVCdXR0b24uYXBwZW5kKHNhdmVJY29uKTtcbiAgICBjYW5jZWxCdXR0b24uYXBwZW5kQ2hpbGQoY2FuY2VsSWNvbik7XG4gICAgcHJvakZvcm0uYXBwZW5kKHByb2pJbnB1dCwgc2F2ZUJ1dHRvbiwgY2FuY2VsQnV0dG9uKTtcblxuICAgIHJldHVybiBwcm9qRm9ybTtcbn1cbmNvbnN0IF9jcmVhdGVNYWluID0gKCkgPT4ge1xuICAgIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW5Db250ZW50Jyk7XG5cbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2tIZWFkZXInXSwgJycsICcnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBfY3JlYXRlRWxlbWVudCgnaDInLCAnJywgJ0luYm94JywgJ21haW5IZWFkZXInKTtcblxuICAgIGNvbnN0IHRhc2tMaXN0ID0gX2NyZWF0ZUVsZW1lbnQoJ3VsJywgWyd0YXNrTGlzdCddLCAnJywgJ3Rhc2tMaXN0Jyk7XG5cbiAgICB0YXNrTGlzdC5hcHBlbmQoY3JlYXRlQWRkVGFzaygpKTtcblxuICAgIGhlYWRlckNvbnRhaW5lci5hcHBlbmQoaGVhZGVyKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmQoaGVhZGVyQ29udGFpbmVyLCB0YXNrTGlzdCk7XG5cbn1cbmNvbnN0IGNyZWF0ZUFkZFRhc2sgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3QgYWRkQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFzayddLCAnJywgJ2FkZFRhc2snKTtcbiAgICBjb25zdCBhZGRJdGVtTGVmdCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3Rhc2tJdGVtTGVmdCddKTtcbiAgICBjb25zdCBhZGRJY29uID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcycsICdmYS1wbHVzLWNpcmNsZSddKTtcbiAgICBjb25zdCBhZGRUZXh0ID0gX2NyZWF0ZUVsZW1lbnQoJ3AnLCAnJywgJ0FkZCBUYXNrJywgJ2FkZFRleHQnKTtcblxuICAgIGFkZEl0ZW1MZWZ0LmFwcGVuZChhZGRJY29uKTtcbiAgICBhZGRDb250LmFwcGVuZChhZGRJdGVtTGVmdCwgYWRkVGV4dCk7XG5cbiAgICByZXR1cm4gYWRkQ29udDtcbn1cbmNvbnN0IGNyZWF0ZVRhc2sgPSAodGFzaykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tJRCA9IHRhc2suZ2V0SUQoKTtcblxuICAgICAgICBjb25zdCBvdXRlckNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2tJdGVtJ10sICcnLCB0YXNrSUQgKyAnSVRFTScpO1xuICAgICAgICBjb25zdCBjaGVja0NvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWyd0YXNrSXRlbUxlZnQnXSk7XG4gICAgICAgIGNvbnN0IHRhc2tDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCcsICd0YXNrQ29udCddLCAnJywgJycpO1xuXG4gICAgICAgIGNvbnN0IGxpQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAndGFza0xJJ10sICcnLCAnJyk7XG4gICAgICAgIGNvbnN0IGRlc2NQcmV2ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZGVzY1ByZXYnXSwgdGFzay5nZXREZXNjcmlwdGlvbigpLCAnJyk7XG4gICAgICAgIGNvbnN0IHNjaGVkdWxlQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCAnZGVzY1ByZXYnXSk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uQ29udCA9IF9jcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2NsZWFyQnV0dG9uJ10sICcnLCB0YXNrSUQgKyAnQ0hFQ0snKTtcbiAgICAgICAgY29uc3QgY2lyY2xlTWFya2VyID0gX2NyZWF0ZUVsZW1lbnQoJ2knLCBbJ2ZhcicsICdmYS1jaXJjbGUnXSk7XG4gICAgICAgIGNvbnN0IGNoZWNrTWFya2VyID0gX2NyZWF0ZUVsZW1lbnQoJ2knLFsnZmFyJywgJ2ZhLWNoZWNrLWNpcmNsZSddKTtcblxuICAgICAgICAvLyBMQVRFUjogY29uc2lkZXIgbW92aW5nIHRvIGV2ZW50TGlzdGVuZXJzIG1vZHVsZVxuICAgICAgICBidXR0b25Db250Lm9ubW91c2VlbnRlciA9ICgpID0+IHsgXG4gICAgICAgICAgICBjaXJjbGVNYXJrZXIucmVwbGFjZVdpdGgoY2hlY2tNYXJrZXIpO1xuICAgICAgICB9O1xuICAgICAgICBidXR0b25Db250Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHsgXG4gICAgICAgICAgICBjaGVja01hcmtlci5yZXBsYWNlV2l0aChjaXJjbGVNYXJrZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxpTm9kZSA9IF9jcmVhdGVFbGVtZW50KCdsaScsIFsnbm9NYXJrZXInXSwgdGFzay5nZXRUaXRsZSgpKTtcbiAgICAgICAgY29uc3QgZWRpdE5vZGUgPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywnZmEtZWRpdCddLCAnJywgdGFza0lEICsgJ0VESVQnKTtcbiAgICAgICAgY29uc3QgZGVsSWNvbiA9IF9jcmVhdGVFbGVtZW50KCdpJywgWydmYXInLCdmYS10cmFzaC1hbHQnXSwgJycsIHRhc2tJRCArICdERUwnKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNhbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLWNhbGVuZGFyLWFsdCddKTtcbiAgICAgICAgY29uc3QgdGFza0RhdGUgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWyd0YXNrRGF0ZSddLCB0YXNrLmdldERhdGUoKSk7XG5cbiAgICAgICAgYnV0dG9uQ29udC5hcHBlbmQoY2lyY2xlTWFya2VyKTtcbiAgICAgICAgY2hlY2tDb250LmFwcGVuZChidXR0b25Db250KTtcblxuICAgICAgICBsaUNvbnQuYXBwZW5kKGxpTm9kZSwgZWRpdE5vZGUsIGRlbEljb24pO1xuICAgICAgICBzY2hlZHVsZUNvbnQuYXBwZW5kKGNhbEljb24sIHRhc2tEYXRlKTtcbiAgICAgICAgdGFza0NvbnQuYXBwZW5kKGxpQ29udCwgZGVzY1ByZXYsIHNjaGVkdWxlQ29udCk7XG5cbiAgICAgICAgb3V0ZXJDb250LmFwcGVuZChjaGVja0NvbnQsIHRhc2tDb250KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBvdXRlckNvbnQ7XG59XG5jb25zdCBjcmVhdGVIUiA9ICgpID0+IHtcbiAgICByZXR1cm4gX2NyZWF0ZUVsZW1lbnQoJ2hyJyk7XG59XG5cbmNvbnN0IGNyZWF0ZUFkZFRhc2tGb3JtID0gKHRhc2tJRCwgcHJvaklEKSA9PiB7XG5cbiAgICBjb25zdCB0YXNrRm9ybSA9IF9jcmVhdGVFbGVtZW50KCdmb3JtJywgWydmbGV4Q29sJywndGFza0Zvcm0nXSwgJycsIHRhc2tJRCArICdGT1JNJyk7XG5cbiAgICBjb25zdCB0YXNrSW5wdXRDb250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleENvbCddKTtcbiAgICBcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gX2NyZWF0ZUVsZW1lbnQoJ2lucHV0JywgJycsICcnLCAndGFza1RpdGxlJyk7XG4gICAgdGl0bGVJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIHRpdGxlSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIHRpdGxlSW5wdXQucGxhY2Vob2xkZXIgPSAnVGl0bGUnO1xuICAgIFxuICAgIGNvbnN0IGRlc2NJbnB1dCA9IF9jcmVhdGVFbGVtZW50KCdpbnB1dCcsICcnLCAnJywgJ3Rhc2tEZXNjJyk7XG4gICAgZGVzY0lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgZGVzY0lucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBkZXNjSW5wdXQucGxhY2Vob2xkZXIgPSAnRGVzY3JpcHRpb24nO1xuXG4gICAgY29uc3QgdGFza0J1dHRvbkNvbnQgPSBfY3JlYXRlRWxlbWVudCgnZGl2JywgWydmbGV4Um93JywgJ3Rhc2tCdXR0b25Db250J10pO1xuICAgIGNvbnN0IHNjaGVkdWxlQ29udCA9IF9jcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2ZsZXhSb3cnLCd0YXNrQnV0dG9uJ10pO1xuICAgIGNvbnN0IGNhbEljb24gPSBfY3JlYXRlRWxlbWVudCgnaScsIFsnZmFyJywgJ2ZhLWNhbGVuZGFyLWFsdCddKTtcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBfY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2RhdGVJbnB1dCddLCAnU2NoZWR1bGUnLCAndGFza0RhdGUnKTtcbiAgICBkYXRlSW5wdXQudHlwZSA9ICdkYXRlJztcbiAgICBkYXRlSW5wdXQubWluID0gU2NoZWR1bGUoKS5nZXREYXRlVG9kYXkoKTtcblxuICAgIGNvbnN0IHNhdmVCdXR0b25Db250ID0gX2NyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZmxleFJvdyddKTtcbiAgICBjb25zdCBzYXZlQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnc2F2ZUJ1dHRvbiddLCAnU2F2ZSBUYXNrJyk7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnY2FuY2VsQnV0dG9uJ10sICdDYW5jZWwnLCB0YXNrSUQgKyAnQ0FOQ0VMJyk7XG5cbiAgICBzY2hlZHVsZUNvbnQuYXBwZW5kKGNhbEljb24sIGRhdGVJbnB1dCk7XG4gICAgdGFza0lucHV0Q29udC5hcHBlbmQodGl0bGVJbnB1dCwgZGVzY0lucHV0LCB0YXNrQnV0dG9uQ29udCk7XG4gICAgdGFza0J1dHRvbkNvbnQuYXBwZW5kKHNjaGVkdWxlQ29udCk7XG4gICAgc2F2ZUJ1dHRvbkNvbnQuYXBwZW5kKHNhdmVCdXR0b24sIGNhbmNlbEJ1dHRvbik7XG4gICAgdGFza0Zvcm0uYXBwZW5kKHRhc2tJbnB1dENvbnQsIHNhdmVCdXR0b25Db250KVxuXG4gICAgaWYgKFN0b3JhZ2UudGFza0lEX2V4aXN0cyh0YXNrSUQpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJUYXNrID0gU3RvcmFnZS5nZXRQcm9qZWN0KHByb2pJRCkuZ2V0VGFzayh0YXNrSUQpO1xuICAgICAgICB0aXRsZUlucHV0LnZhbHVlID0gY3VyclRhc2suZ2V0VGl0bGUoKTtcbiAgICAgICAgZGVzY0lucHV0LnZhbHVlID0gY3VyclRhc2suZ2V0RGVzY3JpcHRpb24oKTtcbiAgICAgICAgZGF0ZUlucHV0LnZhbHVlID0gY3VyclRhc2suZ2V0RGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXNrRm9ybTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlRE9NLCBjcmVhdGVQcm9qZWN0LCBjcmVhdGVBZGRQcm9qLCBjcmVhdGVQcm9qRm9ybSwgY3JlYXRlQWRkVGFzaywgY3JlYXRlVGFzaywgY3JlYXRlSFIsIGNyZWF0ZUFkZFRhc2tGb3JtIH07XG4iLCIvLyBNb2R1bGUgcmVzcG9uc2libGliaWxpdGllczpcbi8vIC0gUXVlcnkgZWxlbWVudHMgYW5kIHNldHVwIGV2ZW50IGxpc3RlbmVyc1xuLy8gLSBDYWxscyBhcHBMb2dpYyBmdW5jdGlvbnMgXG5pbXBvcnQgeyBkaXNwbGF5UHJvamVjdCwgZWRpdFByb2plY3QsIHN1Ym1pdFByb2plY3QsIGRlbGV0ZVByb2plY3QsIGFkZFByb2plY3QsIGFkZFRhc2ssIHN1Ym1pdFRhc2ssIGVkaXRUYXNrLCBkZWxldGVUYXNrIH0gZnJvbSAnLi9hcHBMb2dpYydcbmltcG9ydCB7IGNsb3NlUHJvakZvcm1zLCBjbG9zZVRhc2tGb3JtcyB9IGZyb20gJy4vdXBkYXRlRE9NJ1xuXG5jb25zdCBzZXR1cEFsbEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIHNldHVwUHJvakV2ZW50TGlzdGVuZXJzKCk7XG4gICAgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMoKTtcbn1cbmNvbnN0IHNldHVwUHJvakV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgLy8gbGF0ZXI6IHNldHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJvamVjdCBMSSBlbGVtZW50c1xuICAgIGNvbnN0IHByb2pOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qSXRlbSBsaScpO1xuICAgIGNvbnN0IGVkaXROb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qSXRlbSAuZmEtZWRpdCcpO1xuICAgIGNvbnN0IGRlbE5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2pJdGVtIC5mYS10cmFzaC1hbHQnKTtcbiAgICBjb25zdCBhZGRQcm9qTEkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkUHJvamVjdExJJyk7XG5cbiAgICBwcm9qTm9kZXMuZm9yRWFjaChwcm9qTm9kZSA9PiBwcm9qTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlQcm9qZWN0KSlcbiAgICBlZGl0Tm9kZXMuZm9yRWFjaChlZGl0Tm9kZSA9PiBlZGl0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRQcm9qZWN0KSk7XG4gICAgZGVsTm9kZXMuZm9yRWFjaChkZWxOb2RlID0+IGRlbE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVQcm9qZWN0KSk7XG4gICAgYWRkUHJvakxJLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkUHJvamVjdCk7XG59XG5jb25zdCBzZXR1cFByb2pGb3JtTGlzdGVuZXIgPSAocHJvakZvcm0pID0+IHtcbiAgICBjb25zdCBwcm9qSUQgPSBwcm9qRm9ybS5pZC5zbGljZSgwLCAtNCk7XG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3Byb2pJRH1DQU5DRUxgKTtcblxuICAgIGNhbmNlbEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVByb2pGb3JtcygpKTtcblxuICAgIHByb2pGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHN1Ym1pdFByb2plY3QpO1xuXG59XG5jb25zdCBzZXR1cFRhc2tFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBlZGl0Tm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza0l0ZW0gLmZhLWVkaXQnKTtcbiAgICBjb25zdCBkZWxOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrSXRlbSAuZmEtdHJhc2gtYWx0Jyk7XG4gICAgY29uc3QgYWRkVGFza0RJViA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRUYXNrJyk7XG5cbiAgICBlZGl0Tm9kZXMuZm9yRWFjaChlZGl0Tm9kZSA9PiBlZGl0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRUYXNrKSk7XG4gICAgZGVsTm9kZXMuZm9yRWFjaChkZWxOb2RlID0+IGRlbE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVUYXNrKSk7XG4gICAgYWRkVGFza0RJVi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFRhc2spO1xufVxuY29uc3Qgc2V0dXBUYXNrRm9ybUxpc3RlbmVyID0gKHByb2pJRCwgdGFza0Zvcm0pID0+IHtcbiAgICBjb25zdCB0YXNrSUQgPSB0YXNrRm9ybS5pZC5zbGljZSgwLCAtNCk7XG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFza0lEfUNBTkNFTGApO1xuXG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VUYXNrRm9ybXMocHJvaklEKSk7XG5cbiAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdWJtaXRUYXNrKTtcbn1cblxuZXhwb3J0IHsgc2V0dXBBbGxFdmVudExpc3RlbmVycywgc2V0dXBQcm9qRXZlbnRMaXN0ZW5lcnMsIHNldHVwUHJvakZvcm1MaXN0ZW5lciwgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMsIHNldHVwVGFza0Zvcm1MaXN0ZW5lciB9OyIsIi8qIFByb2plY3QuanMgXG5cbk1vZHVsZSByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0IG9iamVjdCBhbmQgc3VwcG9ydGluZyBmdW5jdGlvbnNcblxuKi9cbi8vIGltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2suanMnO1xuY29uc3QgZ2V0SW5kZXhCeUlEID0gKHN0YXRlLCB0YXNrSUQpID0+IHtcbiAgICByZXR1cm4gc3RhdGUudGFza3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJRCgpID09PSB0YXNrSUQpO1xufVxuY29uc3QgcHJvdG8gPSAoc3RhdGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJRDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmlkO1xuICAgICAgICB9LFxuICAgICAgICBnZXROYW1lOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUubmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGFza3M6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS50YXNrcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGFzazogKHRhc2tJRCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnRhc2tzLmZpbmQodGFzayA9PiB0YXNrLmdldElEKCkgPT09IHRhc2tJRCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVRhc2s6ICh0YXNrSUQsIG5ld1Rhc2spID0+IHtcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gZml4IGVycm9yIHdpdGggZ2V0SW5kZXhCeUlEIChjYW4ndCBhY2Nlc3MgdGhpcylcbiAgICAgICAgICAgIHN0YXRlLnRhc2tzLnNwbGljZShnZXRJbmRleEJ5SUQoc3RhdGUsIHRhc2tJRCksIDEsIG5ld1Rhc2spOyAgXG4gICAgICAgIH0sXG4gICAgICAgIGFkZFRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVUYXNrOiAodGFza0lEKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS50YXNrcy5zcGxpY2UoZ2V0SW5kZXhCeUlEKHN0YXRlLCB0YXNrSUQpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IFByb2plY3QgPSAoaWQsIG5hbWUpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICB0YXNrczogW11cbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiB7XG4gICAgICAgIHN0YXRlLm5hbWUgPSBuZXdOYW1lO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm90byhzdGF0ZSksIHsgc2V0TmFtZSB9KTtcbn1cblxuY29uc3QgSW5ib3ggPSAoKSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBpZDogJ3Byb2pJbmJveCcsXG4gICAgICAgIG5hbWU6ICdJbmJveCcsXG4gICAgICAgIHRhc2tzOiBbXVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm90byhzdGF0ZSkpO1xuICAgIFxufVxuXG5leHBvcnQgeyBQcm9qZWN0LCBJbmJveCB9OyIsImNvbnN0IFBST0pfTElNSVQgPSAxMDAwO1xuY29uc3QgVEFTS19MSU1JVCA9IDEwMDAwO1xuY29uc3QgYWN0aXZlUHJvamVjdHMgPSBbXTtcbmNvbnN0IGFjdGl2ZVRhc2tJRHMgPSBbXTtcbmNvbnN0IGFjdGl2ZVByb2pJRHMgPSBbXTtcblxuY29uc3QgZ2V0SW5kZXhCeUlEID0gKHByb2pJRCkgPT4ge1xuICAgIHJldHVybiBhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBwcm9qLmdldElEKCkgPT09IHByb2pJRCk7XG59XG5cbmNvbnN0IFN0b3JhZ2UgPSB7XG4gICAgYWRkVGFza0lEOiAoaWQpID0+IHtcbiAgICAgICAgYWN0aXZlVGFza0lEcy5wdXNoKGlkKTtcbiAgICB9LFxuICAgIHJlbW92ZVRhc2tJRDogKGlkKSA9PiB7XG4gICAgICAgIGFjdGl2ZVRhc2tJRHMuc3BsaWNlKGFjdGl2ZVRhc2tJRHMuaW5kZXhPZihpZCksIDEpO1xuICAgIH0sXG4gICAgYWRkUHJvamVjdDogKHByb2opID0+IHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMucHVzaChwcm9qKTtcbiAgICAgICAgYWN0aXZlUHJvaklEcy5wdXNoKHByb2ouZ2V0SUQoKSk7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZlUHJvamVjdHM7XG4gICAgfSxcbiAgICBnZXRQcm9qZWN0OiAocHJvaklEKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVQcm9qZWN0c1tnZXRJbmRleEJ5SUQocHJvaklEKV07XG4gICAgfSxcbiAgICBjaGVja1Byb2plY3ROYW1lOiAocHJvak5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2plY3RzLnNvbWUocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvak5hbWUpO1xuICAgIH0sXG4gICAgdXBkYXRlUHJvamVjdChwcm9qSUQsIG5ld1Byb2opIHtcbiAgICAgICAgYWN0aXZlUHJvamVjdHMuc3BsaWNlKGdldEluZGV4QnlJRChwcm9qSUQpLCAxLCBuZXdQcm9qKTtcbiAgICB9LFxuICAgIHVwZGF0ZVByb2plY3ROYW1lOiAocHJvaklELCBuZXdQcm9qTmFtZSkgPT4ge1xuICAgICAgICBhY3RpdmVQcm9qZWN0c1tnZXRJbmRleEJ5SUQocHJvaklEKV0uc2V0TmFtZShuZXdQcm9qTmFtZSk7XG4gICAgfSxcbiAgICBkZWxldGVQcm9qZWN0OiAocHJvaklEKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3RzLnNwbGljZShhY3RpdmVQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBwcm9qLmdldElEKCkgPT09IHByb2pJRCksIDEpO1xuICAgICAgICBhY3RpdmVQcm9qSURzLnNwbGljZShhY3RpdmVQcm9qSURzLmluZGV4T2YocHJvaklEKSwgMSlcbiAgICB9LFxuICAgIGdlbmVyYXRlVGFza0lEOiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpZiAoYWN0aXZlVGFza0lEcy5sZW5ndGggPj0gVEFTS19MSU1JVCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgbGV0IHJhbmQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHJhbmQgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIFRBU0tfTElNSVQpO1xuICAgICAgICB9IHdoaWxlIChTdG9yYWdlLnRhc2tJRF9leGlzdHMoYHRhc2ske3JhbmR9YCkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGB0YXNrJHtyYW5kfWA7XG4gICAgfSxcbiAgICBnZW5lcmF0ZVByb2pJRDogKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlUHJvaklEcy5sZW5ndGggPj0gUFJPSl9MSU1JVCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCByYW5kO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICByYW5kID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBQUk9KX0xJTUlUKTtcbiAgICAgICAgfSB3aGlsZSAoU3RvcmFnZS5wcm9qSURfZXhpc3RzKGBwcm9qJHtyYW5kfWApKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgcHJvaiR7cmFuZH1gO1xuXG4gICAgfSxcbiAgICBwcm9qSURfZXhpc3RzOiAoaWQpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVByb2pJRHMuaW5jbHVkZXMoaWQpO1xuICAgIH0sXG4gICAgdGFza0lEX2V4aXN0czogKGlkKSA9PiB7XG4gICAgICAgIHJldHVybiBhY3RpdmVUYXNrSURzLmluY2x1ZGVzKGlkKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHsgU3RvcmFnZSB9IiwiLyogVGFzay5qcyBcblxuTW9kdWxlIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIHRhc2sgb2JqZWN0IGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9uc1xuXG4qL1xuaW1wb3J0IHsgZm9ybWF0SVNPIH0gZnJvbSAnZGF0ZS1mbnMnXG5cbmNvbnN0IFRhc2sgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAvLyBBbGwgdGFza3MgZGVmYXVsdCB0byBpbmJveCB1cG9uIGNyZWF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGdldElEKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9LFxuICAgICAgICBnZXRUaXRsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXREZXNjcmlwdGlvbihkZXNjKSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgIH0sXG4gICAgICAgIGdldERhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGF0ZShuZXdEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0UHJpb3JpdHkocHJpKSB7XG4gICAgICAgICAgICBwcmlvcml0eSA9IHByaTtcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlKG5ld1RpdGxlLCBuZXdEZXNjLCBuZXdEYXRlLCBuZXdQcmlvcml0eSkge1xuICAgICAgICAgICAgdGhpcy5zZXRUaXRsZShuZXdUaXRsZSk7XG4gICAgICAgICAgICB0aGlzLnNldERlc2NyaXB0aW9uKG5ld0Rlc2MpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRlKG5ld0RhdGUpO1xuICAgICAgICAgICAgdGhpcy5zZXRQcmlvcml0eShuZXdQcmlvcml0eSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG8pO1xufVxuXG5jb25zdCBTY2hlZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBnZXREYXRlVG9kYXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0SVNPKHRvZGF5LCB7IHJlcHJlc2VudGF0aW9uOiAnZGF0ZSd9KTtcbiAgICAgICAgfSxcblxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90byk7XG59XG5cbmV4cG9ydCB7IFRhc2ssIFNjaGVkdWxlIH07IiwiLy8gTW9kdWxlIHJlc3BvbnNpYmxpYmlsaXRpZXM6XG4vLyAtIEhhbmRsZXMgdXBkYXRpbmcgRE9NIGVsZW1lbnRzXG4vLyAtIFVwZGF0ZXMgRE9NIHdpdGggY3VycmVudCBhY3RpdmUgcHJvamVjdHMgLyB0YXNrc1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlQWRkUHJvaiwgY3JlYXRlVGFzaywgY3JlYXRlSFIsIGNyZWF0ZUFkZFRhc2ssIGNyZWF0ZUFkZFRhc2tGb3JtIH0gZnJvbSAnLi9jcmVhdGVET00nXG5pbXBvcnQgeyBzZXR1cFByb2pFdmVudExpc3RlbmVycywgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2V2ZW50TGlzdGVuZXJzJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgeyBnZXRUYXNrcyB9IGZyb20gJy4vYXBwTG9naWMnXG5cbmNvbnN0IHVwZGF0ZVByb2plY3RMaXN0ID0gKCkgPT4ge1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2pJdGVtJykuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVtb3ZlKCkpO1xuXG4gICAgY29uc3QgcmVmTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRQcm9qJyk7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IHJlZk5vZGUucGFyZW50Tm9kZTtcblxuICAgIFN0b3JhZ2UuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2ogPT4gcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY3JlYXRlUHJvamVjdChwcm9qKSwgcmVmTm9kZSkpO1xuXG4gICAgc2V0dXBQcm9qRXZlbnRMaXN0ZW5lcnMoKTtcbn1cbmNvbnN0IHVwZGF0ZVRhc2tMaXN0ID0gKHByb2pJRCkgPT4ge1xuXG4gICAgY2xvc2VUYXNrRm9ybXMocHJvaklEKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza0l0ZW0nKS5mb3JFYWNoKHRhc2sgPT4gdGFzay5yZW1vdmUoKSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaHInKS5mb3JFYWNoKGhyID0+IGhyLnJlbW92ZSgpKTtcblxuICAgIGNvbnN0IG1haW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbkhlYWRlcicpO1xuICAgIGNvbnN0IHJlZk5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkVGFzaycpO1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSByZWZOb2RlLnBhcmVudE5vZGU7XG5cbiAgICBjb25zdCBhY3RpdmVUYXNrcyA9IGdldFRhc2tzKHByb2pJRCk7XG5cbiAgICBhY3RpdmVUYXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjcmVhdGVUYXNrKHRhc2spLCByZWZOb2RlKTtcbiAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY3JlYXRlSFIoKSwgcmVmTm9kZSk7XG4gICAgfSk7XG4gICAgbWFpbkhlYWRlci50ZXh0Q29udGVudCA9IFN0b3JhZ2UuZ2V0UHJvamVjdChwcm9qSUQpLmdldE5hbWUoKTtcblxuICAgIC8vIExhdGVyXG4gICAgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMoKTtcbn1cbmNvbnN0IGNsb3NlQWxsRm9ybXMgPSAocHJvaklEKSA9PiB7XG4gICAgY2xvc2VQcm9qRm9ybXMoKTtcbiAgICBjbG9zZVRhc2tGb3Jtcyhwcm9qSUQpO1xufVxuY29uc3QgY2xvc2VQcm9qRm9ybXMgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3QgcHJvakZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2pGb3JtJyk7XG4gICAgXG4gICAgcHJvakZvcm1zLmZvckVhY2gocHJvakZvcm0gPT4ge1xuICAgICAgICBjb25zdCBwcm9qSUQgPSBwcm9qRm9ybS5pZC5zbGljZSgwLCAtNCk7XG4gICAgICAgIGNvbnN0IHByb2ogPSBTdG9yYWdlLmdldFByb2plY3QocHJvaklEKTtcbiAgICAgICAgY29uc3QgbGlOb2RlID0gcHJvaiA/IGNyZWF0ZVByb2plY3QocHJvaikuZmlyc3RDaGlsZCA6IGNyZWF0ZUFkZFByb2ooKS5maXJzdENoaWxkO1xuICAgICAgICBcbiAgICAgICAgcHJvakZvcm0ucmVwbGFjZVdpdGgobGlOb2RlKTtcbiAgICB9KVxuXG4gICAgc2V0dXBQcm9qRXZlbnRMaXN0ZW5lcnMoKTtcbn1cbmNvbnN0IGNsb3NlVGFza0Zvcm1zID0gKHByb2pJRCkgPT4ge1xuICAgIGNvbnN0IHRhc2tGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrRm9ybScpO1xuXG4gICAgdGFza0Zvcm1zLmZvckVhY2godGFza0Zvcm0gPT4ge1xuICAgICAgICBjb25zdCB0YXNrSUQgPSB0YXNrRm9ybS5pZC5zbGljZSgwLCAtNCk7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBTdG9yYWdlLmdldFByb2plY3QocHJvaklEKS5nZXRUYXNrKHRhc2tJRCk7XG4gICAgICAgIGNvbnN0IHRhc2tESVYgPSB0YXNrID8gY3JlYXRlVGFzayh0YXNrKSA6IGNyZWF0ZUFkZFRhc2soKTtcblxuICAgICAgICB0YXNrRm9ybS5yZXBsYWNlV2l0aCh0YXNrRElWKTtcbiAgICB9KVxuXG4gICAgc2V0dXBUYXNrRXZlbnRMaXN0ZW5lcnMoKTtcbn1cbmNvbnN0IHJlbW92ZVRhc2tGb3JtID0gKHRhc2tGb3JtKSA9PiB7XG4gICAgdGFza0Zvcm0ucmVwbGFjZVdpdGgoY3JlYXRlQWRkVGFzaygpKTtcbn1cblxuZXhwb3J0IHsgdXBkYXRlUHJvamVjdExpc3QsIHVwZGF0ZVRhc2tMaXN0LCBjbG9zZUFsbEZvcm1zLCBjbG9zZVByb2pGb3JtcywgY2xvc2VUYXNrRm9ybXMsIHJlbW92ZVRhc2tGb3JtIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuXG4tIFRhc2tzXG4gICAgLSBTZXBlcmF0ZSBtb2R1bGVcbiAgICAtIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGFza1xuICAgIC0gUHJvcGVydGllczogXG4gICAgICAgIC0gdGl0bGVcbiAgICAgICAgLSBkZXNjcmlwdGlvblxuICAgICAgICAtIGR1ZSBkYXRlXG4gICAgICAgIC0gcHJpb3JpdHlcbiAgICAgICAgLSBpc0NvbXBsZXRlXG4gICAgLSBmdW5jdGlvbnNcbiAgICAgICAgLSBjaGFuZ2UgcHJvcGVydGllc1xuLSBQcm9qZWN0c1xuICAgIC0gY29udGFpbnMgbWFueSB0YXNrc1xuICAgIC0gcHJvcGVydGllczpcbiAgICAgICAgLSBcbi0gRE9NXG5cblxuKi9cblxuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vbW9kdWxlcy9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgUHJvamVjdCwgSW5ib3ggfSBmcm9tICcuL21vZHVsZXMvcHJvamVjdC5qcydcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL21vZHVsZXMvdGFzay5qcydcbmltcG9ydCB7IGxvYWRBcHAgfSBmcm9tICcuL21vZHVsZXMvYXBwTG9naWMnXG5cbmNvbnN0IHJlbmRlciA9ICgoKSA9PiB7XG4gICAgXG4gICAgLy8gc2FtcGxlIHByb2plY3RzXG4gICAgY29uc3QgaW5ib3ggPSBJbmJveCgpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChpbmJveCk7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KFByb2plY3QoJ3Byb2oxJywgJ0NsZWFuaW5nJykpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdwcm9qMicsICdQYWNraW5nJykpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChQcm9qZWN0KCdwcm9qMycsICdNb3BwaW5nJykpO1xuXG4gICAgLy8gc2FtcGxlIGluYm94IHRhc2tzXG4gICAgY29uc3QgdGFzazEgPSBUYXNrKCd0YXNrMScsICdHYXJiYWdlJywgJ1Rha2UgZ2FyYmFnZSBvdXQgdG8gc3RyZWV0JywnRGVjIDgnLCAncDEnKTtcbiAgICBjb25zdCB0YXNrMiA9IFRhc2soJ3Rhc2syJywgJ0JhdGhyb29tIEZsb29ycycsICdDbGVhbiBiYXRocm9vbSBmbG9vcnMnLCdEZWMgOScsICdwMicpO1xuICAgIGNvbnN0IHRhc2szID0gVGFzaygndGFzazMnLCAnS2l0Y2hlbiBGbG9vcnMnLCAnQ2xlYW4ga2l0Y2hlbiBmbG9vcnMnLCdXZWRuZXNkYXknLCAncDMnKTtcbiAgICBcbiAgICBTdG9yYWdlLmdldFByb2plY3QoaW5ib3guZ2V0SUQoKSkuYWRkVGFzayh0YXNrMSk7XG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0KGluYm94LmdldElEKCkpLmFkZFRhc2sodGFzazIpO1xuICAgIFN0b3JhZ2UuZ2V0UHJvamVjdChpbmJveC5nZXRJRCgpKS5hZGRUYXNrKHRhc2szKTtcblxuICAgIFN0b3JhZ2UuYWRkVGFza0lEKCd0YXNrMScpO1xuICAgIFN0b3JhZ2UuYWRkVGFza0lEKCd0YXNrMicpO1xuICAgIFN0b3JhZ2UuYWRkVGFza0lEKCd0YXNrMycpO1xuIFxuICAgIGxvYWRBcHAoKTtcblxufSkoKTtcblxucmVuZGVyO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9