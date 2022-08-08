import moment from 'moment';
import React from 'react'
import CalendarCell from '../CalendarCell';
import { isDayContainCurrentEvent } from '../helpers';


export default function MonthDaysList({ startDay, totalDays, events, openFormHandler, today }) {
    const day = startDay.clone().subtract(1, 'day'); //! "subtract" - вычитает дни
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    return (
        daysArray.map((dayItem) => (
            <CalendarCell
                key={moment(dayItem).format('X')}
                today={today}
                events={events.filter(event => isDayContainCurrentEvent(event, dayItem))}
                dayItem={dayItem}
                openFormHandler={openFormHandler}
            />
        ))
    )
}
