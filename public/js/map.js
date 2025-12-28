mapboxgl.accessToken = mapToken;
        //  'pk.eyJ1IjoicHJhc2hhbnQ3NzciLCJhIjoiY21qbDBqZzJzMmRqejNncXprdG52Mm9odCJ9.7LjqXJVgvtEMauLmhi3u6w'; 
        // const coordinates = listing.geometry?.coordinates || [77.2090, 28.6139];

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: "mapbox://style/mapbox/streets-v12",
            center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9 // starting zoom
        });
   
//console.log(coordinates);    

 const marker1 = new mapboxgl.Marker({ color: "red"})
    .setLngLat(listing.geometry.coordinates)//Listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25, closeButton: false,closeonClick: false})
    .setHTML(`<h4>${listing.location}</h4><p>Exact Location will be after booking</p>`))
    .addTo(map); 





   

// mapToken = 'pk.eyJ1IjoicHJhc2hhbnQ3NzciLCJhIjoiY21qbDBqZzJzMmRqejNncXprdG52Mm9odCJ9.7LjqXJVgvtEMauLmhi3u6w';  
// let mapToken = mapToken;        

// map direct use krna pda show.ejs m <script> m likhkr ----because map.js s work nhi kr rha tha