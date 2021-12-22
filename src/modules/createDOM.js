import { Storage } from './storage'
import { Schedule } from './task'
import octocat from '../Octocat.png';

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
    _createFooter();
}
const _createHeader = () => {
    const headerDiv = _createElement('div', ['flexRow']);
    const navBarIcon = _createElement('i', ['fas', 'fa-bars'], '', 'nav-menu-icon');
    const logoDiv = _createElement('div', ['flexRow'], '', 'logo-div');
    const tasksIcon = _createElement('i', ['fas', 'fa-thumbtack']);
    const headerText = _createElement('span', '', 'Tacklist');

    logoDiv.append(tasksIcon, headerText);
    headerDiv.append(navBarIcon, logoDiv);

    document.querySelector('header').append(headerDiv);
}
const _createSideBar = () => document.querySelector('#sideBar').append(_createSideBar_Nav(), _createSideBar_Proj());

const _createSideBar_Nav = () => {
    const navCont = _createElement('div', ['flexCol'],'','sideBarNavCont');

    const inbox = _createElement('div', ['sideBarLink', 'flexRow'], '', 'projInboxLI');
    const inboxIcon = _createElement('i', ['fas', 'fa-inbox']);
    const inboxText = _createElement('span', '', 'Inbox');
    const inboxQty = _createElement('span', '', '0', 'inbox-qty-span');

    const today = _createElement('div', ['sideBarLink', 'flexRow'], '' , 'today');
    const todayIcon = _createElement('i', ['fas', 'fa-calendar-day']);
    const todayText = _createElement('span', '', 'Today');
    const todayQty = _createElement('span', '', '0', 'today-qty-span');

    const thisWeek = _createElement('div', ['sideBarLink', 'flexRow'], '', 'thisWeek');
    const thisWeekIcon = _createElement('i', ['fas', 'fa-calendar-week']);
    const thisWeekText = _createElement('span', '', 'This Week');
    const thisWeekQty = _createElement('span', '', '0', 'thisWeek-qty-span');

    inbox.append(inboxIcon, inboxText, inboxQty);
    today.append(todayIcon, todayText, todayQty);
    thisWeek.append(thisWeekIcon, thisWeekText, thisWeekQty);

    navCont.append(inbox, today, thisWeek);

    return navCont;
}
const _createSideBar_Proj = () => {
    const projCont = _createElement('div', ['flexCol'], '', 'projCont');

    const projHeader = _createElement('div', ['flexRow'], '', 'proj-header-div');
    const projExpandIcon = _createElement('i', ['fas', 'fa-caret-down'], '', 'proj-expand-icon');
    const projHeaderText = _createElement('h4', ['flexCol'], 'Projects');
    const projList = _createElement('ul', ['projList'], '', 'projList');

    projHeader.append(projExpandIcon, projHeaderText);
    projList.append(createAddProj());

    projCont.append(projHeader, projList);

    return projCont;
}
const createAddProj = () => {
    const addProjCont = _createElement('div', '', '', 'addProj');
    const addProjIcon = _createElement('i', ['fas', 'fa-plus']);
    const addProjLI = _createElement('li', ['noMarker'], 'Add Project', 'addProjectLI');

    addProjCont.append(addProjIcon, addProjLI);

    return addProjCont;
}
const createProject = (proj) => {
    const projName = proj.getName();
    const projID = proj.getID();

    const projectElement = _createElement('div', ['projItem'], '', projID + 'ITEM');
    const liNode = _createElement('li', '', '', projID + 'LI');
    const projText = _createElement('div', '', projName);
    projText.title = projName;
    const editIcon = _createElement('i', ['far','fa-edit', 'inactive'], '', projID + 'EDIT');
    const delIcon = _createElement('i', ['far','fa-trash-alt', 'inactive'], '', projID + 'DEL');
    const projQty = _createElement('span', ['projQty'], '0');

    liNode.append(projText);

    projectElement.append(liNode, editIcon, delIcon, projQty);

    return projectElement;
}
const createProjForm = (projID) => {
    const projForm = _createElement('form', ['projForm'], '', projID + 'FORM');

    const projInput = _createElement('input', ['inputProj'], '', 'projInput');
    projInput.type = 'text';
    projInput.required = true;
    projInput.placeholder = 'Project Name';
    projInput.value = Storage.projID_exists(projID) ? Storage.getProject(projID).getName() : '';

    const saveButton = _createElement('button', ['saveButton'], '',  projID + 'SAVE');
    saveButton.type = 'submit';
    const saveIcon = _createElement('i', ['fas', 'fa-check'], '');
    
    const cancelButton = _createElement('button', ['cancelButton'], '', projID + 'CANCEL');
    cancelButton.type = 'button';
    const cancelIcon = _createElement('i', ['fas', 'fa-times'], '');

    saveButton.append(saveIcon);
    cancelButton.append(cancelIcon);

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
const _createFooter = () => {
    const footer = document.querySelector('footer');
    const text = document.createElement('small');
    const link = document.createElement('a');
    const img = document.createElement('input');
    
    text.textContent = `\u00A9 Copyright `;
    text.textContent += new Date().getFullYear();
    text.textContent += ', sumedh-inamdar';

    link.href = 'https://github.com/sumedh-inamdar';
    link.target = '_blank';
    link.title = 'Link to personal Github';

    img.type = "image";
    img.alt = "Github";
    img.src = octocat;
    
    link.append(img);

    footer.append(text, link);
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
        descPrev.title = task.getDescription();
        const scheduleCont = _createElement('div', ['flexRow', 'descPrev']);

        const markerClass = task.isCompleted() ? 'fa-check-circle' : 'fa-circle';
        const outerCircle = _createElement('i',['far', markerClass, 'check'], '', taskID + 'CHECK');
        applyPriorityColorToMarker(outerCircle, task.getPriority());
    
        const liNode = _createElement('li', ['noMarker'], task.getTitle());
        liNode.title = task.getTitle();
        if (task.isCompleted()) liNode.classList.add('strike');
        const editNode = _createElement('i', ['far','fa-edit', 'inactive'], '', taskID + 'EDIT');
        const delIcon = _createElement('i', ['far','fa-trash-alt', 'inactive'], '', taskID + 'DEL');
        
        const calIcon = _createElement('i', ['far', 'fa-calendar-alt']);
        const taskDate = _createElement('div', ['taskDate']);
        [taskDate.textContent, scheduleCont.style.color] = task.getDateDOM();
        taskDate.title = task.getDate();

        checkCont.append(outerCircle);
        liCont.append(liNode, editNode, delIcon);
        scheduleCont.append(calIcon, taskDate);
        
        taskCont.append(liCont, descPrev);
        if (taskDate.textContent) taskCont.append(scheduleCont);

        outerCont.append(checkCont, taskCont);
        
        return outerCont;
}
const applyPriorityColorToMarker = (marker, priority) => {
    if (marker.classList.contains('fa-check-circle')) marker.style.fontWeight = 'bold';
    marker.style.color = getPriorityInfo(priority)[1];
    marker.style.backgroundColor = getPriorityInfo(priority)[1] + '34';
}
const createHR = () => _createElement('hr');

const createAddTaskForm = (taskID, dispID) => {
    const taskForm = _createElement('form', ['flexCol','taskForm'], '', taskID + 'FORM');

    const taskInputCont = _createElement('div', ['flexCol', 'taskInputCont']);
    
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
    
    const projDropdown = _createElement('div', ['dropdown', 'dropdown-proj']);
    const projDropdownMenu = _createElement('div', ['dropdown-menu', 'menu-proj']);
    populateProjSelDropdown(projDropdownMenu);

    const projID = dispID.startsWith('proj') ? dispID : 'projInbox';
    let projCont = createProjSelectButton(projID);

    const priDropdown = _createElement('div', ['dropdown', 'dropdown-pri']);
    const priDropdownMenu = _createElement('div', ['dropdown-menu', 'menu-pri']);
    populatePriSelDropdown(priDropdownMenu);
    let priCont = createPrioritySelectButton('p4');
    
    const saveButtonCont = _createElement('div', ['flexRow']);
    const saveButton = _createElement('button', ['saveTask'], 'Save Task');
    saveButton.type = 'submit';
    const cancelButton = _createElement('button', ['cancelTask'], 'Cancel', taskID + 'CANCEL');
    
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
        const projIcon = _createElement('i', ['fas', 'fa-circle']);
        let projName = proj.getName();
        let projID = proj.getID();

        let projItem = _createElement('div', ['flexRow', 'dropdown-item'], '', projID + 'dropdown');
        let icon = projID === 'projInbox' ? inboxIcon : projIcon;
        let projText = _createElement('div', '', projName);
        projText.title = projName;

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