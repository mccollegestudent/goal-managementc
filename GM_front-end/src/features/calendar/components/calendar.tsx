import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useCalendarEvents } from "../hooks/use_calendarevent";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.scss"
import { Card } from "@/components/ui/card";
import { CalendarEvent } from "@/features/goals/schemas/goalModels";

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const { calendarEvents } = useCalendarEvents();
  const eventStyleGetter = (event: CalendarEvent) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: "5px",
      opacity: 0.9,
      color: "white",
      border: "none",
      display: "flex",
      padding: "10px",
      gap:"15px",
      fontWeight:500,
      
    };
    return { style };
  };

  const tooltipAccessor = (event: CalendarEvent) => {
    return `${event.title}\nType: ${event.type}\nDescription: ${event.description}`;
  };

  return (
    <Card className="p-4">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        className="min-h-[800px]"
        views={["month", "week", "day"]}
        defaultView="month"
        tooltipAccessor={tooltipAccessor}
        step={15}
        timeslots={4}
      />
    </Card>
  );
};

export default MyCalendar;
