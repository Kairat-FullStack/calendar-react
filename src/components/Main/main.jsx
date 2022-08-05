import moment from 'moment';
import React from 'react'
import styled from 'styled-components';

export default function Main({ startDay, today, totalDays, events }) {
    const GridWrapper = styled('div')`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 2px;
        background-color: ${props => props.isHeader ? '#1e1f21' : '#4D4C4D'};
        ${props => props.isHeader && 'border-bottom: 1px solid #4D4C4D'};
    `;

    const CellWrapper = styled('div')`
        min-width: 140px;
        min-height: ${props => props.isHeader ? 24 : 80}px;
        background-color: ${props => props.isWeekDay ? '#272829' : '#1e1f21'};
        color: ${props => props.isSelectedMonth ? '#DDDDDD' : '#555759'};
    `;

    const RowInCEll = styled('div')`
        display: flex;
        flex-direction: column;
        justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
        ${props => props.pr && `padding-right: ${props.pr * 8}px`}
    `;
    const DayWrapper = styled('div')`
        height: 33px;
        width: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
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

    const day = startDay.clone().subtract(1, 'day') //! "subtract" - вычитает дни

    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    // console.log('daysArray: ', daysArray);

    const isCurrentday = (day) => moment().isSame(day, 'day'); //! "isSame" - сравнивает элементы на идентичность
    const isSelectedMonth = (day) => today.isSame(day, 'month');

    return (
        <>
            <GridWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper isHeader isSelectedMonth>
                        <RowInCEll justifyContent={'flex-end'} pr={1}>
                            {moment().day(i + 1).format('ddd')}
                        </RowInCEll>
                    </CellWrapper>
                ))}
            </GridWrapper>

            <GridWrapper>
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper
                            isWeekDay={dayItem.day() === 6 || dayItem.day() === 0}
                            key={dayItem.unix()}
                            isSelectedMonth={isSelectedMonth(dayItem)}
                        >
                            <RowInCEll justifyContent={'flex-end'}>
                                <ShowDayWrapper>
                                    <DayWrapper>
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
                                            .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                            .map(event => (
                                                <li key={event.id}>
                                                    <EventItemWrapper>
                                                        {event.title}
                                                    </EventItemWrapper>
                                                </li>
                                            ))
                                    }
                                </EventListWrapper>
                            </RowInCEll>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
        </>
    )
}
