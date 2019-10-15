$( document ).ready(function() {
  
  if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(function success(position) {
        // for when getting location is a success
      console.log("position", position);
      nearBy(position.coords.latitude, position.coords.longitude);
      getAddress(position.coords.latitude, position.coords.longitude);
    },
    function error(error_message) {
      // for when getting location results in an error
      console.error('An error has occured while retrieving location', error_message)
      ipLookUp()
    });
  } else {
    console.log('geolocation is not enabled on this browser')
    ipLookUp()
  }

});

function ipLookUp () {
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);
          nearBy(response.lat, response.lon);
        getAddress(response.lat, response.lon);
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}

function nearBy(lat,lng) {
  $.ajax({
    type: "GET",
    url: "/nearby?lat="+lat+"&lng="+lng,
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization"
    },
    success: function(response){
        if(response) {
            console.log(response);
        }
    },
    error: function(){

    }
});
}


function getAddress(lat, lng) {
  var setting = {
    url: '/mapmyindia/?lat='+lat+'&lng='+lng,
    method: "GET",
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
  }
  $.ajax(setting)
  .then(
    function success (response) {
      console.log('User\'s Address Data is ', response)
      setLocation(response.results[0]);
      getNearByPostOffice(response.results[0].pincode);
      

    },
    function fail (status) {
      console.log('Request failed.  Returned status of',
                  status)
    }
   )
  }

