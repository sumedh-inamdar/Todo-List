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

export { Task };