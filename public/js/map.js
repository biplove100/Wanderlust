//The mapToken is retrived from the show.ejs and then used as we can't access the .env variables inside the public files
console.log(mapToken)
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});


// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({color: "red"})
.setLngLat(coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25}).setHTML(
        `<p>Exact location provided after Booking</p>`
    )
)       //
.addTo(map);