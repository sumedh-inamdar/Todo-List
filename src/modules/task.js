/* Task.js 

Module responsible for creating a task object and supporting functions

*/
import { formatISO, parseISO, differenceInCalendarDays, format, isThisYear, isToday, isThisWeek, isPast } from 'date-fns'
import { Storage } from './storage'

const Task = (id, title, description, date, priority, projID) => {

    let isComplete = false;

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
        getDateDOM() {
            return date ? Schedule().getFormattedDate(date) : '';
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
        getProjID() {
            return projID;
        },
        setProjID(newProjID) {
            projID = newProjID; 
        },
        update(newTitle, newDesc, newDate, newPriority, newProjID) {
            this.setTitle(newTitle);
            this.setDescription(newDesc);
            this.setDate(newDate);
            this.setPriority(newPriority);
            this.setProjID(newProjID);
        },
        isCompleted() {
            return isComplete;
        },
        check() {
            isComplete = !isComplete;
        }
    }
    return Object.create(proto);
}

const Schedule = () => {
    const today = new Date(Date.now());
    const proto = {
        getDateToday() {
            return formatISO(today, { representation: 'date'});
        },
        getFormattedDate(date) {

            const ISODate = parseISO(date);

            if (isToday(ISODate)) return 'Today';
            if (isPast(ISODate)) return format(ISODate, 'MMM d y');
            if (differenceInCalendarDays(ISODate, today) <= 7) return format(ISODate, 'EEEE'); 
            if (isThisYear(ISODate)) return format(ISODate, 'MMM d');
            return format(ISODate, 'MMM d y')
        },
        isThisWeek(date) {
            return isThisWeek(parseISO(date));
        }
        
    }
    return Object.create(proto);
}

export { Task, Schedule };