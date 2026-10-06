import {
    mockLightPollution,
    mockAstroEvents,
} from './mockData.js'
import { getMoonPhase as calculateMoonPhase } from './moonPhase.js'
import { fetchTonightWeather } from './weather.js'

import { searchLocation, reverseLocation } from './location.js'

const MOCK_DELAY_MS = 600

function resolveWithDelay(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), MOCK_DELAY_MS)
    })
}


export function getLocation(query) {
    return typeof query === 'string' ? searchLocation(query) : reverseLocation(query)
}

// Live forecast from Open-Meteo for tonight (sunset → sunrise)
export function getWeather(coords) {
    return fetchTonightWeather(coords)
}

// Moonrise isn't calculated yet, so it's left out rather than showing a fake time
export function getMoonPhase(date = new Date()) {
    return resolveWithDelay(calculateMoonPhase(date))
}

export function getLightPollution({ latitude, longitude }) {
    return resolveWithDelay(mockLightPollution)
}

// year: e.g. 2026, month: 1–12. Omit both to get every event.
export function getAstroEvents(year, month) {
    if (!year || !month) {
        return resolveWithDelay(mockAstroEvents)
    }

    const prefix = `${year}-${String(month).padStart(2, '0')}`
    const events = mockAstroEvents.filter((event) => event.startDate.startsWith(prefix))
    return resolveWithDelay(events)
}
