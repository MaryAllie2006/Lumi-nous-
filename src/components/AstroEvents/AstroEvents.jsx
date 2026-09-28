import './AstroEvents.css'
import MonthSelector from '../MonthSelector/MonthSelector.jsx'
import EventList from '../EventList/EventList.jsx'

// Placeholder data for August 2026 until events come from the API.
const events = [
    { id: 1, title: 'Total Solar Eclipse', category: 'eclipse', dateRange: 'Aug 12', description: 'Totality visible across Greenland, Iceland and Spain.' },
    { id: 2, title: 'Perseids', category: 'meteor shower', dateRange: 'Aug 12 – 13', description: 'Up to 100 meteors per hour, with a new moon for dark skies.' },
    { id: 3, title: 'Full Sturgeon Moon', category: 'full moon', dateRange: 'Aug 28', description: 'Coincides with a partial lunar eclipse.' },
]

function AstroEvents(){
    return (
        <section className="astro-events">
            <h2 className="astro-events__title">Astro Events</h2>
            <MonthSelector />
            <EventList events={events} />
        </section>
    )
}

export default AstroEvents
