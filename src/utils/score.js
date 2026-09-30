// Stargazing score on a 0–10 scale

const WEIGHTS = {
    sky: 0.5,
    moon: 0.25,
    lightPollution: 0.25,
}

// Minimum score for each rating, checked from the top down.
export const RATINGS = [
    { rating: 'excellent', min: 7.5, verdict: 'Excellent night for stargazing' },
    { rating: 'fair', min: 5, verdict: 'Fair night for stargazing' },
    { rating: 'poor', min: 0, verdict: 'Poor night for stargazing' },
]

// Each factor is scored 0–10, where 10 is ideal.
function scoreSky({ cloudCoverPercent, precipitationChancePercent = 0 }) {
    const worst = Math.max(cloudCoverPercent, precipitationChancePercent)
    return 10 * (1 - worst / 100)
}

function scoreMoon({ illuminationPercent }) {
    return 10 * (1 - illuminationPercent / 100)
}

// Bortle 1 (pristine) → 10, Bortle 9 (inner city) → 0.
function scoreLightPollution({ bortleClass }) {
    return (10 * (9 - bortleClass)) / 8
}

export function getRating(score) {
    return RATINGS.find(({ min }) => score >= min)
}

export function calculateScore({ weather, moonPhase, lightPollution }) {
    const total =
        WEIGHTS.sky * scoreSky(weather) +
        WEIGHTS.moon * scoreMoon(moonPhase) +
        WEIGHTS.lightPollution * scoreLightPollution(lightPollution)

    const score = Math.round(total * 10) / 10
    const { rating, verdict } = getRating(score)

    return { score, rating, verdict }
}
