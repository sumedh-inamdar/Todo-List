/* DOM.js 

Module responsible for DOM loading and manipulation

*/
import { Storage } from './storage.js';
import { Task } from './task.js';
import { Project } from './project.js';

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
    Storage.getProjects().forEach(proj => projList.appendChild(addProjectDOM(proj.getName())));

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
            if (Storage.checkProject(newProjName)) {
                alert('Project name exists.');
            } else {
                Storage.addProject(Project(newProjName));

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
        
        if (Storage.checkProject(newProjName)) {
            alert('Project name exists.');
        } else {
            Storage.updateProject(projName, newProjName);

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
    Storage.deleteProject(projectName);
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
    const activeTasks = projectName === 'Inbox' ? Storage.getInboxTasks() : Storage.getProject(projectName).getTasks();

    const taskListCont = _createElement('div', ['flexCol', 'task'], '', '');

    // for each task, create list item 
    activeTasks.forEach(task => {
        // create elements for each task 
        const outerCont = _createElement('div', ['flexRow', 'outerCont']);
        const checkCont = _createElement('div', ['taskItemLeft']);
        const taskCont = _createElement('div', ['flexCol', 'taskCont'], '', '');
        const liCont = _createElement('div', ['flexRow', 'taskItem'], '', '');
        const descPrev = _createElement('div', ['descPrev'], task.getDescription(), '');
        outerCont.append(checkCont, taskCont);
        taskCont.append(liCont, descPrev);

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

        const addPopup = _createEditTaskPopup(projectName, Storage.generateTaskID());

    })
    
    return addCont;

}

const _createEditTaskPopup = (projectName, taskID) => {
    //create elements
    const outerCont = _createElement('div', ['flexCol', 'outerCont']);
    
    //top cont
    const taskInputCont = _createElement('div', ['flexCol']);
    const titleInput = _createElement('input', '');

    //bottom cont
    const buttonCont = _createElement('div', ['flexRow']);


}


export { DOMLoader };