import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as df from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const currentDate = new Date();
const thisMonth = currentDate.getMonth();
const thisDay = currentDate.getDate();
const thisYear = currentDate.getFullYear();

function Calendar() {
  console.log(currentDate)
  const [date, setDate] = useState({
    month: thisMonth,
    day: thisDay,
    year: thisYear,
  })
  const currentSelectedYear = new Date(date.year.toString());
  const currentSelectedMonth = new Date(date.year.toString(), date.month.toString());
  console.log(currentSelectedYear)
  console.log(currentSelectedMonth)
  const weekdayshort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // const currentSelectedMonth = df.addMonths(currentDate, date.month - thisMonth);
  const numDaysInMonth = df.getDaysInMonth(currentSelectedMonth);
  let today = thisMonth === parseInt(date.month) && 
  thisYear === parseInt(date.year) ? date.day : null;
  console.log(currentSelectedMonth)
  console.log(date.month)
  const firstDayOfMonth = df.getISODay(df.startOfMonth(currentSelectedMonth));

  console.log(thisMonth);
  console.log(date.month)
  console.log(thisYear);
  console.log(date.year);
  console.log(thisDay);

  let weekdayshortname = weekdayshort.map(day => (
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
    console.log(today)
    daysOfMonth.push(
      <td key={d} className={`calendar-day ${d === today ? "today" : "not-today"} }`}>
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

  let daysinmonth = rows.map((d) => {
    return <tr key={uuidv4()}>{d}</tr>;
  });

  return (
    <div>
      <h1>Calendar</h1>

      <label htmlFor="month-select">Month:</label>
      <select
        name="months"
        id="month-select"
        onChange={e => setDate({
          ...date,
          month: e.target.value,
        })}
      >
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
        <option value={4}>May</option>
        <option value={5}>June</option>
        <option value={6}>July</option>
        <option value={7}>August</option>
        <option value={8}>September</option>
        <option value={9}>October</option>
        <option value={10}>November</option>
        <option value={11}>December</option>
      </select>

    <button onClick={() => setDate({
      ...date,
      year: date.year - 1
    })}>-</button>
    {date.year}
    <button onClick={() => setDate({
      ...date,
      year: date.year + 1
    })}>+</button>
    {console.log(date.year)}

      <table className="calendar-day">
        <thead>
          <tr>{weekdayshortname}</tr>
        </thead>
        <tbody>{daysinmonth}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
