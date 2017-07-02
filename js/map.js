function initMap() {
        var creekside = {lat: 43.484190, lng: -80.599383};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: creekside
        });
        var marker = new google.maps.Marker({
          position: creekside,
          map: map
        });
      }