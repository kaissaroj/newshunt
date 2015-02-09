
if (Meteor.isClient) {
  Meteor.startup(function () {
    myApp = new Framework7();
    $$ = Dom7;
  });
}
