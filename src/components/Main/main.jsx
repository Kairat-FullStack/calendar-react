// import moment from 'moment';
import React from 'react'
import styled from 'styled-components';
import CalendarHeader from '../CalendarHeader/input';
import MonthDaysList from '../MonthDaysList';

const GridWrapper = styled('div')`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 2px;
    background-color: ${props => props.isHeader ? '#1e1f21' : '#4D4C4D'};
    ${props => props.isHeader && 'border-bottom: 1px solid #4D4C4D'};
`;

export default function Main({ startDay, today, totalDays, events, openFormHandler}) {
    return (
        <>
            <GridWrapper isHeader>
                <CalendarHeader />
            </GridWrapper>

            <GridWrapper>
                <MonthDaysList
                    totalDays={totalDays}
                    openFormHandler={openFormHandler}
                    events={events}
                    startDay={startDay}
                    today={today}
                />
            </GridWrapper>
        </>
    )
}
