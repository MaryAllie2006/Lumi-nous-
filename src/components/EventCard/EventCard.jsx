import './EventCard.css'

// Per-category color theme, sourced from the Figma Astro Events frame.
const CATEGORY_THEME = {
    'meteor shower': { accent: '#f59e59', badgeBg: 'rgba(245,158,89,0.18)' },
    'planet': { accent: '#73b8f5', badgeBg: 'rgba(115,184,245,0.18)' },
    'full moon': { accent: '#b8a8ff', badgeBg: 'rgba(184,168,255,0.18)' },
    'eclipse': { accent: '#f0738c', badgeBg: 'rgba(240,115,140,0.18)' },
}
const DEFAULT_THEME = CATEGORY_THEME['full moon']

function EventCard({ title, category, dateRange, description }) {
    const theme = CATEGORY_THEME[category] ?? DEFAULT_THEME

    return (
        <div
            className="event-card"
            style={{
                '--event-accent': theme.accent,
                '--event-badge-bg': theme.badgeBg,
            }}
        >
            <div className="event-card__body">
                <div className="event-card__heading">
                    <p className="event-card__title">{title}</p>
                    <span className="event-card__badge">{category.toUpperCase()}</span>
                </div>
                <p className="event-card__date">{dateRange}</p>
                <p className="event-card__description">{description}</p>
            </div>
        </div>
    )
}

export default EventCard
