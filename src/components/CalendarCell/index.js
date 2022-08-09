import React from 'react'
import styled from 'styled-components';
import { isCurrentday, isSelectedMonth } from '../helpers';
import { CellWrapper, RowInCEll } from '../StyledComponents'

const DayWrapper = styled('div')`
height: 33px;
width: 33px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`;

const CurrentDay = styled('div')`
height: 100%;
width: 100%;
background-color: #f00;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
`;

const ShowDayWrapper = styled('div')`
display: flex;
justify-content: flex-end;
`;

const EventListWrapper = styled('ul')`
margin: unset;
list-style-position: inside;
padding-left: 4px;
`;
const EventItemWrapper = styled('button')`
position: relative;
left: -14px;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
width: 114px;
border: unset;
background: unset;
color: #DDDDDD;
cursor: pointer;
margin: 0;
padding: 0;
text-align: left;
`;


export default function CalendarCell({ dayItem, today, openFormHandler, events }) {
    return (
        <div>
            <CellWrapper CellWrapper
                isWeekDay={dayItem.day() === 6 || dayItem.day() === 0}
                key={dayItem.unix()}
                isSelectedMonth={isSelectedMonth(dayItem, today)}
            >
                <RowInCEll justifyContent={'flex-end'}>
                    <ShowDayWrapper>
                        <DayWrapper onClick={(e) => {
                            openFormHandler('Create', null, dayItem)
                        }}>
                            {
                                isCurrentday(dayItem) ? (
                                    <CurrentDay>{dayItem.format('DD')}</CurrentDay>
                                ) : (
                                    dayItem.format('DD')
                                )
                            }
                        </DayWrapper>
                    </ShowDayWrapper>
                    <EventListWrapper>
                        {
                            events
                                .map(event => (
                                    <li key={event.id}>
                                        <EventItemWrapper onClick={(e) => openFormHandler('Update', event,)}>
                                            {event.title}
                                        </EventItemWrapper>
                                    </li>
                                ))
                        }
                        {/* {
                            events.length > 2 ? ( 
                                <li key="show more" >
                                    <EventItemWrapper>
                                        Show more...
                                    </EventItemWrapper>
                                </li>
                            ) : null
                        } */}
                    </EventListWrapper>
                </RowInCEll>
            </CellWrapper>
        </div>
    )
}
