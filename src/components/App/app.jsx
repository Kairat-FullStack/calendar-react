import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Monitor from '../Monitor/monitor'
import Header from '../Header/header'
import Main from '../Main/main'
import styled from 'styled-components'

const URL = 'http://localhost:5000';
const totalDays = 42;


const ShadowWrapper = styled('div')`
border-radius: 8px;
overflow: hidden;
border: 1px solid #737374;
box-shadow: 0 0 1px #1A1A1A, 0 8px 20px 6px #888
`;

const FormPositionWrapper = styled('div')`
position: absolute;
z-index: 100;
background-color: rgba(0, 0, 0, 0.35);
display: flex;
justify-content: center;
align-items: center;
top: 0;
left: 0;
right: 0;
bottom: 0;
`;

const FormWrapper = styled(ShadowWrapper)`
width: 200px;
background-color: #1E1F21;
color: #fff;
box-shadow: unset;
`;

const EventTitle = styled('input')`
padding: 8px 14px;
font-size: .85rem;
width: 100%;
border: unset;
background-color: #1E1F21;
color: #fff;
outline: unset;
border-bottom: 1px solid #464648;
`;

const EventDesc = styled('textarea')`
padding: 8px 14px;
font-size: .85rem;
width: 100%;
border: unset;
background-color: #1E1F21;
color: #fff;
outline: unset;
border-bottom: 1px solid #464648;
`;

const ButtonWrapper = styled('button')`
  color: ${props => props.danger ? '#f00' : '#27282A'};
  border: 1px solid ${props => props.danger ? '#f00' : '#27282A'};
  border-radius: 5px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 3px;
  }
`;
const ButtonsWrapper = styled('div')`
padding: 8px 14px;
display: flex;
justify-content: flex-end;
`;

export default function App() {

  const defaultEvent = {
    title: '',
    description: '',
    date: moment().format('X')
  }

  moment.updateLocale('en', { week: { dow: 1 } }) //! "updateLocale"- Определяет с какого дня недели начинается месяц
  const [today, setToday] = useState(moment())

  const startDay = today.clone().startOf('month').startOf('week');

  const prevHundler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHundler = () => setToday(moment());
  const nextHundler = () => setToday(next => next.clone().add(1, 'month'));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const startDetaQuery = startDay.clone().format('X')
  const endDateQuery = startDay.clone().add(totalDays, 'days').format('X')

  useEffect(() => {
    fetch(`${URL}/events?date_gte=${startDetaQuery}&date_lte=${endDateQuery}`)
      .then(res => res.json())
      .then(res => {
        setEvents(res)
      });
  }, [today]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setShowForm(true);
    setEvent(eventForUpdate || { ...defaultEvent, date: dayItem.format('X') });
    setMethod(methodName);
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  };

  const eventFetchHandler = () => {
    const fetchUrl = method === 'Update' ? `${URL}/events/${event.id}` : `${URL}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then(res => {
        if (method === 'Update') {
          setEvents(prevState => prevState.map(el => el.id === res.id ? res : el))
        } else {
          setEvents(prevState => [...prevState, res])
        }
        cancelButtonHandler()
      })
  };

  const removeEventHandler = () => {
    const fetchUrl = `${URL}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'aplication/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        setEvents(prevState => prevState.filter(el => el.id !== event.id))
        cancelButtonHandler()
      })
  }

  return (
    <>
      {
        isShowForm ? (
          <FormPositionWrapper onClick={cancelButtonHandler}>
            <FormWrapper onClick={e => e.stopPropagation()}>
              <EventTitle
                value={event.title}
                onChange={e => changeEventHandler(e.target.value, 'title')}
                placeholder="Title"
              />
              <EventDesc
                value={event.description}
                onInput={e => changeEventHandler(e.target.value, 'description')}
                placeholder="Description"
              />
              <ButtonsWrapper>
                <ButtonWrapper onClick={cancelButtonHandler}>Cancel</ButtonWrapper>
                <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                {
                  method === 'Update' ? (
                    <ButtonWrapper danger onClick={removeEventHandler}>Remove</ButtonWrapper>
                  ) : null
                }
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
        ) : null
      }
      <ShadowWrapper>
        <Header />
        <Monitor
          today={today}
          prevHundler={prevHundler}
          todayHundler={todayHundler}
          nextHundler={nextHundler}
        />
        <Main
          startDay={startDay}
          today={today}
          totalDays={totalDays}
          events={events}
          openFormHandler={openFormHandler}
        />
      </ShadowWrapper>
    </>
  )
}
