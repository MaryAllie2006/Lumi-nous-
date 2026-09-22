import './ScoreRing.css'

function ScoreRing({ score }){
    return(
        <div className="score-ring">
            <span className="score-ring__score">{score}</span>
            <p className="score-ring__subtext">Stargazing Score</p>
        </div>
    )
}

export default ScoreRing
