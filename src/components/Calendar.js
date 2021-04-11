import React from 'react';
import moment from 'moment';
import * as df from 'date-fns';
import "./calendar.css";

function Calendar() {
  const weekdayshort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = df.getISODay(df.startOfMonth(Date.now()));
  const numDaysInMonth = df.getDaysInMonth(df.startOfMonth(Date.now()));
  console.log(numDaysInMonth);

  let weekdayshortname = weekdayshort.map(day => (
    <th key={day} className="week-day">{day}</th>
  ));

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(
      <td className="calendar-day empty">{""}</td>
    );
  };

  let daysOfMonth = [];
  for (let d = 1; d <= numDaysInMonth; d++) {
    daysOfMonth.push(
      <td key={d} className="calendar-day">
        {d}
      </td>
    );
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

  console.log(rows, cells, totalSlots);

  let daysinmonth = rows.map((d, i) => {
    return <tr>{d}</tr>;
  });

  console.log(daysinmonth);



  return (
    <div>
      <h1>Calendar</h1>
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
