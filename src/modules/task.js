import { formatISO, parseISO, differenceInCalendarDays, format, isThisYear, isToday, isThisWeek, isPast } from 'date-fns'

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
            const todayColor = '#cf4e26';
            const pastColor = '#cf4e26';
            const upcomingColor = '#bb4ade';

            if (isToday(ISODate)) return ['Today', todayColor];
            if (isPast(ISODate)) return [format(ISODate, 'MMM d y'), pastColor];
            if (differenceInCalendarDays(ISODate, today) <= 7) return [format(ISODate, 'EEEE'), upcomingColor]; 
            if (isThisYear(ISODate)) return [format(ISODate, 'MMM d'), 'default'];
            return [format(ISODate, 'MMM d y'), 'default'];
        },
        isThisWeek(date) {
            return isThisWeek(parseISO(date));
        }
    }
    return Object.create(proto);
}

export { Task, Schedule };