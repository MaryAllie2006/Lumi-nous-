// Moon phase from the date alone, no API needed. Counts how far we are into
// the current lunar cycle from a known new moon, using the average cycle
// length. Accurate to within about a day, which is plenty for a phase
// name and illumination percentage.

const SYNODIC_MONTH_DAYS = 29.530588853 // average new moon → new moon
const KNOWN_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14) // Jan 6, 2000 18:14 UTC
const MS_PER_DAY = 24 * 60 * 60 * 1000

// Eight slices of the cycle
const PHASE_NAMES = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
]

// Returns the same shape as mockMoonPhase, minus moonrise/moonset, which
// depend on location and need a separate calculation or API.
export function getMoonPhase(date = new Date()) {
    const daysSinceKnown = (date.getTime() - KNOWN_NEW_MOON_MS) / MS_PER_DAY

    // % can go negative for dates before 2000, so wrap it back into range.
    const ageDays =
        ((daysSinceKnown % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS
    const cycleFraction = ageDays / SYNODIC_MONTH_DAYS // 0 = new, 0.5 = full

    // Lit fraction of the disc: 0 at new moon, 1 at full, following a cosine curve.
    const illumination = (1 - Math.cos(2 * Math.PI * cycleFraction)) / 2
    const phaseIndex = Math.round(cycleFraction * 8) % 8

    return {
        phaseName: PHASE_NAMES[phaseIndex],
        illuminationPercent: Math.round(illumination * 100),
        ageDays: Math.round(ageDays * 10) / 10,
    }
}
