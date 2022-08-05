import React from 'react'
import styled from 'styled-components'

const DivWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    background-color: #1E1F21;
    color: #DCDDDD;
    padding: 15px;
`;

const TextWrapper = styled('span')`
    font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 8px;
    font-size: 32px;
`;

const ButtonWrapper = styled('button')`
    border: none;
    background-color: #565759;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #E6E6E6;
    padding: 0px 10px;
    cursor: pointer;
    outline: unset;
`;

export default function Monitor({ today, prevHundler, todayHundler, nextHundler, totalDays }) {

    return (
        <DivWrapper>
            <div>
                <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
                <TextWrapper>{today.format('YYYY')}</TextWrapper>
            </div>
            <div>
                <ButtonWrapper onClick={prevHundler}> &lt; </ButtonWrapper>
                <ButtonWrapper onClick={todayHundler}>Today</ButtonWrapper>
                <ButtonWrapper onClick={nextHundler}> &gt; </ButtonWrapper>
            </div>
        </DivWrapper>
    )
}
