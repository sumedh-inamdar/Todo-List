// Module responsiblibilities:
// - Builds DOM upon initial load
// - Create elements and add to document
// - Loads active projects and tasks
import { Storage } from './storage'
import { Schedule } from './task'
import { updatePriDropdown } from './updateDOM';

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
    
    const headerDiv = _createElement('div', ['flexRow']);
    const navBarIcon = _createElement('i', ['fas', 'fa-bars'], '', 'nav-menu-icon');
    const tasksIcon = _createElement('i', ['fas', 'fa-thumbtack']);
    const headerText = _createElement('span', '', 'Tackle List');

    headerDiv.append(navBarIcon, tasksIcon, headerText);
    document.querySelector('header').append(headerDiv);
}
const _createSideBar = () => {
        
    const sideBar = document.querySelector('#sideBar');
    
    const navCont = _createElement('div', ['flexCol'],'','sideBarNavCont');
    const inbox = _createElement('div', ['sideBarLink'], 'Inbox', 'projInboxLI');
    const today = _createElement('div', ['sideBarLink'], 'Today', 'today');
    const thisWeek = _createElement('div', ['sideBarLink'], 'This Week', 'thisWeek');

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
    projInput.value = Storage.projID_exists(projID) ? Storage.getProject(projID).getName() : '';

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

    const sortDropdown = _createElement('div', ['dropdown', 'dropdown-sort']);
    const sortDropdownMenu = _createElement('div', ['dropdown-menu', 'menu-sort']);
    
    const sortCont = _createElement('button', ['flexRow', 'sortSelCont']);
    const caretDown = _createElement('i', ['fas', 'fa-caret-down']);
    const sortText = _createElement('div', '', '', 'sortByButton');

    const byDefault = _createElement('div', ['dropdown-item'], 'Default', 'byDefault');
    const byDate = _createElement('div', ['dropdown-item'], 'Date', 'byDate');
    const byPriority = _createElement('div', ['dropdown-item'], 'Priority', 'byPriority');

    const taskList = _createElement('ul', ['taskList'], '', 'taskList');
    taskList.append(createAddTask());

    sortCont.append(caretDown, sortText);
    sortDropdownMenu.append(byDefault, byDate, byPriority);
    sortDropdown.append(sortCont, sortDropdownMenu);
    headerContainer.append(header, sortDropdown);
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


        const markerClass = task.isCompleted() ? 'fa-check-circle' : 'fa-circle';
        const outerCircle = _createElement('i',['far', markerClass, 'check'], '', taskID + 'CHECK');
        applyPriorityColorToMarker(outerCircle, task.getPriority());
    
        const liNode = _createElement('li', ['noMarker'], task.getTitle());
        if (task.isCompleted()) liNode.classList.add('strike');
        const editNode = _createElement('i', ['far','fa-edit'], '', taskID + 'EDIT');
        const delIcon = _createElement('i', ['far','fa-trash-alt'], '', taskID + 'DEL');
        
        const calIcon = _createElement('i', ['far', 'fa-calendar-alt']);
        const taskDate = _createElement('div', ['taskDate'], task.getDateDOM());

        checkCont.append(outerCircle);

        liCont.append(liNode, editNode, delIcon);
        scheduleCont.append(calIcon, taskDate);
        taskCont.append(liCont, descPrev, scheduleCont);

        outerCont.append(checkCont, taskCont);
        
        return outerCont;
}
const applyPriorityColorToMarker = (marker, priority) => {
    
    if (marker.classList.contains('fa-check-circle')) marker.style.fontWeight = 'bold';
    marker.style.color = getPriorityInfo(priority)[1];
    marker.style.backgroundColor = getPriorityInfo(priority)[1] + '34';
    
}
const createHR = () => {
    return _createElement('hr');
}

const createAddTaskForm = (taskID, dispID) => {

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
    dateInput.min = Schedule().getDateToday();
    if (dispID === 'today') dateInput.value = Schedule().getDateToday();
    
    const projDropdown = _createElement('div', ['dropdown']);
    const projDropdownMenu = _createElement('div', ['dropdown-menu', 'menu-proj']);
    populateProjSelDropdown(projDropdownMenu);

    const projID = dispID.startsWith('proj') ? dispID : 'projInbox';
    let projCont = createProjSelectButton(projID);

    const priDropdown = _createElement('div', ['dropdown']);
    const priDropdownMenu = _createElement('div', ['dropdown-menu', 'menu-pri']);
    populatePriSelDropdown(priDropdownMenu);
    let priCont = createPrioritySelectButton('p4');
    
    const saveButtonCont = _createElement('div', ['flexRow']);
    const saveButton = _createElement('button', ['saveButton'], 'Save Task');
    saveButton.type = 'submit';
    const cancelButton = _createElement('button', ['cancelButton'], 'Cancel', taskID + 'CANCEL');
    
    if (Storage.taskID_exists(taskID)) {
        const currTask = Storage.getTask(taskID);
        titleInput.value = currTask.getTitle();
        descInput.value = currTask.getDescription();
        dateInput.value = currTask.getDate();
        priCont = createPrioritySelectButton(currTask.getPriority());
    }

    scheduleCont.append(calIcon, dateInput);
    projDropdown.append(projCont, projDropdownMenu);
    priDropdown.append(priCont, priDropdownMenu);
    taskButtonCont.append(scheduleCont, projDropdown, priDropdown);
    taskInputCont.append(titleInput, descInput, taskButtonCont);
    saveButtonCont.append(saveButton, cancelButton);
    taskForm.append(taskInputCont, saveButtonCont)

    return taskForm;
}
const populateProjSelDropdown = (dropdown) => {
    const projList = Storage.getProjects();

    projList.forEach(proj => {
        const inboxIcon = _createElement('i', ['fas', 'fa-inbox']);
        const projIcon = _createElement('i', ['far', 'fa-dot-circle']);
        let projName = proj.getName();
        let projID = proj.getID();

        let projItem = _createElement('div', ['flexRow', 'dropdown-item'], '', projID + 'dropdown');
        let icon = projID === 'projInbox' ? inboxIcon : projIcon;
        let projText = _createElement('div', '', projName);

        projItem.append(icon, projText);
        dropdown.append(projItem);
    })
}
const createProjSelectButton = (projID) => {
    
    const projCont = _createElement('button', ['flexRow', 'projSelCont', 'taskButton'], '', projID + 'SELECT');
    projCont.type = 'button';
    const inboxIcon = _createElement('i', ['fas', 'fa-inbox']);
    const projIcon = _createElement('i', ['far', 'fa-dot-circle']);
    const icon = projID === 'projInbox' ? inboxIcon : projIcon;
    const projText = _createElement('div', '', Storage.getProject(projID).getName(), projID + 'TEXT');
    
    projCont.append(icon, projText);
    
    return projCont;
}
const populatePriSelDropdown = (dropdown) => {
    const priArray = ['p1', 'p2', 'p3', 'p4'];

    priArray.forEach(pri => {
        const priItem = _createElement('div', ['flexRow', 'dropdown-item'], '', pri);
        const priText = _createElement('p', ['dropdown-item-text']);
        let icon = _createElement('i', ['fas', 'fa-flag']);
        [priText.textContent, icon.style.color] = getPriorityInfo(pri);
        
        priItem.append(icon, priText);
        dropdown.append(priItem);
    })
}
const createPrioritySelectButton = (priority) => {
    
    const priCont = _createElement('button', ['flexRow', 'priSelCont', 'taskButton'], '', priority + 'SELECT');
    priCont.type = 'button';
    const icon = _createElement('i', ['fas', 'fa-flag']);
    // set color of icon based on priority
    icon.style.color = getPriorityInfo(priority)[1];
    priCont.append(icon);

    return priCont;

}
const getPriorityInfo = (priority) => {
    
    switch (priority) {
        case 'p1':
            return ['Priority 1', '#ff3300'];
        case 'p2':
            return ['Priority 2', '#df9100'];
        case 'p3':
            return ['Priority 3', '#0000ff'];
        case 'p4':
            return ['Priority 4', 'gray'];
    }
}


export { createDOM, createProject, createAddProj, createProjForm, createAddTask, createTask, createHR, createAddTaskForm, createProjSelectButton, createPrioritySelectButton };
