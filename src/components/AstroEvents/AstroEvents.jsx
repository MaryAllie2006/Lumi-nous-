import "./AstroEvents.css";
import MonthSelector from "../MonthSelector/MonthSelector.jsx";
import EventList from "../EventList/EventList.jsx";
import { getAstroEvents } from "../../utils/api.js";

import { useEffect, useState } from "react";

function getCurrentMonth() {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
}

// Moves { year, month } by `delta` months, wrapping across years
function shiftMonth({ year, month }, delta) {
  const date = new Date(year, month - 1 + delta);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}

function AstroEvents() {
  const [selected, setSelected] = useState(getCurrentMonth);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let ignore = false;
    setEvents(null);

    getAstroEvents(selected.year, selected.month).then((data) => {
      if (!ignore) setEvents(data);
    });

    return () => {
      ignore = true;
    };
  }, [selected.year, selected.month]);

  return (
    <section className="astro-events">
      <h2 className="astro-events__title">Astro Events</h2>
      <MonthSelector
        year={selected.year}
        month={selected.month}
        onPrev={() => setSelected((current) => shiftMonth(current, -1))}
        onNext={() => setSelected((current) => shiftMonth(current, 1))}
      />
      {events === null ? (
        <p className="astro-events__loading">Loading events...</p>
      ) : (
        <EventList events={events} />
      )}
    </section>
  );
}

export default AstroEvents;
