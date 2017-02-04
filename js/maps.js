;(function(){

  const zalate = { lat:20.395417, lng:-103.135747 }

  google.maps.event.addDomListener(window,"load",()=>{
    const map = new google.maps.Map(
      document.getElementById("map") ,
      {
        zoom:16,
        center: zalate
      }
    )

    const zalate_marker = new google.maps.Marker({
      map: map,
      position: zalate,
      title: "El Zalate",
      //animation: google.maps.Animation.BOUNCE,
      visible:true
    })

    UserLocation.get((coords)=>{
      let origin = new google.maps.LatLng(coords.lat, coords.lng)
      let destination = new google.maps.LatLng(zalate.lat, zalate.lng)

      let service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING
      }, (response,status)=>{
        if (status === google.maps.DistanceMatrixStatus.OK) {
          const travel = response.rows[0].elements[0]
          const travel_duration = travel.duration.text
          const travel_distance = travel.distance.text

          document.querySelector("#map-info").innerHTML = `Estás a ${travel_distance} y llegarias en ${travel_duration} al mejor lugar en Atequiza`
        }
      })
    })

  })

})()

class UserLocation{

  static get(callback){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location)=>{
        callback({
          lat: location.coords.latitude,
          lng: location.coords.longitude
         })
      })
    } else {
      alert("No es posible detectar tu localización con tu navegador y/o dispositivo.")
      return { lat:0, lng:0 }
    }


  }
}
