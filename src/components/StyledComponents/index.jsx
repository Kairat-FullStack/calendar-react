import styled from "styled-components";

export const CellWrapper = styled('div')`
    min-width: 140px;
    min-height: ${props => props.isHeader ? 24 : 95}px;
    background-color: ${props => props.isWeekDay ? '#272829' : '#1e1f21'};
    color: ${props => props.isSelectedMonth ? '#DDDDDD' : '#555759'};
`;

export const RowInCEll = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
    ${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;