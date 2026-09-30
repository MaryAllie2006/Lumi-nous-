import './MonthSelector.css'

// month is 1–12
function MonthSelector({year, month, onPrev, onNext}){
    const monthName = new Date(year, month - 1).toLocaleDateString('en-US', {month: 'long'})
    return (
        <div className="month-selector">
            <button type="button" className="month-selector__nav" aria-label="Previous month" onClick={onPrev}>‹</button>
            <p className="month-selector__label" aria-live="polite">
                <span className="month-selector__month">{monthName}</span>{' '}
                <span className="month-selector__year">{year}</span>
            </p>
            <button type="button" className="month-selector__nav" aria-label="Next month" onClick={onNext}>›</button>
        </div>
    )
}

export default MonthSelector
