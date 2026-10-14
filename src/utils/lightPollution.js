const BORTLE_BY_SETTLEMENT = {
    city: 7,
    town: 5,
    village: 4,
    hamlet: 3,
}
const COUNTRYSIDE_BORTLE = 2

const DESCRIPTIONS = {
    2: 'Dark sky. The Milky Way should be clearly visible',
    3: 'Rural sky with a little glow on the horizon',
    4: 'Some light pollution. The Milky Way is faint near the horizon',
    5: 'Suburban sky. Only the brighter parts of the Milky Way',
    7: 'City sky. Mostly bright stars and planets',
}

export function estimateLightPollution({ settlement }) {
    const bortleClass = BORTLE_BY_SETTLEMENT[settlement] ?? COUNTRYSIDE_BORTLE

    return {
        bortleClass,
        description: DESCRIPTIONS[bortleClass],
        isEstimate: true,
    }
}
