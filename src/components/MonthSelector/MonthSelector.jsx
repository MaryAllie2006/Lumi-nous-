import './MonthSelector.css'

function MonthSelector(){
    return (
        <div className="month-selector">
            <button className="month-selector__nav" aria-label="Previous month">‹</button>
            <p className="month-selector__label">
                <span className="month-selector__month">August</span>{' '}
                <span className="month-selector__year">2026</span>
            </p>
            <button className="month-selector__nav" aria-label="Next month">›</button>
        </div>
    )
}

export default MonthSelector
