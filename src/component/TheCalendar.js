import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TheCalendar() {

  const [trainings, setTrainings] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => setTrainings(responseData))
      .catch(error => console.error(error));
  };

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
      },
    })

  const events = trainings.map(event => ({
    startDate: moment(event.date).toDate(),
    endDate: moment(event.date)
      .add(event.duration, "minutes")
      .toDate(),
    title:
      event.customer.firstname +
      " " +
      event.customer.lastname +
      ": " +
      event.activity
  }));

  return (
    <div style={{ paddingTop: 80, height: '100%', width: '90%', margin: 'auto' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        showMultiDayTimes
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        style={{ margin: 20, height: "80vh" }}

      />
    </div>
  );
}
