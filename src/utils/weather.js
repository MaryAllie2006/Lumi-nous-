const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const METERS_PER_MILE = 1609.34

const HOURLY_FIELDS = [
    'temperature_2m',
    'cloud_cover',
    'precipitation_probability',
    'relative_humidity_2m',
    'wind_speed_10m',
    'visibility',
].join(',')

// Fetches tonight's forecast and returns it in the same shape as mockWeather
export async function fetchTonightWeather({ latitude, longitude }) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        hourly: HOURLY_FIELDS,
        daily: 'sunrise,sunset',
        temperature_unit: 'fahrenheit',
        wind_speed_unit: 'mph',
        timezone: 'auto',
        forecast_days: 2,
    })

    const response = await fetch(`${FORECAST_URL}?${params}`)

    if (!response.ok) {
        const error = new Error(`Weather request failed: ${response.status}`)
        error.code = 'WEATHER_UNAVAILABLE'
        throw error
    }

    return toWeather(await response.json())
}

// Average of the given hours, skipping any missing values
function average(values, hours) {
    const present = hours.map((i) => values[i]).filter((v) => v != null)
    return present.reduce((sum, v) => sum + v, 0) / present.length
}

function maximum(values, hours) {
    return Math.max(...hours.map((i) => values[i] ?? 0))
}

// '2026-09-30T19:39' → '7:39 PM', in the location's own time zone
function formatTime(isoTime) {
    const [hours, minutes] = isoTime.slice(11, 16).split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`
}

function describeSky(cloudCover, precipChance) {
    if (precipChance >= 50) return 'Rain likely tonight'
    if (cloudCover < 20) return 'Clear skies expected all night'
    if (cloudCover < 50) return 'Partly cloudy tonight'
    if (cloudCover < 80) return 'Mostly cloudy tonight'
    return 'Overcast tonight'
}

function toWeather({ hourly, daily }) {
    // Tonight = every hour between today's sunset and tomorrow's sunrise
    const sunset = daily.sunset[0]
    const sunrise = daily.sunrise[1]
    const night = hourly.time
        .map((time, i) => i)
        .filter((i) => hourly.time[i] >= sunset && hourly.time[i] <= sunrise)

    const cloudCoverPercent = Math.round(average(hourly.cloud_cover, night))
    const precipitationChancePercent = maximum(hourly.precipitation_probability, night)

    return {
        date: daily.time[0],
        temperatureF: Math.round(average(hourly.temperature_2m, night)),
        cloudCoverPercent,
        humidityPercent: Math.round(average(hourly.relative_humidity_2m, night)),
        windSpeedMph: Math.round(average(hourly.wind_speed_10m, night)),
        visibilityMiles: Math.round(average(hourly.visibility, night) / METERS_PER_MILE),
        precipitationChancePercent,
        sunset: formatTime(sunset),
        sunrise: formatTime(sunrise),
        summary: describeSky(cloudCoverPercent, precipitationChancePercent),
    }
}
