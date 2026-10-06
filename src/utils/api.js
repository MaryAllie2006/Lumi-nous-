import {
    mockLocation,
    mockMoonPhase,
    mockLightPollution,
    mockAstroEvents,
} from './mockData.js'
import { getMoonPhase as calculateMoonPhase } from './moonPhase.js'
import { fetchTonightWeather } from './weather.js'

const MOCK_DELAY_MS = 600

function resolveWithDelay(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), MOCK_DELAY_MS)
    })
}

function rejectWithDelay(error) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(error), MOCK_DELAY_MS)
    })
}

// query: a city/address string, or { latitude, longitude } from geolocation.
export function getLocation(query) {
    // Mock only: search "nowhere" to test the not-found error
    if (typeof query === 'string' && query.trim().toLowerCase() === 'nowhere') {
        const error = new Error('Location not found')
        error.code = 'LOCATION_NOT_FOUND'
        return rejectWithDelay(error)
    }

    return resolveWithDelay(mockLocation)
}

// Live forecast from Open-Meteo for tonight (sunset → sunrise)
export function getWeather(coords) {
    return fetchTonightWeather(coords)
}

export function getMoonPhase(date = new Date()) {
    // Moonrise isn't calculated yet, so keep the mock value for now
    return resolveWithDelay({ ...calculateMoonPhase(date), moonrise: mockMoonPhase.moonrise })
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
