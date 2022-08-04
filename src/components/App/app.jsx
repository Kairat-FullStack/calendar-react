import React from 'react'
import moment from 'moment'
import Monitor from '../../Monitor/monitor'
import Header from '../Header/header'
import Main from '../Main/main'
import styled from 'styled-components'

export default function App() {
  const ShadowWrapper = styled('div')`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #737374;
  box-shadow: 0 0 1px #1A1A1A, 0 8px 20px 6px #888
  `;

  moment.updateLocale('en', { week: { dow: 1 } }) //! "updateLocale"- Определяет с какого дня недели начинается месяц
  const today = moment();
  const startDay = today.clone().startOf('month').startOf('week');

  return (
    <ShadowWrapper>
      <Header />
      <Monitor today={today} />
      <Main startDay={startDay} />
    </ShadowWrapper>
  )
}
