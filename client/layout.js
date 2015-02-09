/**
 * Created by kais on 1/15/15.
 */
myApp = new Framework7();
$$ = Dom7;
Template.layout.events({
  'click #createNews': function () {
    myApp.popup('.popup-createNews');

  },
  'click #searchNews': function () {
    var sr = renderTemplate(Template.search);
    myApp.popup('.popup-searchNews');
  },
  'click #refreshNews':function(){
    location.reload(true);
  }

});
Meteor.subscribe('postsNews');
Template.layout.rendered = function () {
  GoogleMaps.load({key: 'AIzaSyDSP7NERWasjrkEYMkOEVrCBxjtCkGeiJ0', libraries: 'geometry,places'});


}

