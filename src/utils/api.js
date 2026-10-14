import { mockAstroEvents } from './mockData.js'
import { getMoonPhase as calculateMoonPhase, getNextMoonTimes } from './moonPhase.js'
import { fetchTonightWeather } from './weather.js'
import { searchLocation, reverseLocation } from './location.js'
import { estimateLightPollution } from './lightPollution.js'

const MOCK_DELAY_MS = 600

function resolveWithDelay(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), MOCK_DELAY_MS)
    })
}

// query: a city/address string, or latitude/longitude from geolocation.
export function getLocation(query) {
    return typeof query === 'string' ? searchLocation(query) : reverseLocation(query)
}

// Live forecast from Open-Meteo
export function getWeather(coords) {
    return fetchTonightWeather(coords)
}

// Calculated with suncalc
export function getMoonPhase(coords, date = new Date()) {
    return Promise.resolve({ ...calculateMoonPhase(date), ...getNextMoonTimes(coords, date) })
}


export function getLightPollution(location) {
    return Promise.resolve(estimateLightPollution(location))
}


export function getAstroEvents(year, month) {
    if (!year || !month) {
        return resolveWithDelay(mockAstroEvents)
    }

    const prefix = `${year}-${String(month).padStart(2, '0')}`
    const events = mockAstroEvents.filter((event) => event.startDate.startsWith(prefix))
    return resolveWithDelay(events)
}
