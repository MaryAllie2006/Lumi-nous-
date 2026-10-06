const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'

// Shared by search and reverse: adds the common params and checks the response
async function requestNominatim(path, params) {
    const query = new URLSearchParams({
        ...params,
        format: 'jsonv2',
        addressdetails: 1,
        'accept-language': 'en',
    })

    const response = await fetch(`${NOMINATIM_URL}/${path}?${query}`)

    if (!response.ok) {
        const error = new Error(`Location request failed: ${response.status}`)
        error.code = 'LOCATION_UNAVAILABLE'
        throw error
    }

    return response.json()
}

// Turns a Nominatim result into the same shape as mockLocation
function toLocation(result, coords) {
    const { address = {} } = result
    const isUS = address.country_code === 'us'

    return {
        name: result.name || address.city || address.town || address.village || address.county || 'Your location',
        // US: state code ('US-CO' → 'CO'). Elsewhere: the country name.
        region: isUS ? address['ISO3166-2-lvl4']?.split('-')[1] : address.country,
        country: address.country,
        latitude: coords?.latitude ?? Number(result.lat),
        longitude: coords?.longitude ?? Number(result.lon),
    }
}

export async function searchLocation(query) {
    const results = await requestNominatim('search', { q: query, limit: 1 })

    if (results.length === 0) {
        const error = new Error(`No results for "${query}"`)
        error.code = 'LOCATION_NOT_FOUND'
        throw error
    }

    return toLocation(results[0])
}

export async function reverseLocation(coords) {
    const result = await requestNominatim('reverse', {
        lat: coords.latitude,
        lon: coords.longitude,
        zoom: 10, // city-level; higher numbers return street addresses
    })

    // Nominatim returns { error } for places with no address (e.g. open ocean).
    // The coordinates are still valid for a forecast, so keep going.
    if (result.error) {
        return toLocation({}, coords)
    }

    return toLocation(result, coords)
}
