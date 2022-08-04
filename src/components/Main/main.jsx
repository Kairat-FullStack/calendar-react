import moment from 'moment';
import React from 'react'
import styled from 'styled-components';

export default function Main({ startDay }) {
    const GridWrapper = styled('div')`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
        grid-gap: 1px;
        background-color: #404040;
    `;

    const CellWrapper = styled('div')`
        min-width: 140px;
        min-height: 80px;
        background-color: ${props => props.isWeekend ? '#272829' : '#1e1f21'};
        color: #fff;
    `;

    const RowInCEll = styled('div')`
        display: flex;
        justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
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
        <GridWrapper>
            {
                daysArray.map((dayItem) => (
                    <CellWrapper
                        key={dayItem.format('DDMMYYYY')}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
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
    )
}
