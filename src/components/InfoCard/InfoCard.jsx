import './InfoCard.css'

function InfoCard( {icon, label, value, subtext}) {
    return (
        <div className="info-card">
            <img className="info-card__icon" src={icon} alt="" />
            <span className="info-card__label">{label}</span>
            <p className="info-card__value">{value}</p>
            <p className="info-card__subtext">{subtext}</p>
        </div>
        
    )
}

export default InfoCard
