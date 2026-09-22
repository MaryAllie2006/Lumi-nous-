import './ResultsPanel.css'
import ScoreRing from './../ScoreRing/ScoreRing.jsx'
import InfoCard from './../InfoCard/InfoCard.jsx'
import VerdictBanner from './../VerdictBanner/VerdictBanner.jsx'

import star from '../../images/star.svg'
import sunIcon from '../../images/Sun.svg'
import moonIcon from '../../images/moon.svg'
import pollutionIcon from '../../images/pollutionimg.svg'

function ResultsPanel(){
    return(
        <div className="results-panel">
            <img className="results-panel__star" src={star} alt="" aria-hidden="true" />
            <h2 className="results-panel__title"> Big Bend National Park, TX</h2>
            <p className="results-panel__subtitle">Tonight | Monday, August 10</p>
            <ScoreRing score={8.6} />
            <VerdictBanner/>
            <div className="results-panel__cards">
                <InfoCard icon={sunIcon} label="Weather" value="68°F · 8% clouds" subtext="clear skies expected all night"/>
                <InfoCard icon={moonIcon} label="Moon Phase" value="Waning Crescent" subtext="12% illumination rises 3:40 AM" />
                <InfoCard icon={pollutionIcon} label="Light Pollution" value="Bortle Class 2" subtext="Excellent Dark-sky visibility" />
            </div>
        </div>
    )
}

export default ResultsPanel