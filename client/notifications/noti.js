/**
 * Created by kais on 1/17/15.
 */
Template.noti.events({
  'click #itemclick': function (e, t) {

    e.preventDefault();
    var postid = this.postId;
    console.log(postid);
    Session.set('pooo', postid);
    renderTemplate(Template.notPost, postid);
    myApp.popup('.popup-notPost');
  }
});
Meteor.subscribe('notifyComment');
Template.noti.helpers({
  notifications: function () {

    // var sub = Meteor.subscribe("notifyComment");
    //if (sub.ready()) {
    var xxx = Notifications.find({creatorId: Meteor.userId(), read: false});


    return xxx;
    //}

  }
})

