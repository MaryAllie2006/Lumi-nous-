export function getCurrentCoords(){
    return new Promise((resolve, reject) =>{
        if (!navigation.geolocation){
            reject(new Error('Geolocation is not supported by your browser'))
            return 
        }

        navigation.geolocation.getCurrentPosition(
            (position) => 
                resolve({
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude, 
                }), 
                (error) => reject(error), 
                {timeout:1000, maximumAge: 5 * 60 * 1000}, 
        )
    })
}