// Mock data for building the UI before the real APIs are connected.
// These are the shapes components consume; api.js should normalize real
// responses into the same shapes so swapping mocks for live data is painless.

export const mockLocation = {
    name: 'Big Bend National Park',
    region: 'TX',
    country: 'US',
    latitude: 29.25,
    longitude: -103.25,
    timezone: 'America/Chicago',
}

export const mockWeather = {
    date: '2026-08-10',
    temperatureF: 68,
    cloudCoverPercent: 8,
    humidityPercent: 22,
    windSpeedMph: 6,
    visibilityMiles: 10,
    precipitationChancePercent: 0,
    sunset: '8:41 PM',
    sunrise: '7:13 AM',
    summary: 'Clear skies expected all night',
}

// Aug 10, 2026 is ~2.5 days before the Aug 12 new moon.
export const mockMoonPhase = {
    phaseName: 'Waning Crescent',
    illuminationPercent: 7,
    ageDays: 26.9,
    moonrise: '4:35 AM',
    moonset: '6:52 PM',
}

// Bortle scale: 1 (pristine dark sky) to 9 (inner city).
export const mockLightPollution = {
    bortleClass: 2,
    skyQualityMagnitude: 21.8, // mag/arcsec²; higher is darker
    description: 'Excellent dark-sky visibility',
}

// `category` must match a key in EventCard's CATEGORY_THEME.
// `startDate`/`endDate` are for filtering by month; `dateRange` is display text.
export const mockAstroEvents = [
    {
        id: 'total-solar-eclipse-2026',
        title: 'Total Solar Eclipse',
        category: 'eclipse',
        startDate: '2026-08-12',
        endDate: '2026-08-12',
        dateRange: 'Aug 12',
        description: 'Totality visible across Greenland, Iceland and northern Spain.',
    },
    {
        id: 'perseids-2026',
        title: 'Perseids',
        category: 'meteor shower',
        startDate: '2026-08-12',
        endDate: '2026-08-13',
        dateRange: 'Aug 12 – 13',
        description: 'Up to 100 meteors per hour, with a new moon for dark skies.',
    },
    {
        id: 'venus-elongation-2026',
        title: 'Venus at Greatest Elongation',
        category: 'planet',
        startDate: '2026-08-15',
        endDate: '2026-08-15',
        dateRange: 'Aug 15',
        description: 'Venus reaches its highest point in the western evening sky.',
    },
    {
        id: 'sturgeon-moon-2026',
        title: 'Full Sturgeon Moon',
        category: 'full moon',
        startDate: '2026-08-28',
        endDate: '2026-08-28',
        dateRange: 'Aug 28',
        description: 'Coincides with a partial lunar eclipse visible from the Americas.',
    },
    {
        id: 'harvest-moon-2026',
        title: 'Full Harvest Moon',
        category: 'full moon',
        startDate: '2026-09-26',
        endDate: '2026-09-26',
        dateRange: 'Sep 26',
        description: 'The full moon closest to the autumn equinox, rising near sunset.',
    },
    {
        id: 'saturn-opposition-2026',
        title: 'Saturn at Opposition',
        category: 'planet',
        startDate: '2026-10-04',
        endDate: '2026-10-04',
        dateRange: 'Oct 4',
        description: 'Saturn is at its brightest and visible all night.',
    },
]
