import React from 'react'
import moment from 'moment'
import { CellWrapper, RowInCEll } from '../StyledComponents'    

export default function CalendarHeader() {
  return (
    <>
    {
        [...Array(7)].map((_, i) => (
            <CellWrapper isHeader isSelectedMonth key={i}>
                <RowInCEll justifyContent={'flex-end'} pr={1}>
                    {moment().day(i + 1).format('ddd')}
                </RowInCEll>
            </CellWrapper>
        ))
    }
</>
  )
}

