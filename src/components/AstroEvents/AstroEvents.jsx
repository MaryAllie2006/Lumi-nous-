import './AstroEvents.css'
import MonthSelector from '../MonthSelector/MonthSelector.jsx'
import EventList from '../EventList/EventList.jsx'
import { mockAstroEvents } from '../../utils/mockData.js'

// Hardcoded to August 2026 until MonthSelector drives the selected month.
const events = mockAstroEvents.filter((event) => event.startDate.startsWith('2026-08'))

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
