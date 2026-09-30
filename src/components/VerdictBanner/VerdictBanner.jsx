import './VerdictBanner.css'

function VerdictBanner({verdict, rating}) {
    return (
        <div className='verdict-banner verdict-banner_${rating}'>
            <span className="verdict-banner__dot"></span>
            <span className="verdict-banner__text">{verdict}</span>
        </div>
    )
}

export default VerdictBanner
