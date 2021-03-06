import React, { useState } from 'react';
import * as df from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import './calendar.css';

const currentDate = new Date();
const thisMonth = currentDate.getMonth() + 1;
const thisDay = currentDate.getDate();
const thisYear = currentDate.getFullYear();

function Calendar() {
  const [date, setDate] = useState({
    month: thisMonth,
    day: thisDay,
    year: thisYear,
  });
  const currentSelectedMonth = new Date(date.year.toString(), date.month.toString(), date.day.toString());
  const firstDayOfMonth = df.getISODay(df.startOfMonth(currentSelectedMonth));
  const numDaysInMonth = df.getDaysInMonth(currentSelectedMonth);
  let today = thisMonth === parseInt(date.month) &&
    thisYear === parseInt(date.year) ? thisDay : null;

  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek = daysOfWeek.map(day => (
    <th key={day} className="week-day">{day}</th>
  ));

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(
      <td key={uuidv4()} className="calendar-day empty">{""}</td>
    );
  };

  let daysOfMonth = [];
  for (let d = 1; d <= numDaysInMonth; d++) {
    daysOfMonth.push(
      <td
        key={d}
        tabIndex={d}
        className={
          `calendar-day 
          ${d === today ? "today" : null} 
          ${d === date.day ? "selected" : null}
        }`}
      >
        {d}
      </td>);
  }

  const totalSlots = [...blanks, ...daysOfMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows 
      cells = []; // empty container 
      cells.push(row); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) { // when end loop we add remain date
      rows.push(cells);
    }
  });

  let calendarRows = rows.map((d) => {
    return <tr onFocus={e => setDate({
      ...date,
      day: parseInt(e.target.innerText),
    })} key={uuidv4()}>{d}</tr>;
  });
  console.log(date);
  let tempDate = `${date.month}/${date.day}/${date.year}`;
  console.log(tempDate);
  var result = df.parse(tempDate, 'MM/dd/yyyy', new Date());
  console.log(result);
  return (
    <div>
      <h1>Calendar</h1>

      <label htmlFor="month-select">Month:</label>
      <select
        name="months"
        id="month-select"
        onChange={e => setDate({
          ...date,
          month: parseInt(e.target.value) + 1,
        })}
      >
        <option selected={date.month === 1} value={0}>January</option>
        <option selected={date.month === 2} value={1}>February</option>
        <option selected={date.month === 3} value={2}>March</option>
        <option selected={date.month === 4} value={3}>April</option>
        <option selected={date.month === 5} value={4}>May</option>
        <option selected={date.month === 6} value={5}>June</option>
        <option selected={date.month === 7} value={6}>July</option>
        <option selected={date.month === 8} value={7}>August</option>
        <option selected={date.month === 9} value={8}>September</option>
        <option selected={date.month === 10} value={9}>October</option>
        <option selected={date.month === 11} value={10}>November</option>
        <option selected={date.month === 12} value={11}>December</option>
      </select>

      <button
        onClick={() => setDate({ ...date, year: date.year - 1 })}
      >-</button>
      {date.year}
      <button
        onClick={() => setDate({ ...date, year: date.year + 1 })}
      >+</button>

      <table className="calendar-day">
        <thead>
          <tr>{daysOfWeek}</tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
      {date.month}/{date.day}/{date.year}
      {JSON.stringify(result)}
    </div>
  );
}

export default Calendar;
