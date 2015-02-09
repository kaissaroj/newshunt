/**
 * Created by kais on 1/26/15.
 */
Template.share.helpers({
  shareData: function () {
    var x = Meteor.subscribe('postNews');
    if (x.ready) {
      return Posts.find({'creatorId': Meteor.userId()});
    }
  }
});
