/**
 * Created by kais on 1/23/15.
 */
Meteor.subscribe('postsNews', function onReady() {
  Session.set('postsLoaded', true);
});
Template.showMap.helpers({
  exampleMapOptions: function () {

    // userLnglat = Session.get("latLng");
    var userLnglat = Geolocation.latLng();
    latt = userLnglat.lat;
    lngg = userLnglat.lng;
    console.log(userLnglat);
    if (userLnglat == null) {
      Session.set('postsLoaded', true);
    }
    if (GoogleMaps.loaded()) {
      GoogleMaps.ready('exampleMap', function (map) {
        // Add a marker to the map once it's ready
        console.log("map is now loaded");
        mymap = map;
      });
      // Map initialization options
      return {
        //console.log("map initialized");
        center: new google.maps.LatLng(latt, lngg),
        zoom: 13
      };
    }
  },
  addMarker: function () {
    if (GoogleMaps.loaded() && mymap) {
      var gLatLng = new google.maps.LatLng(this.markers.lat, this.markers.lng);
      var contentString =
        '<h1 id="firstHeading" class="firstHeading">' + this.title + '</h1>' + '<img src="' + this.uploadImage + '" alt="no img" style="height:150px;width:150px">';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      gMarker = new google.maps.Marker({
        position: gLatLng,
        map: mymap.instance,
        title: this.title,
        // animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
      infowindow.open(mymap.instance, gMarker);
      //setTimeout(function(){//GoogleMaps.event.trigger(mymap, 'resize')}, 0);
      console.log("marker added");


    }
  },
  Posts: function () {
    var x = Posts.find();
    // console.log(x.fetch());
    return x;
  },
  postsLoaded: function () {
    return Session.get('postsLoaded');
  }
});
Template.showMap.rendered = function () {
  //mymap = null;
}
