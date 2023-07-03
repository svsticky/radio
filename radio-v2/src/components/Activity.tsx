import React, {  useEffect, useRef } from 'react';
import moment from 'moment';



// * Time helper functions 
function isSameDay(d: Date, t = new Date()) {
    return d.getDate() == t.getDate() && // getDate returns day number in month...
        d.getMonth() == t.getMonth() &&
        d.getFullYear() == t.getFullYear();
}

function formatStartDate(startDate: Date, hasStartTime: boolean) {
    if (isSameDay(startDate) && hasStartTime)
        return moment(startDate).format('HH:mm');

    if (hasStartTime)
        return moment(startDate).format('dddd DD-MM HH:mm');

    return moment(startDate).format('dddd DD-MM');
}

function formatEndDate(endDate: Date, startDate: Date, hasEndTime: boolean) {
    if (!endDate) return null;

    if (isSameDay(endDate, startDate)) {
        if (hasEndTime) return moment(endDate).format('HH:mm');
        return null; // Same as start_date
    }

    if (hasEndTime)
    return moment(endDate).format('dddd DD-MM HH:mm');

return moment(endDate).format('dddd DD-MM');
}

// * Activity Component
export interface ActivityProps {
    active: boolean,
    name: string,
    participant_counter: number,
    start_date: Date, 
    has_start_time: boolean,
    end_date: Date,
    has_end_time: boolean
}

export function Activity (props: ActivityProps){
    const liRef = useRef<HTMLLIElement>(null);

    const startDate = formatStartDate(props.start_date, props.has_start_time);
    const endDate = formatEndDate(props.end_date,props.start_date, props.has_end_time)
        
    const participants = props.participant_counter  ? ` (${props.participant_counter})` : "";

    let className = 'activity';
    if (props.active) className += ' active';

    useEffect(() => {
        if(props.active && liRef.current) {
            liRef.current.scrollIntoView({ behavior: "smooth"});

        }
    },[props.active]);

    

    return (
      <li ref={liRef} className={className}>
        <h1>{props.name}{participants}</h1>
        <time>{startDate}</time>
        {endDate ? <time> - {endDate}</time> : null}
      </li>
    );

}



  
