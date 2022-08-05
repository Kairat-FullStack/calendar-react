import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Monitor from '../../Monitor/monitor'
import Header from '../Header/header'
import Main from '../Main/main'
import styled from 'styled-components'

const URL = 'http://localhost:5000';
const totalDays = 42;

export default function App() {
  const ShadowWrapper = styled('div')`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #737374;
  box-shadow: 0 0 1px #1A1A1A, 0 8px 20px 6px #888
  `;

  moment.updateLocale('en', { week: { dow: 1 } }) //! "updateLocale"- Определяет с какого дня недели начинается месяц
  // const today = moment();
  const [today, setToday] = useState(moment())
  const startDay = today.clone().startOf('month').startOf('week');

  const prevHundler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHundler = () => setToday(moment());
  const nextHundler = () => setToday(next => next.clone().add(1, 'month'));

  const [events, setEvents] = useState([]);
  const startDetaQuery = startDay.clone().format('X')
  const endDateQuery = startDay.clone().add(totalDays, 'days').format('X')
  useEffect(() => {
    fetch(`${URL}/events?date_gte=${startDetaQuery}&date_lte=${endDateQuery}`)
      .then(res => res.json())
      .then(res => {
        console.log('Response: ', res)
        setEvents(res)
      });
  }, [today]);

  return (
    <ShadowWrapper>
      <Header />
      <Monitor
        today={today}
        prevHundler={prevHundler}
        todayHundler={todayHundler}
        nextHundler={nextHundler}
      />
      <Main startDay={startDay} today={today} totalDays={totalDays} events={events}/>
    </ShadowWrapper>
  )
}
