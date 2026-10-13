// Moon phase and rise/set times from the date and location, no API needed.
// suncalc does the astronomy; this file turns its numbers into the app's shape.
import { getMoonIllumination, getMoonTimes } from 'suncalc'

const SYNODIC_MONTH_DAYS = 29.530588853 // average new moon → new moon
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

// Returns the same shape as mockMoonPhase, minus moonrise/moonset (see getNextMoonTimes)
export function getMoonPhase(date = new Date()) {
    // fraction: 0–1 of the disc lit. phase: 0–1 through the cycle (0 = new, 0.5 = full).
    const { fraction, phase } = getMoonIllumination(date)
    const phaseIndex = Math.round(phase * 8) % 8

    return {
        phaseName: PHASE_NAMES[phaseIndex],
        illuminationPercent: Math.round(fraction * 100),
        ageDays: Math.round(phase * SYNODIC_MONTH_DAYS * 10) / 10,
    }
}

// Next moonrise and moonset after `now`, or null if none in the next two days
export function getNextMoonTimes({ latitude, longitude }, now = new Date()) {
    // getMoonTimes searches one day at a time, and the moon rises ~50 min later each day,
    // so check today and tomorrow and take the first time still in the future.
    const days = [0, 1].map((offset) =>
        getMoonTimes(new Date(now.getTime() + offset * MS_PER_DAY), latitude, longitude),
    )
    const next = (key) => days.map((times) => times[key]).find((time) => time && time > now) ?? null

    return { moonrise: next('rise'), moonset: next('set') }
}
