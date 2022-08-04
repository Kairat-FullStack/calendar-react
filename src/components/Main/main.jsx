import moment from 'moment';
import React from 'react'
import styled from 'styled-components';

export default function Main({ startDay }) {
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
        color: #fff;
    `;

    const RowInCEll = styled('div')`
        display: flex;
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

    const day = startDay.clone().subtract(1, 'day') //! "subtract" - вычитает дни

    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    console.log('daysArray: ', daysArray);

    const isCurrentday = (day) => moment().isSame(day, 'day'); //! "isSame" - сравнивает элементы на идентичность

    return (
        <>
            <GridWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper isHeader>
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
                        >
                            <RowInCEll justifyContent={'flex-end'}>
                                <DayWrapper>
                                    {!isCurrentday(dayItem) && dayItem.format('DD')}

                                    {isCurrentday(dayItem) &&
                                        <CurrentDay>{dayItem.format('DD')}</CurrentDay>}
                                </DayWrapper>
                            </RowInCEll>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
        </>
    )
}
