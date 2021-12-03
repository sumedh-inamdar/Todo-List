/* Task.js 

Module responsible for creating a task object and supporting functions

*/
import { formatISO, parseISO, differenceInCalendarDays, format, isThisYear, isToday } from 'date-fns'

const Task = (id, title, description, date, priority) => {

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
            return Schedule().getFormattedDate(date);
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
            const daysFromToday = differenceInCalendarDays(ISODate, today);

            if (isToday(ISODate)) return 'Today';
            if (daysFromToday <= 7) return format(ISODate, 'EEEE'); 
            if (isThisYear(ISODate)) return format(ISODate, 'MMM d');
            return format(ISODate, 'MMM d y')
        }
    }
    return Object.create(proto);
}

export { Task, Schedule };