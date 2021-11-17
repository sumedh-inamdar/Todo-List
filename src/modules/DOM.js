/* DOM.js 

Module responsible for DOM loading and manipulation

*/
import { Storage } from './storage.js';
import { Task } from './task.js';

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
    Storage.getProjects().forEach(proj => projList.appendChild(addProjectDOM(proj.getName())));

    // Add "Add project" list item
    projList.appendChild(createAddProj());

    return projCont;

}
const createAddProj = () => {
    const addCont = _createElement('div', ['projItem']);

    addCont.appendChild(_createElement('li', ['addProjLI'], '+ Add Project'));

    addCont.addEventListener('click', () => editProject(addCont));

    return addCont;

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
    const liNode = _createElement('li', '', projName, projName);
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

const addProject = (projectName) => {
    // check for duplicates in storage
    
    console.log(projectName);
}

// create project form element with supplied name as value

const createProjForm = (projNameDefault) => {

    // create form element
    const formProj = _createElement('form');

    // create input element with placeholder value as project name
    const inputProj = _createElement('input', ['inputProj'], '', 'inputProj');
    inputProj.type = 'text';
    inputProj.required = true;
    inputProj.value = projNameDefault;

    // create save button
    const buttonProj = _createElement('button');
    const saveProj = _createElement('i', ['far', 'fa-save']);
    buttonProj.appendChild(saveProj);
    buttonProj.type = 'submit';

    formProj.append(inputProj, buttonProj);

    return formProj;
}

// Changes project list item to editable field and updates project name
const editProject = (listItemNode) => {
    
    // store project name in temp var
    const projName = listItemNode.textContent;

    // create form element
    const formProj = createProjForm(projName);

    // Setup event listener upon form element
    formProj.addEventListener('submit', (event) => {

        const newProjName = inputProj.value;
        
        if (Storage.checkProject(newProjName)) {
            alert('Project name exists.');
        } else {
            Storage.updateProject(projName, newProjName);

            const liNode = _createElement('li', '', newProjName, newProjName);
    
            formProj.replaceWith(liNode);
        }

        event.preventDefault();
    });

    // replace list item with input element
    listItemNode.replaceWith(formProj);
    
}
const deleteProject = (projectName, projectNode) => {
    // delete from Storage
    Storage.deleteProject(projectName);
    projectNode.remove();
}



export { DOMLoader };