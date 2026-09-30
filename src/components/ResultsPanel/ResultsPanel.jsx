import './ResultsPanel.css'
import ScoreRing from './../ScoreRing/ScoreRing.jsx'
import InfoCard from './../InfoCard/InfoCard.jsx'
import VerdictBanner from './../VerdictBanner/VerdictBanner.jsx'

import star from '../../images/star.svg'
import sunIcon from '../../images/Sun.svg'
import moonIcon from '../../images/moon.svg'
import pollutionIcon from '../../images/pollutionimg.svg'

// Turns '2026-08-10' into 'Monday, August 10'
function formatDate(isoDate){
    return new Date(`${isoDate}T00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })
}

function ResultsPanel({location, weather, moon, lightPollution, verdict, score, rating}){
    return(
        <div className="results-panel">
            <img className="results-panel__star" src={star} alt="" aria-hidden="true" />
            <h2 className="results-panel__title">{location.name}, {location.region}</h2>
            <p className="results-panel__subtitle">Tonight | {formatDate(weather.date)}</p>
            <ScoreRing score={score} />
            <VerdictBanner verdict={verdict} rating={rating}/>
            <div className="results-panel__cards">
                <InfoCard
                    icon={sunIcon}
                    label="Weather"
                    value={`${weather.temperatureF}°F · ${weather.cloudCoverPercent}% clouds`}
                    subtext={weather.summary}
                />
                <InfoCard
                    icon={moonIcon}
                    label="Moon Phase"
                    value={moon.phaseName}
                    subtext={`${moon.illuminationPercent}% illumination · rises ${moon.moonrise}`}
                />
                <InfoCard
                    icon={pollutionIcon}
                    label="Light Pollution"
                    value={`Bortle Class ${lightPollution.bortleClass}`}
                    subtext={lightPollution.description}
                />
            </div>
        </div>
    )
}

export default ResultsPanel
