//********************** ROUTES **********************//
//********************** ROUTES **********************//
Router.route('/directions/:address', {
    name: 'directions'
    });

  Meteor.startup(function() {
    GoogleMaps.load();
  });


Template.directions.onRendered(function(){
        console.log("it's loaded fully");
         if (GoogleMaps.loaded()) {
          initMap();
        }
});


  Template.directions.helpers({

    exampleMapOptions: function() {
      $(window).load(function() {
        console.log("it's loaded fully");
         if (GoogleMaps.loaded()) {
          initMap();
        }
          });
      }
  });




  function initMap() {

      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center:{lat:51.5033630,lng:-0.1276250}
      });
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('right-panel'));

      var control = document.getElementById('floating-panel');
      if (control===null) return;
      else{control.style.display = 'block';}
      
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
        calculateAndDisplayRoute(directionsService, directionsDisplay);

      var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };

      document.getElementById('modeOfTransport').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var modeOfTransport = document.getElementById('modeOfTransport').value;
    console.log(modeOfTransport,"modeOfTransport");
    var end= Router.current().params.address;

    if( Globals.userLocation){
      var lat=  Globals.userLocation.lat;
      var lng=  Globals.userLocation.lng;
       var start=''+lat+', '+lng;
       console.log("start",start);

    }
    else{
      //if the user's location has not been read in properly, you alert them, and route back to home page (maybe later change this to a back button, or back to actINfo)
      alert("Your location cannot be determined. Please check if you've enabled the site to access your current location");
      Router.go('home');
    }


    if(modeOfTransport=="walking"){
          directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.WALKING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    }

    else if(modeOfTransport=="driving"){
                  directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    }
    else if(modeOfTransport=="transit"){
         directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.TRANSIT
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    }
    else{
       directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.BICYCLING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });

    }

}





