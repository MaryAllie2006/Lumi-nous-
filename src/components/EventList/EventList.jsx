import './EventList.css'
import EventCard from '../EventCard/EventCard.jsx'

function EventList({ events }) {
    if (events.length === 0) {
        return <p className="event-list__empty">No events this month.</p>
    }

    return (
        <ul className="event-list">
            {events.map((event) => (
                <li className="event-list__item" key={event.id}>
                    <EventCard
                        title={event.title}
                        category={event.category}
                        dateRange={event.dateRange}
                        description={event.description}
                    />
                </li>
            ))}
        </ul>
    )
}

export default EventList
